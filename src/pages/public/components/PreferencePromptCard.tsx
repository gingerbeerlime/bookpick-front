import { useNavigate } from 'react-router-dom'

import { Card, CardContent } from '@/shared/ui/card'

const PreferencePromptCard = () => {
  const navigate = useNavigate()

  return (
    <div className='relative mb-4 break-inside-avoid'>
      <Card className='min-h-[320px] border border-dashed border-[#c4b99a] bg-white shadow-sm'>
        <CardContent className='flex flex-1 flex-col items-center justify-center gap-5 px-5 pt-6'>
          <p className='text-center font-pretendard text-base font-semibold leading-relaxed text-[#5c4a32]'>
            독서 취향을 알려주세요
          </p>
          <p className='text-center font-pretendard text-sm leading-relaxed text-[#8b7355]'>
            북픽이 당신의 취향에 딱 맞는
            <br />
            추천사만 보여드릴게요
          </p>
          <button
            type='button'
            className='rounded-full bg-[#5c4a32] px-5 py-2 font-pretendard text-sm font-medium text-white transition-colors hover:bg-[#5c4a32]/85'
            onClick={() => navigate('/onboarding/reading-preference')}
          >
            취향 설정하기
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreferencePromptCard
