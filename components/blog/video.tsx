"use client";
import { cn } from "@/lib/utils";
import { PlayIcon, PauseIcon, RotateCcwIcon } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VideoProps {
    title: string;
    video: string;
    width: number;
    className?: string;
}

export default function Video({ title, video, width, className }: VideoProps) {
    const [isVideoError, setIsVideoError] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const rafRef = useRef<number | null>(null);

    const tick = useCallback(() => {
        const el = videoRef.current;
        if (el && el.duration) {
            setProgress((el.currentTime / el.duration) * 100);
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
        setIsVideoPlaying(true);
        startRaf();
    };

    const handleEnded = () => {
        setIsVideoPlaying(false);
        setProgress(100);
        stopRaf();
    };

    return (
        <div title={title} style={{ width: `${width}px` }} className={cn("rounded-xl aspect-video object-cover object-center overflow-hidden relative", className)}>
            <video
                ref={videoRef}
                className="w-full cursor-pointer"
                src={video}
                playsInline
                preload="metadata"
                onError={() => setIsVideoError(true)}
                onEnded={handleEnded}
                onClick={handlePause}
            />
            <div onClick={handlePlay} className={cn("absolute group bg-background/50 cursor-pointer inset-0 items-center justify-center transition-all duration-200 ease-out hover:bg-background/35", isVideoPlaying ? "hidden" : "flex")}>
                <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
                    <div className="flex items-center justify-center rounded-full size-20 bg-linear-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
                        <PlayIcon className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105" />
                    </div>
                </div>
                <span className="sr-only">Play</span>
            </div>
            <div className={cn("absolute bottom-0 py-2 px-4 bg-background/35 justify-center items-center gap-2 w-full", isVideoPlaying ? "flex" : "hidden")}>
                <Button onClick={handlePause} variant="ghost" size="icon" className="rounded-full">
                    <PauseIcon className="size-6 fill-white text-white" />
                    <span className="sr-only">Pause</span>
                </Button>
                <Button onClick={handleRestart} variant="ghost" size="icon" className="rounded-full">
                    <RotateCcwIcon className="size-5 text-white" />
                    <span className="sr-only">Restart</span>
                </Button>
                <div className="relative h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <span className="sr-only">{title}</span>
            {isVideoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <span className="text-white">Video not available</span>
                </div>
            )}
        </div>
    );
}
