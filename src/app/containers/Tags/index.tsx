import { useEffect, useState } from "react";
import TagListing from "./Listing";
import { useGetListingQuery } from "store/query/Tags";
import { endpoints } from "static";
import CreateTag from "./Create";
import { useAxios, useBool, useSearchParam } from "app/Hooks";
import { Toast } from "app/shared";
import EditTags from "./Edit";

const { TAGS } = endpoints
const Tags = () => {
    const { bool, toggle } = useBool();
    const { total, getParams, setTotal } = useSearchParam("");
    const { data = [], refetch } = useGetListingQuery(getParams(), {
        refetchOnMountOrArgChange: true,
      });
    const [current, setCurrent] = useState({})
    const { bool: boolean, setTrue, setFalse } = useBool();
    const { callAxios } = useAxios();

    useEffect(() => {
        setTotal(data?.total);
      }, [setTotal, data?.total]);

    const result_data = data?.data?.map((item: { tag_details: { name: string; }[]; }) => ({
        ...item,
        options: item?.tag_details?.map(({ name }: { name: string }, index: number) => {
            if (item.tag_details.length === index + 1) return name
            else return name.concat(', ')
        })
    }));

    const handleConfirm = (id: number) => {
        setTrue()
        callAxios({
            method: "delete",
            url: `${TAGS}/${id}`
        }).then((res) => {
            if (res) {
                refetch();
                setFalse();
                Toast({ message: res.message, type: "success" });
            }
        })
    }

    const handleClick = (data: any) => {
        setCurrent(data)
        toggle();
    }
    return (
        <>
            <CreateTag
                setTrue={setTrue}
                loading={boolean}
                refetch={refetch}
                setFalse={setFalse}
            />
            <TagListing
                loading={boolean}
                total={total}
                listing={result_data}
                handleClick={handleClick}
                handleConfirm={handleConfirm}
            />
            {bool && Object.keys(current).length > 0 && (
                <EditTags
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
}

export default Tags;