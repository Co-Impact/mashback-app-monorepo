import { backendInstance } from "../api.ts";
import { useQuery } from "@tanstack/react-query";

const getBlogByID = async (id: string) => {
  return (await backendInstance.get(`/blog/${id}`)).data;
};

const getAllBlogs = async () => {
  return (await backendInstance.get("/blog")).data;
};

const getBlogsByFilter = async (data: object) => {
  return (await backendInstance.get("/blog", data)).data;
};

const deleteBlog = async (id: string) => {
  await backendInstance.delete(`/blog/${id}`);
};

export const useGetAllBlog = () => {
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => getAllBlogs(),
  });
};

export const useGetBlogsByID = (id: string) => {
  return useQuery({
    queryKey: ["blog", { id }],
    queryFn: () => getBlogByID(id),
    enabled: !!id,
  });
};

export const useDeleteBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", { id }],
    queryFn: () => deleteBlog(id),
    enabled: !!id,
  });
};

export const useGetBlogsByFilter = (data: object) => {
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => getBlogsByFilter(data),
    enabled: !!data,
  });
};
