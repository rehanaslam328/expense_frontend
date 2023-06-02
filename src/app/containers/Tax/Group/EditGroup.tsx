/** @format */

import { useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { axiosCall } from "services";
import { GroupForm } from "./GroupForm";
import { taxEditProps } from "../Types";
import { useGetTokens, useLoading } from "app/Hooks";

const { TAX_GROUP } = endpoints;

export const EditTaxGroup = ({
  bool,
  toggle,
  current,
  refetch,
  listing,
  setCurrent,
  currSelected,
  setCurrSelected,
}: taxEditProps) => {
  const [loading, , setTrue, setFalse] = useLoading();
  const [selectedRows, setSelected] = useState([]);

  const { access_token, organization_id } = useGetTokens();

  const onSubmit = (values: any) => {
    const data = { ...values, _ids: selectedRows };

    setTrue();
    axiosCall({
      method: "put",
      data,
      url: `${TAX_GROUP}/${current.id}`,
      headers: { authorization: access_token, organization: organization_id },
    }).then((res) => {
      setFalse();
      if (res) {
        toggle();
        refetch();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <>
      <GroupForm
        bool={bool}
        toggle={toggle}
        current={current}
        listing={listing}
        loading={loading}
        onSubmit={onSubmit}
        setCurrent={setCurrent}
        setSelected={setSelected}
        currSelected={currSelected}
        setCurrSelected={setCurrSelected}
      />
    </>
  );
};
