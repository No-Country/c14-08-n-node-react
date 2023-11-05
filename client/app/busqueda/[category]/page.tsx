import { LawyerList, LawyerSearchBar } from "@/components";
import { SearchPageProps } from "@/types";

const Search = ({ params, searchParams }: SearchPageProps) => {
  const selectedCategory = params.category;
  const selectedFormat = searchParams.format;
  const isExpress = searchParams.express;

  return (
    <section>
      <LawyerSearchBar
        selectedCategory={selectedCategory}
        selectedFormat={selectedFormat}
        isExpress={isExpress}
      />
      <LawyerList
        selectedCategory={selectedCategory}
        selectedFormat={selectedFormat}
        isExpress={isExpress}
      />
    </section>
  );
};

export default Search;
