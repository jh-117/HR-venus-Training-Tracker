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
      <div className="min-h-screen bg-slate-950 flex flex-col" style={{ maxWidth: '100% !important', overflowX: 'hidden !important' }}>
        <BackgroundMusic src={themeMusic} />
        <div className="flex-1 flex items-center justify-center p-4" style={{ maxWidth: '100% !important' }}>
          {/* Force narrow container */}
          <div className="w-[320px] !max-w-[320px] !important" style={{ width: '320px !important', maxWidth: '320px !important' }}>
            {/* Header */}
            <div className="text-center mb-4 !important" style={{ marginBottom: '1rem !important' }}>
              <div className="flex justify-center mb-2" style={{ marginBottom: '0.5rem !important' }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500" style={{ height: '2rem !important', width: '2rem !important' }}>
                  <Folder className="h-9 w-9" style={{ height: '1.5rem !important', width: '1.5rem !important' }} />
                </div>
              </div>

              <h1
                className="font-black tracking-tight text-slate-100 mb-1"
                style={{ 
                  fontSize: '1.75rem !important',
                  marginBottom: '0.25rem !important',
                  lineHeight: '1.2 !important'
                }}
              >
                HR<span className="text-slate-300">Venus</span>
              </h1>

              <p className="text-sm font-bold text-slate-400" style={{ fontSize: '0.875rem !important' }}>
                Pre Training Action Tracker
              </p>
            </div>

            {/* Auth Form - FORCE narrow width */}
            <div 
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl"
              style={{ 
                width: '320px !important',
                maxWidth: '320px !important',
                padding: '1rem !important',
                borderRadius: '0.75rem !important'
              }}
            >
              <h2 className="text-base font-bold text-slate-100 mb-3" style={{ fontSize: '1rem !important', marginBottom: '0.75rem !important' }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3" style={{ gap: '0.75rem !important' }}>
                {/* Email */}
                <div className="space-y-1" style={{ gap: '0.25rem !important' }}>
                  <Label htmlFor="email" className="text-slate-200 text-xs" style={{ fontSize: '0.75rem !important' }}>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-slate-950 border-slate-700 text-slate-100 text-sm h-8"
                    style={{ 
                      fontSize: '0.875rem !important',
                      height: '2rem !important',
                      padding: '0.5rem !important'
                    }}
                  />
                </div>

                {/* Password with eye icon */}
                <div className="space-y-1" style={{ gap: '0.25rem !important' }}>
                  <Label htmlFor="password" className="text-slate-200 text-xs" style={{ fontSize: '0.75rem !important' }}>Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="bg-slate-950 border-slate-700 text-slate-100 pr-10 text-sm h-8"
                      style={{ 
                        fontSize: '0.875rem !important',
                        height: '2rem !important',
                        padding: '0.5rem 2.5rem 0.5rem 0.5rem !important'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      style={{ right: '0.5rem !important' }}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3" style={{ height: '0.75rem !important', width: '0.75rem !important' }} />
                      ) : (
                        <Eye className="h-3 w-3" style={{ height: '0.75rem !important', width: '0.75rem !important' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* PDPA / Privacy consent */}
                {isSignUp && (
                  <div className="flex items-start gap-2 mt-1" style={{ gap: '0.5rem !important', marginTop: '0.25rem !important' }}>
                    <input
                      id="pdpaConsent"
                      type="checkbox"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-0 w-3 h-3 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      style={{ 
                        marginTop: '0 !important',
                        height: '0.75rem !important',
                        width: '0.75rem !important'
                      }}
                    />

                    <label htmlFor="pdpaConsent" className="text-[10px] text-slate-300 leading-tight" style={{ fontSize: '0.625rem !important', lineHeight: '1.25 !important' }}>
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowPDPAModal(true)}
                        className="text-blue-400 underline underline-offset-1 hover:text-blue-300 transition-colors"
                        style={{ fontSize: '0.625rem !important' }}
                      >
                        Privacy Policy
                      </button>{' '}
                      and consent to the collection and use of my personal data as described.
                    </label>
                  </div>
                )}

                {/* Error / Message */}
                {error && (
                  <div 
                    className="bg-red-500/10 border border-red-500/50 rounded p-2 text-red-400 text-xs"
                    style={{ 
                      padding: '0.5rem !important',
                      fontSize: '0.75rem !important',
                      borderRadius: '0.375rem !important'
                    }}
                  >
                    {error}
                  </div>
                )}

                {message && (
                  <div 
                    className="bg-green-500/10 border border-green-500/50 rounded p-2 text-green-400 text-xs"
                    style={{ 
                      padding: '0.5rem !important',
                      fontSize: '0.75rem !important',
                      borderRadius: '0.375rem !important'
                    }}
                  >
                    {message}
                  </div>
                )}

                {/* Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
                  style={{ 
                    height: '2rem !important',
                    fontSize: '0.75rem !important',
                    padding: '0.25rem 0.75rem !important'
                  }}
                >
                  {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
              </form>

              {/* Switch mode */}
              <div className="mt-3 text-center" style={{ marginTop: '0.75rem !important' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setMessage('')
                    setPdpaConsent(false)
                  }}
                  className="text-xs text-slate-400 hover:text-slate-300"
                  style={{ fontSize: '0.75rem !important' }}
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by section at the bottom */}
        <div 
          className="py-2 border-t border-slate-800 text-center bg-slate-950"
          style={{ 
            paddingTop: '0.5rem !important',
            paddingBottom: '0.5rem !important'
          }}
        >
          <p className="text-[10px] text-slate-400 mb-1" style={{ fontSize: '0.625rem !important', marginBottom: '0.25rem !important' }}>
            Powered by
          </p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            className="mx-auto h-5"
            style={{ height: '1.25rem !important' }}
          />
        </div>
      </div>

      {/* PDPA Modal */}
      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
    </>
  )
}