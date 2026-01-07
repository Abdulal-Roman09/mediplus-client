import { IUser } from "./columns";
import { get } from "@/services/api/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUsers = (): UseQueryResult<IUser[], Error> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await get(`/user`);
      return (response?.data || []) as IUser[];
    },
  });
};