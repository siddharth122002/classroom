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
import { useNavigate } from "react-router-dom";
import axios from "axios";
const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState([]);
  const [subs, setSubs] = useState([]);
  const [students, setStudents] = useState([]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const logout = () => {
    localStorage.removeItem("token");
    return navigate("/");
  };

  useEffect(() => {
    const getTT = async () => {
      try {
        const res = await axios.get(
          "https://classroombackend.vercel.app/getTT",
          {
            headers: {
              email: localStorage.getItem("email"),
            },
          }
        );

        setSubs(res.data.TT.subs);
        setTimeline(res.data.TT.timeline);
      } catch (e) {
        console.log(e);
      }
    };
    getTT();

    const getStudents = async () => {
      try {
        const res = await axios.get(
          "https://classroombackend.vercel.app/getClassstudent",
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
    setLoading(false);
  }, []);
  const timeFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hr = hours.toString();
    const period = hr >= 12 ? "PM" : "AM";
    const adjustedHours = hr % 12 || 12;
    return `${adjustedHours}:${minutes}${period}`;
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Student Dashboard
              </h1>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </header>

            {/* Timetable */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Your Timetable
              </h2>
              <Table>
                <TableCaption>Your classroom timetable</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day/Time</TableHead>
                    {timeline.map((tl, index) => (
                      <TableHead key={index}>
                        {timeFormat(tl.start)}-{timeFormat(tl.end)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subs.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{days[i]}</TableCell>
                      {row.periods.map((col, j) => (
                        <TableCell key={j}>{col}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>

            {/* Classroom Cards */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Classrooms
              </h2>
              <div>
                List of students of this classroom:
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

export default StudentDashboard;
