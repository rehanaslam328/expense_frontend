import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export type Token = {
  access_token: string;
  organization_id: string | number;
};

export type TaxFormProps = {
  bool: boolean;
  current?: any;
  loading: boolean;
  toggle: () => void;
  refetch: () => void;
  onSubmit: (values: any) => void;
};

export type CreateTaxProps = Omit<TaxFormProps, "onSubmit" | "loading"> & Token;
export type EditTaxProps = CreateTaxProps;
export type TaxListingProps = {
  handleClick: MouseEventHandler;
  handleConfirm: MouseEventHandler;
  listing: object[];
} & Pick<TaxFormProps, "loading">;

export type taxSubmitProps = {
  name: string;
  rate: string | number;
  authority: string;
};

export type taxGroupFormProps = Omit<TaxFormProps, "refetch"> & {
  listing: object[];
  currSelected: number[];
  setCurrent?: Dispatch<SetStateAction<{}>>;
  setSelected?: Dispatch<SetStateAction<never[]>>;
  setCurrSelected: Dispatch<SetStateAction<number[]>>;
};

export type taxEditProps = Omit<taxGroupFormProps, "loading" | "onSubmit"> &
  Pick<TaxFormProps, "refetch">;
