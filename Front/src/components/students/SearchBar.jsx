import React, { useState } from 'react'
import logo from "../../assets/react.svg"
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

    const navigate = useNavigate()
    const [search , setSearch] = useState(data ? data : "")

    const serachHandler = (e)=>{
        e.preventDefault()
        navigate(`/course-list/` + search)
        }
  return (
    <div>
        <form onSubmit={serachHandler} className='max-w-2xl w-full md:h-12 h-12 flex items-center border border-gray-500/20 rounded '>
            <img src={logo} className='w-auto px-3'/>
            <input type="text" placeholder='Search for Courses' className='w-full h-full outline-none text-gray-500 ' onChange={e=> setSearch(e.target.value)} value={search}/>
            <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-6 md:py-3 py-2 '> Search</button>
        </form>
    </div>
  )
}

export default SearchBar