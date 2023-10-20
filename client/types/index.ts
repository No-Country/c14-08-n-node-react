export interface IServiceCard {
  label: string;
  href: string;
  image: string;
  description: string;
}
export interface ILawyer {
  id: string;
  name: string;
  last_name: string;
  rating: number;
  imageUrl: string;
  description: string;
  category: string;
}

export interface IQuery {
  id: string;
  string: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface SearchBarListProps {
  query: IQuery;
  setQuery: (query: IQuery) => void;
}

export interface SearchPageProps {
  searchParams: {
    category: string;
  };
}
