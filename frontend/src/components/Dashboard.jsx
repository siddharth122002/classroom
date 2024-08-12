import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const notify = (msg) => toast.error(msg);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const navigate = useNavigate();
  const [assignTeacher, setAssignTeacher] = useState("");
  const [tt, setTt] = useState({
    Monday: { start: "", end: "" },
    Tuesday: { start: "", end: "" },
    Wednesday: { start: "", end: "" },
    Thursday: { start: "", end: "" },
    Friday: { start: "", end: "" },
    Saturday: { start: "", end: "" },
  });
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherUsername, setTeacherUsername] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentAssignedTo, setstudentAssignedTo] = useState("");
  const handleCreateTeacher = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://classroombackend.vercel.app/createTeacher",
        {
          teacherEmail,
          teacherPassword,
          teacherUsername,
        }
      );
      if (res.data.status == 404) {
        notify(res.data.msg);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateStudent = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://classroombackend.vercel.app/createStudent",
        {
          studentEmail,
          studentPassword,
          studentUsername,
          studentAssignedTo,
        }
      );
      if (res.data.status == 404) {
        notify(res.data.msg);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateClassroom = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://classroombackend.vercel.app/createClassroom",
        {
          className,
          assignTeacher,
          tt,
        }
      );
      if (res.data.status == 404) {
        notify(res.data.msg);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await axios.get(
          "https://classroombackend.vercel.app/getTeachers"
        );
        setTeachers(res.data.allTeachers);
        // console.log(res.data.allTeachers)
      } catch (e) {
        console.log(e);
      }
    };
    getTeachers();

    const getClasses = async () => {
      try {
        const res = await axios.get(
          "https://classroombackend.vercel.app/getClasses",
          {
            headers: {
              email: localStorage.getItem("email"),
            },
          }
        );
        setClassrooms(res.data.allClass);
        // console.log(res.data.allClass)
      } catch (e) {
        console.log(e);
      }
    };
    getClasses();
    setLoading(false);
  }, []);
  const handleTime = (day, timeType, value) => {
    setTt((prevTt) => ({
      ...prevTt,
      [day]: {
        ...prevTt[day],
        [timeType]: value,
        // timeType:value,
      },
    }));
  };
  const logout = () => {
    localStorage.removeItem("token");
    return navigate("/");
  };
  return (
    <>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}

            <header className="flex justify-between items-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Principal Dashboard
              </h1>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </header>

            {/* Create Teacher Account */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Create a Teacher's Account
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  value={teacherUsername}
                  onChange={(e) => setTeacherUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <button
                  onClick={handleCreateTeacher}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Create
                </button>
              </div>
            </section>

            {/* Create Student Account */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Create a Student's Account
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <input
                  type="password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <select
                  value={studentAssignedTo}
                  onChange={(e) => setstudentAssignedTo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                >
                  <option value="" disabled>
                    Assign to
                  </option>
                  {teachers.map((teacher, i) => (
                    <option key={i} value={teacher.email}>
                      {teacher.username}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleCreateStudent}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Create
                </button>
              </div>
            </section>

            {/* Create Classroom */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Create a Classroom
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter classroom name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
                <select
                  value={assignTeacher}
                  onChange={(e) => setAssignTeacher(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                >
                  <option value="" disabled>
                    Select a teacher
                  </option>
                  {teachers.map((teacher, i) => (
                    <option key={i} value={teacher.email}>
                      {teacher.username}
                    </option>
                  ))}
                </select>
                <div className="flex flex-col space-y-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <div key={day} className="flex gap-4 items-center">
                      <p className="w-24 text-gray-700 font-medium">{day}</p>
                      <input
                        onChange={(e) =>
                          handleTime(day, "start", e.target.value)
                        }
                        type="time"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        onChange={(e) => handleTime(day, "end", e.target.value)}
                        type="time"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCreateClassroom}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Create
                </button>
              </div>
            </section>

            {/* Classroom Cards */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Classrooms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classrooms.map((classroom, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {classroom.className}
                    </h3>
                    <p className="text-gray-600">
                      Assigned to: {classroom.assignTeacher}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
