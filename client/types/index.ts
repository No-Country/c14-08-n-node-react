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
  params: {
    category: string;
  };
  searchParams: {
    format: string;
    express: boolean;
  };
}

export interface LawyerSearchBarProps {
  selectedCategory?: string;
  selectedFormat?: string;
  isExpress?: boolean;
}

export interface SearchBarListProps {
  query: string;
  setQuery: (query: string) => void;
  setIsEditing?: (boolean: boolean) => void;
  isLinkList?: boolean;
}

export interface LawyerSearchBarControlsProps {
  selectedFormat?: string;
  isExpress?: boolean;
}
