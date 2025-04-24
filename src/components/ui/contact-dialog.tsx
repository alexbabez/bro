"use client"

import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You could add email validation here
    if (email) {
      setSubmitted(true)
      // Here you would typically send the email to your backend
      console.log("Submitted email:", email)
      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitted(false)
        setEmail("")
        onOpenChange(false)
      }, 2000)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-black border border-amber-500/20 p-6 shadow-xl">
          <Dialog.Title className="text-xl font-medium text-white mb-4">
            Contact Sales
          </Dialog.Title>
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <p className="text-neutral-300 text-sm">
                  Enter your email and our sales team will get back to you shortly.
                </p>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                      "w-full rounded-md border bg-transparent px-3 py-2 text-sm",
                      "border-amber-500/20 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500",
                      "text-white placeholder:text-neutral-500"
                    )}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="rounded-md px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={cn(
                      "rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-black",
                      "hover:from-amber-600 hover:to-amber-700 transition-colors"
                    )}
                  >
                    Submit
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-4"
              >
                <div className="rounded-full bg-amber-500/20 p-3 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-amber-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Thank you!</h3>
                <p className="text-neutral-400 text-center">
                  We've received your email and will contact you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 text-white hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              aria-label="Close"
            >
              <Cross2Icon className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 