export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* Admin Sidebar or Navbar could go here later */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
