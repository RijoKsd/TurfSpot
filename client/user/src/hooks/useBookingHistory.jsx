import { useEffect, useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast"
import {format} from "date-fns";

export default function useBookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchBookings =  () =>{
        setLoading(true);
        axiosInstance.get("/api/user/booking/get-bookings").then((response)=>{
            const result = response.data;
            setBookings(result);
         }).catch((error)=>{
            return toast.error(error.response?.data?.message);
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect((()=>{
        fetchBookings()
    }),[])

  return { bookings, loading}
}
