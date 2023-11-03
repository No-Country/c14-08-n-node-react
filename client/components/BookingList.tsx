"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth";

import { BookingItem } from ".";

import {
  requestBookings,
  requestConfirmBooking,
  requestDeclineBooking,
} from "@/services/booking";
import { roleIds } from "@/constants/roleIds";
import { IBookItem } from "@/types";

const BookingList = () => {
  const { profile } = useAuthStore((state) => state);

  const [bookings, setBookings] = useState<IBookItem[]>([]);
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

  console.log(bookings);

  const handleAcceptRemoteBooking = async (link: string, bookingId: string) => {
    setIsLoading(true);
    try {
      const { data } = await requestConfirmBooking(
        roleIds.lawyer,
        bookingId,
        link,
      );

      const updatedBookings = [...bookings];
      const bookingIndex = bookings.findIndex(
        (booking) => booking.id === bookingId,
      );

      updatedBookings[bookingIndex].status.name = "Accepted";
      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  console.log(bookings);

  const handleDeclineBooking = async (bookingId: string) => {
    setIsLoading(true);
    try {
      const { data } = await requestDeclineBooking(roleIds.lawyer, bookingId);

      const updatedBookings = [...bookings];
      const bookingIndex = bookings.findIndex(
        (booking) => booking.id === bookingId,
      );

      updatedBookings[bookingIndex].status.name = "Rejected";
      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="main-container py-[100px]">
      {!isLoading && (
        <>
          <p className="mb-[20px] text-[24px] font-bold">Tus consultas:</p>
          <div className="flex w-full flex-col gap-[20px]">
            {bookings?.map((booking) => (
              <BookingItem
                key={booking.id}
                isClient={!!profile.client}
                handleAcceptRemoteBooking={handleAcceptRemoteBooking}
                handleDeclineBooking={handleDeclineBooking}
                {...booking}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingList;
