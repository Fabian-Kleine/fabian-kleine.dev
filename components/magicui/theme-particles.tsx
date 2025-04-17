"use client";
import { Particles } from "./particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeParticles() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");
    const [quantity, setQuantity] = useState(20);

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
        setQuantity(resolvedTheme === "dark" ? 40 : 150);
    }, [resolvedTheme]);

    return (
        <Particles className="absolute inset-0" quantity={quantity} ease={80} color={color} />
    );
}