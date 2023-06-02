import { AxiosResponse } from "axios";

// Create form types
export interface CreateFormInterface {
  expense_categories?: object[];
  payment_modes?: object[];
  taxes?: object[];
  currencies?: object[];
  tags?: object[];
  merchants?: object[];
  cities?: object[];
  bool:boolean
}

// useAxios types
export interface params {
  method?: "post" | "get" | "patch" | "put" | "delete";
  data?: object;
  url: string;
  isJsonType?: boolean;
}

export type axiosResponse = {
  message: string;
} & AxiosResponse;

export interface SearchParamsTypes {
  sort?: string;
  current?: number;
  pageSize?: number;
  sort_column?: string;
}

export type SelectOption = {
  label: string;
  value: string;
}[];
