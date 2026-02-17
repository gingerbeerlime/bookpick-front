import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Card, CardContent, CardFooter, CardTitle } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../model/validationSchema'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const KakaoIcon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9 0.5C4.02944 0.5 0 3.69052 0 7.63636C0 10.1174 1.55866 12.3049 3.93099 13.5986L2.93329 17.0669C2.84299 17.3956 3.21989 17.6557 3.50409 17.4642L7.62918 14.6899C8.08011 14.7397 8.53711 14.7727 9 14.7727C13.9706 14.7727 18 11.5822 18 7.63636C18 3.69052 13.9706 0.5 9 0.5Z'
      fill='#000000'
    />
  </svg>
)

export default function LoginPage() {
  const navigate = useNavigate()
  const [isKakaoLoading, setIsKakaoLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: 'onTouched' })

  const { useLogin, useGetKakaoLoginUrl } = useAuth()
  const { mutateAsync: loginMutateAsync, isPending } = useLogin()
  const { refetch: fetchKakaoLoginUrl } = useGetKakaoLoginUrl(false)

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutateAsync(data)
      // 약간의 딜레이 후 navigate (상태 업데이트 보장)
      setTimeout(() => {
        if (response?.isFirstLogin) {
          navigate('/onboarding')
        } else {
          navigate('/')
        }
      }, 100)
    } catch (error) {
      console.error(error)
    }
  }

  const handleKakaoLogin = async () => {
    try {
      setIsKakaoLoading(true)
      const { data } = await fetchKakaoLoginUrl()
      if (data?.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error('카카오 로그인 URL 요청 실패:', error)
      setIsKakaoLoading(false)
    }
  }

  return (
    <div className='max-w-md w-full space-y-8'>
      <Link to='/' className='block text-center mb-6'>
        <h1 className='text-3xl font-wanted font-bold'>BOOKPICK</h1>
      </Link>
      <Card className='px-4 py-10 rounded-2xl border-0 bg-transparent sm:border sm:bg-card'>
        <CardTitle>
          <h2 className='text-2xl px-0 sm:px-6 mb-5'>로그인</h2>
        </CardTitle>
        <CardContent className='px-0 sm:px-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Input
                id='email'
                type='email'
                placeholder='이메일'
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            <div>
              <Input
                id='password'
                type='password'
                placeholder='비밀번호'
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className='text-sm text-destructive'>{errors.password.message}</p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-card px-2 text-muted-foreground'>또는</span>
            </div>
          </div>

          <Button
            type='button'
            variant='outline'
            className='w-full h-[45px] bg-[#FEE500] hover:bg-[#FDD835] text-black/85 border-0 rounded-[12px]'
            onClick={handleKakaoLogin}
            disabled={isKakaoLoading}
          >
            <KakaoIcon />
            <span className='ml-2'>{isKakaoLoading ? '로딩 중...' : '카카오계정 로그인'}</span>
          </Button>
        </CardContent>

        <CardFooter>
          <div className='w-full text-center space-y-2 mt-5'>
            {/* 비밀번호 찾기 링크 (*작업 필요) */}
            {/* <Link
              to='/forgot-password'
              className='text-sm text-gray-600 hover:text-gray-900 underline block'
            >
              비밀번호를 잊으셨나요?
            </Link> */}
            <Link
              to='/register'
              className='text-sm text-gray-600 hover:text-gray-900 underline block'
            >
              다른 이메일로 가입하기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
