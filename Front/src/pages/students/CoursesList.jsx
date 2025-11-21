import  { useEffect, useState } from "react";
import { useContext } from "react";
import SearchBar from "../../components/students/SearchBar";
import { useParams } from "react-router-dom";
import { Provider } from "../../context/AppContext";
import CourseCard from "../../components/students/CourseCard";

const CoursesList = () => {
  const { input } = useParams();
  const {navigate , courses}= useContext(Provider)
  const [selectedCourse, setSelectedCourse] = useState([])


  useEffect(() => {
  
  if(courses && courses.length > 0){
    const cloneCourses = courses.slice()
    input ? 
    setSelectedCourse(cloneCourses.filter(course => course.title.toLowerCase().includes(input.toLowerCase())))
    : setSelectedCourse(cloneCourses)
  }
  
  }, [input ,courses ])
  return (
    <>
      <div className="px-8 md:px-32 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-500">Courses</h1>
            <p className="text-gray-500">
             
              <span className="text-blue-600 cursor-pointer" onClick={()=>navigate("/")}>Home</span> /
              <span>Courses</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && <div className="inline-flex items-center gap-2 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img src="" alt="" className="cursor-pointer" onClick={()=> navigate("/course-list")}/>
          </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-12 gap-3 px-2 md:p-0">
          {selectedCourse.map((course , i)=>{
            return <CourseCard key={i} course={course}/>
          })}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
