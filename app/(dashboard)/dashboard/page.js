import { GreetingSection } from "@/components/dashboard/greeting";
import { BalanceCards } from "@/components/dashboard/balance-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <GreetingSection />
      <BalanceCards />
      <QuickActions />
      <RecentTransactions />
    </div>
  );
}
