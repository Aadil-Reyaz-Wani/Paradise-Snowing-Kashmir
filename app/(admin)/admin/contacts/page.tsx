import { getAdminContacts } from "@/lib/actions";
import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
    const contacts = await getAdminContacts();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-serif text-primary">Messages</h2>
                    <p className="text-muted-foreground mt-1">View and manage inquiries from the website</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-primary/10 text-sm font-medium text-primary">
                    Total Messages: {contacts.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-primary/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-primary/5 border-b border-primary/10">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Date</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Name</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Contact Info</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Message</th>
                                <th className="text-left py-4 px-6 font-semibold text-primary text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-muted-foreground">
                                        No messages found yet.
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((contact: any) => (
                                    <tr key={contact.id} className="hover:bg-primary/5 transition-colors">
                                        <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap align-top">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 opacity-50" />
                                                {formatInTimeZone(new Date(contact.created_at), 'Asia/Kolkata', "MMM d, yyyy")}
                                                <span className="text-xs opacity-50 ml-1">
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
                                                {contact.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-foreground/80">
                                                <Phone className="h-3 w-3 text-primary" />
                                                {contact.phone}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground max-w-md align-top">
                                            <div className="flex gap-2">
                                                <MessageSquare className="h-4 w-4 text-primary/50 shrink-0 mt-0.5" />
                                                <p className="line-clamp-3 hover:line-clamp-none transition-all">
                                                    {contact.message}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 align-top">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                    contact.status === 'read' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-green-100 text-green-800'}`}>
                                                {contact.status || 'new'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
