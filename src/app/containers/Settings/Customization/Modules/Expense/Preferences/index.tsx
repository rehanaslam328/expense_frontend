import { Typography, Tag, Row, Form, Col } from "antd";
import { useForm } from "antd/es/form/Form";
import { useAxios } from "app/Hooks";
import { Buttonx, PageLoader, Toast } from "app/shared";
import { useEffect } from "react";
import { useGetListingQuery } from "store/query/ExpensePrefrences";
import Checkboxed from "../../Checkboxed";
import { Constants } from "../../Constants";

const { content, initialValues } = Constants.Expense.Prefrences;
const { Text } = Typography;

const Preference = () => {
  const [form] = useForm();
  const { callAxios, bool } = useAxios();
  const { data = [], isLoading } = useGetListingQuery("");
  useEffect(() => {
    form.setFieldsValue({
      ...data?.preferences,
    });
  }, [data]);
  const onSubmit = (values: any) => {
    const payload = {
      status: {
        ...values,
        notify_submitter_when_nearing_expiry: false,
        remind_unreported_expenses: true,
        reminder_frequency: "weekly",
      },
    };
    callAxios({
      method: "put",
      data: payload,
      url: "numberPreferences/expense",
    }).then((res) => {
      if (res) {
        Toast({ message: res.message });
      }
    });
  };
  if (isLoading) return <PageLoader />;
  const { base_currency } = data;
  return (
    <>
      <Form initialValues={initialValues} form={form} onFinish={onSubmit}>
        <Col span={9}>
          <Row>
            <Text>
              Base Currency <Tag color="#008000">{base_currency}</Tag>
            </Text>
            <Buttonx
              linkTo="/currencies"
              shape="default"
              btnText="Manage Currencies"
              size="small"
            />
          </Row>
          <Checkboxed options={content} />
          <Buttonx size="middle" btnText={"Save"} loading={bool} />
        </Col>
      </Form>
    </>
  );
};

export default Preference;
