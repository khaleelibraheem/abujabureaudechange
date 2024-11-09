"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  User,
  Mail,
  MapPin,
  CreditCard,
  AlertCircle,
  Shield,
  Trash,
  UserX,
  Building,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    accountName: "",
    email: "",
    address: "",
  });
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    if (isLoaded && user) {
      const storedAccountNumber = user.unsafeMetadata.accountNumber;
      if (!storedAccountNumber) {
        const newAccountNumber = Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 10)
        ).join("");
        setAccountNumber(newAccountNumber);
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            accountNumber: newAccountNumber,
          },
        });
      } else {
        setAccountNumber(storedAccountNumber);
      }

      setFormData({
        username: user.username || "",
        accountName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.primaryEmailAddress?.emailAddress || "",
        address: user.unsafeMetadata.address || "",
      });
    }
  }, [isLoaded, user]);

  const formatAccountNumber = (number) => {
    if (!number) return "•••• •••• ••";
    return showAccountNumber
      ? number.replace(/(\d{4})/g, "$1 ").trim()
      : "•••• •••• ••";
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const nameParts = formData.accountName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      await user?.update({
        firstName,
        lastName,
        username: formData.username,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          address: formData.address,
          accountNumber: accountNumber,
        },
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
    setIsLoading(false);
  };

  const handleDeactivateAccount = async () => {
    try {
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          isDeactivated: true,
        },
      });
      toast.success("Account deactivated successfully");
    } catch (error) {
      console.error("Deactivation error:", error);
      toast.error("Failed to deactivate account");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user?.delete();
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Deletion error:", error);
      toast.error("Failed to delete account");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-5xl"
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isEditing
              ? isLoading
                ? "Saving..."
                : "Save Changes"
              : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Account Overview Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Account Overview</CardTitle>
            <CardDescription>
              Your account details and verification status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4 text-gray-500" />
                    Username
                  </label>
                  <Input
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    disabled={!isEditing}
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Building className="h-4 w-4 text-gray-500" />
                    Account Name
                  </label>
                  <Input
                    value={formData.accountName}
                    onChange={(e) =>
                      setFormData({ ...formData, accountName: e.target.value })
                    }
                    disabled={!isEditing}
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email Address
                  </label>
                  <Input
                    value={formData.email}
                    disabled
                    className="bg-gray-50 dark:bg-gray-800 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    Account Number
                  </label>
                  <div className="relative">
                    <Input
                      value={formatAccountNumber(accountNumber)}
                      disabled
                      className="bg-gray-50 dark:bg-gray-800 pr-10 font-mono"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                    >
                      {showAccountNumber ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="font-medium"
                  />
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Account Verified
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your account has been verified and is in good standing
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Account Actions</CardTitle>
            <CardDescription>
              Manage your account status and security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="warning" className="mb-8">
              <Shield className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                The following actions will affect your account status. Please
                proceed with caution.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Deactivate Account */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deactivate Account</DialogTitle>
                      <DialogDescription>
                        Your account will be temporarily disabled. You can
                        reactivate it by logging in again.
                      </DialogDescription>
                    </DialogHeader>
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        While deactivated, you won&apos;t be able to access any
                        services or your funds.
                      </AlertDescription>
                    </Alert>
                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={handleDeactivateAccount}
                      >
                        Confirm Deactivation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete Account */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action is permanent and cannot be undone. All your
                        data will be deleted.
                      </DialogDescription>
                    </DialogHeader>
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        All your account data, including transaction history,
                        balances, and settings will be permanently erased.
                      </AlertDescription>
                    </Alert>
                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Permanently Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Sign Out */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-1/4">
                    <Trash className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign Out</DialogTitle>
                  </DialogHeader>
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      This will sign you out of your account.
                    </AlertDescription>
                  </Alert>
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <SignOutButton>
                      <Button variant="destructive">Sign Out</Button>
                    </SignOutButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}