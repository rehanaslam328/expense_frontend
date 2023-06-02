import { Col, Row } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { ContactInfoProps } from "./Types";
import { InputField, Selectx, Icons } from "app/shared";

const { FaCity, AiOutlinePhone, AiOutlineMail } = Icons;

const { CONTACT, NAME, EMAIL, COUNTRY, STATE, CITY, ZIP_CODE, ADDRESS, PHONE, WEBSITE } = Labels;
const { enter_country_name, enter_phone } = Content;

export const StepTwo = ({ ctry_list, isLoading, curr, form }: ContactInfoProps) => {
  if (curr && Object.keys(curr).length) {
    form.setFieldsValue({
      ...curr.organizations,
    });
  }
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <InputField
            label={`${CONTACT} ${NAME}`}
            name="primary_contact_name"
            rules={[]}
            LeftIcon={<AiOutlineMail />}
            className="mb flex_root"
            placeholder={`${CONTACT} ${NAME}`}
          />
        </Col>

        <Col span={24}>
          <InputField
            label={`${CONTACT} ${EMAIL}`}
            name="primary_contact_email"
            rules={rules("email")}
            LeftIcon={<AiOutlineMail />}
            className="mb flex_root"
            placeholder={`${CONTACT} ${EMAIL}`}
          />
        </Col>

        <Col span={12}>
          <Selectx
            label={COUNTRY}
            name="country_id"
            rules={rules(undefined, enter_country_name)}
            className="mb flex_root"
            options={ctry_list}
            placeholder={COUNTRY}
            loading={isLoading}
          />
        </Col>

        <Col span={12}>
          <InputField
            label={STATE}
            name="company_province"
            rules={[]}
            LeftIcon={<FaCity />}
            className="mb flex_root"
            placeholder={STATE}
          />
        </Col>

        <Col span={12}>
          <InputField
            label={CITY}
            name="company_city"
            rules={[]}
            LeftIcon={<FaCity />}
            className="mb flex_root"
            placeholder="City Name"
          />
        </Col>

        <Col span={12}>
          <InputField
            label={ZIP_CODE}
            name="company_postal_code"
            rules={[]}
            className="mb flex_root"
            placeholder="Zip Code"
          />
        </Col>

        <Col span={24}>
          <InputField
            label={ADDRESS}
            name="company_street"
            rules={[]}
            LeftIcon={<AiOutlinePhone />}
            className="mb flex_root"
            placeholder="Enter Address"
          />
        </Col>

        <Col span={24}>
          <InputField
            label={PHONE}
            name="phone"
            rules={rules(undefined, enter_phone)}
            LeftIcon={<AiOutlinePhone />}
            className="mb flex_root"
            placeholder="Enter Phone"
          />
        </Col>

        <Col span={24}>
          <InputField
            label={WEBSITE}
            name="company_website"
            rules={[]}
            LeftIcon={null}
            className="mb flex_root"
            addonBefore="https://"
            addonAfter=".com"
            placeholder="seebiz"
          />
        </Col>
      </Row>
    </>
  );
};
