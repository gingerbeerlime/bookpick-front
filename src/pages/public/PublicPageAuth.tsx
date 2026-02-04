import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/shared/ui'

import CurationMemoCard from './components/CurationMemoCard'
import PublicLayout from './components/PublicLayout'
import { mockPublicCurations } from './data/mockPublicCurations'

const MOCK_USER = {
  nickName: '책벌레민수',
  points: 100,
}

const PublicPageAuth = () => {
  const navigate = useNavigate()

  return (
    <PublicLayout>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-0'>
          <img src='/images/book-logo-image.png' alt='BookPick' className='h-10 w-10' />
          <h1 className='font-handwriting text-3xl text-[#5c4a32]'>BookPick</h1>
        </div>
        <div className='flex items-center gap-3'>
          <Pencil
            size={18}
            className='cursor-pointer text-[#5c4a32]'
            onClick={() => navigate('/curation/create')}
          />
          <span className='font-handwriting text-lg text-[#5c4a32]'>{MOCK_USER.nickName}</span>
          <span className='font-handwriting text-lg text-[#8b7355]'>{MOCK_USER.points}P</span>
        </div>
      </div>
      <p className='mb-6 text-center font-handwriting text-xl text-[#8b7355]'>
        카드를 눌러 어떤 책인지 확인해보세요
      </p>
      <div className='grid grid-cols-1 gap-4 xs:grid-cols-2'>
        {mockPublicCurations.map((item) => (
          <CurationMemoCard key={item.id} item={item} onBeforeFlip={async () => true} />
        ))}
      </div>
    </PublicLayout>
  )
}

export default PublicPageAuth
