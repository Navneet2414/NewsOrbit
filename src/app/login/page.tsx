'use client'

import { useRouter } from 'next/navigation'
import LoginPage from '../../Pages/Auth/LoginPage'

export default function Login() {
  const router = useRouter()
  return <LoginPage onSuccess={() => router.push('/')} />
}
