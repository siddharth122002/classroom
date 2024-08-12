import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const TeacherDashboard = () => {
  const notify = (msg) => toast.error(msg);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentAssignedTo, setstudentAssignedTo] = useState("");
  const [timeline, setTimeline] = useState([
    { start: "12:00", end: "12:00" },
    { start: "12:00", end: "12:00" },
    { start: "12:00", end: "12:00" },
    { start: "12:00", end: "12:00" },
  ]);
  const [subs, setSubs] = useState([
    { periods: ["--", "--", "--", "--"] },
    { periods: ["--", "--", "--", "--"] },
    { periods: ["--", "--", "--", "--"] },
    { periods: ["--", "--", "--", "--"] },
    { periods: ["--", "--", "--", "--"] },
    { periods: ["--", "--", "--", "--"] },
  ]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  useEffect(() => {
    setstudentAssignedTo(localStorage.getItem("email"));

    const getStudents = async () => {
      try {
        const res = await axios.get(
          "https://classroombackend.vercel.app/getClass",
          {
            headers: {
              email: localStorage.getItem("email"),
            },
          }
        );
        setStudents(res.data.allStudent);
        // console.log(res.data.allStudent);
      } catch (e) {
        console.log(e);
      }
    };
    getStudents();

    const getTT = async () => {
      try {
        const res = await axios.get(
          "https://classroombackend.vercel.app/getTTteacher",
          {
            headers: {
              email: localStorage.getItem("email"),
            },
          }
        );
        if (res.data.TT !== null) {
          setSubs(res.data.TT.subs);
          setTimeline(res.data.TT.timeline);
          console.log("sdf");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTT();
    setLoading(false);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    return navigate("/");
  };
  const handleEditTT = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://classroombackend.vercel.app/createTT",
        {
          timeline,
          subs,
        },
        {
          headers: {
            email: localStorage.getItem("email"),
          },
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
  const handleTimeline = (which, e, i) => {
    let updatedTl = [...timeline];
    if (which == "s") {
      updatedTl[i].start = e.target.value;
    } else {
      updatedTl[i].end = e.target.value;
    }
    setTimeline(updatedTl);
  };
  const handleSub = (e, row, col) => {
    const updatedSub = [...subs];
    updatedSub[row].periods[col] = e.target.value;
    setSubs(updatedSub);
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
                TeacherDashboard{" "}
              </h1>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </header>

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
                <button
                  onClick={handleCreateStudent}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Create
                </button>
              </div>
            </section>

            {/* Create TT */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Create Timetable
              </h2>
              <Table>
                <TableCaption>Your classroom</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day/Time</TableHead>
                    {timeline.map((tl, i) => (
                      <TableHead key={i}>
                        <input
                          type="time"
                          value={tl.start}
                          onChange={(e) => {
                            handleTimeline("s", e, i);
                          }}
                        />
                        <input
                          type="time"
                          value={tl.end}
                          onChange={(e) => {
                            handleTimeline("e", e, i);
                          }}
                        />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subs.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{days[i]}</TableCell>
                      {row.periods.map((col, j) => (
                        <TableCell key={j}>
                          <input
                            value={col}
                            type="text"
                            onChange={(e) => {
                              handleSub(e, i, j);
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <button
                onClick={handleEditTT}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Save
              </button>
            </section>

            {/* Classroom Cards */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Classrooms
              </h2>
              <div>
                <p className="text-gray-500">
                  List of students of this classroom:
                </p>
                <ul className="list-disc">
                  {students.map((stud, i) => (
                    <li className="font-semibold text-xl" key={i}>
                      {stud.username}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherDashboard;
