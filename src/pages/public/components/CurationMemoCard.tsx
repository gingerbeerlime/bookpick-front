import { type ReactNode, useState } from 'react'

import type { PublicCurationItem } from '../types/public.types'
import CurationMemoCardBack from './CurationMemoCardBack'
import CurationMemoCardFront, { type CardTheme } from './CurationMemoCardFront'
import CurationMemoCardOverlay from './CurationMemoCardOverlay'

const HANDWRITING_FONTS = [
  'font-handwriting',
  'font-is-yun',
  'font-omu-daye',
  'font-ongleip-eoyeonce',
  'font-gangwon-education-saeum',
  'font-mapo-flower-island',
  'font-kbiz-hanmaum-myungjo',
]

const CARD_THEMES: CardTheme[] = [
  // 메모지 (옅은 노란색)
  {
    cardBg: 'bg-[#fdf6e3]',
    cardBorder: 'border-[#e8dcc8]',
    textColor: 'text-[#5c4a32]',
    footerColor: 'text-[#8b7355]',
    pattern: '',
    peel: '',
  },
  // 다이어리 (줄 선이 있는 미색 종이)
  {
    cardBg: 'bg-[#faf8f5]',
    cardBorder: 'border-[#e0ddd8]',
    textColor: 'text-[#3a3632]',
    footerColor: 'text-[#7a756e]',
    pattern: 'memo-pattern-diary',
    peel: 'memo-peel-diary',
  },
  // 모눈 격자 (하얀색 배경)
  {
    cardBg: 'bg-white',
    cardBorder: 'border-[#d4d4d4]',
    textColor: 'text-[#333333]',
    footerColor: 'text-[#777777]',
    pattern: 'memo-pattern-grid',
    peel: 'memo-peel-grid',
  },
  // 종이 질감 (크라프트 종이 느낌)
  {
    cardBg: 'bg-[#f0ebe2]',
    cardBorder: 'border-[#d4c9b8]',
    textColor: 'text-[#4a4035]',
    footerColor: 'text-[#8a7e6f]',
    pattern: 'memo-pattern-paper',
    peel: 'memo-peel-paper',
  },
]

interface CurationMemoCardProps {
  item: PublicCurationItem
  onBeforeFlip?: (id: number) => Promise<boolean>
  renderOverlay?: (props: { onCancel: () => void }) => ReactNode
}

const CurationMemoCard = ({ item, onBeforeFlip, renderOverlay }: CurationMemoCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleClick = () => {
    if (isFlipped) {
      setIsFlipped(false)
      return
    }

    if (onBeforeFlip || renderOverlay) {
      setShowOverlay(true)
      return
    }

    setIsFlipped(true)
  }

  const handleConfirm = async () => {
    if (onBeforeFlip) {
      const allowed = await onBeforeFlip(item.id)
      if (allowed) {
        setShowOverlay(false)
        setIsFlipped(true)
        return
      }
    }
    setShowOverlay(false)
  }

  const handleCancel = () => {
    setShowOverlay(false)
  }

  return (
    <div
      className='perspective-1000 relative break-inside-avoid mb-4 cursor-pointer'
      onClick={handleClick}
    >
      <div className={`preserve-3d flip-transition relative ${isFlipped ? 'flipped' : ''}`}>
        <CurationMemoCardFront
          review={item.review}
          nickName={item.nickName}
          fontClass={HANDWRITING_FONTS[item.id % HANDWRITING_FONTS.length]}
          theme={CARD_THEMES[item.id % CARD_THEMES.length]}
        />
        <CurationMemoCardBack book={item.book} />
      </div>
      {showOverlay &&
        (renderOverlay ? (
          renderOverlay({ onCancel: handleCancel })
        ) : (
          <CurationMemoCardOverlay onConfirm={handleConfirm} onCancel={handleCancel} />
        ))}
    </div>
  )
}

export default CurationMemoCard
