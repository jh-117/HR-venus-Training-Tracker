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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <BackgroundMusic src={themeMusic} />
        
        <div className="w-full flex flex-col items-center" style={{ maxWidth: '420px' }}>
          
          {/* Branding Header - Significantly Enlarged */}
          <div className="text-center mb-12 w-full">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 shadow-2xl shadow-blue-500/10">
                <Folder className="h-12 w-12" strokeWidth={2.5} />
              </div>
            </div>

            <h1 className="text-6xl font-black tracking-tighter text-white mb-3 flex justify-center items-center gap-1">
              Tick<span className="text-blue-500">Ready</span>
            </h1>

            <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">
              Pre Training Action Tracker
            </p>
          </div>

          {/* Login Card */}
          <div className="w-full bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-100 mb-8">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-400 ml-1">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="bg-slate-950/50 border-slate-800 text-slate-100 h-12 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-400">Password</Label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowPasswordResetModal(true)}
                      className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      Forgot Password?
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
                    className="bg-slate-950/50 border-slate-800 text-slate-100 h-12 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all"
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

              {/* Security - Sign Up Only */}
              {isSignUp && (
                <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-400 ml-1">Security Question</Label>
                    <Input
                      value={securityQuestion}
                      onChange={(e) => setSecurityQuestion(e.target.value)}
                      placeholder="e.g. Your first car?"
                      required
                      className="bg-slate-950/50 border-slate-800 text-slate-100 h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-400 ml-1">Answer</Label>
                    <Input
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      placeholder="Your secret answer"
                      required
                      className="bg-slate-950/50 border-slate-800 text-slate-100 h-12 rounded-xl"
                    />
                  </div>
                  <div className="flex items-start gap-3 px-1">
                    <input
                      id="pdpaConsent"
                      type="checkbox"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-offset-slate-900"
                    />
                    <label htmlFor="pdpaConsent" className="text-xs text-slate-400 leading-relaxed">
                      I agree to the <button type="button" onClick={() => setShowPDPAModal(true)} className="text-blue-500 font-bold hover:underline">Privacy Policy</button>
                    </label>
                  </div>
                </div>
              )}

              {/* Alerts */}
              {(error || message) && (
                <div className={`p-4 rounded-xl border text-sm font-bold ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                  {error || message}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black h-14 text-xl rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] mt-4"
              >
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>

            {/* Toggle Sign-in/up */}
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
              >
                {isSignUp ? 'Already have an account? Sign In' : "No account? Create one"}
              </button>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="mt-12 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4">Powered by</p>
            <img 
              src={kadoshLogo} 
              alt="Kadosh AI" 
              className="h-7 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500" 
            />
          </div>
        </div>
      </div>

      <PDPAModal isOpen={showPDPAModal} onClose={() => setShowPDPAModal(false)} />
      <PasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} />
    </>
  )
}