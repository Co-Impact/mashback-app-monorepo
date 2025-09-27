import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { Features } from "../types";
import { toast } from "react-toastify";
import {
  FeatureFormValues,
  ISetting,
} from "../../components/Forms/packages/FeatureForm";

interface FeaturePayload extends Omit<FeatureFormValues, "settings"> {
  settings?: {
    settings?: ISetting[];
  };
}

const postFeature = async (data: FeaturePayload): Promise<Features> => {
  return await backendInstance.post("/feature", data);
};

export const usePostFeature = () => {
  return useMutation({
    mutationKey: ["feature"],
    mutationFn: (data: FeaturePayload) => postFeature(data),
    onSuccess: () => {
      toast.success("Coupon create successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error while create coupon: ${error.message}`);
    },
  });
};
