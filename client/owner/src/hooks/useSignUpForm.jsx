import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
 
const registerSchema = yup.object().shape({
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

  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const useSignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
     setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/owner/auth/register",
        data
      );
      const result = await response.data;
        dispatch(login({ token: result.token, role: result.role }));
        if (result.role === "owner") {
          navigate("/owner");
        } else if (result.role === "admin") {
          navigate("/admin");
        }
        
    } catch (error){
       if (error.response) {
        // Server responded with a status other than 200 range
        toast.error(
          `${error.response.data.message || "Registration failed"}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else caused the error
        toast.error(`Error: ${error.message}`);
      }
    }
     finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, errors, onSubmit, loading };
};

export default useSignUpForm;
