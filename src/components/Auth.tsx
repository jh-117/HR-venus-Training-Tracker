import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder, Eye, EyeOff } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'
import { PDPAModal } from './PDPAModel'
import { PasswordResetModal } from './PasswordResetModal'
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/training-theme.mp3';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [pdpaConsent, setPdpaConsent] = useState(false)
  const [showPDPAModal, setShowPDPAModal] = useState(false)
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [securityAnswer, setSecurityAnswer] = useState('')

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

      if (!securityQuestion.trim() || !securityAnswer.trim()) {
        setError('Security question and answer are required')
        setLoading(false)
        return
      }

      const { error, data } = await signUp(email, password)
      if (error) {
        setError(error.message)
      } else {
        const { supabase } = await import('../lib/supabase')
        const answerHash = btoa(securityAnswer.toLowerCase().trim())

        await supabase.from('profiles').insert({
          id: data.user?.id,
          email: email,
          security_question: securityQuestion,
          security_answer_hash: answerHash
        })

        setMessage('Account created successfully! You can now sign in.')
        setTimeout(() => {
          setIsSignUp(false)
          setSecurityQuestion('')
          setSecurityAnswer('')
          setPdpaConsent(false)
        }, 2000)
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <BackgroundMusic src={themeMusic} />
        
        {/* Force a standard 400px width and ignore global container settings */}
        <div className="w-full" style={{ maxWidth: '400px' }}>
          
          {/* Header Section - Larger text restored */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500 shadow-lg shadow-blue-500/10">
                <Folder className="h-8 w-8" />
              </div>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
              Tick<span className="text-blue-500">Ready</span>
            </h1>

            <p className="text-lg font-bold text-slate-400 tracking-wide">
              Pre Training Action Tracker
            </p>
          </div>

          {/* Form Card - Generous padding and spacing restored */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-100 mb-8">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-slate-950 border-slate-800 text-slate-100 h-12 px-4 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-300">Password</Label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowPasswordResetModal(true)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="bg-slate-950 border-slate-800 text-slate-100 h-12 px-4 pr-12 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-300">Security Question</Label>
                    <Input
                      value={securityQuestion}
                      onChange={(e) => setSecurityQuestion(e.target.value)}
                      placeholder="e.g. Your first car?"
                      required
                      className="bg-slate-950 border-slate-800 text-slate-100 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-300">Security Answer</Label>
                    <Input
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      placeholder="Your answer"
                      required
                      className="bg-slate-950 border-slate-800 text-slate-100 h-12"
                    />
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      id="pdpaConsent"
                      type="checkbox"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/20"
                    />
                    <label htmlFor="pdpaConsent" className="text-xs text-slate-400 leading-relaxed">
                      I agree to the <button type="button" onClick={() => setShowPDPAModal(true)} className="text-blue-400 hover:underline">Privacy Policy</button> and consent to data collection.
                    </label>
                  </div>
                </div>
              )}

              {(error || message) && (
                <div className={`p-4 rounded-xl border text-sm font-medium ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                  {error || message}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 text-lg rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* Powered by Section */}
          <div className="mt-10 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">Powered by</p>
            <img src={kadoshLogo} alt="Kadosh AI" className="h-7 brightness-110" />
          </div>
        </div>
      </div>

      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
      <PasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} />
    </>
  )
}