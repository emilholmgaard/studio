'use client'

import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import { Switch } from '@headlessui/react'

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION = 300000; // 5 minutes in milliseconds

  // Rate limiting check
  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
        setAttempts(0);
      }, BLOCK_DURATION);
    }
  }, [attempts]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset error message
    setErrorMessage("");

    // Validate input
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (isBlocked) {
      setErrorMessage(`Too many attempts. Please try again in ${Math.ceil(BLOCK_DURATION/60000)} minutes`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Her ville du du normalt have din login logik
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulerer netværksanmodning
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage("An error occurred during sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative isolate w-full">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#06402B] to-[#085438] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[300px]">
          <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=06402B&shade=500" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[300px]">
          {errorMessage && (
            <div className="mb-4 p-2 text-sm text-red-400 bg-red-950/50 rounded-md">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6" method="POST" autoComplete="off" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
              <div className="mt-2">
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email" 
                  required 
                  spellCheck="false"
                  autoCorrect="off"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#06402B] sm:text-sm/6" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-white hover:text-white/80">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" 
                  required
                  minLength={8}
                  maxLength={128}
                  autoCapitalize="off"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#06402B] sm:text-sm/6" 
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={rememberMe}
                  onChange={setRememberMe}
                  className={`${
                    rememberMe ? 'bg-[#06402B]' : 'bg-white/5'
                  } group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:ring-offset-2 focus:ring-offset-gray-900`}
                >
                  <span className="sr-only">Remember me</span>
                  <span
                    className={`${
                      rememberMe ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        rememberMe ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        rememberMe ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-[#06402B]" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
                <span className="text-sm text-white">Remember me</span>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isSubmitting || isBlocked}
                className="flex w-full justify-center rounded-md bg-[#06402B] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#085438] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06402B] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in...' : isBlocked ? `Try again in ${Math.ceil(BLOCK_DURATION/60000)}m` : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account yet?{' '}
            <a href="#" className="font-semibold text-[#06402B] hover:text-[#085438]">Join today</a>
          </p>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06402B] to-[#085438] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
