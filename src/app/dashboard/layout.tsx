import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <DashboardShell
      userName={session.user?.name ?? undefined}
      userImage={session.user?.image ?? undefined}
      userEmail={session.user?.email ?? undefined}
    >
      {children}
    </DashboardShell>
  );
}
