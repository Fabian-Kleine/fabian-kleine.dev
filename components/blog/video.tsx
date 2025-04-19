"use client";
import { cn } from "@/lib/utils";
import { PlayIcon, PauseIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleStartVideo = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.play().catch((error) => {
                console.error("Error playing video:", error);
            });
        }
        setIsVideoPlaying(true);
    }


    const handlePauseVideo = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
        setIsVideoPlaying(false);
    }

    return (
        <div title={title} style={{ width: `${width}px` }} className={cn("rounded-xl aspect-video object-cover object-center overflow-hidden relative", className)}>
            <video
                ref={videoRef}
                className="w-full"
                src={video}
                onTimeUpdate={() => {
                    const videoElement = videoRef.current;
                    if (videoElement) {
                        setCurrentTime(videoElement.currentTime / duration * 100 || 0)
                    }
                }}
                onPlay={() => {
                    const videoElement = videoRef.current;
                    if (videoElement) {
                        setDuration(videoElement.duration || 0);
                    }
                }}
                playsInline
                preload="metadata"
                onError={() => setIsVideoError(true)}
                onEnded={() => setIsVideoPlaying(false)}>
            </video>
            <div onClick={handleStartVideo} className={cn("absolute group bg-background/50 cursor-pointer inset-0 items-center justify-center transition-all duration-200 ease-out hover:bg-background/35", isVideoPlaying ? "hidden" : "flex")}>
                <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
                    <div className="flex items-center justify-center rounded-full size-20 bg-linear-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
                        <PlayIcon className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105" />
                    </div>
                </div>
                <span className="sr-only">Play</span>
            </div>
            <div className={cn("absolute bottom-0 py-2 px-4 bg-background/35 justify-center items-center gap-2 w-full", isVideoPlaying ? "flex" : "hidden")}>
                <Button onClick={handlePauseVideo} variant="ghost" size="icon" className="rounded-full">
                    <PauseIcon className="size-6 fill-white text-white" />
                    <span className="sr-only">Pause</span>
                </Button>
                <Progress value={currentTime} className="w-full" />
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