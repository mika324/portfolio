'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { memo, useState } from 'react'

const LoginModal = ({
  open,
  handleClose
}: {
  open: boolean
  handleClose: () => void
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData)
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
    void handleClose()
  }
  return (
    <Dialog
      open={open}
      onClose={() => void handleClose()}
      PaperProps={{
        component: 'form',
        onSubmit: onSubmit
      }}
    >
      <DialogTitle className="text-[#000B58]">ログイン</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-y-4 lg:w-96 md:w-80 sm:w-full bg-[#E1F2FB]">
          <TextField
            autoFocus
            required
            id="name"
            name="email"
            label="メールアドレス"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            autoFocus
            required
            id="password"
            name="password"
            label="パスワード"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions className="bg-[#FFE3ED]">
        <Button onClick={() => void handleClose()}>キャンセル</Button>
        <Button type="submit" className="bg-[#EDFFEC]">
          ログイン
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(LoginModal)
