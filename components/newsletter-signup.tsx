"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup - integrate with your email service
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-16 lg:py-24 red-pattern-bg relative">
      <div className="absolute inset-0 diamond-pattern opacity-10"></div>
      <div className="red-accent-border absolute top-0 left-0 right-0"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="h-12 w-12 mx-auto mb-6 text-red-100" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join the Quinkento Legacy Community</h2>
          <p className="text-lg mb-8 text-red-100">
            Get exclusive historical insights, new piece releases, and educational content about Black history and
            African heritage
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-slate-800 border-red-300"
              />
              <Button type="submit" className="btn-red">
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6 text-red-200" />
              <span className="text-lg">Thank you for subscribing!</span>
            </div>
          )}

          <p className="text-sm mt-4 text-red-200">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
