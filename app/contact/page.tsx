"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LoaderCircle } from "lucide-react";


export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [formError, setFormError] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            contactSchema.parse({ name, email, subject, message });
            setNameError(false);
            setEmailError(false);
            setSubjectError(false);
            setMessageError(false);
            setFormError("");
            setIsLoading(true);
            setOpenAlert(true);

            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsLoading(false);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");


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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 w-full max-w-xl">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                autoComplete="name"
                className={cn(nameError && "border-red-500")}
            />
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
                id="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
                className={cn(emailError && "border-red-500")}
            />
            <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
            <Input
                id="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isLoading}
                className={cn(subjectError && "border-red-500")}
            />
            <Label htmlFor="message" className="text-sm font-medium">Message</Label>
            <Textarea
                id="message"
                placeholder="Your Message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                className={cn(messageError && "border-red-500")}
            />
            {formError && (
                <p className="text-red-500 text-sm mt-2">{formError}</p>
            )}
            <div className="flex justify-end mt-4">
                <InteractiveHoverButton disabled={isLoading} type="submit">
                    Send Message
                </InteractiveHoverButton>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{isLoading ? "Sending Message..." : "Message Sent"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {!isLoading && "Thank you for your message! I will get back to you as soon as possible."}
                            <LoaderCircle className={cn("animate-spin mx-auto size-14", isLoading ? "block" : "hidden")} />
                        </AlertDialogDescription>
                        {!isLoading && (
                            <AlertDialogFooter>
                                <AlertDialogAction>OK</AlertDialogAction>
                            </AlertDialogFooter>
                        )}
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    );
}