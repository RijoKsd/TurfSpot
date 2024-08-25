import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "./useAxiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const becomeOwnerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Enter your email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm,
      "Enter a valid email"
    ),
  phone: yup
    .string()
    .required("Enter your phone number")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .min(10, "Phone number must be at least 10 digits long")
    .max(10, "Phone number must be at most 10 digits long"),
});

const useBecomeOwner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm({
       resolver: yupResolver(becomeOwnerSchema),
     });
       const onSubmit = async (data) => {
         setLoading(true);
         try {
            const response = await axiosInstance.post(
              "/api/owner/auth/ownerRequest", data
            );
            const result = await response.data;
             toast.success(result.message);
             navigate("/auth")
         } catch (error) {
           if(error.response){
             toast.error(error.response?.data?.message);
           }
         }finally{
           setLoading(false);
         }
       };

       return { register, handleSubmit, errors, onSubmit, loading };
}

export default useBecomeOwner;