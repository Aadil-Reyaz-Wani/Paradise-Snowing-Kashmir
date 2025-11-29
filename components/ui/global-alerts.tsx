import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle, AlertCircle, AlertTriangle, Info, HelpCircle, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertProps {
    trigger?: ReactNode;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

// ... (other alerts remain unchanged) ...

export function AlertConfirm({ trigger, title, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, open, onOpenChange, confirmVariant = "default" }: AlertProps) {
    const isDestructive = confirmVariant === "destructive";

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className={cn(
                        "h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center transition-all",
                        isDestructive ? "bg-red-100" : "bg-primary/10"
                    )}>
                        {isDestructive ? (
                            <Trash2 className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                        ) : (
                            <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        )}
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-xl sm:text-2xl">{title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-2 w-full">
                        <AlertDialogCancel onClick={onCancel} className="rounded-xl">
                            {cancelText}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirm}
                            className={cn(
                                "rounded-xl",
                                isDestructive
                                    ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
                                    : buttonVariants({ variant: confirmVariant })
                            )}
                        >
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function AlertSuccess({ trigger, title, description, confirmText = "Continue", onConfirm, open, onOpenChange }: AlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className="border-emerald-500/20">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl text-emerald-900">{title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-emerald-800/80">
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center w-full">
                        <AlertDialogAction
                            onClick={onConfirm}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl w-full sm:w-auto px-8"
                        >
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function AlertError({ trigger, title, description, confirmText = "Try Again", onConfirm, open, onOpenChange }: AlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className="border-red-500/20">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl text-red-900">{title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-red-800/80">
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center w-full">
                        <AlertDialogAction
                            onClick={onConfirm}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl w-full sm:w-auto px-8"
                        >
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function AlertWarning({ trigger, title, description, confirmText = "Understand", cancelText = "Cancel", onConfirm, onCancel, open, onOpenChange }: AlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className="border-amber-500/20">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-amber-600" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl text-amber-900">{title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-amber-800/80">
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-2 w-full">
                        <AlertDialogCancel onClick={onCancel} className="rounded-xl border-amber-200 text-amber-900 hover:bg-amber-50 hover:text-amber-900">
                            {cancelText}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirm}
                            className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
                        >
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function AlertInfo({ trigger, title, description, confirmText = "Got it", onConfirm, open, onOpenChange }: AlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className="border-blue-500/20">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <Info className="h-8 w-8 text-blue-600" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl text-blue-900">{title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-blue-800/80">
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center w-full">
                        <AlertDialogAction
                            onClick={onConfirm}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full sm:w-auto px-8"
                        >
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}


