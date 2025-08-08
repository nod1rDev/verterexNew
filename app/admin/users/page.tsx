
"use client";

import { useEffect, useState } from "react";
import withAdminAuth from "../components/withAdminAuth";
import UsersTable from "./components/UsersTable";

interface UserItem {
  id: number;
  email: string;
  username?: string; // Add username as optional
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
}

interface UsersApiResponse {
  code: number;
  message: string;
  data: UserItem[];
  success: boolean;
}

const UsersAdminPage = () => {
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (typeof window === "undefined") return;
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching users with token:", token);
        const response = await fetch("http://217.199.253.46:3001/auth/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data: UsersApiResponse = await response.json();
        console.log("Users API response:", data);
        if (data.success) {
          setUsers(data.data);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#283E61] mb-4">Users Management</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default withAdminAuth(UsersAdminPage);
