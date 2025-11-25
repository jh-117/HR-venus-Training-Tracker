import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'
import { PDPAModal } from './PDPAModal'

export function Auth() {
  // ✅ All hooks must be inside the component
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [pdpaConsent, setPdpaConsent] = useState(false)
  const [showPDPAModal, setShowPDPAModal] = useState(false)

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (isSignUp) {
      if (!pdpaConsent) {
        setError('You must agree to the Privacy Policy to sign up')
        setLoading(false)
        return
      }

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
    <>
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 pb-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
                <Folder className="h-11 w-11" />
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
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

              {/* Password */}
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

              {/* PDPA / Privacy consent */}
              {isSignUp && (
                <div className="flex items-start gap-3 mt-2">
                  <input
                    id="pdpaConsent"
                    type="checkbox"
                    checked={pdpaConsent}
                    onChange={(e) => setPdpaConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  />

                  <label htmlFor="pdpaConsent" className="text-sm text-slate-300 leading-relaxed">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowPDPAModal(true)}
                      className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
                    >
                      Privacy Policy
                    </button>{' '}
                    and consent to the collection and use of my personal data as described.
                  </label>
                </div>
              )}

              {/* Error / Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm">
                  {message}
                </div>
              )}

              {/* Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>

            {/* Switch mode */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                  setPdpaConsent(false)
                }}
                className="text-sm text-slate-400 hover:text-slate-300"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDPA Modal */}
      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
    </>
  )
}