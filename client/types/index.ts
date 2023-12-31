export interface IServiceCard {
  label: string;
  href: string;
  image: string;
  description: string;
}
export interface ILawyer {
  id: string;
  name: string;
  lastName: string;
  rating: number;
  imageUrl: string;
  lawyer: any[];
  description: string;
  categoryStrings: string[];
  onsite: boolean;
  remote: boolean;
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
  selectedCategory: string;
  selectedFormat?: string;
  isExpress?: boolean;
}

export interface LawyerListProps extends LawyerSearchBarProps {}

export interface SearchBarListProps {
  query: string;
  setQuery: (query: string) => void;
  setIsEditing?: (boolean: boolean) => void;
  isLinkList?: boolean;
}
export interface IInitialControlState {
  format: boolean;
}

export interface LawyerSearchBarControlsProps {
  selectedFormat?: string;
  isExpress?: boolean;
}

export interface LawyerSearchControlProps {
  isOpen: boolean;
  setIsOpen: (key: string) => void;
  handleCloseControl: () => void;
  currentSelection?: string;
}

export type AccountType = "client" | "lawyer";
export type BookingStatusType = "confirmados" | "pendientes" | "cancelados";

export interface IBookItem {
  id: string;
  fecha: string;
  time: string;
  client: {
    imagen: string;
    user: {
      name: string;
      lastName: string;
    };
  };
  lawyer: {
    imagen: string;
    price: string;
    user: {
      name: string;
      lastName: string;
    };
  };
  modality: {
    name: string;
  };
  status: {
    name: string;
  };
}
