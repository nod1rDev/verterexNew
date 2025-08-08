"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Newspaper, Users, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const AdminSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
    router.push("/login")
  }

  const navItems = [
    {
      href: "/admin/news",
      icon: <Newspaper className="w-5 h-5" />,
      label: "News",
    },
    {
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      label: "Users",
    },
  ]

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-gray-50 border-r border-gray-200 shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-3xl font-extrabold text-[#283E61] tracking-tight">Admin Panel</h2>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  flex items-center px-6 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ease-in-out
                  ${
                    pathname === item.href
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                {item.icon}
                <span className="ml-4">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-lg font-medium text-gray-700 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="w-5 text-red-500 h-5" />
          <span className="ml-4 text-red-500">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
