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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
        <BackgroundMusic src={themeMusic} />
        
        {/* Container with forced width to ensure layout stability */}
        <div className="w-full flex flex-col items-center max-w-[440px]">
          
          {/* HEADER SECTION - Maximized Branding */}
          <div className="text-center mb-16 w-full">
            <div className="flex justify-center mb-6">
              <div className="p-5 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-500 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
                <Folder className="h-16 w-16" strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="text-7xl font-black tracking-tighter text-white mb-4">
              Tick<span className="text-blue-600">Ready</span>
            </h1>

            <p className="text-lg font-semibold text-slate-400 tracking-[0.15em] opacity-80">
              PRE TRAINING ACTION TRACKER
            </p>
          </div>

          {/* FORM CARD - Restored Spacing and Professional Hierarchy */}
          <div className="w-full bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-12 shadow-2xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-10">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-medium text-slate-300 ml-1">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="bg-slate-950 border-slate-800 text-slate-100 h-14 rounded-2xl text-lg px-5 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Password */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" className="text-base font-medium text-slate-300">Password</Label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowPasswordResetModal(true)}
                      className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors"
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
                    className="bg-slate-950 border-slate-800 text-slate-100 h-14 pr-14 rounded-2xl text-lg px-5 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {/* Security - Sign Up Only */}
              {isSignUp && (
                <div className="space-y-8 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-slate-300 ml-1">Security Question</Label>
                    <Input
                      value={securityQuestion}
                      onChange={(e) => setSecurityQuestion(e.target.value)}
                      placeholder="e.g. Your first car?"
                      required
                      className="bg-slate-950 border-slate-800 text-slate-100 h-14 rounded-2xl text-lg px-5"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-slate-300 ml-1">Security Answer</Label>
                    <Input
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      placeholder="Your answer"
                      required
                      className="bg-slate-950 border-slate-800 text-slate-100 h-14 rounded-2xl text-lg px-5"
                    />
                  </div>
                  <div className="flex items-start gap-4 px-1 pt-2">
                    <input
                      id="pdpaConsent"
                      type="checkbox"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-1.5 w-5 h-5 rounded-lg border-slate-700 bg-slate-950 text-blue-600 focus:ring-offset-slate-900"
                    />
                    <label htmlFor="pdpaConsent" className="text-sm text-slate-400 leading-relaxed">
                      I agree to the <button type="button" onClick={() => setShowPDPAModal(true)} className="text-blue-500 font-bold hover:underline">Privacy Policy</button>
                    </label>
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {(error || message) && (
                <div className={`p-5 rounded-2xl border text-base font-semibold ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                  {error || message}
                </div>
              )}

              {/* Action Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black h-16 text-2xl rounded-2xl shadow-2xl shadow-blue-600/30 transition-all active:scale-[0.97] mt-6"
              >
                {loading ? 'Processing...' : isSignUp ? 'SIGN UP' : 'SIGN IN'}
              </Button>
            </form>

            {/* Toggle Account State */}
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-base font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                {isSignUp ? 'Back to Sign In' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-16 flex flex-col items-center">
            <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-700 mb-5">Powered by</p>
            <img 
              src={kadoshLogo} 
              alt="Kadosh AI" 
              className="h-8 opacity-40 hover:opacity-100 transition-all duration-700 hover:scale-105" 
            />
          </div>
        </div>
      </div>

      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
      <PasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} />
    </>
  )
}