'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, RotateCcw } from 'lucide-react'
import { signIn } from 'next-auth/react'


// Form validation schema
const verifySchema = z.object({
  code: z
    .string()
    .min(6, 'Verification code must be 6 digits')
    .max(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Verification code must contain only numbers'),
})

export default function VerifyEmail() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [codeValues, setCodeValues] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  // console.log('Email from search params:', email)
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    },
  })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])


  const handleInputChange = (index, value) => {
    if (value.length > 1) return

    const newValues = [...codeValues]
    newValues[index] = value
    setCodeValues(newValues)

    form.setValue('code', newValues.join(''))

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }


  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codeValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)

    if (!/^\d+$/.test(pastedData)) return

    const newValues = pastedData.split('').concat(Array(6 - pastedData.length).fill(''))
    setCodeValues(newValues.slice(0, 6))
    form.setValue('code', newValues.slice(0, 6).join(''))
  }

  const onSubmit = async (values) => {
    setIsLoading(true)
    setError('')

    try {
      // First verify the email with your API
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: values.code,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed')
      }

      // Success - email is now verified
      toast.success('Email verified successfully!', {
        description: 'Signing you in...',
        style: {
          background: '#bcf5da',
          color: '#149875',
          border: '1px solid #94f1c1'
        }
      })

      // Now automatically sign in the user using NextAuth
      const signInResult = await signIn('credentials', {
        email: email,
        skipPasswordCheck: 'true', // This tells NextAuth to skip password verification
        redirect: false, // Don't redirect automatically
      })

      if (signInResult?.error) {
        throw new Error('Failed to sign in after verification')
      }

      toast.success('Welcome to StudyMate!', {
        description: 'Redirecting to dashboard...',
        style: {
          background: '#bcf5da',
          color: '#149875',
          border: '1px solid #94f1c1'
        }
      })

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh() // Refresh to update session state
      }, 1500)

    } catch (error) {
      setError(error.message)
      toast.error('Verification failed', {
        description: error.message,
        style: {
          background: '#fbcdcd',
          color: '#c10d0d',
          border: '1px solid #f06969'
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success('Verification code sent!', {
          description: 'Please check your email for the new code.',
        })
        setCountdown(60) // 60 seconds countdown
      } else {
        throw new Error('Failed to resend code')
      }
    } catch (error) {
      toast.error('Failed to resend code', {
        description: 'Please try again later.',
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl text-blue-600 font-bold tracking-tight">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We've sent a 6-digit verification code to
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-center block">
                      Enter Verification Code
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center space-x-2">
                        {codeValues.map((value, index) => (
                          <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-lg font-semibold"
                            disabled={isLoading}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isLoading || codeValues.join('').length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>

            <Button
              variant="outline"
              onClick={handleResendCode}
              disabled={countdown > 0}
              className="text-sm"
            >
              {countdown > 0 ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Resend in {countdown}s
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Resend Code
                </>
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Wrong email address?{' '}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up again
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}