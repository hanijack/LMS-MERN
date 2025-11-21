import { useContext, useEffect, useState } from "react";
import { Provider } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  const { backendUrl, mentor, getToken } = useContext(Provider);
  const [mentorCourses, setMentorCourses] = useState(null);

  useEffect(() => {
    const fetchMentorCourses = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(backendUrl + "/api/mentor/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        data && setMentorCourses(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (mentor) {
      fetchMentorCourses();
    }
  }, [mentor, backendUrl, getToken]);

  return mentorCourses ? (
    <div className="h-screen flex flex-col items0start justify-between md:p-6 p-4">
      <div className="w-full">
        <h2 className="text-lg font-semibold">My Courses</h2>
        <div className="flex flex-col items-center max-w-3xl w-full rounded-md border border-gray-500/20">
          <table className="table-fixed md:table-auto w-full">
            <thead className="text-gray-800 border-b border-gray-500/20 text-left">
              <tr>
                <th className="px-4 -py-3 font-semibold">Courses</th>
                <th className="px-4 -py-3 font-semibold">Earnings</th>
                <th className="px-4 -py-3 font-semibold">students</th>
                <th className="px-4 -py-3 font-semibold">Published On</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {mentorCourses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 flex items-center">
                    <img
                      src={course.thumbnail}
                      alt="Course Image"
                      className="w-12 h-8 object-cover rounded-md mr-2"
                    />
                    <span className="hidden md:block ">{course.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    ${" "}
                    {Math.floor(
                      course.studentsEnrolled.length *
                        (course.price - (course.discount * course.price) / 100)
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {course.studentsEnrolled.length}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
