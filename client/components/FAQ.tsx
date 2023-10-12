import { faq } from "@/constants";

const FAQ = () => {
  return (
    <section className="flex-center">
      <div className="main-container mt-[109px]">
        <h2 className="text-center text-[30px] font-semibold">
          Consultas más frecuentes
        </h2>
        <div className="mt-[68px] grid grid-cols-4 gap-[110px]">
          {faq.map((question) => (
            <div
              key={question.label}
              className="flex-center rounded-[8px] border-[1px] border-gray-500 py-[10px] text-center text-[15px]"
            >
              {question.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
