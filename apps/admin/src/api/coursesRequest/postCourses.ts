import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { ICourses } from "../types";
import { toast } from "react-toastify";

const postCourses = async (data: ICourses): Promise<ICourses> => {
  console.log(data);
  return await backendInstance.post("/courses", data);
};

export const usePostCourse = () => {
  return useMutation({
    mutationKey: ["course"],
    mutationFn: (data: ICourses) => postCourses(data),
    onSuccess: () => {
      toast.success("courses create successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error while create course: ${error.message}`);
    },
  });
};
