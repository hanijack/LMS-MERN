import { Link } from 'react-router-dom'

const CoursesSection = () => {
  return (
    <div className='py-16 md:px-40 px-8'>
        <h2 className='text-3xl font-medium text-gray-800 '>Learn with joy  </h2>
        <p className='text-sm md:text-base text-gay-500 mt-3 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, corrupti animi et modi aliquam molestias debitis assumenda quaerat maxime eum.</p>

        <Link to="/course-list" onClick={()=> scrollTo(0,0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded mt-4 inline-block'> Show All Courses</Link>
    </div>
  )
}

export default CoursesSection