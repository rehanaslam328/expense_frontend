import {Moment} from "moment";
import { MouseEventHandler } from "react";

// Types for Preferences

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
  total?:number;
  handleClick: MouseEventHandler;
  handleConfirm: (id: number) => void;
  listing: object[];
} & Pick<CommonProps, "loading">;

export type SubmitProps = {
  amount: string,
  currency_id: number,
  date:Moment,
  paid_id: number,
  reference_number:string,
  notes:string,
  trip_id:number
};

export type FormProps = Pick<CommonProps, "loading" | "toggle"> & {
  current?: any;
  bool: boolean;
  onSubmit: (values: SubmitProps) => void;
};
export type ModalProps = {
  visible: boolean;
} & Pick<FormProps, "onSubmit" | "toggle" | "current" | "loading">;

// End Types for Preferences
