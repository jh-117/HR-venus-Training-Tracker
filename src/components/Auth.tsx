import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'
import { PDPAModal } from './PDPAModel'
import BackgroundMusic from './BackgroundMusic'
import themeMusic from '../assets/training-theme.mp3'

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

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setMessage('')
    setPdpaConsent(false)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
        <BackgroundMusic src={themeMusic} />

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-blob-float" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-slate-700/30 rounded-full blur-3xl animate-blob-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="flex-1 flex items-center justify-center p-4 relative z-10">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 animate-float">
                  <Folder className="h-8 w-8 text-white" />
                </div>
              </div>

              <h1
                className="font-black tracking-tight text-slate-100 mb-2 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent"
                style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
              >
                HR<span className="text-slate-300">Venus</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-400">
                Pre Training Action Tracker
              </p>
            </div>

            {/* Auth Container */}
            <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
              {/* Desktop Split Panel Layout */}
              <div className="hidden md:grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900 to-slate-800 relative">
                {/* Sign In Panel */}
                <div className={`p-8 lg:p-12 transition-all duration-500 ${isSignUp ? 'opacity-50' : 'opacity-100'}`}>
                  <div className="animate-slide-in-left">
                    <h2 className="text-3xl font-bold text-slate-100 mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-slate-400 mb-8">
                      Sign in to continue your journey
                    </p>

                    {!isSignUp && (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email" className="text-slate-200 text-sm font-medium">
                            Email Address
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                              id="signin-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                              className="pl-11 bg-slate-950/50 border-slate-700 text-slate-100 h-12 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className="text-slate-200 text-sm font-medium">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                              id="signin-password"
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              required
                              minLength={6}
                              className="pl-11 pr-11 bg-slate-950/50 border-slate-700 text-slate-100 h-12 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        {error && (
                          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm animate-fade-in-up">
                            {error}
                          </div>
                        )}

                        {message && (
                          <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400 text-sm animate-fade-in-up">
                            {message}
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02]"
                        >
                          {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Sign Up Panel */}
                <div className={`p-8 lg:p-12 transition-all duration-500 ${!isSignUp ? 'opacity-50' : 'opacity-100'}`}>
                  <div className="animate-slide-in-right">
                    <h2 className="text-3xl font-bold text-slate-100 mb-2">
                      Create Account
                    </h2>
                    <p className="text-slate-400 mb-8">
                      Start your training journey today
                    </p>

                    {isSignUp && (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-slate-200 text-sm font-medium">
                            Email Address
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                              id="signup-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                              className="pl-11 bg-slate-950/50 border-slate-700 text-slate-100 h-12 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-slate-200 text-sm font-medium">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                              id="signup-password"
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              required
                              minLength={6}
                              className="pl-11 pr-11 bg-slate-950/50 border-slate-700 text-slate-100 h-12 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            id="pdpaConsent"
                            type="checkbox"
                            checked={pdpaConsent}
                            onChange={(e) => setPdpaConsent(e.target.checked)}
                            className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-600 focus:ring-2 cursor-pointer transition-all"
                          />
                          <label htmlFor="pdpaConsent" className="text-sm text-slate-300 leading-relaxed">
                            I agree to the{' '}
                            <button
                              type="button"
                              onClick={() => setShowPDPAModal(true)}
                              className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors font-medium"
                            >
                              Privacy Policy
                            </button>{' '}
                            and consent to the collection and use of my personal data.
                          </label>
                        </div>

                        {error && (
                          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm animate-fade-in-up">
                            {error}
                          </div>
                        )}

                        {message && (
                          <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400 text-sm animate-fade-in-up">
                            {message}
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02]"
                        >
                          {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Sliding Overlay Panel */}
                <div
                  className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
                    isSignUp ? 'left-0' : 'left-1/2'
                  }`}
                >
                  <div className="glass-effect h-full flex items-center justify-center p-12 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-800/20" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-slate-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="relative z-10 text-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                      </h3>
                      <p className="text-slate-200 mb-8 text-sm lg:text-base">
                        {isSignUp
                          ? 'Sign in to access your training dashboard'
                          : 'Create an account to start tracking your training'}
                      </p>
                      <Button
                        onClick={switchMode}
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 rounded-xl font-semibold transition-all hover:scale-105 bg-transparent"
                      >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-slate-100 mb-2 animate-fade-in-up">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-slate-400 mb-8 animate-fade-in-up">
                    {isSignUp ? 'Start your training journey today' : 'Sign in to continue your journey'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-email" className="text-slate-200 text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="mobile-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="pl-11 bg-slate-950/50 border-slate-700 text-slate-100 h-12 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile-password" className="text-slate-200 text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="mobile-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={6}
                          className="pl-11 pr-11 bg-slate-950/50 border-slate-700 text-slate-100 h-12 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {isSignUp && (
                      <div className="flex items-start gap-3">
                        <input
                          id="mobile-pdpaConsent"
                          type="checkbox"
                          checked={pdpaConsent}
                          onChange={(e) => setPdpaConsent(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-600 focus:ring-2 cursor-pointer transition-all"
                        />
                        <label htmlFor="mobile-pdpaConsent" className="text-sm text-slate-300 leading-relaxed">
                          I agree to the{' '}
                          <button
                            type="button"
                            onClick={() => setShowPDPAModal(true)}
                            className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors font-medium"
                          >
                            Privacy Policy
                          </button>{' '}
                          and consent to the collection and use of my personal data.
                        </label>
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm animate-fade-in-up">
                        {error}
                      </div>
                    )}

                    {message && (
                      <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400 text-sm animate-fade-in-up">
                        {message}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02]"
                    >
                      {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
                    </Button>
                  </form>

                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={switchMode}
                      className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by section */}
        <div className="py-6 border-t border-slate-800 text-center bg-slate-950/50 backdrop-blur relative z-10">
          <p className="text-sm text-slate-400 mb-3">Powered by</p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            className="mx-auto h-8 opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
    </>
  )
}
