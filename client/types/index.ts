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
}

export interface ChildrenProps {
  children: React.ReactNode;
}
