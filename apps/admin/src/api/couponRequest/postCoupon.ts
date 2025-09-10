import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { ICoupon } from "../types";
import { toast } from "react-toastify";
import { CouponFormValues } from "../../components/Forms/packages/CouponForm";

const postCoupon = async (data: CouponFormValues): Promise<ICoupon> => {
    return (await backendInstance.post("/coupon", data));
};

export const usePostCoupon = () => {
    return useMutation({
        mutationKey: ["coupon"],
        mutationFn: (data: CouponFormValues) => postCoupon(data),
        onSuccess: () => {
            toast.success('Coupon create successfully!');
        },
        onError: (error) => {
            toast.error(`Error while create coupon: ${error.message}`);
        }
    })
}
