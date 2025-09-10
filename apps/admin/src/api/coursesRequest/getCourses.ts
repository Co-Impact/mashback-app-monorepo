import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { ICourses } from "../types";

const getFullCourse = async (id: string): Promise<ICourses> => {
  return (await backendInstance.get(`/courses/${id}`)).data;
};

const getAllCourses = async (): Promise<Array<ICourses>> => {
  return (await backendInstance.get("/courses")).data;
};

const getAllSubCourses = async (id: string): Promise<Array<ICourses>> => {
  return (await backendInstance.get(`/courses/sub-course${id}`)).data;
};

export const useGetCourses = () => {
  return useQuery({ queryKey: ["course"], queryFn: () => getAllCourses() });
};
