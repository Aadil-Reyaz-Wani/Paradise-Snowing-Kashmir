import { getNewsletterSubscribers } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Mail } from "lucide-react";
import { DeleteSubscriberButton } from "../../../../components/admin/SubscriberActions";
import { NewsletterCampaignDialog } from "../../../../components/admin/NewsletterCampaignDialog";
import { IndividualEmailDialog } from "../../../../components/admin/IndividualEmailDialog";

export default async function NewsletterPage() {
    const subscribers = await getNewsletterSubscribers();
    const activeSubscribersCount = subscribers.filter((s: any) => s.status === 'active').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Newsletter Subscribers</h1>
                    <p className="text-muted-foreground mt-1">Manage your audience and send updates.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap">
                        Total: {subscribers.length}
                    </div>
                    <NewsletterCampaignDialog subscriberCount={activeSubscribersCount} />
                </div>
            </div>

            {/* Desktop Table View */}
            <Card className="hidden md:block bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none overflow-hidden">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Subscriber List
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-6">Email</TableHead>
                                <TableHead>Subscribed At</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                        No subscribers yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                subscribers.map((sub: any) => (
                                    <TableRow key={sub.id}>
                                        <TableCell className="font-medium pl-6">
                                            {sub.email}
                                        </TableCell>
                                        <TableCell>{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {sub.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <IndividualEmailDialog email={sub.email} />
                                                <DeleteSubscriberButton id={sub.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {subscribers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
                        No subscribers yet.
                    </div>
                ) : (
                    subscribers.map((sub: any) => (
                        <div key={sub.id} className="bg-[#F8FAFC] rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-lg text-primary truncate max-w-[200px]" title={sub.email}>
                                        {sub.email}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {sub.status}
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-primary/5">
                                <div className="flex gap-2 w-full">
                                    <div className="flex-1">
                                        <IndividualEmailDialog email={sub.email} showLabel={true} />
                                    </div>
                                    <div className="flex-1">
                                        <DeleteSubscriberButton id={sub.id} showLabel={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
