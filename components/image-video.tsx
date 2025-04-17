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
    const [isVideoLoading, setIsVideoLoading] = useState(true);

    return <>
        {video && !isVideoError ? (
            <>
                {isVideoLoading && (
                    <img
                        src={img}
                        alt={title}
                        className="rounded-3xl shadow-lg aspect-video object-cover object-center absolute"
                    />
                )}
                <div className="rounded-3xl shadow-lg aspect-video object-cover object-center overflow-hidden relative">
                    <video
                        className={cn("w-full", isVideoLoading ? "opacity-0" : "opacity-100")}
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onLoadedData={() => setIsVideoLoading(false)}
                        onError={() => setIsVideoError(true)}>
                    </video>
                </div>
            </>
        ) : (
            <img
                src={img}
                alt={title}
                className="rounded-3xl shadow-lg aspect-video object-cover object-center"
            />
        )}
    </>;
}