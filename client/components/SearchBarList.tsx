import { categories } from "@/constants";
import { SearchBarListProps } from "@/types";

const SearchBarList = ({ query, setQuery }: SearchBarListProps) => {
  const filteredCategories = categories.filter((category) =>
    category.queryStrings.some((queryString) =>
      queryString.includes(query.string.toLowerCase().replace(/\s+/g, "")),
    ),
  );

  return (
    <>
      {query.string.length > 0 && query.id === "" && (
        <ul className="absolute top-0 z-10 flex w-full flex-col overflow-hidden rounded-[15px] bg-white">
          {filteredCategories.map((category) => (
            <li
              key={category.id}
              onClick={() =>
                setQuery({
                  string: category.label,
                  id: category.id,
                })
              }
              className="border-b border-gray-300 px-[15px] py-1 text-black  hover:cursor-pointer hover:bg-gray-300"
            >
              <div className="rounded-[15px] py-2">{category.label}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBarList;
