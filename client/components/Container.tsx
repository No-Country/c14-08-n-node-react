import { ChildrenProps } from "@/types";

const Container = ({ children }: ChildrenProps) => {
  return <div className="main-container">{children}</div>;
};

export default Container;
