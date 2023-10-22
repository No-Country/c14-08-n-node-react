import Link from "next/link";

import { categories } from "@/constants";
import { SearchBarListProps } from "@/types";
import { formatQueryString } from "@/utils/format";

const SearchBarList = ({
  query,
  setQuery,
  setIsEditing,
  isLinkList,
}: SearchBarListProps) => {
  const filteredCategories = categories.filter((category) =>
    category.queryStrings.some((queryString) =>
      queryString.includes(query.toLowerCase().replace(/\s+/g, "")),
    ),
  );

  return (
    <ul className="absolute top-0 z-10 flex w-full flex-col overflow-hidden rounded-[15px] bg-white">
      {filteredCategories.map((category) =>
        isLinkList ? (
          <li
            key={category.id}
            className="border-b border-gray-300 px-[15px] py-1 text-black last:border-transparent hover:cursor-pointer hover:bg-gray-300"
          >
            <Link
              onClick={() => {
                setQuery(category.id);
                setTimeout(() => {
                  if (setIsEditing) setIsEditing(false);
                }, 200);
              }}
              href={`/busqueda/${formatQueryString(category.label)}`}
            >
              <div className="rounded-[15px] py-2">{category.label}</div>
            </Link>
          </li>
        ) : (
          <li
            key={category.id}
            onClick={(e) => setQuery(category.label)}
            className="border-b border-gray-300 px-[15px] py-1 text-black  hover:cursor-pointer hover:bg-gray-300"
          >
            <div className="rounded-[15px] py-2">{category.label}</div>
          </li>
        ),
      )}
    </ul>
  );
};

export default SearchBarList;
