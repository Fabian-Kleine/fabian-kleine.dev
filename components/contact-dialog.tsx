"use client";

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
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
import { ReactNode } from "react"
import { useTranslations } from "next-intl";
import { z } from "zod";
import { BookType, LoaderCircle, Mail, MessageSquare, Send, User } from "lucide-react";
import { create } from "zustand";
import { Checkbox } from "./ui/checkbox";
import { TypographyLink } from "./blog/typography";

interface ContactDialogStore {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    subject: string;
    setSubject: (subject: string) => void;
    message: string;
    setMessage: (message: string) => void;
    privacyPolicy: boolean;
    setPrivacyPolicy: (privacyPolicy: boolean) => void;
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
    privacyPolicy: false,
    setPrivacyPolicy: (privacyPolicy) => set({ privacyPolicy }),
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
    const t = useTranslations("Contact");
    const {
        name,
        setName,
        email,
        setEmail,
        subject,
        setSubject,
        message,
        setMessage,
        privacyPolicy,
        setPrivacyPolicy,
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
        name: z.string().min(1, t("errors.nameRequired")),
        email: z.string().email(t("errors.invalidEmail")),
        subject: z.string().min(1, t("errors.subjectRequired")),
        message: z.string().min(1, t("errors.messageRequired")),
        privacyPolicy: z.boolean().refine((val) => val, {
            message: t("errors.privacyRequired"),
        }),
    });

    const handleSubmit = async () => {
        if (isLoading) return;

        try {
            contactSchema.parse({ name, email, subject, message, privacyPolicy });
            setNameError(false);
            setEmailError(false);
            setSubjectError(false);
            setMessageError(false);
            setFormError("");
            setIsLoading(true);

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error(t("errors.sendFailed"));
            }

            if (response.status !== 200) {
                throw new Error(t("errors.sendFailed"));
            }

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
                setIsLoading(false);
                return;
            }
            if (error instanceof Error) {
                setFormError(error.message);
                setIsLoading(false);
            } else {
                setFormError(t("errors.unknown"));
                setIsLoading(false);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="tracking-tight text-3xl">{t("title")}</DialogTitle>
                    {!completed && !isLoading && (
                        <DialogDescription>
                            {t("description")}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {!completed && !isLoading && (
                    <div className="flex flex-col gap-4 w-full">
                        <Label htmlFor="name" className="text-sm font-medium">{t("name")}</Label>
                        <InputGroup>
                            <InputGroupInput
                                id="name"
                                placeholder={t("namePlaceholder")}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                autoComplete="name"
                                aria-invalid={nameError}
                            />
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                        </InputGroup>
                        <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
                        <InputGroup>
                            <InputGroupInput
                                id="email"
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                autoComplete="email"
                                aria-invalid={emailError}
                            />
                            <InputGroupAddon>
                                <Mail />
                            </InputGroupAddon>
                        </InputGroup>
                        <Label htmlFor="subject" className="text-sm font-medium">{t("subject")}</Label>
                        <InputGroup>
                            <InputGroupInput
                                id="subject"
                                placeholder={t("subjectPlaceholder")}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={isLoading}
                                aria-invalid={subjectError}
                            />
                            <InputGroupAddon>
                                <BookType />
                            </InputGroupAddon>
                        </InputGroup>
                        <Label htmlFor="message" className="text-sm font-medium">{t("message")}</Label>
                        <InputGroup>
                            <InputGroupTextarea
                                id="message"
                                placeholder={t("messagePlaceholder")}
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                                aria-invalid={messageError}
                            />
                            {/* pinned to the first line instead of centered on the textarea */}
                            <InputGroupAddon className="self-start pt-2.5">
                                <MessageSquare />
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="flex justify-center items-center space-x-2">
                            <Checkbox checked={privacyPolicy} onCheckedChange={setPrivacyPolicy} id="terms" />
                            <Label htmlFor="terms" className="block">
                                {t.rich("acceptPrivacy", { link: (chunks) => <TypographyLink href='/legal/privacy-policy'>{chunks}</TypographyLink> })}
                            </Label>
                        </div>
                        {formError && (
                            <p className="text-red-500 text-sm mt-2">{formError}</p>
                        )}
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col gap-4 w-full">
                        <LoaderCircle className="animate-spin mx-auto size-14" />
                        <p className="text-lg text-center">{t("sending")}</p>
                    </div>
                )}
                {completed && (
                    <p className="text-green-500 text-sm">{t("success")}</p>
                )}
                <DialogFooter>
                    {!completed && !isLoading && (
                        <Button disabled={isLoading} onClick={handleSubmit} type="submit">
                            <Send data-icon="inline-start" />
                            {t("send")}
                        </Button>
                    )}
                    {completed && (
                        <DialogClose asChild>
                            <Button variant="outline">
                                {t("close")}
                            </Button>
                        </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
