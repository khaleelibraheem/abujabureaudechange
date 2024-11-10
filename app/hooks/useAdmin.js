import { useUser } from "@clerk/nextjs";

export function useAdmin() {
  const { user, isLoaded } = useUser();

  return {
    isAdmin: user?.publicMetadata?.role === "admin",
    isLoaded,
    user,
  };
}
