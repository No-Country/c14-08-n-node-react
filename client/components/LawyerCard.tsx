import Link from "next/link";
import Image from "next/image";

import { LawyerRating } from ".";

import { ILawyer } from "@/types";

const LawyerCard = ({ id, name, last_name, rating, imageUrl }: ILawyer) => {
  return (
    <Link href={`abogado/${id}`}>
      <div className="flex w-full flex-col rounded-[10px] bg-gray-200 py-[10px] pl-[33px] pr-[10px]">
        <div className="flex justify-end">
          <LawyerRating rating={rating} />
        </div>
        <div className="relative my-[10px] flex items-center gap-[46px]">
          <div></div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="profile picture"
              height={60}
              width={60}
              className="absolute rounded-full"
            />
          ) : (
            <div className="absolute h-[60px] w-[60px] rounded-full bg-gray-700" />
          )}
          <div className="flex flex-1 justify-center">
            <div>
              <p className="text-center text-[15px] font-bold">{name}</p>
              <p className="text-center text-[12px]">{last_name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LawyerCard;
