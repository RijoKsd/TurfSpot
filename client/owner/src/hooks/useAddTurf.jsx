import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";

const addTurfSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter the name of the turf")
    .min(3, "Name must be at least 3 characters long"),
  description: yup
    .string()
    .required("Enter the description of the turf")
    .min(3, "Description must be at least 3 characters long"),
  location: yup
    .string()
    .required("Enter the location of the turf")
    .min(3, "Location must be at least 3 characters long"),
  pricePerHour: yup
    .number()
    .required("Enter the price per hour of the turf")
    .min(500, "Price per hour must be at least 500 rupees"),
  image: yup
    .mixed()
    .test(
      "image",
      "Please upload a valid image (PNG, JPEG, or WebP)",
      function (value) {
        if (!value || !value[0]) return false;
        const file = value[0];
        const acceptedFormats = ["image/png", "image/jpeg", "image/webp"];
        return acceptedFormats.includes(file.type);
      }
    ),
  openTime: yup.date().required("Open time is required"),
  closeTime: yup
    .date()
    .required("Close time is required")
    .min(yup.ref("openTime"), "Close time must be after open time"),
  sportTypes: yup
    .array()
    .of(yup.string())
    .min(1, "At least one sport type is required"),
});

export default function useAddTurf() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addTurfSchema),
    defaultValues: {
      sportTypes: [],
      openTime: null,
      closeTime: null,
    },
  });

  const [sportTypes, setSportTypes] = useState([]);
  const [newSportType, setNewSportType] = useState("");
  const openTime = watch("openTime");

  useEffect(() => {
    setValue("sportTypes", sportTypes);
  }, [sportTypes, setValue]);

  const addSportType = () => {
    if (newSportType && !sportTypes.includes(newSportType)) {
      setSportTypes([...sportTypes, newSportType]);
      setNewSportType("");
    }
  };

  const removeSportType = (type) => {
    setSportTypes(sportTypes.filter((sport) => sport !== type));
  };

  const onSubmit = async (data) => {
    console.log(data, "addTurf");

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data[key] && data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else if (key === "openTime" || key === "closeTime") {
        if (data[key] instanceof Date) {
          formData.append(key, format(data[key], "HH:mm"));
        }
      } else if (key === "sportTypes") {
        if (Array.isArray(data[key])) {
          data[key].forEach((sport, index) => {
            formData.append(`sportTypes[${index}]`, sport);
          });
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Here you would typically send the formData to your API
    // For example:
    // await api.post('/turfs', formData);
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    onSubmit,
    sportTypes,
    newSportType,
    setNewSportType,
    addSportType,
    removeSportType,
    openTime,
  };
}
