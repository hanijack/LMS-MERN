import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/students/Home";
import HomeM from "./pages/mentors/HomeM";
import AddCourse from "./pages/mentors/AddCourse";
import NavBar from "./components/students/NavBar";
import CoursesList from "./pages/students/CoursesList";
import { ToastContainer} from "react-toastify"
import Dashboard from "./pages/mentors/Dashboard";
import MyCourses from "./pages/mentors/MyCourses";
import EnrolledStudents from "./pages/mentors/EnrolledStudents";
import "quill/dist/quill.snow.css"
import CourseDetails from "./pages/students/CourseDetails";
import Footer from "./components/students/Footer";
import Enrollments from "./pages/students/Enrollments";
const App = () => {
  const isMentor = useMatch("/mentor/*")


  return (
    <div className="text-gray-500 min-h-screen bg-white">
      <ToastContainer/>
      {!isMentor && <NavBar/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AddCourse/>} />
        <Route path="/enrollments" element={<Enrollments/>} />
        <Route path="/course-list" element={<CoursesList/>} />
        <Route path="/course-list/:input" element={<CoursesList/>} />
        <Route path="/course/:id" element={<CourseDetails/>} />

        <Route path="/mentor" element={<HomeM/>} >
          <Route  path="" element={<Dashboard/>} />
          <Route  path="add-courses" element={<AddCourse/>} />
          <Route  path="my-courses" element={<MyCourses/>} />
          <Route  path="enrolled-students" element={<EnrolledStudents/>} />
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
