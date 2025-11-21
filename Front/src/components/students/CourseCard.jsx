import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Provider } from '../../context/AppContext'
import star from '../../assets/star-0.svg'
const CourseCard = ({course}) => {
    const {calculateRating}= useContext(Provider)
  return (
        <Link to={`/course/` + course._id} onClick={()=> scrollTo(0,0)} className='border border-gray-500/30 pb-4 rounded-md'>
    <div>
        <img src={course.thumbnail} alt="" className='w-full h-30'/>
        <div className='p-3 text-left'>
            <h3 className='text-base font-semibold'>{course.title}</h3>
            <p className='text-gray-500'>{course.instructor.name.split(" ")[0]}</p>
            <div className='flex items-center '>
                <p>{calculateRating(course)}</p>
                <div className='flex mx-2'>
                    {[...Array(5)].map((_,i)=>(
                        <img src={i < calculateRating(course)? "" : star} key={i} className='w-3.5 h-3.5'/>
                    ))}
                </div> 
                <p className='text-gray-500'>{course.ratings.length} Rates</p>
            </div>
            <p className='text-base font-semibold text-gray-800'>{(course.price - course.discount * course.price /100).toFixed(2)} $</p>
        </div>
    </div>
    </Link>
  )
}

export default CourseCard