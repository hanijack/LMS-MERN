import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {
  const {path} = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    if(path){
      const timer = setTimeout(()=>{
        navigate(`/${path}`)
      }, 4000)
      return ()=> clearTimeout(timer)
    }
  })
  return (
    <div className='flex justify-center items-center w-full h-screen'><div className='w-16 sm:w-20 border-4 border-gray-400 brder-t-4 border-t-blue-400 rounded-full animate-spin'>
      </div>Loading</div>
  )
}

export default Loading 