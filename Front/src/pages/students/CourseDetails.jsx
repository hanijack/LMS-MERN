import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Provider } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import star from "../../assets/star-0.svg";
import star1 from "../../assets/star-1.svg";
import arrow from "../../assets/down_arrow_icon.svg";
import clock from "../../assets/clock-icon.svg";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const {
    calculateRating,
    calculateChapterTime,
    totalDuration,
    totalLectures,
    backendUrl,
    userData,
    getToken,
  } = useContext(Provider);







  //   // useEffect(() => {
//   // if(user , courseData){
//   //     setIsEnrolled(user.enrolledCourses.includes(courseData._id))
//   // }

//   // }, [user , courseData])


const enrollCourse = async () => {
  try {
    if (!userData) {
      return toast.warn("You should log in before enrolling");
    }
    if (!courseData) {
      return toast.error("Course data not loaded");
    }
    if (isEnrolled) {
      return toast.warn("You already have this course");
    }

    const token = await getToken();
    if (!token) {
      return toast.error("Unable to retrieve auth token");
    }

    const { data } = await axios.post(
      `${backendUrl}/api/user/purchase`,
      { courseId: courseData._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      const { url } = data;
      window.location.replace(url);
    } else {
      toast.error(data?.message || "Failed to start purchase");
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  const [open, setOpen] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchedCourse = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/courses/${id}`);
        if (data.success) {
          setCourseData(data.course);
        } else {
          toast.error(data.message || "Failed to fetch course");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) fetchedCourse();
  }, [id, backendUrl]);

  const openSection = (index) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!courseData) return <Loading />;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between md:px-32 px-8 md:pt-30 pt-20 text-left">
      <div className="w-full bg-gradient-to-b from-yellow-100/80 p-6 rounded-md">
        <div className="max-w-xl text-gray-500">
          <h1 className="font-semibold text-gray-800">{courseData?.title || "Untitled Course"}</h1>

          <div
            className="font-medium text-gray-500 pt-4"
            dangerouslySetInnerHTML={{
              __html: courseData?.description?.slice(0, 150) || "No description available",
            }}
          ></div>

          <div className="flex items-center py-2">
            <p>{calculateRating?.(courseData) || 0}</p>
            <div className="flex px-2">
              {[...Array(5)].map((_, i) => (
                <img
                  src={i > Math.floor(calculateRating?.(courseData) || 0) ? star : star1}
                  key={i}
                  className="w-3.5 h-3.5"
                  alt="rating star"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData?.ratings?.length || 0}{" "}
              {(courseData?.ratings?.length || 0) > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData?.studentsEnrolled?.length || 0}{" "}
              {(courseData?.studentsEnrolled?.length || 0) > 1 ? "students" : "student"}
            </p>
          </div>

          <p>Course {courseData.title}</p>
          <p>
            Given By: {courseData.instructor?.name?.split(" ")[0] || "unknown"}
          </p>

          <div className="pt-6 text-gray-800">
            <div className="py-8">
              <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
              <p
                className="font-medium text-gray-500 pt-4"
                dangerouslySetInnerHTML={{ __html: courseData.description || "No description" }}
              ></p>
              <h2 className="text-xl font-semibold mt-6">Course Structure</h2>
            </div>

            <div className="pt-4">
              {Array.isArray(courseData?.content) &&
                courseData.content.map((chapter, index) => (
                  <div key={index} className="border border-gray-300 bg-white rounded ">
                    <div
                      className="flex items-center justify-between px-4 py-2 cursor-pointer"
                      onClick={() => openSection(index)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={arrow}
                          alt="arrow icon"
                          className={`mr-2 cursor-pointer transition-all ${
                            open[index] && "-rotate-90"
                          }`}
                        />
                        <p className="text-gray-600 text-sm ">
                          {chapter?.chapterTitle || "Untitled Chapter"}
                        </p>
                      </div>
                      <p className="text-sm">
                        {chapter?.chapterContent?.length || 0} lectures -{" "}
                        {calculateChapterTime?.(chapter) || "0h"}
                      </p>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        open[index] ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <ul className="list-disc px-4 py-2 text-gray-600 border-t border-b-gray-300/70">
                        {Array.isArray(chapter?.chapterContent) &&
                          chapter.chapterContent.map((lecture, idx) => (
                            <li key={idx} className="flex  gap-2 py-1">
                              <div className="flex justify-between w-full text-sm">
                                <p className="pl-8">{lecture?.lecturetitle || "Untitled Lecture"}</p>
                                 <p>{lecture?.lectureDuration + " minutes"|| "0 m"}</p>

                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[300px] sm:min-w-[420px]">
        <img src={courseData.thumbnail || ""} alt="thumbnail" />
        <div className="p-4">
          <div className="flex items-center pt-2 gap-2">
            <p className="text-gray-800 text-xl lg:text-2xl font-semibold">
              {(
                courseData.price -
                ((courseData.discount || 0) * (courseData.price || 0)) / 100
              ).toFixed(2)}
            </p>
            <p className="text-gray-500 text-md line-through md:text-lg">{courseData.price || 0}</p>
            <p className="text-gray-500 text-lg md:text-2lg font-semibold">{courseData.discount || 0}% off</p>
          </div>

          <div className="flex items-center text-sm gap-4 py-2 text-gray-500">
            <div className="flex items-center gap-1">
              <img src={star} alt="star" />
              <p>{calculateRating?.(courseData) || 0}</p>
            </div>
            <div className="h-4 w-px bg-gray-500/30"></div>
            <div className="flex items-center gap-1">
              <img src={clock} alt="time clock" />
              <p>{totalDuration?.(courseData) || "0h"}</p>
            </div>
            <div className="h-4 w-px bg-gray-500/30"></div>
            <div className="flex items-center gap-1">
              <img src={clock} alt="clock icon" />
              <p>{totalLectures?.(courseData) || 0} lessons</p>
            </div>
          </div>

          <button
            className="mt-4 w-full py-2 rounded bg-blue-500 text-white font-medium cursor-pointer"
            onClick={enrollCourse} 
          >
            {isEnrolled ? "Enrolled Already" : "Enroll course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;


