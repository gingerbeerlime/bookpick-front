import { ShoppingCart } from 'lucide-react'

import type { Book } from '@/features/curation/types/curation.types'
import { Button } from '@/shared/ui'
import { Card, CardContent } from '@/shared/ui/card'

interface CurationMemoCardBackProps {
  book: Book
}

const CurationMemoCardBack = ({ book }: CurationMemoCardBackProps) => {
  const purchaseUrl = book.isbn
    ? `https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=${book.isbn}`
    : `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${encodeURIComponent(book.title)}`

  return (
    <Card className='absolute inset-0 rotate-y-180 backface-hidden border-[#3a2f24] bg-[#3a2f24] shadow-md'>
      <CardContent className='flex flex-1 flex-col items-center justify-center gap-4 px-5'>
        {book.imageUrl && (
          <div className='h-40 w-28 overflow-hidden rounded-sm shadow-md'>
            <img
              src={book.imageUrl}
              alt={book.title}
              className='h-full w-full object-cover'
            />
          </div>
        )}
        <div className='text-center'>
          <p className='font-handwriting text-xl font-bold text-[#fdf6e3]'>{book.title}</p>
          {book.author && (
            <p className='mt-1 font-handwriting text-sm text-[#c8b89a]'>{book.author}</p>
          )}
        </div>
        <Button
          size='sm'
          className='mt-1 gap-1.5 rounded-full bg-[#c8b89a] font-handwriting text-[#3a2f24] hover:bg-[#fdf6e3]'
          onClick={(e) => {
            e.stopPropagation()
            window.open(purchaseUrl, '_blank')
          }}
        >
          <ShoppingCart size={14} />
          책 구매하기
        </Button>
      </CardContent>
    </Card>
  )
}

export default CurationMemoCardBack
