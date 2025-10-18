import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/actions/school";
import { ISchool } from "@/types/types";

export const useFetchSchools = () => {
	return useQuery({
		queryKey: ["schools"],
		queryFn: async () => {
			const res = await getSchools();
			return res as ISchool[];
		},
	});
};
