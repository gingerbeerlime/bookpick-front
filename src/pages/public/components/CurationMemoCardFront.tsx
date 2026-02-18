import { Card, CardContent, CardFooter } from '@/shared/ui/card'

export interface CardTheme {
  cardBg: string
  cardBorder: string
  textColor: string
  footerColor: string
  pattern: string
  peel: string
}

export const DEFAULT_CARD_THEME: CardTheme = {
  cardBg: 'bg-[#fdf6e3]',
  cardBorder: 'border-[#e8dcc8]',
  textColor: 'text-[#5c4a32]',
  footerColor: 'text-[#8b7355]',
  pattern: '',
  peel: '',
}

interface CurationMemoCardFrontProps {
  review: string
  nickName: string
  fontClass?: string
  theme?: CardTheme
}

const CurationMemoCardFront = ({ review, nickName, fontClass = 'font-handwriting', theme = DEFAULT_CARD_THEME }: CurationMemoCardFrontProps) => {
  return (
    <Card className={`memo-card-peel ${theme.peel} backface-hidden ${theme.cardBorder} ${theme.cardBg} shadow-md ${theme.pattern} min-h-[320px]`}>
      <CardContent className='flex flex-1 items-center px-5 pt-6'>
        <p className={`${fontClass} text-xl leading-relaxed ${theme.textColor} whitespace-pre-wrap`}>
          "{review}"
        </p>
      </CardContent>
      <CardFooter className='justify-end px-5 pb-5'>
        <span className={`${fontClass} text-lg ${theme.footerColor}`}>- {nickName} -</span>
      </CardFooter>
    </Card>
  )
}

export default CurationMemoCardFront
