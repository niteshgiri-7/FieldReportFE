import { useState } from "react";
import Card from "../components/Card";
import CameraCapture from "../components/CameraCapture";
import { useReports, type IReports } from "../hooks/useReports";
import useErrorNotification from "../hooks/useErrorNotification";
import { useUser } from "../context/getContext";
import { Link } from "react-router-dom";



const UserDashBoard: React.FC = () => {
  const { isLoading, error, reports, setReports } = useReports();
  const { userId } = useUser();
  useErrorNotification(error.isError, error.message)
  const [showCamera, setShowCamera] = useState<boolean>(false);


  const finalRole = localStorage.getItem("role") || "user";

  console.log(finalRole)

  const handleNewImgCapture = (image: string, location: { latitude: number; longitude: number }): void => {
    const newReport: IReports = {
      image_url: image,
      captured_at: new Date().toISOString(),
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      user_id: userId!,
      id: String(Math.floor(Math.random() * 9).toFixed(0)),
    };
    setReports(prev => [newReport, ...prev]);
    setShowCamera(false);
  };
console.log(showCamera)
  return (
    <div className="p-10">
      <div className="md:w-[90%] mx-auto flex  items-center justify-between">
        <h1 className="text-2xl font-bold">{finalRole === "user" ? "Your Reports" : "Submitted Reports"}</h1>
        {
          finalRole === "admin" ?
            <Link to="/manage-users">
              <button className="px-4 py-2 bg-blue-500 rounded-xl font-semibold  text-white cursor-pointer  hover:bg-blue-800">Manage Users</button>
            </Link>
            :
            null
        }
      </div>
      {
        isLoading ?
          <h1>Loading</h1> :
          !showCamera && reports?.length > 0
            ?
            <div className="flex max-w-[90vw] mx-auto justify-around flex-wrap  gap-5 mt-10">
              {reports?.map((reports) => (
                <Card key={reports.id} item={reports} />
              ))}
            </div>
            :
            <div className="w-full flex h-[60vh] justify-center items-center">
              <h1 className="text-3xl font-bold">
                {
                  finalRole === "user" ?
                    "You haven't submitted any Reports yet!"
                    :
                    "Users haven't submitted any Reports yet!"
                }

              </h1>
            </div>
      }
   {
  finalRole === "user" ? (
    <>
      <div className="w-full flex justify-center">
        <button
          className="px-4 py-2 bg-blue-600 font-semibold hover:bg-blue-800 rounded-lg text-white mt-24"
          onClick={() => setShowCamera(true)}
        >
          Capture New Image
        </button>
      </div>
      {showCamera && (
        <CameraCapture
          onCapture={handleNewImgCapture}
          onCancel={() => setShowCamera(false)}
        />
      )}
    </>
  ) : null
}
    </div>
  )
}

export default UserDashBoard;