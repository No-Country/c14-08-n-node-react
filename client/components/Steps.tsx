import { steps } from "@/constants";

const Steps = () => {
  return (
    <>
      <section className="mt-[58px] max-md:bg-transparent max-xs:mt-[32px]">
        <h2 className="mb-[22px] text-center text-[30px] font-semibold md:hidden">
          Abogado en 3 pasos
        </h2>
        <div className="flex-center bg-gray-700">
          <div className="main-container flex-center flex w-full flex-col ">
            <h2 className="mt-[22px] text-[30px] font-semibold text-white max-md:hidden">
              Pasos para asesorarte con un profesional
            </h2>
            <div className="mb-[60px] mt-[60px] grid grid-cols-3 gap-[80px] max-md:grid-cols-1 max-md:grid-rows-3 max-md:gap-[20px]">
              {steps.map((step) => (
                <div
                  key={step}
                  className="flex-center flex flex-1 rounded-[10px] bg-white px-[10px] py-[68px] text-center max-md:px-[55px] max-md:py-[10px] max-md:leading-[16px]"
                >
                  <p className="max-md:text-[12px] max-md:leading-[16px]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Steps;
