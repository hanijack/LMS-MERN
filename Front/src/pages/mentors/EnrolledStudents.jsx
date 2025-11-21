import { useContext, useEffect, useState } from "react"
import Loading from "../../components/students/Loading"
import { Provider } from "../../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const EnrolledStudents = () => {

  const {backendUrl , mentor , getToken} = useContext(Provider)
  const [studentsEnrolled, setstudentsEnrolled] = useState(null)

  
  useEffect(()=>{
    const fetchStudents = async()=>{
      try {
        const token = await getToken()
        const {data} = await axios.get(backendUrl + "/api/mentor/students-enrolled" , {headers:{Authorization:`Bearer ${token}`}})
        data.success && setstudentsEnrolled(data.students)
      } catch (error) {
        toast.error(error.message)
      }
    }
    if(mentor){

    fetchStudents()
  }
}, [mentor , backendUrl , getToken])


  return studentsEnrolled ?(
    <div className="min-h-screen flex flex-col items-start justify-between p-4 py-2 ">
      <div className="">
        <table>
          <thead className="text-gray-800 border-b border-gray-500/20 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold text-center ">Student Name</th>
              <th className="px-4 py-3 font-semibold text-center ">Course Title</th>
              <th className="px-4 py-3 font-semibold text-center sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-500 text-sm">
            {studentsEnrolled.map((item , index)=>(
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 sm:table-cell">{index +1}</td>
                <td className="flex items-center px-4 py-3">
                  <img src={item.student.imageUrl} alt="Student Image" className="w-8 h-8 rounded-full"/>
                  <span>{item.student.name}</span>
                </td>
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3 sm:table-cell">{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ):<Loading/>
}

export default EnrolledStudents