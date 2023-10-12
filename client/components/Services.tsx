import { services } from "@/constants";
import { ServiceCard } from ".";

const Services = () => {
  return (
    <section className="flex-center">
      <div className="main-container mt-[58px]">
        <h2 className="text-center text-[30px] font-semibold">
          Nuestros servicios
        </h2>
        <div className="mt-[68px] grid grid-cols-4 gap-[30px] max-lg:grid-cols-2 max-xs:grid-cols-1">
          {services.map((service) => (
            <ServiceCard key={service.label} {...service} />
          ))}
        </div>
        <div className="mt-[40px] h-[315px] rounded-[10px] bg-gray-200"></div>
      </div>
    </section>
  );
};

export default Services;
