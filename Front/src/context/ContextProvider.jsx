import {  useState } from "react"
import { Provider } from "./AppContext"
import {useAuth , useUser} from "@clerk/clerk-react"
import { useEffect } from "react"
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import humanizeDuration from "humanize-duration"



const ContextProvider = ({children}) => {
const backendUrl = import.meta.env.VITE_BACKEND_URL
const {getToken} = useAuth()
const {user} = useUser()
const [courses, setCourses] = useState([])
const [enrolledCourses, setEnrolledCourses] = useState([])
const [userData, setuserData] = useState(null)
const [mentor, setMentor] = useState(true)
const navigate = useNavigate()

const calculateRating = (course)=>{
  if(course.ratings.length ===0 ){
    return 0 
  }
  let totalRating = 0
  course.ratings.forEach(rate =>{
    totalRating +=rate.rating
  })
  return Math.floor(totalRating / course.ratings.length)
}

const calculateChapterTime = (chapter)=>{
  let time = 0 
  chapter.chapterContent.forEach(lecture => time +=Number(lecture.lectureDuration))
  return humanizeDuration(time * 60 * 1000 , {units:["h" , "m"]})
}

const totalDuration = (course)=>{
  let time = 0 
  course.content.forEach(chapter => chapter.chapterContent.map(lecture=> time+=Number(lecture.lectureDuration)))
    return humanizeDuration(time * 60 * 1000 , {units:["h" , "m"]})

}

const totalLectures = (course)=>{
  let lectures = 0
  course.content.forEach(chapter =>{
    if(Array.isArray(chapter.chapterContent)){
      lectures+= chapter.chapterContent.length
    }
  })
  return lectures
}


useEffect(() => {
  const fetchCourses = async()=>{
    try {
       const {data}=await axios.get( backendUrl + `/api/courses`)
      if(data.success){
        setCourses(data.courses)
      }else{
         toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  fetchCourses()
}, [])


const logToken = async()=>{
  console.log(await getToken())
}


const getEnrolledCourses = async ()=>{
    try {
    
      const token = await getToken()
      const {data} = await axios.get(backendUrl , `/api/user/enrolled-courses` , {headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
          setEnrolledCourses(data.enrolledCourses) 
        }else{
            toast.error(data.message)
          }
        } catch (error) {
            toast.error(error.message)
          }
        } 
        
        const getUserData = async()=>{
          if(user.publicMetadata.role === "mentor"){
            setMentor(true)
          }
          try {
            const token = await getToken()
            const {data} = await axios.get(backendUrl + '/api/user' , {headers:{Authorization:`Bearer ${token}`}})
            if(data){
              setuserData(data)
              console.log(data)
            }else{
              toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        }

useEffect(()=>{
  
  if(user){
    logToken()
    getUserData()
    getEnrolledCourses()
  }
},[user])


    const data = {
        mentor , setMentor,courses, userData, backendUrl , setuserData , getToken,
        enrolledCourses,navigate,calculateRating,totalLectures,totalDuration,calculateChapterTime
    }
  return (
    <Provider.Provider value={data}>
        {children}
    </Provider.Provider>    
  )
}

export default ContextProvider