// app/(dashboard)/dashboard/settings/page.js
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
  ChevronRight,
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
    title: "Profile Settings",
    description: "Manage your personal information",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security",
    description: "Protect your account",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    description: "Customize your notifications",
  },
  {
    id: "preferences",
    icon: Globe,
    title: "Preferences",
    description: "Set your app preferences",
  },
];

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0">
          {settingsSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 border border-gray-200 dark:border-gray-700 [&[data-state=active]]:border-indigo-600"
            >
              <div className="flex flex-col items-center gap-2 p-4">
                <section.icon className="h-5 w-5" />
                <div className="text-center">
                  <p className="font-medium">{section.title}</p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p> */}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue={user?.firstName} />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue={user?.lastName} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  defaultValue={user?.emailAddresses[0]?.emailAddress}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input type="tel" />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Biometric Login</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use fingerprint or face ID
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button variant="outline">Change Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
                <CardDescription>Recent account activity</CardDescription>
              </CardHeader>
              <CardContent>{/* Add login history items here */}</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what you want to be notified about
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Transfer Alerts",
                  description: "Get notified about money transfers",
                },
                {
                  title: "Security Alerts",
                  description: "Important security updates",
                },
                { title: "Rate Alerts", description: "Exchange rate updates" },
                {
                  title: "News & Updates",
                  description: "Product news and updates",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Currency</label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="ngn">NGN</SelectItem>
                    <SelectItem value="inr">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Statements</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive monthly statements via email
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
