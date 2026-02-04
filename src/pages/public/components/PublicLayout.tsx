interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className='min-h-screen bg-[#faf5eb]'>
      <div className='mx-auto max-w-[600px] px-4 py-8'>{children}</div>
    </div>
  )
}

export default PublicLayout
