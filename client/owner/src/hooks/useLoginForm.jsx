import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Enter your email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm,
      "Enter a valid email"
    ),
  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters long"),
});

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
   loading(true);
    try {
      const response = await axiosInstance.post("api/owner/auth/login", data);
      const result = await response.data;
      toast.success(result.message);
      
    } catch (error) {
      console.error(error, "error");
      if(error.response) {
        toast.error(error.response?.data?.message);
      } else if(error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error(error.message);
      }
    }finally{
      loading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
  };
};

export default useLoginForm;
