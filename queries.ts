import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "./configs/request";

let headers = {
  "Content-Type": "multipart/form-data",
  accept: "application/json",
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function useFetch<T>({
  url,
  queryKey,
  select,
  params,
}: {
  url: string;
  queryKey: string;
  select?: (data: T) => void;
  params?:object
}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => apiRequest(BASE_URL + url, "get", {}, headers, params),
    retry: true,
    select,
  });
}

export function useMutationQuery({
  method = "post",
  url,
  onSuccess,
}: {
  method: string;
  url: string;
  onSuccess?: (data?: string) => void;
}) {
  headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  return useMutation({
    mutationFn: async (body?: object) => {
      const result = await apiRequest(BASE_URL + url, method, body, headers);
      return result;
    },
    onSuccess,
  });
}
