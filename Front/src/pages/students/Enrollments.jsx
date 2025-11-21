import { useContext, useEffect, useState } from 'react'
import { Provider } from '../../context/AppContext'
// import axios from "axios"
// import toast from "react-toastify"
// const Enrollments = () => {

  


//   



// useEffect(() => {
//   if(user){
//     enrolledCourses()
//   }

  
// })

// useEffect(() => {
//   const getProgress = async ()=>{
//   try {
//     const token = await getToken()
//       const progressArray = await Promise.all(
//         enrolledCourses.map(async (course)=>{
//           const {data} = await axios.post(`${backendUrl}/api/user/get-progress` , {courseId:course._id} , {headers:{
//             Authorization:`Bearer ${token}`
//           }})
//           let totalLectures = totalLectures(course)
//           const  lecturesCompleted = data.progressData ? data.progressData.lecturesCompleted.length : 0
//           return {totalLectures , lecturesCompleted}
//         })
//       )
//       setProArray(progressArray)
//   } catch (error) {
//     toast.error(error.message)
//   }
// }
//   if(enrolledCourses.length > 0 ){
//     getProgress()
//   }

 
// }, [enrolledCourses , backendUrl ,getToken])



import React from 'react'

const Enrollments = () => {

const {enrolledCourses , totalDuration ,totalLectures ,getToken ,user, backendUrl} = useContext(Provider)

  const [coursesArray, setCoursesArray] = useState([])

  return (
    <div className='px-8 pt-10 md:px-32'>
      <h1 className='text-2xl font-semibold'>Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>

      <thead className='text-gray-900 border-b border-gray-200 text-sm text-left max-sm:hidden'>
           <tr>
            <th className='px-4 py-3 font-semibold truncate '>Course &#9733; </th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Total Lectures</th>
            <th className='px-4 py-3 font-semibold truncate'>Course Status</th>
          </tr>
        </thead>
      <tbody className='text-gray-600'>
          {coursesArray.map((course , index)=>( 
            <tr key={index} className='border-b border-gray/30'>
              <td className='flex items-center gap-2'><img src={course.thumbnail} alt="" className='w-14 sm:w-24 md:w-32' />
              <div className='flex-1'>
                <p>{course.title}</p></div></td>
                <td className='px-4 py-2 max-sm:hidden'>
                  {totalDuration(course)}
                </td>
                <td className='px-4 py-2 max-sm:hidden'>
                  {totalLectures(course)}
                </td>
                <td className='px-4 py-2 max-sm:text-right'>Completed</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Enrollments
