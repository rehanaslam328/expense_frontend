// import { MouseEventHandler } from "react";
import { FormInstance } from "antd";
import { CreateFormInterface } from "app/Hooks/Types";
export type CommonProps = {
  loading: boolean;
  toggle: () => void;
  refetch: () => void;
  setTrue: () => void;
  setFalse: () => void;
};

export type CreateProps = Omit<CommonProps, "toggle">;

export type EditProps = {
  current: any;
  bool: boolean;
} & CommonProps;

export type ListingProps = {
  total?: number;
  listing: object[];
  handleConfirm: (id: number) => void;
} & Pick<CommonProps, "loading">;

export type SubmitProps = {
  name: string;
};

// export type FormProps = Pick<CommonProps, "loading" | "toggle"> & {
//   current?: any;
//   bool: boolean;
//   onSubmit: (values: SubmitProps) => void;
// };
export type FormProps = Pick<CommonProps, "loading"> & {
  createFormData: CreateFormInterface;
  onSubmit: (values: SubmitProps) => void;
  handleTagChange: (index: number) => void;
  form: FormInstance;
};
// export type SubHeader = {
//   visible: boolean;
// } & Pick<FormProps, "onSubmit" | "toggle" | "current" | "loading">;
