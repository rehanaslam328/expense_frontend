/** @format */

import { endpoints } from "static";
import { Toast } from "app/shared";
import { useAxios } from "app/Hooks";
import {ReportForm} from "./Form";
import { SubmitProps, EditProps } from "./Types";

const { REPORTS } = endpoints;

export const EditReport = ({
  refetch,
  current,
  bool,
  toggle,
  setTrue,
  setFalse,
  loading,
}: EditProps) => {
  const { callAxios } = useAxios();

  const onSubmit = (values: SubmitProps) => {
    setTrue();
    callAxios({
      method: "put",
      data: values,
      url: `${REPORTS}/${current.id}`,
    }).then((res) => {
      if (res) {
        setFalse();
        toggle();
        refetch();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <>
      <ReportForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        onSubmit={onSubmit}
      />
    </>
  );
};
