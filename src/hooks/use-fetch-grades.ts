import { useQuery } from "@tanstack/react-query";
import { getGradesFromSchools } from "@/actions/school";
import { IGrade } from "@/types/types";

export const useFetchGrades = (schoolId: number | null) => {
	return useQuery({
		queryKey: ["grades", schoolId],
		queryFn: async () => {
			const res = await getGradesFromSchools(schoolId!);
			return res as IGrade[];
		},
		enabled: !!schoolId,
	});
};
