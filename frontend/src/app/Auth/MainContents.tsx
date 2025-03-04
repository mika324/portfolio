'use client'
import { User } from '@/types/user'
import LoginModal from './LoginModal'
import { memo, useState } from 'react'

const MainContents = ({ users }: { users: User[] }) => {
  console.log(users)
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
    // TODO: ログイン処理
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      <LoginModal open={open} handleClose={handleClose} />
    </div>
  )
}

export default memo(MainContents)
