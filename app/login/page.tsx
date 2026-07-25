import type { Metadata } from "next";
import LoginForm from "@/app/components/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | N L Marriage Hall & Guest House",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
      <LoginForm redirectTo={redirectTo || "/admin"} />
    </main>
  );
}
