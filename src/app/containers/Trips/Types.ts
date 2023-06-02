import { ReactNode } from "react";

export type TimelineComponents = {
  name: string;
  component: ReactNode;
  isShow: boolean;
  icon: JSX.Element;
};
