import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classs from "../assets/class.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const notify = (msg) => toast.error(msg);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
        role,
      });
      // console.log(res);
      if (res.data.status == 404) {
        notify(res.data.msg);
      }
      if (res.data.status == 200) {
        // console.log(res.data)
        localStorage.setItem("token", res.data.msg);
        if (res.data.msg == "principal") {
          return navigate("/dashboard/");
        } else if (res.data.msg == "teacher") {
          localStorage.setItem("email", res.data.teacher.email);
          return navigate("/dashboard/teacher");
        } else {
          localStorage.setItem("email", res.data.student.email);
          return navigate("/dashboard/student");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <img src={classs} className="m-auto" />
          <p className="text-4xl">Login</p>
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Role
            </label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="teacher">teacher</option>
              <option value="student">student</option>
              <option value="principal">principal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
