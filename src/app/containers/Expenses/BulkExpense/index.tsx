// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "app/shared";
import { BulkExpenseForm } from "./Form";
import { Form } from "antd";
import { useAxios } from "app/Hooks";
import { endpoints, routeNames } from "static";
import { CreateFormInterface } from "app/Hooks/Types";

const { EXPENSES } = routeNames;
const { BULK_EXPENSE } = endpoints;

const BulkExpense = ({ createFormData }: { createFormData: CreateFormInterface }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { callAxios, bool } = useAxios();
  // const [expense_tags, setExpenseTags] = useState([]);
  // const handleTagChange = (index: number) => {
  //   const value = form.getFieldValue(`expense_tags${index}`);
  //   setExpenseTags((prevState) => [...prevState, value] as never);
  // };
  const handleSubmit = (data: any) => {
    const payload = {
      ...data,
      // expense_tags: [...expense_tags],
    };
    callAxios({
      method: "post",
      data: payload,
      url: BULK_EXPENSE,
    }).then((res) => {
      if (res) {
        Toast({ message: res.message });
        navigate(EXPENSES);
      }
    });
  };

  return (
    <>
      <BulkExpenseForm
        loading={bool}
        createFormData={createFormData}
        form={form}
        // handleTagChange={handleTagChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default BulkExpense;
