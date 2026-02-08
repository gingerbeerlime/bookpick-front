import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function KakaoCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { useKakaoLogin } = useAuth()
  const { mutateAsync: kakaoLoginMutateAsync } = useKakaoLogin()
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return
    hasProcessed.current = true

    const code = searchParams.get('code')
    const error = searchParams.get('error')

    // 사용자가 동의 취소한 경우
    if (error) {
      toast.error('카카오 로그인이 취소되었습니다.')
      navigate('/login', { replace: true })
      return
    }

    // 인증 코드가 없는 경우
    if (!code) {
      toast.error('인증 코드가 없습니다.')
      navigate('/login', { replace: true })
      return
    }

    // 인증 코드로 토큰 교환
    const processKakaoLogin = async () => {
      try {
        const response = await kakaoLoginMutateAsync({ code })
        setTimeout(() => {
          if (response?.isFirstLogin) {
            navigate('/onboarding', { replace: true })
          } else {
            navigate('/', { replace: true })
          }
        }, 100)
      } catch {
        navigate('/login', { replace: true })
      }
    }

    processKakaoLogin()
  }, [searchParams, kakaoLoginMutateAsync, navigate])

  return (
    <div className='max-w-md w-full space-y-8 text-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500' />
        <p className='text-gray-600'>카카오 로그인 처리 중...</p>
      </div>
    </div>
  )
}
