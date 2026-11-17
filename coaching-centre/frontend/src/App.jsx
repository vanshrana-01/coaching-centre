import React from 'react'
import {Routes, Route} from "react-router-dom"
import PublicLayout from './layouts/PublicLayout/PublicLayout'
import Home from "./pages/Home/Home"
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Courses from './pages/Courses/Courses'
import Teachers from './pages/Teachers/Teacher'
import StudentLayout from './layouts/StudentLayout/StudentLayout'
import Dashboard from './pages/Student/Dashboard'
import MyCourses from './pages/Student/MyCourses'
import Assignments from './pages/Student/Assignments'
import Certificates from './pages/Student/Certificates'
import Profile from './pages/Student/Profile'
import Settings from './pages/Student/Settings'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import TeacherLayout from './layouts/TeacherLayout/TeacherLayout'
import TeacherDashboard from './components/TeacherPanel/TeacherDashboard'
import TeacherCourses from './components/TeacherPanel/TeacherCourses'
import Students from './components/TeacherPanel/Students'


import TeacherProfile from './components/TeacherPanel/TeacherProfile'
import TeacherSettings from './components/TeacherPanel/TeacherSettings'
import Attendance from './components/TeacherPanel/Attendance'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import AdminDashboard from './pages/AdminPanel/AdminDashboard/AdminDashboard'
import AdminStudents from './pages/AdminPanel/AdminStudents/AdminStudents'
import AdminTeachers from './pages/AdminPanel/AdminTeachers/AdminTeachers'
import AdminCourses from './pages/AdminPanel/AdminCourses/AdminCourses'
import Payments from './pages/AdminPanel/Payments/Payments'
import Reports from './pages/AdminPanel/Reports/Reports'
import AdminSettings from './pages/AdminPanel/AdminSettings/AdminSettings'
import AdminAssignments from './pages/AdminPanel/AdminAssignments/AdminAssignments'
import CreateAssignment from './components/TeacherPanel/CreateAssignment'
import MyAssignments from './components/TeacherPanel/MyAssignments'
import ViewSubmissions from './components/TeacherPanel/ViewSubmissions'
import StudentAssignments from './pages/Student/StudentAssignments'

import MyClasses from './components/TeacherPanel/MyClasses'
import EditClass from './components/TeacherPanel/EditClass'
import CreateClass from './components/TeacherPanel/CreateClass'
import StudentAttendance from './pages/Student/StudentAttendance'
import CreateCourse from './components/TeacherPanel/CreateCourse'
import StudentCourseDetails from "./pages/Student/StudentCourseDetails"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PublicLayout/>}>
        <Route index element={<Home/>} />
        <Route path='about' element={<About/>} />
        <Route path='courses' element={<Courses/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>}/>
        <Route path='contact' element={<Contact/>} />
        <Route path='teachers' element={<Teachers/>}/>
        <Route path='courses/:id' element={<CourseDetails/>}/>
        </Route>
        <Route path='/student' element={<StudentLayout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='courses' element={<MyCourses/>}/>
        <Route path='courses/:courseId' element={<StudentCourseDetails/>}/>
        <Route path="assignments" element={<StudentAssignments />}/>
        <Route path='assignment' element={<Assignments/>}/>
        <Route path="attendance" element={<StudentAttendance />}/>
        <Route path='certificates' element={<Certificates/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='settings' element={<Settings/>}/>
        
        
        </Route>
        <Route path='/teacher' element={<TeacherLayout/>}>
        <Route path='dashboard' element={<TeacherDashboard/>}/>
        <Route path='my-courses' element={<TeacherCourses/>}/>
        <Route path='students' element={<Students/>}/>
        <Route path="create-class" element={<CreateClass />}/>
        <Route path="create-assignment" element={<CreateAssignment />}/>
        <Route path="my-assignments" element={<MyAssignments />}/>
        <Route path="assignment/:assignmentId/submissions" element={<ViewSubmissions />}/>
        <Route  path="/teacher/create-course" element={<CreateCourse />}/>
        <Route path="edit-class/:id" element={<EditClass />}/>
        <Route path="my-classes" element={<MyClasses />}/>
        <Route path='attendance' element={<Attendance/>}/>
        <Route path='profile' element={<TeacherProfile/>}/>
        <Route path='settings' element={<TeacherSettings/>}/>
        </Route>

<Route path='/admin' element={<AdminLayout/>}>
<Route path='dashboard' element={<AdminDashboard/>}/>
<Route path='students' element={<AdminStudents/>}/>
<Route path='teachers' element={<AdminTeachers/>}/>
<Route path='courses' element={<AdminCourses/>}/>
<Route path='payments' element={<Payments/>}/>
<Route path='reports' element={<Reports/>}/>
<Route path='settings' element={<AdminSettings/>}/>
<Route path='assignments' element={<AdminAssignments/>}/>

</Route>

      </Routes>

      
      
      
    </div>
  )
}

export default App
