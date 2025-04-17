"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageVideoProps {
    title: string;
    img: string;
    video?: string;
}

export default function ImageVideo({ title, img, video }: ImageVideoProps) {
    const [isVideoError, setIsVideoError] = useState(false);

    return <>
        {video && !isVideoError ? (
            <div className="rounded-3xl shadow-lg aspect-video object-cover object-center overflow-hidden relative">
                <video
                    className={cn("w-full")}
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setIsVideoError(true)}>
                </video>
            </div>
        ) : (
            <img
                src={img}
                alt={title}
                className="rounded-3xl shadow-lg aspect-video object-cover object-center"
            />
        )}
    </>;
}