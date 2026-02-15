import AdminNavbar from "./component/adminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
