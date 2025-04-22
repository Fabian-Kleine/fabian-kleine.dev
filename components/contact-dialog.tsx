"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { ReactNode, useState } from "react"
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { create } from "zustand";
import IconInput from "./ui/icon-input";

interface ContactDialogStore {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    subject: string;
    setSubject: (subject: string) => void;
    message: string;
    setMessage: (message: string) => void;
    nameError: boolean;
    setNameError: (error: boolean) => void;
    emailError: boolean;
    setEmailError: (error: boolean) => void;
    subjectError: boolean;
    setSubjectError: (error: boolean) => void;
    messageError: boolean;
    setMessageError: (error: boolean) => void;
    formError: string;
    setFormError: (error: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    completed: boolean;
    setCompleted: (completed: boolean) => void;
}

export const useContactDialogStore = create<ContactDialogStore>((set) => ({
    name: "",
    setName: (name) => set({ name }),
    email: "",
    setEmail: (email) => set({ email }),
    subject: "",
    setSubject: (subject) => set({ subject }),
    message: "",
    setMessage: (message) => set({ message }),
    nameError: false,
    setNameError: (error) => set({ nameError: error }),
    emailError: false,
    setEmailError: (error) => set({ emailError: error }),
    subjectError: false,
    setSubjectError: (error) => set({ subjectError: error }),
    messageError: false,
    setMessageError: (error) => set({ messageError: error }),
    formError: "",
    setFormError: (error) => set({ formError: error }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    completed: false,
    setCompleted: (completed) => set({ completed }),
}));

export default function ContactDialog({ children }: { children: ReactNode }) {
    const {
        name,
        setName,
        email,
        setEmail,
        subject,
        setSubject,
        message,
        setMessage,
        nameError,
        setNameError,
        emailError,
        setEmailError,
        subjectError,
        setSubjectError,
        messageError,
        setMessageError,
        formError,
        setFormError,
        isLoading,
        setIsLoading,
        completed,
        setCompleted,
    } = useContactDialogStore();

    const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
    });

    const handleSubmit = async () => {
        if (isLoading) return;

        try {
            contactSchema.parse({ name, email, subject, message });
            setNameError(false);
            setEmailError(false);
            setSubjectError(false);
            setMessageError(false);
            setFormError("");
            setIsLoading(true);

            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsLoading(false);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");

            setCompleted(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setNameError(!!error.errors.find(err => err.path[0] === "name"));
                setEmailError(!!error.errors.find(err => err.path[0] === "email"));
                setSubjectError(!!error.errors.find(err => err.path[0] === "subject"));
                setMessageError(!!error.errors.find(err => err.path[0] === "message"));

                const formErrorMessage = error.errors.map(err => err.message).join(", ");
                setFormError(formErrorMessage);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="tracking-tight text-3xl">Contact Me</DialogTitle>
                    {!completed && !isLoading && (
                        <DialogDescription>
                            If you have any questions or inquiries, feel free to reach out to me by filling in the form below.
                        </DialogDescription>
                    )}
                </DialogHeader>
                {!completed && !isLoading && (
                    <div className="flex flex-col gap-4 w-full">
                        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                        <IconInput icon="User">
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                autoComplete="name"
                                className={cn(nameError && "border-red-500")}
                            />
                        </IconInput>
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <IconInput icon="Mail">
                            <Input
                                id="email"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                autoComplete="email"
                                className={cn(emailError && "border-red-500")}
                            />
                        </IconInput>
                        <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                        <IconInput icon="BookType">
                            <Input
                                id="subject"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={isLoading}
                                className={cn(subjectError && "border-red-500")}
                            />
                        </IconInput>
                        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                        <IconInput textarea icon="MessageSquare">
                            <Textarea
                                id="message"
                                placeholder="Your Message"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                                className={cn(messageError && "border-red-500")}
                            />
                        </IconInput>
                        {formError && (
                            <p className="text-red-500 text-sm mt-2">{formError}</p>
                        )}
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col gap-4 w-full">
                        <LoaderCircle className="animate-spin mx-auto size-14" />
                        <p className="text-lg text-center">Sending your message...</p>
                    </div>
                )}
                {completed && (
                    <p className="text-green-500 text-sm">Thank you for your message! I will get back to you as soon as possible.</p>
                )}
                <DialogFooter>
                    {!completed && !isLoading && (
                        <InteractiveHoverButton disabled={isLoading} onClick={handleSubmit} type="submit">
                            Send Message
                        </InteractiveHoverButton>
                    )}
                    {completed && (
                        <DialogClose asChild>
                            <Button variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
