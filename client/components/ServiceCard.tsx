import Image from "next/image";
// import Link from "next/link";

import { IServiceCard } from "@/types";

const ServiceCard = ({ label, href, image, description }: IServiceCard) => {
  return (
    <div className="flex flex-col items-center rounded-[6px] bg-gray-200 px-[25px] py-[20px]">
      <Image
        alt="service image"
        src={image}
        width={236}
        height={189}
        className="h-full max-h-[180px] w-full max-w-[239px] rounded-[2px] object-cover"
      />
      <p className="mt-[12px] text-center text-[16px] font-semibold">{label}</p>
      <p className="mt-[12px] text-center text-[10px] font-medium leading-[16px]">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
