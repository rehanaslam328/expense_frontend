/**@format */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TablePaginationConfig } from "antd";
import { SearchParamsTypes } from "./Types";


export const useSearchParam = (name: string, no_pagination?: boolean) => {
  const [total, setTotal] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("current");
  const param: string = searchParams.get(name) ?? "";
  useEffect(() => {
    if (!page && !no_pagination)
      setSearchParams({
        ...(param && { tab: param }),
        sort: "",
        current: 1,
        pageSize: 10,
        sort_column: "",
      } as any);
    //eslint-disable-next-line
  }, [page, param, no_pagination, setSearchParams]);

  const onChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    const param: SearchParamsTypes = {
      sort: searchParams.get("sort") || "asec",
      sort_column: searchParams.get("sort_column") || "",
      ...(searchParams.get(name) && { tab: searchParams.get(name) }),
    };
    console.log("params", { sorter }, { pagination }, { filters });
    const { field = "", order = "" } = sorter;
    const { current = 1, pageSize = 10 } = pagination;

    if (order) param.sort = order;
    if (field) param.sort_column = field;
    if (current) param.current = current;
    if (pageSize) param.pageSize = pageSize;
    setSearchParams(param as any);
  };

  const getParams = () => {
    const page = searchParams.get("current") || 1;
    const pageSize = searchParams.get("pageSize") || 10;
    const sort = searchParams.get("sort") || "ascend";
    const sort_column = searchParams.get("sort_column") || "";
    const tab = searchParams.get(name) || "1";

    return { page: +page, pageSize: +pageSize, sort, sort_column, tab };
  };

  const setParams = ({ current_page, per_page, total }: any) => {
    const param = getParams();
    setSearchParams({
      ...param,
      pageSize: per_page,
      current: current_page,
    } as any);
    setTotal(total);
  };

  return {
    total,
    param,
    onChange,
    setTotal,
    getParams,
    setParams,
    searchParams,
    setSearchParams,
  };
};
