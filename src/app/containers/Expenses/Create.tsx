import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { TabView, Icons, PageLoader, Toast } from "app/shared";
import { useAxios, useCreateForm } from "app/Hooks";
import { endpoints, routeNames } from "static";
import { ExpenseForm } from "./Form";
import BulkExpense from "./BulkExpense";

const { AiOutlineFileText, BsFiles } = Icons;
const { EXPENSES } = routeNames;
const { EXPENSE } = endpoints;
const dateFormat = "YYYY-MM-DD";

const CreateExpense = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [expense_tags, setExpenseTags] = useState([]);
  const { callAxios, bool } = useAxios();
  const createFormData = useCreateForm(`${EXPENSE}/create`);

  const tabsInfo = [
    {
      tab: "Add Expense",
      icon: <AiOutlineFileText size={16} />,
      component: () => (
        <ExpenseForm
          loading={bool}
          createFormData={createFormData}
          form={form}
          handleTagChange={handleTagChange}
          onSubmit={handleSubmit}
        />
      ),
    },
    {
      tab: "Bulk Add Expense",
      icon: <BsFiles size={16} />,
      component: () => <BulkExpense createFormData={createFormData} />,
    },
  ];
  const handleTagChange = (index: number) => {
    const value = form.getFieldValue(`expense_tags${index}`);
    setExpenseTags((prevState) => [...prevState, value] as never);
  };
  const handlepayload = (data: any) => {
    let payload = {
      ...data,
      expense_tags: [...expense_tags],
    };
    if (!data.itemize) {
      payload = {
        ...data,
        expense_details: [
          {
            category_id: data.category_id,
            description: data.description,
            amount: data.total_amount,
          },
        ],
        expense_tags: [...expense_tags],
      };
    }
    const finalPayload = {
      ...payload,
      date: payload.date.format(dateFormat),
    };
    return finalPayload;
  };
  const handleSubmit = (data: any) => {
    const payload = handlepayload(data);
    callAxios({
      method: "post",
      data: payload,
      url: EXPENSE,
    }).then((res) => {
      if (res) {
        Toast({ message: res.message });
        navigate(EXPENSES);
      }
    });
  };
  if (createFormData.bool) return <PageLoader />;
  return (
    <>
      <TabView tabsInfo={tabsInfo} />
    </>
  );
};
export default CreateExpense;
