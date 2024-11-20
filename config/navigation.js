import {
  LayoutDashboard,
  SendHorizontal,
  RefreshCcw,
  QrCode,
  Coins,
  CreditCard,
  History,
  Banknote,
  PiggyBank,
  FileText,
  Settings,
  User,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Exchange Rates",
    href: "/dashboard/exchange-rates",
    icon: RefreshCcw,
  },
  {
    title: "Virtual Cards",
    href: "/dashboard/cards",
    icon: CreditCard,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: History,
  },
  {
    title: "Fund Account",
    href: "/dashboard/fund-account",
    icon: Banknote,
  },
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: PiggyBank,
  },
  {
    title: "Withdrawals",
    href: "/dashboard/withdrawals",
    icon: Coins,
  },
  {
    title: "Bank Statements",
    href: "/dashboard/statements",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
