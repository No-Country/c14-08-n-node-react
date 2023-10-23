import Link from "next/link";
import Image from "next/image";

import { LawyerRating } from ".";

import { ILawyer } from "@/types";

const LawyerCard = ({ id, name, last_name, rating, imageUrl }: ILawyer) => {
  return (
    <Link href={`/abogado/${id}`}>
      <div className="relative flex w-full flex-col rounded-[10px] bg-gray-200 py-[25px] ">
        <div className="absolute right-0 top-0 mr-[15px] mt-[10px] flex justify-end">
          <LawyerRating rating={rating} />
        </div>
        <div className="relative my-[10px] flex items-center gap-[46px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="profile picture"
              height={60}
              width={60}
              className="absolute rounded-full"
            />
          ) : (
            <div className="absolute ml-[33px] h-[60px] w-[60px] rounded-full bg-gray-700 max-md:ml-[15px]" />
          )}
          <div className="flex flex-1 justify-center">
            <div>
              <p className="w-full text-center text-[15px] font-bold">{name}</p>
              <p className="text-center text-[12px]">{last_name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LawyerCard;
