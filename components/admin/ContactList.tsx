"use client";

import { useState, useOptimistic, startTransition } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { Mail, Phone, Calendar, MessageSquare, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { deleteContact, updateContactStatus } from "@/lib/actions";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Contact {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: string;
}

export default function ContactList({ initialContacts }: { initialContacts: Contact[] }) {
    const [optimisticContacts, addOptimisticContact] = useOptimistic(
        initialContacts,
        (state, action: { type: "delete" | "update"; id: string; status?: string }) => {
            if (action.type === "delete") {
                return state.filter((c) => c.id !== action.id);
            } else if (action.type === "update") {
                return state.map((c) =>
                    c.id === action.id ? { ...c, status: action.status! } : c
                );
            }
            return state;
        }
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        startTransition(() => {
            addOptimisticContact({ type: "delete", id });
        });
        await deleteContact(id);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        startTransition(() => {
            addOptimisticContact({ type: "update", id, status: newStatus });
        });
        await updateContactStatus(id, newStatus);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
            case "read": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
            case "replied": return "bg-green-100 text-green-800 hover:bg-green-200";
            default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "new": return <AlertCircle className="w-3 h-3 mr-1.5" />;
            case "read": return <Clock className="w-3 h-3 mr-1.5" />;
            case "replied": return <CheckCircle className="w-3 h-3 mr-1.5" />;
            default: return null;
        }
    };

    if (optimisticContacts.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-12 text-center">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-primary/40" />
                </div>
                <h3 className="text-lg font-medium text-primary">No messages yet</h3>
                <p className="text-muted-foreground mt-1">New inquiries from the website will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-primary/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-primary/5 border-b border-primary/10">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Date</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Name</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Contact Info</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm w-1/3">Message</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Status</th>
                                <th className="text-right py-4 px-6 font-semibold text-primary text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {optimisticContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap align-top">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 opacity-50" />
                                            <span suppressHydrationWarning>
                                                {formatInTimeZone(new Date(contact.created_at), 'Asia/Kolkata', "MMM d, yyyy")}
                                            </span>
                                            <span className="text-xs opacity-50 ml-1" suppressHydrationWarning>
                                                {formatInTimeZone(new Date(contact.created_at), 'Asia/Kolkata', "h:mm a")}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-medium text-foreground align-top">
                                        {contact.name}
                                    </td>
                                    <td className="py-4 px-6 text-sm space-y-1 align-top">
                                        <div className="flex items-center gap-2 text-foreground/80">
                                            <Mail className="h-3 w-3 text-primary" />
                                            <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-foreground/80">
                                            <Phone className="h-3 w-3 text-primary" />
                                            <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-muted-foreground align-top">
                                        <div className="flex gap-2">
                                            <MessageSquare className="h-4 w-4 text-primary/50 shrink-0 mt-0.5" />
                                            <p className="line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                                                {contact.message}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <Select
                                            value={contact.status || 'new'}
                                            onValueChange={(value) => handleStatusChange(contact.id, value)}
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    "h-7 w-[110px] rounded-full border-none text-xs font-medium px-3 transition-all",
                                                    getStatusColor(contact.status || 'new'),
                                                    "focus:ring-0 focus:ring-offset-0 ring-0 outline-none"
                                                )}
                                            >
                                                <div className="flex items-center">
                                                    {getStatusIcon(contact.status || 'new')}
                                                    <SelectValue />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-3 h-3 text-blue-500" />
                                                        <span>New</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="read">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-3 h-3 text-yellow-500" />
                                                        <span>Read</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="replied">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                                        <span>Replied</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="py-4 px-6 text-right align-top">
                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Delete Message"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {optimisticContacts.map((contact) => (
                    <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-primary/10 p-5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-primary">{contact.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span suppressHydrationWarning>
                                        {formatInTimeZone(new Date(contact.created_at), 'Asia/Kolkata', "MMM d, h:mm a")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select
                                    value={contact.status || 'new'}
                                    onValueChange={(value) => handleStatusChange(contact.id, value)}
                                >
                                    <SelectTrigger
                                        className={cn(
                                            "h-7 w-[110px] rounded-full border-none text-xs font-medium px-3 transition-all",
                                            getStatusColor(contact.status || 'new'),
                                            "focus:ring-0 focus:ring-offset-0 ring-0 outline-none"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            {getStatusIcon(contact.status || 'new')}
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-3 h-3 text-blue-500" />
                                                <span>New</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="read">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-yellow-500" />
                                                <span>Read</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="replied">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                <span>Replied</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-foreground/80">
                                <Mail className="h-4 w-4 text-primary/60" />
                                <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                            </div>
                            <div className="flex items-center gap-2 text-foreground/80">
                                <Phone className="h-4 w-4 text-primary/60" />
                                <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-lg p-3 text-sm text-foreground/90">
                            <p className="whitespace-pre-wrap">{contact.message}</p>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-primary/5">
                            <button
                                onClick={() => handleDelete(contact.id)}
                                className="flex items-center gap-2 text-xs font-medium text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                            >
                                <Trash2 className="h-3 w-3" />
                                Delete Message
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
