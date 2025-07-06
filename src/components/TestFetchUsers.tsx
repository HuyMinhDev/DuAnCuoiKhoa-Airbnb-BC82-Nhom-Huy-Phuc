import React, { useEffect, useState } from "react";
import fetcher from "../api/fetcher";
import type { User } from "../types/User";
import { useTranslation } from "react-i18next";
const TestFetchUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetcher.get<{ content: User[] }>("/users");
        console.log("Dữ liệu người dùng:", res.data.content);
        setUsers(res.data.content);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!users.length) return <p>Không có người dùng nào.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Translation</h1>
      <thead>
        <tr>
          <th>{t("user.id")}</th>
          <th>{t("user.name")}</th>
          <th>{t("user.email")}</th>
        </tr>
      </thead>
      <div className="space-x-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => changeLanguage("vi")}
        >
          Tiếng Việt
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => changeLanguage("en")}
        >
          English
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Tên</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Ngày sinh</th>
              <th className="px-4 py-2 border">Giới tính</th>
              <th className="px-4 py-2 border">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.birthday}</td>
                <td className="px-4 py-2 border">
                  {user.gender ? "Nam" : "Nữ"}
                </td>
                <td className="px-4 py-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestFetchUsers;
