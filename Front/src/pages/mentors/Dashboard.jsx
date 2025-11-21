import { useContext, useEffect, useState } from 'react'
import { Provider } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Dashboard = () => {
  const {mentor , backendUrl , getToken } = useContext(Provider)
  const [dashboard, setDashboard] = useState(null)

  
  useEffect(() => {
    const getDashboardData = async ()=>{
      try {
        const token = await getToken()
        const {data} = await axios.get(backendUrl + "/api/mentor/dashboard" , {headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
          setDashboard(data.dashboardData)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    if(mentor){
      getDashboardData()
    }
    
}, [mentor , backendUrl , getToken])

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-6 p-4 md:p-8'>
        <div>
         <div className='flex flex-wrap gap-5 items-center'>
            <div className='flex items-center gap-3 border border-blue-500 p-4 w-56 rounded-md'>
              {/* <img src="" alt="" /> */}
              <div className='flex items-center flex-col justify-center'>
                <p className='text-xl font-medium text-gray-500 '>Earnings </p>
                <span className='text-lg text-cyan-800 '>{dashboard?.totalEarnings}</span>
              </div>
            </div>
            <div className='flex items-center gap-3 border border-blue-500 p-4 w-56 rounded-md'>
              {/* <img src="" alt="" /> */}
              <div className='flex items-center flex-col justify-center'>
                <p className='text-xl font-medium text-gray-500 '>Total Courses </p>
                <span className='text-lg text-cyan-400 '>{dashboard?.totalCourses}</span>
              </div>
            </div>
            <div className='flex items-center gap-3 border border-blue-500 p-4 w-56 rounded-md'>
              {/* <img src="" alt="" /> */}
              <div className='flex items-center flex-col justify-center'>
                <p className='text-xl font-medium text-gray-500 '>Total Students </p>
                <span className='text-lg text-cyan-400'>{dashboard?.studentsData.length}</span>
              </div>
            </div>
         </div>
         <div>
          <h2 className='text-xl font-medium my-2'>Latest Enrollments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full rounded-md border border-gray-500/30 text-left'>
            <table>
              <thead className='text-gray-800 border-b border-gray-500/30 text-sm '>
                <tr>
                  <th className='px-4 py-2 font-semibold sm:table-cell'>#</th>
                  <th className='px-4 py-2 font-semibold'>Student Name</th>
                  <th className='px-4 py-2 font-semibold'>Course Title</th>
                </tr>
              </thead>
              <tbody className='text-gray-500'>
                {dashboard?.studentsData?.map((item , index)=>(
                  <tr key={index} className='border-b border-gray-500/30'>
                    <td className='px-4 py-2 text-center hidde sm:table-cell'>
                        {index +1}
                    </td>
                    <td className='px-2 py-3 flex items-center'>
                      <img src={item.student.imageUrl} alt="profile image" className='w-8 h-8 rounded-full' />
                      <span>{item.student.name}</span>
                    </td>
                    <td className='px-4 py-3'>{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody> 
            </table>
          </div>
         </div>
        </div>
    </div>
  )
}

export default Dashboard