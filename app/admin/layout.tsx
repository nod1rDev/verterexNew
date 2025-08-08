
import React from "react";
import AdminSidebar from "./components/AdminSidebar";

// This layout will wrap all pages under the /admin route
// We will add authentication logic here later to protect these routes

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <AdminSidebar />
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
