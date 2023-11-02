"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth";

import { BookingItem } from ".";

import { requestBookings } from "@/services/booking";
import { roleIds } from "@/constants/roleIds";

const BookingList = () => {
  const { profile } = useAuthStore((state) => state);

  const [bookings, setBookings] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (profile) {
      const roleId = profile?.client ? roleIds["client"] : roleIds["lawyer"];
      const userId = profile?.client
        ? profile?.client[0].id
        : profile?.lawyer[0].id;

      (async () => {
        const { data } = await requestBookings(roleId, userId);

        setBookings(data);
        setIsLoading(false);
      })();
    }
  }, [profile]);

  return (
    <div className="main-container my-[100px]">
      {!isLoading && bookings?.map((booking) => <BookingItem {...booking} />)}
    </div>
  );
};

export default BookingList;
