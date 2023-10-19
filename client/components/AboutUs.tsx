import Image from "next/image";

import { aboutUsImages } from "@/constants";

const AboutUs = () => {
  return (
    <section id="aboutUs" className="flex-center">
      <div className=" my-[108px] max-xs:my-[50px]">
        <div className="main-container max-xs:hidden">
          <h2 className="text-center text-[30px] font-semibold max-xs:text-[20px]">
            Nosotros
          </h2>
          <p className="mt-[15px] text-center text-[20px]">
            Nuestro equipo cuenta con más de 60 profesionales en el área,
            trabajamos cada día para brindarte mejores experiencias. <br />
            Buscamos que mas personas como vos puedan gestionar y asesorarse
          </p>
        </div>
        <div className="mt-[80px] grid w-full max-w-[1440px] grid-cols-4 max-xs:mt-0">
          {aboutUsImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`about us ${index}`}
              width={360}
              height={550}
              className="h-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
