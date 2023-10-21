import Link from "next/link";

import { categories } from "@/constants";
import { SearchBarListProps } from "@/types";

const SearchBarList = ({
  query,
  setQuery,
  setIsEditing,
  isLinkList,
  selectedCategory,
  selectedFormat,
  isExpress,
}: SearchBarListProps) => {
  const filteredCategories = categories.filter((category) =>
    category.queryStrings.some((queryString) =>
      queryString.includes(query.toLowerCase().replace(/\s+/g, "")),
    ),
  );

  return (
    <>
      {query.length > 0 && (
        <ul className="absolute top-0 z-10 flex w-full flex-col overflow-hidden rounded-[15px] bg-white">
          {filteredCategories.map((category) =>
            isLinkList ? (
              <li className="border-b border-gray-300 px-[15px] py-1 text-black  hover:cursor-pointer hover:bg-gray-300">
                <Link
                  onClick={() => setIsEditing(false)}
                  href={`?category=${category.id}`}
                >
                  <div className="rounded-[15px] py-2">{category.label}</div>
                </Link>
              </li>
            ) : (
              <li
                key={category.id}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("yeee");
                  setQuery(category.label);
                }}
                className="border-b border-gray-300 px-[15px] py-1 text-black  hover:cursor-pointer hover:bg-gray-300"
              >
                <div className="rounded-[15px] py-2">{category.label}</div>
              </li>
            ),
          )}
        </ul>
      )}
    </>
  );
};

export default SearchBarList;
