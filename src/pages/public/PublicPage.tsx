import { Fragment } from 'react'

import CurationMemoCard from './components/CurationMemoCard'
import CurationMemoCardSignupOverlay from './components/CurationMemoCardSignupOverlay'
import PreferencePromptCard from './components/PreferencePromptCard'
import PublicLayout from './components/PublicLayout'
import { mockPublicCurations } from './data/mockPublicCurations'

const PREFERENCE_CARD_INDEX = 3

const PublicPage = () => {
  return (
    <PublicLayout>
      <div className='mb-6 flex items-center gap-0'>
        <img src='/images/book-logo-image.png' alt='BookPick' className='h-10 w-10' />
        <h1 className='font-handwriting text-3xl text-[#5c4a32]'>BookPick</h1>
      </div>
      <p className='mb-6 text-center font-pretendard text-base text-[#8b7355]'>
        카드를 눌러 어떤 책인지 확인해보세요
      </p>
      <div className='columns-1 xs:columns-2 gap-4'>
        {mockPublicCurations.map((item, index) => (
          <Fragment key={item.id}>
            {index === PREFERENCE_CARD_INDEX && <PreferencePromptCard />}
            <CurationMemoCard
              item={item}
              renderOverlay={({ onCancel }) => <CurationMemoCardSignupOverlay onCancel={onCancel} />}
            />
          </Fragment>
        ))}
      </div>
    </PublicLayout>
  )
}

export default PublicPage
