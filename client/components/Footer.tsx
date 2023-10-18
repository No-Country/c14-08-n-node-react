import Link from "next/link";

import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-700">
      <div className="nav-container flex py-[40px] max-sm:flex-col max-sm:gap-[12px]">
        <div className="w-full flex-1">
          <h3 className="text-[20px] text-white max-sm:text-[14px]">
            <span className="font-bold">LegalHub</span> es una
            <br className="max-sm:hidden" />
            web para encontrar <br className="max-sm:hidden" />
            profesionales de la <br className="max-sm:hidden" /> asesoria legal
            y agendar <br className="max-sm:hidden" /> turnos al instante de{" "}
            <br className="max-sm:hidden" />
            manera simple y rápida.
          </h3>
        </div>
        <div className="flex flex-1 items-center text-[18px] text-white max-sm:justify-between max-sm:text-[14px]">
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
