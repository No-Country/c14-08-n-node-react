import { LawyerList, LawyerSearchBar } from "@/components";
import { SearchPageProps } from "@/types";

const Search = ({ searchParams }: SearchPageProps) => {
  const selectedCategory = searchParams.category;

  return (
    <section>
      <LawyerSearchBar initialQueryId={selectedCategory} />
      <LawyerList />
    </section>
  );
};

export default Search;
