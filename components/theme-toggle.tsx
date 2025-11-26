"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
        );
    }

    return (
        <div className="flex items-center p-1 bg-secondary rounded-full border border-border">
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition-all ${theme === "light"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                title="Light Mode"
            >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light Mode</span>
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full transition-all ${theme === "system"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                title="System Mode"
            >
                <Monitor className="h-4 w-4" />
                <span className="sr-only">System Mode</span>
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition-all ${theme === "dark"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                title="Dark Mode"
            >
                <Moon className="h-4 w-4" />
                <span className="sr-only">Dark Mode</span>
            </button>
        </div>
    );
}
