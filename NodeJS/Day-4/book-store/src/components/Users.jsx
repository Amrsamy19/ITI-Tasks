import { useEffect, useState } from "react";
import Notification from "./Notification";

function Users({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ message: "", type: "" });
  const [opened, setOpened] = useState(false);

  const handleEdit = async (role, id) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role }),
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(users.map((user) => (user._id === id ? data : user)));
      setMessage({ message: "User updated successfully", type: "success" });
      setOpened(true);
    } else {
      const data = await response.json();
      setMessage({ message: data.error, type: "error" });
      setOpened(true);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(users.filter((user) => user._id !== id));
      setMessage({ message: data.message, type: "success" });
      setOpened(true);
    } else {
      const data = await response.json();
      setMessage({ message: data.error, type: "error" });
      setOpened(true);
    }
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome,
              <span className="text-blue-800">
                {` ${user?.name || user?.username}`}
              </span>
              !
            </h2>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
            {loading && <p>Loading...</p>}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                      <select
                        onChange={(event) =>
                          handleEdit(event.target.value, user._id)
                        }
                        value={user.role}
                        className={
                          user._id.toString() ===
                          JSON.parse(localStorage.getItem("user")).id
                            ? "text-gray-500 font-bold py-2 rounded-lg"
                            : "font-bold  py-2 rounded-lg"
                        }
                        disabled={
                          user._id.toString() ===
                          JSON.parse(localStorage.getItem("user")).id
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                      </select>
                    </td>
                    <td className="flex items-center justify-around px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className={
                          user._id.toString() ===
                          JSON.parse(localStorage.getItem("user")).id
                            ? "bg-gray-600 text-gray-100 font-bold px-4 py-2 rounded-lg"
                            : "bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        }
                        disabled={
                          user._id.toString() ===
                          JSON.parse(localStorage.getItem("user")).id
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {opened && (
        <Notification
          message={message.message}
          type={message.type}
          setOpened={setOpened}
          setMessage={setMessage}
        />
      )}
    </>
  );
}

export default Users;
