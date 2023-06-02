import { useEffect } from "react";
import { ExpenseListing } from "./Listing";
import { SubHeader } from "./SubHeader";
import { useGetListingQuery } from "store/query/Expense";
import { Toast } from "app/shared";
import { useSearchParam, useAxios } from "app/Hooks";
import { endpoints } from "static";

const { EXPENSE } = endpoints;

const Expenses = () => {
  const { total, getParams, setTotal } = useSearchParam("");
  const { isLoading, isFetching, data, refetch } = useGetListingQuery(getParams(), {
    refetchOnMountOrArgChange: true,
  });
  const { callAxios } = useAxios();

  useEffect(() => {
    setTotal(data?.expenses?.total);
  }, [setTotal, data?.expenses?.total]);

  const handleConfirm = (id: number) => {
    callAxios({
      method: "delete",
      url: `${EXPENSE}/${id}`,
    }).then((res) => {
      if (res) {
        refetch();
        Toast({ message: res.message });
      }
    });
  };

  return (
    <>
      <SubHeader />
      <ExpenseListing
        total={total}
        listing={data?.expenses?.data}
        loading={isLoading || isFetching}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
export default Expenses;
