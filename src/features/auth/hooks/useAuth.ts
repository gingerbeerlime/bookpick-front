import { useAuth as useAuthContext } from '@/app/providers'
import { authApi } from '../api/auth.api'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { RegisterRequest, LoginRequest, KakaoTokenRequest } from '../types/auth.types'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, isFirstLogin, setAuthState, clearFirstLogin } =
    useAuthContext()

  /**
   * 로그인
   */
  const useLogin = () => {
    return useMutation({
      mutationFn: async (request: LoginRequest) => {
        setAuthState((prev) => ({ ...prev, isLoading: true }))
        const response = await authApi.login(request)
        return response.data
      },
      onSuccess: (data) => {
        if (data.userId && data.accessToken) {
          const authData = {
            user: {
              userId: data.userId,
              email: data.email,
              nickname: data.nickname,
              bio: data.bio,
              profileImageUrl: data.profileImageUrl,
            },
            token: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
          }

          localStorage.setItem('bookpick-auth', JSON.stringify(authData))

          setAuthState({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
            isFirstLogin: data.isFirstLogin ?? false,
          })
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      },
      onError: (error) => {
        localStorage.removeItem('bookpick-auth')
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isFirstLogin: false,
        })
        toast.error(error.message || '로그인에 실패했습니다.')
      },
    })
  }

  /**
   * 회원가입
   */
  const useRegister = () => {
    return useMutation({
      mutationFn: async (request: RegisterRequest) => {
        const response = await authApi.register(request)
        return response.data
      },
      onError: (error) => {
        toast.error(error.message || '회원가입에 실패했습니다.')
      },
    })
  }

  /**
   * 로그아웃
   */
  const useLogout = () => {
    return useMutation({
      mutationFn: async () => {
        await authApi.logout()
      },
      onSuccess: () => {
        localStorage.removeItem('bookpick-auth')
        toast.success('로그아웃 되었습니다.')
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      },
      onError: (error: Error) => {
        toast.error(error.message || '로그아웃에 실패했습니다.')
      },
    })
  }

  /**
   * 카카오 로그인 URL 조회
   */
  const useGetKakaoLoginUrl = (enabled = false) => {
    return useQuery({
      queryKey: ['auth', 'kakao', 'loginUrl'],
      queryFn: async () => {
        const response = await authApi.getKakaoLoginUrl()
        return response.data
      },
      enabled,
    })
  }

  /**
   * 카카오 로그인 (토큰 교환)
   */
  const useKakaoLogin = () => {
    return useMutation({
      mutationFn: async (request: KakaoTokenRequest) => {
        setAuthState((prev) => ({ ...prev, isLoading: true }))
        const response = await authApi.loginWithKakao(request)
        return response.data
      },
      onSuccess: (data) => {
        if (data.userId && data.accessToken) {
          const authData = {
            user: {
              userId: data.userId,
              email: data.email,
              nickname: data.nickname,
              bio: data.bio,
              profileImageUrl: data.profileImageUrl,
            },
            token: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
          }

          localStorage.setItem('bookpick-auth', JSON.stringify(authData))

          setAuthState({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
            isFirstLogin: data.isFirstLogin ?? false,
          })
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      },
      onError: (error) => {
        localStorage.removeItem('bookpick-auth')
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isFirstLogin: false,
        })
        toast.error(error.message || '카카오 로그인에 실패했습니다.')
      },
    })
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    isFirstLogin,

    // Method
    useLogin,
    useRegister,
    useLogout,
    useGetKakaoLoginUrl,
    useKakaoLogin,
    clearFirstLogin,
  }
}
