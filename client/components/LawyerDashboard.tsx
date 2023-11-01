import Link from "next/link";

import { lawyerDashboardItems } from "@/constants";

const LawyerDashboard = () => {
  return (
    <div className="main-container center flex-center min-h-screen">
      <div className="grid grid-cols-4 gap-[32px] py-[100px] max-md:grid-cols-2 max-xs:grid-cols-1">
        {lawyerDashboardItems.map((item, i) => (
          <Link key={i} href={item.href}>
            <div className="rounded-[10px] border border-gray-700 px-[12px] py-[100px] text-center">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LawyerDashboard;
