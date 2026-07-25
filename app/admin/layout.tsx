import LogoutButton from "@/app/admin/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 bg-paper-deep/30">
      <div className="border-b border-gold/30 bg-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-maroon-deep">
            Admin Dashboard
          </p>
          <LogoutButton />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">{children}</div>
    </div>
  );
}
