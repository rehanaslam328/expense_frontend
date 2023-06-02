/** @format */
import { endpoints } from "static";
import { Toast } from "app/shared";
import { useAxios } from "app/Hooks";
import { SubmitProps, EditProps } from "./Types";
import PaymentModeForm from "./Form";

const { PAYMENTS_MODES } = endpoints;

const EditPaymendMode = ({
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
      url: `${PAYMENTS_MODES}/${current.id}`,
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
      <PaymentModeForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        onSubmit={onSubmit}
      />
    </>
  );
};
export default EditPaymendMode;
