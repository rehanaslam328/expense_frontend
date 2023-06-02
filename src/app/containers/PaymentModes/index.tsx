import { useAxios, useBool } from "app/Hooks";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { useState } from "react"
import { useGetListingQuery } from "store/query/PaymentModes";
import CreateNewPaymentMode from "./Create";
import EditPaymendMode from "./Edit";
import PaymentListing from "./Listing";

const PaymentModes = () => {
    const { bool, toggle } = useBool();
    const { bool: boolean, setTrue, setFalse } = useBool();
    const [current, setCurrent] = useState({});
    const { callAxios } = useAxios()

    const { PAYMENTS_MODES } = endpoints
    const { data = [], refetch } = useGetListingQuery("")

    const handleClick = (data: any) => {
        setCurrent(data)
        toggle();
    }

    const handleConfirm = (id: number) => {
        setTrue();
        callAxios({
            method: "delete",
            url: `${PAYMENTS_MODES}/${id}`,
        }).then((res) => {
            if (res) {
                refetch();
                setFalse();
                Toast({ message: res.message, type: "success" });
            }
        });
    };

    return (
        <>
            <CreateNewPaymentMode
                setTrue={setTrue}
                loading={boolean}
                refetch={refetch}
                setFalse={setFalse}
            />
            <PaymentListing
                listing={data}
                loading={boolean}
                handleClick={handleClick}
                handleConfirm={handleConfirm} />

            {bool && Object.keys(current).length > 0 && (
                <EditPaymendMode
                    bool={bool}
                    toggle={toggle}
                    setTrue={setTrue}
                    current={current}
                    refetch={refetch}
                    loading={boolean}
                    setFalse={setFalse}
                />
            )}
        </>
    );
};

export default PaymentModes;