"use client";

import { get } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  // Step 1: Fetch current logged-in user
  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await get("/user/me");
      return res; 
    },
  });

  const userId = userData?.data?.id;

  // Step 2: Fetch admin-specific data only when userId is available
  const {
    data: adminData,
    isLoading: isLoadingAdmin,
    isError: isAdminError,
  } = useQuery({
    queryKey: ["adminProfile", userId],
    queryFn: async () => {
      const res = await get(`/patient/${userId}`);
      return res;
    },
    enabled: !!userId, 
  });

  // Loading states
  if (isLoadingUser) return <div>Loading user info...</div>;
  if (isUserError) return <div>Error loading user</div>;

  if (isLoadingAdmin) return <div>Loading admin profile...</div>;
  if (isAdminError) return <div>Error loading admin data</div>;

  // Success: both data available
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
      
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(adminData, null, 2)}
      </pre>

      {/* এখানে তুমি adminData থেকে যা ইচ্ছা render করতে পারো */}
    </div>
  );
}