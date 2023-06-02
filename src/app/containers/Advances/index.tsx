/** @format */
import { useState,useEffect } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { ListingReports } from "./Listing";
import { CreateAdvance } from "./Create";
import { EditReport } from "./Edit";
import { useBool, useAxios, useSearchParam } from "app/Hooks";
import { useGetAdvancesQuery } from "store/query/AdvanceQuery";

const { ADVANCES } = endpoints;

const Advances = () => {
  const { bool, toggle } = useBool();
  const { total, getParams, setTotal } = useSearchParam("");
  const [current, setCurrent] = useState({});
  const { bool: boolean, setTrue, setFalse } = useBool();

  const { data = [], refetch } = useGetAdvancesQuery(getParams(), {
    refetchOnMountOrArgChange: true,
  });
  const { callAxios } = useAxios();

  useEffect(() => {
    setTotal(data?.advances?.total);
  }, [setTotal, data?.advances?.total]);

  const handleClick = (data: any) => {
    setCurrent(data);
    toggle();
  };

  const handleConfirm = (id: number) => {
    setTrue();
    callAxios({
      method: "delete",
      url: `${ADVANCES}/${id}`,
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
      <CreateAdvance setTrue={setTrue} loading={boolean} refetch={refetch} setFalse={setFalse} />
      <ListingReports
        listing={data}
        total={total}
        loading={boolean}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />

      {bool && Object.keys(current).length > 0 && (
        <EditReport
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
export default Advances;
