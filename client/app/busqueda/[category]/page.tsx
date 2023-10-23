import { LawyerList, LawyerSearchBar } from "@/components";
import { SearchPageProps } from "@/types";

const Search = ({ params, searchParams }: SearchPageProps) => {
  const selectedCategory = params.category;
  const selectedFormat = searchParams.format;
  const isExpress = searchParams.express;

  console.log(selectedFormat);

  return (
    <section>
      <LawyerSearchBar
        selectedCategory={selectedCategory}
        selectedFormat={selectedFormat}
        isExpress={isExpress}
      />
      <LawyerList />
    </section>
  );
};

export default Search;
