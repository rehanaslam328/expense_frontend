import { useEffect, useState } from "react";
import { Typography, Row, Col, Form, Divider, Space } from "antd";
import { Content } from "static";
import { useAxios } from "app/Hooks";
import { useGetListingQuery } from "store/query/TripPrefrences";
import { Buttonx, InputField, PageLoader, Selectx, Toast } from "app/shared";
import Checkboxed from "../../Checkboxed";
import { Constants } from "../../Constants";

const { Title } = Typography
const { initialValues } = Constants.Trip.Prefrences
const { trip_allowance, trip_allowance2, onTripSubmission, ApprovalPerformance, SendNotificationsWhen } = Content.Trip_Prefrences

const Prefrences = () => {

    const [form] = Form.useForm()
    const { data, isLoading } = useGetListingQuery("");
    const [formvalue, setformvalue] = useState(initialValues)

    useEffect(() => {
        if (data) {
            const { preferences } = data;
            setformvalue(preferences)
            form.setFieldsValue({
                ...preferences
            });
        }
    }, [form, data])

    const { callAxios, bool } = useAxios()

    const onSubmit = (values: any) => {
        const payload = {
            status: {
                ...values
            }
        }
        callAxios({
            method: "put",
            data: payload,
            url: "numberPreferences/trip"
        }).then((res) => {
            if (res) {
                Toast({ message: res.message })
            }
        })
    }

    return (
        <>{
            isLoading ? <PageLoader /> :
                <>
                    <Title level={5}>
                        Auto-generated Trip number
                    </Title>
                    <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={formvalue}>
                        <Row>
                            <Space size={8}>
                                <Col>
                                    <InputField name="prefix_string" label="Prefix" size="middle" />
                                </Col>
                                <Col>
                                    <InputField name="next_number" label="Start with" size="middle" />
                                </Col>
                            </Space>
                        </Row>
                        <Divider style={{ margin: "5px" }} />
                        <Title level={5}>
                            Trip Allowence
                        </Title>
                        <Col span={7} style={{ margin: "5px" }}>
                            <Selectx label="Auto create Trip allowance for" options={trip_allowance} name="allowance_type" size="middle" />
                            <Checkboxed options={trip_allowance2} />
                            <Checkboxed title={"on Trip Submission"} options={onTripSubmission} />
                            <Checkboxed title={"Approval Performance"} options={ApprovalPerformance} />
                            <Checkboxed title={"Send Notifications When"} options={SendNotificationsWhen} />
                        </Col>
                        <Buttonx size="middle" btnText={"Save"} loading={bool} />
                    </Form>
                </>
        }
        </>);
};

export default Prefrences;