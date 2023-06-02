
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAxios } from 'app/Hooks';
import { Buttonx, PageLoader, Toast } from 'app/shared';
import { useEffect } from 'react';
import { useGetListingQuery } from 'store/query/TripField';
import Checkboxed from "../../Checkboxed";
import { Constants } from '../../Constants';

const { label_field, initialValues } = Constants.Trip.Fields

const Fields = () => {

    const [form] = useForm();
    const { data, isLoading } = useGetListingQuery("");
    const { callAxios, bool } = useAxios()

    useEffect(() => {
        form.setFieldsValue({
            ...data?.preferences
        });
    }, [data])

    const onSubmit = (values: any) => {
        let payload = {
            status: {
                ...values
            }
        }
        callAxios({
            method: "put",
            data: payload,
            url: "preferences/trip"
        }).then((res) => {
            if (res) {
                Toast({ message: res.message })
            }
        })
    }

    return (
        <>{
            isLoading ? <PageLoader /> :
                <Form
                    initialValues={initialValues}
                    form={form}
                    onFinish={onSubmit}
                >
                    <Checkboxed options={label_field} />
                    <Buttonx size='middle' btnText='Save' loading={bool} />
                </Form>
        }
        </>
    )

};

export default Fields;