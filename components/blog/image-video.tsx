"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageVideoProps {
    title: string;
    img: string;
    video?: string;
    className?: string;
}

export default function ImageVideo({ title, img, video, className }: ImageVideoProps) {
    const [isVideoError, setIsVideoError] = useState(false);

    return <>
        {video && !isVideoError ? (
            <div className={cn("rounded-3xl shadow-lg aspect-video object-cover object-center overflow-hidden relative", className)}>
                <video
                    className={cn("w-full")}
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={img}
                    onError={() => setIsVideoError(true)}>
                </video>
            </div>
        ) : (
            <img
                src={img}
                alt={title}
                loading="lazy"
                className={cn("rounded-3xl shadow-lg aspect-video object-cover object-center", className)}
            />
        )}
    </>;
}