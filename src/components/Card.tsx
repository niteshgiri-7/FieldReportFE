import type { FC } from "react";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import { getTimeAgo } from "../utils/helpers";
import type { IReports } from "../hooks/useReports";

type props = {
    item: IReports
}
const bucket = import.meta.env.VITE_BUCKET;
const Card: FC<props> = ({ item }) => {
 //directly rendering the newly created image,if bucket bata fetch garya ho vaney bucket info use garne
 const isBase64 = item.image_url.startsWith("data:image");
  const imageUrl = isBase64 
    ? item.image_url 
    : `${bucket}${item.image_url}`;
    return (
        <div className="min-w-sm max-w-sm min-h-[250px] bg-white rounded-xl">
            <div>
                <img src={imageUrl} alt="image" className="min-h-[80%] min-w-full max-w-full rounded-tl-xl rounded-tr-xl" />
            </div>
            <div className="flex flex-col p-3 text-gray-400 font-semibold">
                <div className="flex gap-3 items-center">
                    <CiTimer className="font-bold text-xl" />
                    <p>{getTimeAgo(`${item.captured_at}Z`)||"0 s ago"}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <CiLocationOn className="font-bold text-xl" />
                    <p>{item.latitude}{" ,"}{item.longitude}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
