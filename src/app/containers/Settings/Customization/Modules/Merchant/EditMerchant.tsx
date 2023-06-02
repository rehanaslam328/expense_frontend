
import { useAxios } from "app/Hooks";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { MerchantForm } from "./Form";
import { EditProps, SubmitProps } from "./Types";

const { MERCHANT_PREFERENCE } = endpoints;

const EditMerchantDetail = ({
    refetch,
    current,
    bool,
    boolean,
    toggle,
    setTrue,
    setFalse,
    loading
}: EditProps) => {
    const { callAxios } = useAxios()

    const onSubmit = (values: SubmitProps) => {
        setTrue()
        callAxios({
            method: "put",
            data: values,
            url: `${MERCHANT_PREFERENCE}/${current.id}`
        }).then((res) => {
            if (res) {
                setFalse();
                toggle();
                refetch();
                Toast({ message: res.message })
            }
        })

    }

    return (
        <>
            <MerchantForm
                bool={bool}
                boolean={boolean}
                toggle={toggle}
                loading={loading}
                current={current}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default EditMerchantDetail;