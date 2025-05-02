"use client";

import { useState, useEffect } from "react";

export default function RandomEmoji() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const emojis = [
        { emoji: "👋", weight: 10 },
        { emoji: "✌️", weight: 8 },
        { emoji: "🖐", weight: 8 },
        { emoji: "🙋‍♂️", weight: 5 },
        { emoji: "👻", weight: 1 },
        { emoji: "🤖", weight: 1 },
    ];

    const totalWeight = emojis.reduce((sum, { weight }) => sum + weight, 0);
    const random = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    const randomEmoji = emojis.find(({ weight }) => {
        cumulativeWeight += weight;
        return random < cumulativeWeight;
    })?.emoji;

    return <span className="text-xl">{randomEmoji}</span>;
}