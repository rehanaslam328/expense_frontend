import { MouseEventHandler } from "react";

export type currencyCommonProps = {
  loading: boolean;
  toggle: () => void;
  refetch: () => void;
  setTrue: () => void;
  setFalse: () => void;
  currncy_list: object[];
};

export type CreateCurrencyProps = Omit<currencyCommonProps, "toggle">;
export type EditCurrencyProps = {
  current: any;
  bool: boolean;
} & currencyCommonProps;
export type CurrencyListingProps = {
  handleClick: MouseEventHandler;
  handleConfirm: (id: number) => void;
  listing: object[];
} & Pick<currencyCommonProps, "loading">;

export type currencySubmitProps = {
  name: string;
  currency_code: string | number;
  exchange_rate: string | number;
  symbol: string;
};

export type CurrencyFormProps = Pick<currencyCommonProps, "loading" | "currncy_list" | "toggle"> & {
  current?: any;
  bool: boolean;
  onSubmit: (values: currencySubmitProps) => void;
};
