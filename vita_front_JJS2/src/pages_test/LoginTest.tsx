import React, { useState } from "react";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  name: string;
  birth: string;
  gender: "M" | "F";
  contact: string;
  isEmailAuth: number;
}

const LoginTest: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    birth: "",
    gender: "M",
    contact: "",
    isEmailAuth: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/members", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("회원가입 성공:", response.data);
      alert("회원가입이 완료되었습니다.");
      // 성공 후 폼 초기화 또는 다른 동작 수행
      setFormData({
        email: "",
        password: "",
        name: "",
        birth: "",
        gender: "M",
        contact: "",
        isEmailAuth: 1,
      });
    } catch (err) {
      console.error("회원가입 실패:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "회원가입 실패");
      } else {
        setError("회원가입 실패");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg w-96">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름"
        required
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="birth"
        value={formData.birth}
        onChange={handleChange}
        title="생년월일을 입력하세요"
        required
        className="border p-2 rounded"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        title="성별을 고르세요"
        className="border p-2 rounded"
      >
        <option value="M">남성</option>
        <option value="F">여성</option>
      </select>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="연락처 (선택)"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "회원가입 중..." : "회원가입"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default LoginTest;