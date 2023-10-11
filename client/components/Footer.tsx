import Link from "next/link";

import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-700">
      <div className="nav-container flex px-[124px] py-[40px] ">
        <div className="flex-1">
          <h3 className="text-[20px] text-white">
            <span className="font-bold">LegalHub</span> es una
            <br />
            web para encontrar <br />
            profesionales de la <br /> asesoria legal y agendar <br /> turnos al
            instante de <br /> manera simple y rápida.
          </h3>
        </div>
        <div className="flex flex-1 items-center text-[18px] text-white">
          {footerLinks.map((column, i) => (
            <nav key={i} className="flex-1">
              <ul>
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
