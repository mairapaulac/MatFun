import { useQuery } from "@tanstack/react-query";
import { IClass } from "@/types/types";
import { getClassesFromGrade } from "@/actions/school";

export const useFetchClasses = (gradeId: number | null) => {
  return useQuery({
    queryKey: ["classes", gradeId],
    queryFn: async () => {
      const res = await getClassesFromGrade(gradeId!);
      return res as IClass[];
    },
    enabled: !!gradeId,
  });
};
