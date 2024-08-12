import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import TeacherDashboard from './components/TeacherDashboard'
import StudentDashboard from './components/StudentDashboard'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path='/dashboard/teacher' element = {<TeacherDashboard/>}/>
        <Route path='/dashboard/student' element = {<StudentDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
