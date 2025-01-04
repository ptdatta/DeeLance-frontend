import axios from "api/axios";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const fetchUsers = async (searchTerm: string, endpoint: string) => {
  const { data } = await axios.post(endpoint, {
    username: searchTerm,
  });
  return data;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
interface useDebouncedSearchReturnType {
  isLoadingTotally: boolean;
  apiData: UseQueryResult;
  endpoint?: string | undefined;
}

export const useDebouncedSearch = (
  searchTerm: string,
  delay = 1000,
  endpoint = "/searchApi"
): useDebouncedSearchReturnType => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);

  const debouncedSetTerm = useCallback(
    debounce((term) => {
      setDebouncedTerm(term);
      setIsLoading(null);
    }, delay),
    []
  );

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length === 0) {
      setDebouncedTerm("");
      return;
    }

    setIsLoading(true);
    debouncedSetTerm(searchTerm);
  }, [searchTerm, debouncedSetTerm]);

  const queryData = useQuery(
    ["searchUsers", debouncedTerm],
    () => fetchUsers(debouncedTerm, endpoint),
    {
      enabled: !!debouncedTerm,
    }
  );

  return {
    isLoadingTotally: isLoading || queryData.isFetching,
    apiData: queryData,
  };
};
