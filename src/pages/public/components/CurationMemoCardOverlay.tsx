import { Button } from '@/shared/ui'

interface CurationMemoCardOverlayProps {
  onConfirm: () => void
  onCancel: () => void
}

const CurationMemoCardOverlay = ({ onConfirm, onCancel }: CurationMemoCardOverlayProps) => {
  return (
    <div
      className='absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md bg-[#fdf6e3]/90 backdrop-blur-sm'
      onClick={(e) => e.stopPropagation()}
    >
      <p className='mb-6 whitespace-pre-line text-center font-handwriting text-lg text-[#5c4a32]'>
        {'10P를 사용해서\n어떤 책인지 확인할까요?'}
      </p>
      <div className='flex gap-3'>
        <Button
          variant='outline'
          size='sm'
          className='font-handwriting text-[#8b7355]'
          onClick={onCancel}
        >
          아니요
        </Button>
        <Button
          size='sm'
          className='bg-[#5c4a32] font-handwriting text-white hover:bg-[#5c4a32]/90'
          onClick={onConfirm}
        >
          네
        </Button>
      </div>
    </div>
  )
}

export default CurationMemoCardOverlay
