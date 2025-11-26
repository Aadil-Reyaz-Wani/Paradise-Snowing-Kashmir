"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BlurImage({ className, ...props }: ImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            {...props}
            className={cn(
                "bg-muted transition-all duration-500",
                isLoading ? "scale-110 blur-xl grayscale" : "scale-100 blur-0 grayscale-0",
                className
            )}
            onLoad={() => setLoading(false)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        />
    );
}
