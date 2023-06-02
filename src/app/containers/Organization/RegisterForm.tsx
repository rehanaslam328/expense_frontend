import { Steps, Typography, Space, Form } from "antd";
import { Labels } from "static";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { RegisterFormProps } from "./Types";
import { Buttonx, UploadImage } from "app/shared";

const { Step } = Steps;
const { REGISTER_ORGANIZATION, CREATE, BACK, NEXT, CONTACT_INFO, BUSINESS_INFO } = Labels;

const steps = [BUSINESS_INFO, CONTACT_INFO];

const initialState = {
  name: "",
  organization_type_id: "65",
  fiscal_year_id: "",
  license_no: "",
  time_zone: "America/Los_Angeles",
  date_format: "",
  base_currency: "",
  inventory_start_date: null,
  country_id: null,
  logo: "",
  company_street: "",
};

export const RegisterForm = ({
  prev,
  curr,
  edit,
  current,
  loading,
  org_list,
  onSubmit,
  isLoading,
  ctry_list,
  currncy_list,
  fiscle_list,
}: RegisterFormProps) => {
  const [form] = Form.useForm();

  return (
    <>
      <Typography style={{ margin: "0 auto", paddingTop: "50px", maxWidth: "550px" }}>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item} title={item} />
          ))}
        </Steps>
        <Form
          name={REGISTER_ORGANIZATION}
          initialValues={initialState}
          onFinish={onSubmit}
          autoComplete="off"
          className="steps-content"
          form={form}
        >
          <Space direction="vertical" size="large" style={{ display: "flex" }}>
            {!current ? (
              <>
                <UploadImage setLogo={form} />
                <StepOne
                  org_list={org_list}
                  currncy_list={currncy_list}
                  fiscle_list={fiscle_list}
                  isLoading={isLoading}
                  form={form}
                  curr={curr}
                />
              </>
            ) : (
              <StepTwo ctry_list={ctry_list} isLoading={isLoading} curr={curr} form={form} />
            )}
          </Space>
          <div className="steps-action">
            {current < steps.length - 1 && <Buttonx btnText={NEXT} />}
            {current > 0 && (
              <Buttonx htmlType="button" type="default" clickHandler={prev} btnText={BACK} />
            )}
            {current === steps.length - 1 && (
              <Buttonx btnText={edit ? "Update" : CREATE} loading={loading} />
            )}
          </div>
        </Form>
      </Typography>
    </>
  );
};
