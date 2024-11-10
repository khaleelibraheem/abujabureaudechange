"use client";

import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  User,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Mail,
  Phone,
  Lock,
  Fingerprint,
  History,
  AlertCircle,
  DollarSign,
  Languages,
  FileText,
  ChevronRight,
  AtSign,
  Smartphone,
  BellRing,
  Wallet,
  Monitor,
  Key,
  Settings,
  Badge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const settingsSections = [
  {
    id: "profile",
    icon: User,
    title: "Profile",
    description: "Manage personal info",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security",
    description: "Protect account",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: "notifications",
    icon: BellRing,
    title: "Alerts",
    description: "Set notifications",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: "preferences",
    icon: Settings,
    title: "Settings",
    description: "App preferences",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
];

// Example login history data
const loginHistory = [
  {
    device: "Chrome / Windows",
    location: "Lagos, Nigeria",
    time: "Just now",
    status: "Current session",
  },
  {
    device: "Safari / iPhone",
    location: "Lagos, Nigeria",
    time: "2 hours ago",
    status: "Successful",
  },
  {
    device: "Firefox / MacOS",
    location: "London, UK",
    time: "Yesterday",
    status: "Successful",
  },
];

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-8"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Manage your profile, security, and app preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0">
          {settingsSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 border border-gray-200 dark:border-gray-700 [&[data-state=active]]:border-2 [&[data-state=active]]:border-indigo-500 transition-all duration-200"
            >
              <div className="flex flex-col items-center gap-3 p-4">
                <div className={`p-3 rounded-lg ${section.bgColor}`}>
                  <section.icon className={`h-6 w-6 ${section.color}`} />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{section.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden md:block">
                    {section.description}
                  </p>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md sm:rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle>
                    Profile Information
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Update your personal details and contact information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    First Name
                  </label>
                  <Input
                    defaultValue={user?.firstName}
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Last Name
                  </label>
                  <Input
                    defaultValue={user?.lastName}
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-gray-500" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    defaultValue={user?.emailAddresses[0]?.emailAddress}
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription className="mt-1">
                      Manage your security preferences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-indigo-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Fingerprint className="h-5 w-5 text-indigo-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Biometric Login</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Use fingerprint or face ID
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <Button variant="outline" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                    <History className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle>Login Activity</CardTitle>
                    <CardDescription className="mt-1">Recent account activity</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {loginHistory.map((login, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <Monitor className="h-5 w-5 text-gray-500 mt-1" />
                        <div>
                          <h4 className="font-medium">{login.device}</h4>
                          <p className="text-sm text-gray-500">
                            {login.location}
                          </p>
                          <p className="text-xs text-gray-400">{login.time}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          login.status === "Current session"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {login.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center">
                  <BellRing className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription className="mt-1">
                    Choose what you want to be notified about
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Transfer Alerts",
                    description: "Get notified about money transfers",
                    icon: Wallet,
                  },
                  {
                    title: "Security Alerts",
                    description: "Important security updates",
                    icon: Shield,
                  },
                  {
                    title: "Rate Alerts",
                    description: "Exchange rate updates",
                    icon: DollarSign,
                  },
                  {
                    title: "News & Updates",
                    description: "Product news and updates",
                    icon: Bell,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <item.icon className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle>App Preferences</CardTitle>
                  <CardDescription className="mt-1">
                    Customize your app experience
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    Default Currency
                  </label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="border-gray-200 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">
                        <div className="flex items-center gap-2">
                          <span>USD</span>
                          <span className="text-gray-500">- US Dollar</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="eur">
                        <div className="flex items-center gap-2">
                          <span>EUR</span>
                          <span className="text-gray-500">- Euro</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gbp">
                        <div className="flex items-center gap-2">
                          <span>GBP</span>
                          <span className="text-gray-500">- British Pound</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ngn">
                        <div className="flex items-center gap-2">
                          <span>NGN</span>
                          <span className="text-gray-500">
                            - Nigerian Naira
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="inr">
                        <div className="flex items-center gap-2">
                          <span>INR</span>
                          <span className="text-gray-500">- Indian Rupee</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Languages className="h-4 w-4 text-gray-500" />
                    Language
                  </label>
                  <Select defaultValue="en">
                    <SelectTrigger className="border-gray-200 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center gap-2">
                          <span>English</span>
                          <span className="text-gray-500">- Default</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="fr">
                        <div className="flex items-center gap-2">
                          <span>French</span>
                          <span className="text-gray-500">- Français</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="es">
                        <div className="flex items-center gap-2">
                          <span>Spanish</span>
                          <span className="text-gray-500">- Español</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Additional Preferences
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Monthly Statements</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive monthly statements via email
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Smartphone className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Mobile Alerts</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Push notifications on mobile
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Marketing Emails</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive product updates and offers
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Price Alerts</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified of significant price changes
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">Reset Preferences</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
