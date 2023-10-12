import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex-center max-xs:h-[390px] relative mt-5 h-[528px]">
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
      <div className="flex-center main-container max-md:px-[30px] max-sm:px-[60px] max-xs:px-[90px] z-10 h-full flex-col pb-[108px] pt-[64px] text-white">
        <div className="w-full">
          <h1 className="max-md:text-[40px] max-md:leading-[40px] max-sm:text-[30px] max-sm:leading-[30px] max-xs:text-[20px] max-xs:leading-[20px] text-[60px] font-bold leading-[60px]">
            Buscá profesionales en <br /> línea que puedan <br /> asesorarte
          </h1>
          <p className="max-xs:text-[12px] max-xs:leading-[16px] mt-[36px] text-[20px] leading-[25px]">
            Contamos con con más de 60 profesionales que se desarrollan <br />
            en distintas áreas, todo está al alcance de un click
          </p>
        </div>
        <div className="max-md:flex-col max-md:items-center mt-[42px] flex w-full gap-[34px]">
          <div className="max-md:py-[0] flex h-[58px] w-full flex-1 items-center rounded-[15px] bg-white/[.5] px-[15px] py-[10px] ">
            <button className="max-md:hidden rounded-[8px] bg-gray-300 px-[40px] py-[12px] text-[15px] font-medium text-black">
              Más cercanos
            </button>
            <input
              type="text"
              size={1}
              className="max-md:h-[48px] max-xs:h-[30px] flex-1 px-[15px] text-[15px] font-bold text-black"
            />
          </div>
          <Link href="/busqueda">
            <button className="max-md:h-[48px] max-md:w-full max-md:px-0 max-md:py-0 max-xs:h-[30px] h-[58px] rounded-[8px] bg-gray-400 px-[120px] text-[20px] font-bold text-black">
              Buscar
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
