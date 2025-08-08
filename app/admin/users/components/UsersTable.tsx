"use client"

const UsersTable = ({ users }: any) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md p-4 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Admin</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Active
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.username || "not found"}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.is_admin ? "Yes" : "No"}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.is_active ? "Yes" : "No"}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
