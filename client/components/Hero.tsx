import Image from "next/image";

const Hero = () => {
  return (
    <section className="max-xs:h-[390px] flex-center relative mt-5 h-[528px]">
      <Image
        alt="hero"
        src="/images/hero-bg.jpg"
        fill
        style={{
          objectFit: "cover",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          objectPosition: "center",
        }}
      />
      <div className="flex-center main-container max-xs:px-[90px] z-10 h-full flex-col pb-[108px] pt-[64px] text-white max-md:px-[30px] max-sm:px-[60px]">
        <div className="w-full">
          <h1 className="max-xs:text-[20px] max-xs:leading-[20px] text-[60px] font-bold leading-[60px] max-md:text-[40px] max-md:leading-[40px] max-sm:text-[30px] max-sm:leading-[30px]">
            Buscá profesionales en <br /> línea que puedan <br /> asesorarte
          </h1>
          <p className="max-xs:text-[12px] max-xs:leading-[16px] mt-[36px] text-[20px] leading-[25px]">
            Contamos con con más de 60 profesionales que se desarrollan <br />
            en distintas áreas, todo está al alcance de un click
          </p>
        </div>
        <div className="mt-[42px] flex w-full gap-[34px] max-md:flex-col max-md:items-center">
          <div className="flex h-[58px] w-full flex-1 items-center rounded-[15px] bg-white/[.5] px-[15px] py-[10px] max-md:py-[0] ">
            <button className="rounded-[8px] bg-gray-300 px-[40px] py-[12px] text-[15px] font-medium text-black max-md:hidden">
              Más cercanos
            </button>
            <input
              type="text"
              size={1}
              className="max-xs:h-[30px] flex-1 px-[15px] text-[15px] font-bold text-black max-md:h-[48px]"
            />
          </div>
          <button className="max-xs:h-[30px] h-[58px] rounded-[8px] bg-gray-400 px-[120px] text-[20px] font-bold text-black max-md:h-[48px] max-md:w-full max-md:px-0 max-md:py-0">
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
