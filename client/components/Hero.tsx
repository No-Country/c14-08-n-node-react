import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex-center relative mt-5 h-[528px] max-xs:h-[390px]">
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
      <div className="flex-center main-container max-xs:wh-[90px] z-10 h-full flex-col pb-[108px] pt-[64px] text-white max-md:px-[30px] max-sm:px-[60px]">
        <div className="w-full">
          <h1 className="text-[60px] font-bold leading-[60px] max-md:text-[40px] max-md:leading-[40px] max-sm:text-[30px] max-sm:leading-[30px] max-xs:text-[20px] max-xs:leading-[20px]">
            Buscá profesionales en <br /> línea que puedan <br /> asesorarte
          </h1>
          <p className="mt-[36px] text-[20px] leading-[25px] max-xs:mt-[12px] max-xs:text-[12px] max-xs:leading-[16px]">
            Contamos con con más de 60 profesionales que se desarrollan <br />
            en distintas áreas, todo está al alcance de un click
          </p>
        </div>
        <div className="mt-[42px] flex w-full gap-[34px] max-md:flex-col max-md:items-center max-xs:mt-[20px] max-xs:gap-[10px]">
          <div className="flex h-[58px] w-full flex-1 items-center rounded-[15px] bg-white/[.5] px-[15px] py-[10px] max-md:py-[0] ">
            <button className="rounded-[8px] bg-gray-300 px-[40px] py-[12px] text-[15px] font-medium text-black max-md:hidden">
              Más cercanos
            </button>
            <input
              type="text"
              size={1}
              className="flex-1 px-[15px] text-[15px] font-bold text-black max-md:h-[48px] max-xs:h-[30px]"
            />
          </div>
          <Link href="/busqueda" className="max-md:min-w-full">
            <button className="h-[58px] w-full rounded-[8px] bg-gray-400 text-[20px] font-bold text-black max-md:h-[48px] max-md:py-0 max-sm:text-[16px] max-xs:h-[30px] max-xs:text-[14px] md:px-[120px]">
              Buscar
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
