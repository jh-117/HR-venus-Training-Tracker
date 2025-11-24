import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'

export function Auth() {
  // ✅ All hooks must be inside the component
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (isSignUp) {
      const { error } = await signUp(email, password)
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-md flex-1 flex flex-col justify-center pb-16">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
              <Folder className="h-9 w-9" />
            </div>
          </div>
          <h1
            className="font-black tracking-tight text-slate-100 mb-2"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            HR<span className="text-slate-300">Venus</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-400">
            Training Action Tracker
          </p>
        </div>
       

        {/* Auth Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-slate-950 border-slate-700 text-slate-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-slate-950 border-slate-700 text-slate-100"
              />
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">{error}</div>}
            {message && <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm">{message}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
              className="text-sm text-slate-400 hover:text-slate-300"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>

      {/* Powered by logo fixed at bottom */}
      <div className="absolute bottom-4 flex flex-col items-center w-full">
        <img src={kadoshLogo} alt="Powered by Kadosh AI" className="h-8 opacity-90" />
        <span className="text-xs text-slate-400 mt-1">Powered by Kadosh AI</span>
      </div>
    </div>
  )
}
