interface CurationMemoCardSignupOverlayProps {
  onCancel: () => void
}

const CurationMemoCardSignupOverlay = ({ onCancel }: CurationMemoCardSignupOverlayProps) => {
  return (
    <div
      className='absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md bg-[#fdf6e3]/90 backdrop-blur-sm'
      onClick={(e) => {
        e.stopPropagation()
        onCancel()
      }}
    >
      <p className='mb-6 whitespace-pre-line text-center font-handwriting text-lg text-[#5c4a32]'>
        {'북픽에 가입해\n어떤 책인지 확인해보세요!'}
      </p>
      <button
        type='button'
        className='flex items-center gap-2 rounded-md px-5 py-2.5 font-pretendard text-sm font-medium text-[#3c1e1e]'
        style={{ backgroundColor: '#FEE500' }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9 1C4.58 1 1 3.87 1 7.35C1 9.49 2.44 11.35 4.6 12.42L3.74 15.64C3.69 15.82 3.89 15.97 4.05 15.86L7.81 13.42C8.2 13.46 8.6 13.49 9 13.49C13.42 13.49 17 10.62 17 7.14C17 3.87 13.42 1 9 1Z'
            fill='#3c1e1e'
          />
        </svg>
        카카오로 시작하기
      </button>
    </div>
  )
}

export default CurationMemoCardSignupOverlay
