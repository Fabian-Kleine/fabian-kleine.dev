"use client";
import { cn } from "@/lib/utils";
import { PlayIcon, PauseIcon, RotateCcwIcon } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LiveDot } from "@/components/hud/live-dot";
import { MediaFrame } from "@/components/blog/media-frame";
import { useTranslations } from "next-intl";
import { isExternalUrl, setConsent, useExternalMedia } from "@/lib/consent";

interface VideoProps {
    title: string;
    video: string;
    width: number;
    className?: string;
}

/** 75 -> "01:15" */
const timecode = (seconds: number) => {
    const s = Math.floor(seconds);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export default function Video({ title, video, width, className }: VideoProps) {
    const externalMedia = useExternalMedia();

    // third-party hosted videos only load with consent
    if (!externalMedia && isExternalUrl(video)) {
        return <BlockedVideo title={title} video={video} width={width} className={className} />;
    }

    return <VideoPlayer title={title} video={video} width={width} className={className} />;
}

function BlockedVideo({ title, video, width, className }: VideoProps) {
    const t = useTranslations("Consent");
    const tm = useTranslations("Media");

    return (
        <MediaFrame caption={title} width={width} className={className}>
            <span className="flex aspect-video flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="hud-label">{tm("external")}</span>
                <span className="max-w-md text-sm text-muted-foreground">{t("videoBlocked", { host: new URL(video).hostname })}</span>
                <Button variant="terminal" size="sm" onClick={() => setConsent("granted")}>{t("allow")}</Button>
            </span>
        </MediaFrame>
    );
}

function VideoPlayer({ title, video, width, className }: VideoProps) {
    const t = useTranslations("Media");
    const [isVideoError, setIsVideoError] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const rafRef = useRef<number | null>(null);

    const tick = useCallback(() => {
        const el = videoRef.current;
        if (el && el.duration) {
            setProgress((el.currentTime / el.duration) * 100);
            setCurrentTime(el.currentTime);
        }
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    const startRaf = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
    }, [tick]);

    const stopRaf = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    useEffect(() => () => stopRaf(), [stopRaf]);

    const handlePlay = () => {
        videoRef.current?.play().catch((e) => console.error("Error playing video:", e));
        setIsVideoPlaying(true);
        setIsVideoEnded(false);
        startRaf();
    };

    const handlePause = () => {
        videoRef.current?.pause();
        setIsVideoPlaying(false);
        stopRaf();
    };

    const handleRestart = () => {
        const el = videoRef.current;
        if (el) {
            el.currentTime = 0;
            el.play().catch((e) => console.error("Error playing video:", e));
        }
        setProgress(0);
        setCurrentTime(0);
        setIsVideoPlaying(true);
        setIsVideoEnded(false);
        startRaf();
    };

    const handleEnded = () => {
        setIsVideoPlaying(false);
        setIsVideoEnded(true);
        setProgress(100);
        stopRaf();
    };

    return (
        <MediaFrame caption={title} meta={duration ? timecode(duration) : undefined} width={width} className={className}>
            <span className="relative block aspect-video bg-background">
                <video
                    ref={videoRef}
                    className="block size-full cursor-pointer object-cover"
                    src={video}
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onError={() => setIsVideoError(true)}
                    onEnded={handleEnded}
                    onClick={handlePause}
                />

                {/* standby: dimmed feed with a centered play control */}
                <span
                    onClick={handlePlay}
                    className={cn("absolute inset-0 cursor-pointer flex-col items-center justify-center gap-4 bg-background/60 bg-[repeating-linear-gradient(to_bottom,color-mix(in_oklab,var(--highlight)_5%,transparent)_0_1px,transparent_1px_3px)]", isVideoPlaying ? "hidden" : "flex")}
                >
                    <span className="absolute top-3 left-3 hud-label">{t("standby")}</span>
                    <Button variant="signal" size="hud" className="bg-background/70 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); handlePlay(); }}>
                        <PlayIcon className="size-4 fill-current" />
                        {t(isVideoEnded ? "replay" : "play")}
                    </Button>
                </span>

                <span className={cn("absolute inset-x-0 bottom-0 items-center gap-1 border-t bg-background/80 px-2 py-1.5 backdrop-blur-sm", isVideoPlaying ? "flex" : "hidden")}>
                    <Button onClick={handlePause} variant="ghost" size="icon-sm" className="text-heading hover:text-primary">
                        <PauseIcon className="fill-current" />
                        <span className="sr-only">{t("pause")}</span>
                    </Button>
                    <Button onClick={handleRestart} variant="ghost" size="icon-sm" className="text-heading hover:text-primary">
                        <RotateCcwIcon />
                        <span className="sr-only">{t("restart")}</span>
                    </Button>
                    <LiveDot className="ml-1 text-primary" />
                    <span className="hud-segments relative mx-2 block h-1.5 flex-1 overflow-hidden bg-muted">
                        <span className="block h-full bg-primary" style={{ width: `${progress}%` }} />
                    </span>
                    <span className="hud-meta pr-1 text-[0.62rem] tabular-nums">
                        {timecode(currentTime)} / {timecode(duration)}
                    </span>
                </span>

                {isVideoError && (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/85">
                        <span className="hud-label text-destructive">{t("signalLost")}</span>
                        <span className="hud-meta">{t("unavailable")}</span>
                    </span>
                )}
            </span>
        </MediaFrame>
    );
}
