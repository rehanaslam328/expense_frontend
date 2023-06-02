/**@format */

import { useState, useEffect } from "react";
import { CreateFormInterface } from "./Types";
import { useAxios,useBool } from "app/Hooks";

const initialList: CreateFormInterface = {
  expense_categories: [],
  payment_modes: [],
  taxes: [],
  currencies: [],
  tags: [],
  merchants: [],
  cities: [],
  bool:false
};

export const useCreateForm = (url: string) => {
  const [createData, setCreateData] = useState<CreateFormInterface | null>(initialList);
  const {bool,toggle}=useBool();
  const { callAxios } = useAxios();

  useEffect(() => {
    toggle();
    callAxios({
      method: "get",
      url: url,
    }).then((res: any) => {
      if (res) {
        setCreateData({
          ...res,
        });
        toggle();
      }
    });
    //eslint-disable-next-line
  }, [url]);
  
  return {
    expense_categories: createData?.expense_categories,
    payment_modes: createData?.payment_modes,
    taxes: createData?.taxes,
    currencies: createData?.currencies,
    tags: createData?.tags,
    merchants: createData?.merchants,
    cities: createData?.cities,
    bool
  };
};
