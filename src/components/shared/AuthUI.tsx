'use client'
import { useState } from 'react'
import { useAuth } from './AuthProvider'

export default function AuthUI() {
  const { user, signIn, signUp, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    return (
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="px-3 py-2 rounded-full bg-dasza-cyan text-white">{user.name?.[0]?.toUpperCase() || 'U'}</button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow">
            <div className="p-3 text-sm">
              <div className="font-medium text-dasza-navy">{user.name}</div>
              <div className="text-dasza-navy/70">{user.email}</div>
            </div>
            <div className="border-t" />
            <a href="/admin" className="block px-3 py-2 text-sm hover:bg-gray-50">Admin dashboard</a>
            <button onClick={() => signOut()} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Sign out</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">Log In</button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow p-4">
          <div className="flex gap-3 text-sm mb-3">
            <button className={`px-2 py-1 rounded ${mode==='login'?'bg-dasza-cyan text-white':'bg-gray-100'}`} onClick={()=>setMode('login')}>Log in</button>
            <button className={`px-2 py-1 rounded ${mode==='signup'?'bg-dasza-cyan text-white':'bg-gray-100'}`} onClick={()=>setMode('signup')}>Sign up</button>
          </div>
          {mode==='signup' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-3 rounded-xl w-full mb-2" />
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-3 rounded-xl w-full mb-2" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="border p-3 rounded-xl w-full mb-3" />
          {mode==='login' ? (
            <button onClick={()=>signIn(email,password)} className="w-full px-4 py-2 rounded-full bg-dasza-cyan text-white">Log in</button>
          ) : (
            <button onClick={()=>signUp(name,email,password)} className="w-full px-4 py-2 rounded-full bg-dasza-cyan text-white">Create account</button>
          )}
          <p className="text-xs text-dasza-navy/60 mt-2">Frontend-only auth for demo. Backend will be added later.</p>
        </div>
      )}
    </div>
  )
}


