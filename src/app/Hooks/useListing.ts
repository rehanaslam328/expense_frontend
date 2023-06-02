import { useGetListQuery } from "store/query/organization";

export const useListing = () => {
  const {
    data: {
      organization_type_list = [],
      country_list = [],
      currency_list = [],
      fiscal_year_list = [],
    } = {},
    isLoading,
  } = useGetListQuery("");
  const org_list = organization_type_list.map(({ id, label }: any) => ({
    id,
    label,
  }));
  const ctry_list = country_list.map(({ id, country_name }: any) => ({
    id,
    label: country_name,
  }));
  const currncy_list = currency_list.map(({ id, currency_code, name }: any) => ({
    id,
    label: `${currency_code} - ${name}`,
  }));
  const fiscle_list = fiscal_year_list.map(({ id, fiscal_year }: any) => ({
    id,
    label: fiscal_year,
  }));
  return {
    org_list,
    ctry_list,
    currncy_list,
    fiscle_list,
    isLoading,
    organization_type_list,
    country_list,
    currency_list,
    fiscal_year_list,
  };
};
