import { LawyerList, LawyerSearchBar } from "@/components";
import { SearchPageProps } from "@/types";

const Search = ({ searchParams }: SearchPageProps) => {
  const selectedCategory = searchParams.category || "all";
  const selectedFormat = searchParams.format;
  const isExpress = searchParams.express;

  console.log(selectedCategory);
  return (
    <section>
      <LawyerSearchBar
        initialQueryId={selectedCategory}
        selectedCategory={selectedCategory}
        selectedFormat={selectedFormat}
        isExpress={isExpress}
      />
      <LawyerList />
    </section>
  );
};

export default Search;
