import Image from "next/image";
// import Link from "next/link";

import { IServiceCard } from "@/types";

const ServiceCard = ({ label, href, image, description }: IServiceCard) => {
  return (
    <div className="rounded-[6px] px-[25px] py-[20px]">
      <Image alt="service image" src={image} width={236} height={189} />
    </div>
  );
};

export default ServiceCard;
