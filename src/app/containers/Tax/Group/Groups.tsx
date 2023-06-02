/** @format */

import { Dispatch, SetStateAction, useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { axiosCall } from "services";
import { useLoading } from "app/Hooks";
import { GroupForm } from "./GroupForm";

const { TAX_GROUP } = endpoints;

type IProps = {
  bool: boolean;
  toggle: () => void;
  organization_id: string | number;
  access_token: string;
  current?: any;
  refetch: () => void;
  listing: object[];
  currSelected: number[];
  setCurrSelected: Dispatch<SetStateAction<number[]>>;
  setCurrent?: Dispatch<SetStateAction<{}>>;
};

export const TaxGroup = ({
  access_token,
  organization_id,
  bool,
  toggle,
  current,
  refetch,
  listing,
  currSelected,
  setCurrSelected,
  setCurrent,
}: IProps) => {
  const [loading] = useLoading();
  const [selectedRows, setSelected] = useState([]);

  const onSubmit = (values: any) => {
    const data = { ...values, _ids: selectedRows };
    // setTrue();
    axiosCall({
      method: "post",
      data,
      url: TAX_GROUP,
      headers: { authorization: access_token, organization: organization_id },
    }).then((res) => {
      // setFalse();
      if (res) {
        setSelected([]);
        toggle();
        refetch();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <GroupForm
      bool={bool}
      toggle={toggle}
      listing={listing}
      current={current}
      loading={loading}
      onSubmit={onSubmit}
      setSelected={setSelected}
      setCurrent={setCurrent}
      currSelected={currSelected}
      setCurrSelected={setCurrSelected}
    />
  );
};
