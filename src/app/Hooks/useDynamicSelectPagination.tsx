import { useState, useEffect, useCallback, useMemo } from "react";
import { axiosCall } from "services";
import { SelectOption } from "./Types";
import { useGetTokens } from "app/Hooks";
import { debounce } from "utils/debounce";

export const useDynamicSelectPagination = (url: string) => {
  const { access_token, organization_id } = useGetTokens();

  const [total, setTotal] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<SelectOption>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [hasContentLoading, setHasContentLoading] = useState(false);

  const fetchOptions = useCallback(
    async (searchKey: string, currentPage): Promise<SelectOption> => {
      const data = await axiosCall({
        url: `${url}?page=${currentPage}&view=20&search=${searchKey}`,
        headers: { authorization: access_token, organization: organization_id },
      });
      const res = data.data;
      setTotal(data.total);
      return res;
    },
    [url, access_token, organization_id, currentPage]
  );
  const loadOptions = useMemo(
    () => async (value: string) => {
      // setOptions([]);
      setFetching(true);
      await fetchOptions(value, currentPage).then((newOptions) => {
        setCurrentPage(currentPage + 1);
        setOptions(newOptions);
        setSearchValue(value);
        setFetching(false);
      });
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    loadOptions("");
    //eslint-disable-next-line
  }, []);

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      if (options.length < total) {
        setHasContentLoading(true);
        fetchOptions(searchValue, currentPage).then((newOptions) => {
          setCurrentPage(currentPage + 1);
          setHasContentLoading(false);
          setOptions([...options, ...newOptions]);
        });
      }
    }
  };

  const debounceFetcher = useMemo(() => {
    return debounce(loadOptions, 250);
  }, [loadOptions, 250]);

  return { fetching, options, hasContentLoading, handleScroll, debounceFetcher };
};
