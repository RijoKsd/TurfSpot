import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parse } from "date-fns";

export const useEditTurfForm = (initialValues) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Turf name is required"),
    description: Yup.string().required("Description is required"),
    pricePerHour: Yup.number()
      .required("Price per hour is required")
      .positive("Price per hour must be a positive number"),
    location: Yup.string().required("Location is required"),
    sportsType: Yup.string().required("Sports type is required"),
    openTime: Yup.string().required("Open time is required"),
    closeTime: Yup.string()
      .required("Close time is required")
      .test(
        "closeTimeAfterOpenTime",
        "Close time must be after open time",
        (closeTime, context) => {
          const openTime = context.parent.openTime;
          return closeTime
            ? new Date(`1970-01-01 ${closeTime}`) >
                new Date(`1970-01-01 ${openTime}`)
            : true;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...initialValues,
      openTime: initialValues?.openTime
        ? format(parse(initialValues.openTime, "HH:mm", new Date()), "hh:mm a")
        : "",
      closeTime: initialValues?.closeTime
        ? format(parse(initialValues.closeTime, "HH:mm", new Date()), "hh:mm a")
        : "",
    },
  });

  const onSubmit = (data) => {
    return {
      ...data,
      openTime: data.openTime,
      closeTime: data.closeTime,
    };
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
  };
};

export default useEditTurfForm;