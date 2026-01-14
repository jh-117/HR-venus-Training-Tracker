import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'
import { PDPAModal } from './PDPAModel'
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/training-theme.mp3';

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
      <div className="min-h-screen bg-slate-950 flex">
        <BackgroundMusic src={themeMusic} />

        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-12 flex-col justify-between relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-700 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500">
                <Folder className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-100">
                HR<span className="text-slate-300">Venus</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl font-bold text-slate-100 leading-tight">
                Pre Training Action Tracker
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Streamline your training preparation with comprehensive tracking and management tools designed for HR professionals.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-slate-300">Track activities across all training phases</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-slate-300">Collaborate with your team in real-time</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-slate-300">Monitor progress with pulse checks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Powered by footer */}
          <div className="relative z-10">
            <p className="text-sm text-slate-500 mb-3">Powered by</p>
            <img
              src={kadoshLogo}
              alt="Kadosh AI"
              className="h-8"
            />
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500">
                  <Folder className="h-7 w-7" />
                </div>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-100 mb-2">
                HR<span className="text-slate-300">Venus</span>
              </h1>
              <p className="text-lg font-semibold text-slate-400">
                Pre Training Action Tracker
              </p>
            </div>

            {/* Auth Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-400">
                  {isSignUp
                    ? 'Sign up to start tracking your training activities'
                    : 'Sign in to continue to your dashboard'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="bg-slate-900 border-slate-700 text-slate-100 h-11"
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
                    className="bg-slate-900 border-slate-700 text-slate-100 h-11"
                  />
                </div>

                {/* PDPA / Privacy consent */}
                {isSignUp && (
                  <div className="flex items-start gap-3 pt-2">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 text-base"
                >
                  {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
              </form>

              {/* Switch mode */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setMessage('')
                    setPdpaConsent(false)
                  }}
                  className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>

              {/* Mobile Powered by */}
              <div className="lg:hidden pt-8 text-center border-t border-slate-800">
                <p className="text-sm text-slate-500 mb-3">Powered by</p>
                <img
                  src={kadoshLogo}
                  alt="Kadosh AI"
                  className="mx-auto h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDPA Modal */}
      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
    </>
  )
}