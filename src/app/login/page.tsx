"use client"
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { useState } from 'react'
import { useAuth } from "@/components/shared/AuthProvider";

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login'|'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Admin Login" subtitle="Owners can sign in to Dasza System" image="/images/Industrial Properties Mexico.jpg" />
        <section className="mx-auto max-w-md px-6 py-12 text-dasza-navy">
          <div className="flex gap-3 text-sm mb-4">
            <button className={`px-3 py-1 rounded ${mode==='login'?'bg-dasza-cyan text-white':'bg-gray-100'}`} onClick={()=>setMode('login')}>Log in</button>
            <button className={`px-3 py-1 rounded ${mode==='signup'?'bg-dasza-cyan text-white':'bg-gray-100'}`} onClick={()=>setMode('signup')}>Sign up</button>
          </div>
          <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); mode==='login'?signIn(email,password):signUp(name,email,password)}}>
            {mode==='signup' && (
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-3 rounded-xl w-full" />
            )}
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="border p-3 rounded-xl w-full" />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="border p-3 rounded-xl w-full" />
            <button className="w-full px-6 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">{mode==='login'?'Log In':'Create Account'}</button>
            <p className="text-sm text-dasza-navy/70">No account? Click Sign up.</p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}


