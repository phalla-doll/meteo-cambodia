import type * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    pauseOnHover?: boolean;
    speed?: number;
}

export function Marquee({
    children,
    pauseOnHover = true,
    speed = 40,
    className,
    ...props
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "relative flex overflow-hidden",
                pauseOnHover && "hover:[animation-play-state:paused]",
                className,
            )}
            {...props}
        >
            <div
                className="animate-marquee flex whitespace-nowrap"
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
            <div
                className="animate-marquee flex whitespace-nowrap"
                style={{ animationDuration: `${speed}s` }}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}
