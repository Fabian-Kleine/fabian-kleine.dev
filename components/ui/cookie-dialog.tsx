"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "./alert-dialog";

import { config } from "@/config";
import useCookie from "@/hooks/useCookie";
import { Switch } from "./switch";
import { TypographyLink } from "../blog/typography";
import { Fingerprint } from "lucide-react";

export default function CookieDialog() {
    const [cookieConsent, setCookieConsent] = useCookie("cookie-consent", "false", 365);
    const [isOpen, setIsOpen] = useState(false);
    const [customising, setCustomising] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

    useEffect(() => {
        if (cookieConsent === "false") {
            setIsOpen(true);
        }
        if (config.cookies.cookieConsent) {
            setCookieConsent("true", { expires: 2147483647 });
            setIsOpen(false);
        }
    }, [cookieConsent]);

    const handleAccept = () => {
        setCookieConsent("true", { expires: 2147483647 });
        setIsOpen(false);
    };

    const handleReject = () => {
        setCookieConsent("rejected", { expires: 2147483647 });
        setIsOpen(false);
    };

    const handleCustomise = () => {
        setCustomising(true);
    }

    const handleSavePreferences = () => {
        if (analyticsEnabled) {
            setCookieConsent("true", { expires: 2147483647 });
            setIsOpen(false);
            return;
        }
        if (!analyticsEnabled) {
            setCookieConsent("false", { expires: 2147483647 });
            setIsOpen(false);
            return;
        }

        const acceptedCookies = [];
        if (analyticsEnabled) acceptedCookies.push("analytics");

        setCookieConsent(JSON.stringify(acceptedCookies), { expires: 2147483647 });
        setIsOpen(false);
    }

    return (
        <>
            {!isOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Button onClick={() => setIsOpen(true)} size={"lg"} className="rounded-full w-10">
                        <Fingerprint />
                        <span className="sr-only">Cookie Preferences</span>
                    </Button>
                </div>
            )}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="w-full max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">Cookie Consent</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {customising ?
                                <>
                                    You can customise your cookie preferences here.
                                    Find out more about Cookies in the <TypographyLink href='/legal/cookie-policy'>Cookie Policy</TypographyLink>
                                </> :
                                <>
                                    This website uses cookies to enhance the user experience. By clicking &quot;Accept&quot;, you consent to the use of cookies.
                                    Find out more about Cookies in the <TypographyLink href='/legal/cookie-policy'>Cookie Policy</TypographyLink>
                                </>
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {customising &&
                        <div>
                            <div className="flex items-center justify-between py-2">
                                <span>Essential Cookies</span>
                                <Switch id="essential-cookies" className="scale-125" defaultChecked disabled />
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Analytics Cookies</span>
                                <Switch checked={analyticsEnabled} onCheckedChange={setAnalyticsEnabled} id="analytics-cookies" className="scale-125" defaultChecked />
                            </div>
                        </div>
                    }
                    <AlertDialogFooter className="flex flex-wrap justify-center gap-4">
                        {!customising ? (
                            <>
                                <Button variant="ghost" onClick={handleCustomise} className="w-full lg:flex-1">Customise</Button>
                                <Button variant="outline" onClick={handleReject} className="w-full lg:flex-1">Reject</Button>
                                <Button onClick={handleAccept} className="w-full">Accept</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" className="w-full lg:flex-1" onClick={() => setCustomising(false)}>Cancel</Button>
                                <Button className="w-full lg:flex-1" onClick={handleSavePreferences}>Save Preferences</Button>
                            </>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}