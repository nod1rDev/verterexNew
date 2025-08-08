"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const userString = localStorage.getItem("user");
      console.log("User string from localStorage:", userString);
      if (userString) {
        let user: User | null = null;
        try {
          user = JSON.parse(userString);
        } catch (parseError) {
          
          // If parsing fails, treat as no user or invalid user
          localStorage.removeItem("user"); // Clear invalid data
          localStorage.removeItem("token"); // Clear associated token
        }
       
        if (user && user.is_admin) {
          setIsAdmin(true);
          console.log("User is admin, setting isAdmin to true.");
        } else {
          
          router.push("/login");
        }
      } else {
       
        router.push("/login");
      }
    }, [router]);

    if (!isAdmin) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
