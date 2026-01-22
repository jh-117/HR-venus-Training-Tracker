import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder, Eye, EyeOff } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'
import { PDPAModal } from './PDPAModel'
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/training-theme.mp3';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <BackgroundMusic src={themeMusic} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-xs"> {/* Changed from max-w-sm to max-w-xs for narrower width */}
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
                  <Folder className="h-11 w-11" />
                </div>
              </div>

              <h1
                className="font-black tracking-tight text-slate-100 mb-2"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }} // Slightly smaller font
              >
                HR<span className="text-slate-300">Venus</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-400">
                Pre Training Action Tracker
              </p>
            </div>

            {/* Auth Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl w-full"> {/* Reduced padding */}
              <h2 className="text-lg font-bold text-slate-100 mb-4">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200 text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-slate-950 border-slate-700 text-slate-100 text-sm h-9" // Smaller input
                  />
                </div>

                {/* Password with eye icon */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200 text-sm">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="bg-slate-950 border-slate-700 text-slate-100 pr-10 text-sm h-9" // Added right padding
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* PDPA / Privacy consent */}
                {isSignUp && (
                  <div className="flex items-start gap-2 mt-2">
                    <input
                      id="pdpaConsent"
                      type="checkbox"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-600 cursor-pointer"
                    />

                    <label htmlFor="pdpaConsent" className="text-xs text-slate-300 leading-relaxed">
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
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-2 text-red-400 text-xs">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-2 text-green-400 text-xs">
                    {message}
                  </div>
                )}

                {/* Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm"
                >
                  {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
              </form>

              {/* Switch mode */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setMessage('')
                    setPdpaConsent(false)
                  }}
                  className="text-xs text-slate-400 hover:text-slate-300"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by section at the bottom */}
        <div className="py-4 border-t border-slate-800 text-center bg-slate-950">
          <p className="text-xs text-slate-400 mb-2">Powered by</p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            className="mx-auto h-6"
          />
        </div>
      </div>

      {/* PDPA Modal */}
      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
    </>
  )
}