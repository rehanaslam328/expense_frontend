import { useState } from "react";
import { Toast } from "app/shared";
import { useAxios, useBool } from "app/Hooks";
import MerchantListing from "./MerchantListing";
import { SubHeader } from "./SubHeader";
import { endpoints } from "static";
import EditMerchantDetail from "./EditMerchant";
import { useGetListingQuery } from "store/query/MerchantPrefrences";

const { MERCHANT_PREFERENCE } = endpoints

const MerchantPerfrences = () => {
    const { data = [], refetch } = useGetListingQuery("")
    const [current, setCurrent] = useState({});
    const { callAxios } = useAxios();
    const { bool, toggle } = useBool();
    const { bool: boolean, setTrue, setFalse } = useBool();


    const handleConfirm = (id: number) => {
        setTrue()
        callAxios({
            method: "delete",
            url: `${MERCHANT_PREFERENCE}/${id}`
        }).then((res) => {
            if (res) {
                setFalse()
                refetch();
                Toast({ message: res.message });
            }
        })
    }
    const handleClick = (data: any) => {
        setCurrent(data)
        toggle();
    }

    return (
        <>
            <SubHeader
                setTrue={setTrue}
                loading={boolean}
                refetch={refetch}
                setFalse={setFalse} />

            <MerchantListing
                handleClick={handleClick}
                handleConfirm={handleConfirm}
                listing={data}
                loading={boolean}
            />

            {bool && Object.keys(current).length > 0 && (
                <EditMerchantDetail
                    bool={bool}
                    boolean={boolean}
                    toggle={toggle}
                    setTrue={setTrue}
                    setFalse={setFalse}
                    refetch={refetch}
                    loading={boolean}
                    current={current}
                />
            )}
        </>
    );
};

export default MerchantPerfrences;