'use server'
import { User } from '@/types/user'
import MainContents from './Auth/MainContents'

export default async function Home() {
  const users = (await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store'
  }).then((response: Response) => {
    return response.json()
  })) as User[]
  return <MainContents users={users} />
}
