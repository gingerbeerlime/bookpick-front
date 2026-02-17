import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

export function GnbLoggedOut() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-2'>
      {/* 모바일 버튼 */}
      <Button
        variant='ghost'
        className='lg:hidden text-point hover:bg-transparent hover:text-point px-2'
        onClick={() => navigate('/login')}
      >
        로그인
      </Button>

      {/* 데스크톱 버튼 */}
      <Button
        variant='ghost'
        size='lg'
        className='hidden lg:flex text-point hover:bg-transparent hover:text-point px-2'
        onClick={() => navigate('/login')}
      >
        로그인
      </Button>
    </div>
  )
}
