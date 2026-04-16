'use client'

import { useRouter } from 'next/navigation'
import LoginPage from '../../screens/Auth/LoginPage'

export default function Login() {
  const router = useRouter()
  return <LoginPage onSuccess={() => router.push('/')} />
}
