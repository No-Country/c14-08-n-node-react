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

export interface SearchPageProps {
  searchParams: {
    category: string;
    format: string;
    express: boolean;
  };
}

export interface LawyerSearchBarProps {
  initialQueryId: string;
  selectedCategory?: string;
  selectedFormat?: string;
  isExpress?: boolean;
}

export interface SearchBarListProps
  extends Omit<LawyerSearchBarProps, "initialQueryId"> {
  query: string;
  setQuery: (query: string) => void;
  isLinkList?: boolean;
}
