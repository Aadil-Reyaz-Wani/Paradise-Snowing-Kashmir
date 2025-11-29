import { getAdminContacts } from "@/lib/actions";
import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import ContactList from "@/components/admin/ContactList";

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

            <ContactList initialContacts={contacts} />
        </div>
    );
}
