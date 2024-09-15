'use client'
import React, { useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import useActiveSectionView from '@/hooks/useActiveSectionView'
import sendEmail from '@/actions/sendEmail'
import { useFormStatus } from 'react-dom'
import { AnimatedShinyTextWrapper } from '../AnimatedShinyTextWrapper'
import { CardDescription, CardTitle } from '../ui/card'
import { AlertCircle, CheckCircle2, CheckIcon, ChevronRightIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ConfettiButton } from '../magicui/confetti'

const ContactForm = () => {
    const { ref } = useActiveSectionView("Contact");
    const { pending } = useFormStatus();
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')




    return (
        <section
            className='flex flex-col h-full w-3/4 my-24 justify-center items-center'
            id='contact'
            ref={ref}
        >
            <AnimatedShinyTextWrapper> Contact Us </AnimatedShinyTextWrapper>
            <h1 className=" my-12 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-slate-900 to-gray-500/50 bg-clip-text text-center text-5xl font-bold leading-none text-transparent dark:from-white dark:to-white/80">
                Contact Us
            </h1>

            {/* catchy phrase */}
            <p className='text-gray-700 text-center dark:text-gray-300'>
                Send us a message and we'll get back to you soon.
            </p>
            {
                isSubmitted ? (
                    <div className={"flex flex-col justify-center items-center gap-2 mt-10 w-full md:w-[30rem] xl:w-[40rem] group"}>
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                        <h1 className='text-2xl font-semibold text-slate-700'>Thank you for contacting us!</h1>
                        <p className='text-slate-600 text-sm font-light'>We'll get back to you as soon as possible.</p>
                    </div>
                ) : (

                    <form
                        className='flex flex-col justify-center items-center gap-3 mt-10 w-full md:w-[30rem] xl:w-[40rem] group'
                        action={async (formData: FormData) => {
                            const result = await sendEmail(formData);
                            if (result.error) {
                                setError(result.error);
                                return;
                            }
                            setIsSubmitted(true);
                        }}
                    >

                        <div className="space-y-2 w-full">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name='name' placeholder="Your name" required />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name='email' type="email" placeholder="Your email" required />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name='subject' placeholder="What is this regarding?" required />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Your message" required />
                        </div>
                        {error && (
                            <div className="flex items-center w-full space-x-2 text-red-500">
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </div>
                        )}
                        <ConfettiButton asChild>
                            <Button type="submit" className="w-full" disabled={pending}>
                                {pending ? (
                                    <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-white'></div>
                                ) : 'Send Message'
                                }
                            </Button>
                        </ConfettiButton>

                    </form>
                )
            }

        </section>
    )
}

export default ContactForm

