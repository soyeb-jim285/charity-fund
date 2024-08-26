import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGerFunds = () => {
  const query = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const response = await client.api.funds.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch funds");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
