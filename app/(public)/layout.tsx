import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#FDFBF7]">
            <Header />
            <main className="flex-1 pt-0">{children}</main>
            <Footer />
        </div>
    );
}
