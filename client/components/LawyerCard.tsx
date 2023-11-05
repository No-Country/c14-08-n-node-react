import Link from "next/link";
import Image from "next/image";

import { LawyerRating } from ".";

import { ILawyer } from "@/types";
import { formatPrice } from "@/utils/format";

const LawyerCard = ({
  id,
  name,
  lastName,
  rating,
  imageUrl,
  lawyer,
}: ILawyer) => {
  return (
    <Link href={`/abogados/${id}`}>
      <div className="relative flex w-full flex-col rounded-[10px] bg-gray-200 py-[25px] ">
        {/* <div className="absolute right-0 top-0 mr-[15px] mt-[10px] flex justify-end">
          <LawyerRating rating={rating} />
        </div> */}
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
          <div className="flex flex-1 flex-col justify-center">
            <div className="capitalize">
              <p className="w-full text-center text-[15px] font-bold">{name}</p>
              <p className="text-center text-[15px]">{lastName}</p>
            </div>
            <p className="mt-6 text-center text-[12px]">
              Precio Consulta: ${formatPrice(lawyer[0].price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LawyerCard;
