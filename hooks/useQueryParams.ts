import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  return {
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
    searchTerm: searchParams.get("search"),
  };
};
