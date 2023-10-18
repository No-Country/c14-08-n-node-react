import { services } from "@/constants";
import { ServiceCard } from ".";

const Services = () => {
  return (
    <section id="services" className="flex-center">
      <div className="main-container mt-[58px] max-xs:mt-[32px]">
        <h2 className="text-center text-[30px] font-semibold max-xs:text-[20px]">
          Nuestros servicios
        </h2>
        <div className="mt-[68px] grid grid-cols-4 gap-[30px] max-lg:grid-cols-2 max-xs:mt-[16px] max-xs:grid-cols-1">
          {services.map((service) => (
            <ServiceCard key={service.label} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
