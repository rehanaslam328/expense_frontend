import { FormInstance } from "antd";

export type Tokens = {
  access_token: string;
  organization_id: string | number;
};

export type RegisterFormProps = {
  current: any;
  onSubmit: (val: any) => void;
  isLoading: boolean;
  prev: () => void;
  loading: boolean;
  org_list: object[];
  currncy_list: object[];
  fiscle_list: string[];
  ctry_list: object[];
  curr: any;
  edit?: boolean;
};

export type BusinessInfoProps = { form: FormInstance } & Pick<
  RegisterFormProps,
  "org_list" | "currncy_list" | "fiscle_list" | "isLoading" | "curr"
>;

export type ContactInfoProps = { form: FormInstance } & Pick<
  RegisterFormProps,
  "ctry_list" | "isLoading" | "curr"
>;

export type MenuListProps = {
  isLoading: boolean;
  organizations: object[];
};

export type RegisterOrganizationProps = Pick<RegisterFormProps, "edit"> & {
  curr?: any;
  refetch?: () => void;
};
