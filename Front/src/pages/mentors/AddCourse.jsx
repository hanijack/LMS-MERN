import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from "quill"
import uniqid from "uniqid"
import logo from "../../assets/react.svg"
import arrow from "../../assets/down_arrow_icon.svg"
import close from "../../assets/cross_icon.svg"
import { Provider } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'



const AddCourse = () => {
  const {backendUrl , getToken } = useContext(Provider)

const quillRef = useRef(null)
const editRef = useRef(null)

const [title, setTitle] = useState("")
const [price, setPrice] = useState(0)
const [discount, setDiscount] = useState(0)
const [image, setImage] = useState(null)
const [chapters, setChapters] = useState([])
const [currentChapter , setCurrentChapter] = useState(null)
const [popUp ,  setPopUp] = useState(false)
const [lecture , setLecture]= useState({
  lecturetitle:"",
  lectureDuration:"",
  
})



  const handleChapter = (action , chapterId)=>{
    if(action === "add"){
      const title = prompt("Enter Chapter name ")
      if(title){
        const newChapter = {
          chapterId : uniqid(),
          chapterTitle: title , 
          chapterContent:[],
          close:false,
          chapterOrder: chapters.length >0 ? chapters.slice(-1)[0].chapterOrder +1 : 1
        }
        setChapters([...chapters , newChapter])
      }
    }else if(action === "remove"){
      setChapters(chapters.filter(chapter => chapter.chapterId !== chapterId))
    }else if(action ==="toggle"){
      setChapters(
        chapters.map(chapter => chapter.chapterId === chapterId ?{...chapter , close:!chapter.close} :chapter)
      )
    }
  }

  const handleLecture = (action , chapterId , lectureIndex)=>{
    if(action ==="add"){
      setCurrentChapter(chapterId)
      setPopUp(true)
    }else if(action === "remove"){
      setChapters(
        chapters.map(chapter =>{
          if(chapter.chapterId === chapterId){
            chapter.chapterContent.splice(lectureIndex , 1)
          }
          return chapter
        })
      )
    }
  }

  const addLecture = ()=>{
    setChapters(
      chapters.map(chapter =>{
        if(chapter.chapterId === currentChapter){
          const newLecture = {
            ...lecture , 
            lectureOrder:chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 :1 ,
            lectureId:uniqid()
          }
          chapter.chapterContent.push(newLecture)
        }
        return chapter
      })
    )
    setPopUp(false)
    setLecture({
      lecturetitle:"",
      lectureDuration:"",
    })
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      if(!image){
        toast.error("Please insert an image")
      }

      const sanitizedChapters = chapters.map(({ close, ...rest }) => ({
      ...rest
      }));
      const courseData = {
        title , 
        description :quillRef.current.root.innerHTML , 
        price:Number(price),
        discount: Number(discount),
        content:sanitizedChapters,

      }


      const formData = new FormData()
      formData.append("courseData" , JSON.stringify(courseData))
      formData.append("image" ,image )

      const token = await getToken()
      const {data}= await axios.post(backendUrl + "/api/mentor/add-course" , formData , {headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        toast.success(data.message)
        setTitle("")
        setDiscount(0)
        setImage(null)
        setPrice(0)
        setChapters([])
        quillRef.current.root.innerHTML= ""
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.error)
    }
  }

  useEffect(() => {
    if(!quillRef.current && editRef.current){
      quillRef.current= new Quill(editRef.current , {
        theme:"snow"
      })
    }
  
   
  }, [])
  

  return (
    <div className='h-screen flex flec-col items-start justify-between p-4 md:p-6 '> 
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input type="text" onChange={e => setTitle(e.target.value)} value={title} placeholder='Course Title' className='outline-none py-2 px-4 rounded border border-gray-400 ' required/>
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course Discription</p>
          <div ref={editRef}></div>
        </div>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price </p>
            <input type="number" onChange={e => setPrice(e.target.value)} value={price} placeholder='0' min={0} className='outline-none py-2 w-28 px-3 border border-gray-500 rounded' required/>
          </div>
          <div className='flex md:flex-row flex-col items-center gap-3 '> 
            <p>Course Thumbnail</p>
              <label htmlFor="image" className='flex items-center gap-2'>
                <img src={logo} alt="" className='bg-blue-500 rounded' />
                <input type="file" id='image' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden/>
                <img src={image ? URL.createObjectURL(image) :""} alt="" />
              </label>
          </div>

        </div>
        <div className='flex flex-col gap-2'>
          <p>Discount %</p>
          <input type="number" onChange={e=>setDiscount(e.target.value) } value={discount} placeholder='0' min={0} max={100} className='outline-none  py-2 w-28 px-4 rounded border border-gray-500 ' required/>
        </div>

        <div>
          {chapters.map((chapter , index)=>(
            <div key={index} className='mb-3 rounded border' >
                  <div className='flex justify-between items-center p-4 border-b'>
                      <div className='flex items-center'>
                        <img src={arrow} width={14} alt="" className={`mr-2 cursor-pointer transition-all ${chapter.close && "-rotate-90"}`} onClick={()=>handleChapter("toggle" , chapter.chapterId)}/>
                        <span className='font-semibold'>{index + 1} {chapter.chapterTitle}</span>
                      </div>
                      <span className='text-gray-500'>{chapter.chapterContent.length}Lectures</span>
                      <img src={close} alt="" className='cursor-pointer' onClick={()=>handleChapter("remove" , chapter.chapterId)}/>
                  </div>
                  {!chapter.close && (
                    <div className='p-4'>
                      {chapter.chapterContent.map((lecture , index)=>(
                          <div key={index} className='flex justify-between items-center mx-2'>
                              <span>{index +1} {lecture.lecturetitle } -{lecture.lectureDuration} </span>
                              <img src={close} alt=""  className='cursor-pointer' onClick={()=> handleLecture("remove" , chapter.chapterId)}/>
                          </div>
                      ))}
                      <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer my-2' onClick={()=>handleLecture("add" ,chapter.chapterId  )}>+ Add Lecture</div>
                    </div>
                  )}
            </div>
          ))}
          <div className='flex justify-center items-center bg-blue-400 p-2 rounded-md cursor-pointer mt-2 text-white' onClick={()=> handleChapter("add")}>+ Add Chapter</div>
        </div>
        {popUp && (
          <div className='fixed flex items-center inset-0 justify-center bg-gray-800'>
            <div className='bg-white text-gray-600 p-4 rounded relative w-full max-w-80'>
                <h2>Add Lecture</h2>
                <div>
                  <p>Lecture Title</p>
                  <input type="text" value={lecture.lecturetitle} className='block w-full border rounded py-2 px -2 ' onChange={e => setLecture({...lecture , lecturetitle:e.target.value})} />
                </div>
                <div>
                  <p>Duration (minutes)</p>
                  <input type="number" value={lecture.lectureDuration} className='block w-full border rounded py-2 px -2 ' onChange={e => setLecture({...lecture , lectureDuration:e.target.value})} />
                </div>
                <button type='button' className='w-full bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer' onClick={addLecture}>Add</button>
                <img src={close} alt="" className='absolute top-4 right-4 w-4 cursor-pointer ' onClick={()=> setPopUp(false)} />
            </div>
          </div>
        )

        }
          <button type='submit' className='bg-black text-white w-max py-2 px-6 rounded my-4 cursor-pointer'>Add</button>
      </form>
    </div>
  )
}

export default AddCourse