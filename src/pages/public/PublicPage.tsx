import CurationMemoCard from './components/CurationMemoCard'
import PublicLayout from './components/PublicLayout'
import { mockPublicCurations } from './data/mockPublicCurations'

const PublicPage = () => {
  return (
    <PublicLayout>
      <div className='mb-8 text-center'>
        <h1 className='font-handwriting text-4xl text-[#5c4a32]'>큐레이션 아이디어 공유</h1>
        <p className='mt-2 font-handwriting text-xl text-[#8b7355]'>
          카드를 눌러 어떤 책인지 확인해보세요
        </p>
      </div>
      <div className='columns-1 xs:columns-2 gap-4'>
        {mockPublicCurations.map((item) => (
          <CurationMemoCard key={item.id} item={item} />
        ))}
      </div>
    </PublicLayout>
  )
}

export default PublicPage
