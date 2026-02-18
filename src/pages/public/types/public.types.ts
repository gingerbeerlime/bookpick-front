import type { Book } from '@/features/curation/types/curation.types'

export interface PublicCurationItem {
  id: number
  review: string
  nickName: string
  book: Book
}
