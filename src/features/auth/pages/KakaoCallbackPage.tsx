import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: '카카오 로그인이 취소되었습니다.',
  auth_failed: '카카오 인증에 실패했습니다. 다시 시도해주세요.',
  user_not_found: '등록되지 않은 사용자입니다.',
}

export default function KakaoCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { useKakaoLogin, isFirstLogin } = useAuth()
  const { mutate: kakaoLoginMutate, isSuccess, isError } = useKakaoLogin()
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return
    hasProcessed.current = true

    const error = searchParams.get('error')

    // 에러가 있는 경우
    if (error) {
      const errorMessage = ERROR_MESSAGES[error] || '카카오 로그인에 실패했습니다.'
      toast.error(errorMessage)
      navigate('/login', { replace: true })
      return
    }

    // code 파라미터 확인
    const code = searchParams.get('code')

    if (!code) {
      toast.error('인증 코드가 없습니다.')
      navigate('/login', { replace: true })
      return
    }

    // 토큰 교환 요청
    kakaoLoginMutate(code)
  }, [searchParams, navigate, kakaoLoginMutate])

  // 로그인 성공 시 페이지 이동
  useEffect(() => {
    if (isSuccess) {
      if (isFirstLogin) {
        navigate('/onboarding', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [isSuccess, isFirstLogin, navigate])

  // 로그인 실패 시 로그인 페이지로 이동
  useEffect(() => {
    if (isError) {
      navigate('/login', { replace: true })
    }
  }, [isError, navigate])

  return (
    <div className='max-w-md w-full space-y-8 text-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500' />
        <p className='text-gray-600'>카카오 로그인 처리 중...</p>
      </div>
    </div>
  )
}
