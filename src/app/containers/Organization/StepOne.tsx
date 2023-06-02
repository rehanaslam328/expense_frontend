import { Col, Row } from "antd";
import timezone from "moment-timezone";
import { rules } from "utils";
import { Labels, Content } from "static";
import { BusinessInfoProps } from "./Types";
import { InputField, Selectx, Icons } from "app/shared";

const { AiOutlineUser, GiPalisade } = Icons;

const { BUSINESS_NAME, TYPE, TIMEZONE, FISCAL_YEAR, BASE_CURRENCY, LICENSE_NO } = Labels;
const {
  enter_business_name,
  enter_organization_type,
  enter_time_zone,
  enter_fiscal_year,
  enter_base_currency,
} = Content;

export const StepOne = ({
  form,
  curr,
  org_list,
  isLoading,
  fiscle_list,
  currncy_list,
}: BusinessInfoProps) => {
  if (curr && Object.keys(curr).length) {
    form.setFieldsValue({
      ...curr.organizations,
    });
  } else {
    form.setFieldsValue({
      time_zone: "America/Los_Angeles",
      organization_type_id: null,
      fiscal_year_id: null,
    });
  }
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <InputField
            label={BUSINESS_NAME}
            name="name"
            rules={rules(undefined, enter_business_name)}
            LeftIcon={<AiOutlineUser />}
            className="mb flex_root"
            placeholder={BUSINESS_NAME}
          />
        </Col>

        <Col span={24}>
          <Selectx
            label={TYPE}
            name="organization_type_id"
            className="mb flex_root"
            rules={rules(undefined, enter_organization_type)}
            options={org_list}
            loading={isLoading}
            placeholder={TYPE}
          />
        </Col>

        <Col span={24}>
          <Selectx
            label={TIMEZONE}
            name="time_zone"
            className="mb flex_root"
            rules={rules(undefined, enter_time_zone)}
            options={timezone.tz.names()}
            defaultValue="America/Los_Angeles"
          />
        </Col>

        <Col span={24}>
          <Selectx
            label={FISCAL_YEAR}
            name="fiscal_year_id"
            className="mb flex_root"
            options={fiscle_list}
            rules={rules(undefined, enter_fiscal_year)}
            loading={isLoading}
            placeholder="Fiscal Year"
          />
        </Col>

        <Col span={24}>
          <Selectx
            label={BASE_CURRENCY}
            name="base_currency_id"
            className="mb flex_root"
            options={currncy_list}
            rules={rules(undefined, enter_base_currency)}
            loading={isLoading}
          />
        </Col>

        <Col span={24}>
          <InputField
            label={LICENSE_NO}
            name="license_no"
            LeftIcon={<GiPalisade />}
            size="middle"
            className="mb flex_root"
            placeholder={LICENSE_NO}
          />
        </Col>
      </Row>
    </>
  );
};
