import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAuth } from '../contexts/AuthContext'
import { Folder, Eye, EyeOff } from 'lucide-react'
import kadoshLogo from '../assets/kadoshAI.png'
import { PDPAModal } from './PDPAModel'
import { PasswordResetModal } from './PasswordResetModal'
import BackgroundMusic from './BackgroundMusic'
import themeMusic from '../assets/training-theme.mp3'

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
          email,
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

  // FORCE PILL SHAPE
  const pillStyle = { borderRadius: '9999px' };

  return (
    <>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <BackgroundMusic src={themeMusic} />

        {/* DRASTIC WIDTH REDUCTION: max-w-[340px] */}
        <div className="w-full max-w-[340px] flex flex-col items-center">
          
          {/* ================= HEADER ================= */}
          <div className="text-center mb-10 w-full">
            <div className="flex justify-center mb-6">
              <div 
                className="flex h-24 w-24 items-center justify-center bg-blue-600/20 text-blue-500 shadow-xl shadow-blue-500/10"
                style={{ borderRadius: '30px' }}
              >
                <Folder className="h-12 w-12" />
              </div>
            </div>

            {/* MASSIVE TITLE: text-8xl */}
            <h1 className="text-8xl font-black tracking-tighter text-white mb-2 drop-shadow-2xl leading-none">
              Tick<span className="text-blue-500">Ready</span>
            </h1>

            <p className="text-lg font-medium text-slate-400 tracking-wider">
              Pre Training Action Tracker
            </p>
          </div>

          {/* ================= CARD ================= */}
          <div 
            className="w-full bg-slate-900 border border-slate-800 p-8 shadow-2xl relative overflow-hidden"
            style={{ borderRadius: '40px' }}
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-blue-500/10 blur-[60px] pointer-events-none"></div>

            {/* BIGGER FORM HEADER: text-4xl */}
            <h2 className="text-4xl font-black text-white mb-8 text-center relative z-10 leading-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-300 ml-4">
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={pillStyle}
                  className="bg-slate-950 border-slate-800 text-slate-100 h-14 px-6 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-4 mr-2">
                  <Label className="text-sm font-bold text-slate-300">
                    Password
                  </Label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowPasswordResetModal(true)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={pillStyle}
                    className="bg-slate-950 border-slate-800 text-slate-100 h-14 px-6 pr-12 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Signup Extras */}
              {isSignUp && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-300 ml-4">Security Question</Label>
                    <Input
                      value={securityQuestion}
                      onChange={(e) => setSecurityQuestion(e.target.value)}
                      placeholder="e.g. First pet's name"
                      style={pillStyle}
                      className="bg-slate-950 border-slate-800 text-slate-100 h-14 px-6 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-300 ml-4">Answer</Label>
                    <Input
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      placeholder="Security answer"
                      style={pillStyle}
                      className="bg-slate-950 border-slate-800 text-slate-100 h-14 px-6 font-medium"
                    />
                  </div>

                  <label className="flex items-center gap-3 text-xs text-slate-400 px-4">
                    <input
                      type="checkbox"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950"
                    />
                    <span>
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowPDPAModal(true)}
                        className="text-blue-400 hover:underline font-bold"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>
              )}

              {(error || message) && (
                <div className={`p-4 text-center text-sm font-bold ${
                  error
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-green-500/10 text-green-400 border border-green-500/20'
                }`} style={{ borderRadius: '20px' }}>
                  {error || message}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                style={pillStyle}
                className="w-full h-14 text-xl font-black bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-600/20 transition-all duration-300"
              >
                {loading
                  ? 'Processing...'
                  : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-10 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">
              Powered by
            </p>
            <img src={kadoshLogo} className="h-8 grayscale hover:grayscale-0 transition-all duration-500" alt="Kadosh AI" />
          </div>
        </div>
      </div>

      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
      <PasswordResetModal
        isOpen={showPasswordResetModal}
        onClose={() => setShowPasswordResetModal(false)}
      />
    </>
  )
}