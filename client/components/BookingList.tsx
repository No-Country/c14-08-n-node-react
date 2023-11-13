"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

import { useAuthStore } from "@/store/auth";

import { BookingItem } from ".";

import {
  requestBookings,
  requestConfirmBooking,
  requestConfirmRemoteBooking,
  requestDeclineBooking,
  requestLawyerBookings,
} from "@/services/booking";
import { roleIds } from "@/constants/roleIds";
import { IBookItem } from "@/types";
import { Spinner } from ".";
import { bookingStatusTypes } from "@/constants";
import { checkAuth } from "@/utils/checkAuth";

const BookingList = () => {
  const { id: routeId }: { id: string } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    const redirect = checkAuth(pathname.split("/")[1]);

    if (redirect.length > 0) {
      router.push(redirect);
    }
  }, []);

  const { profile } = useAuthStore((state) => state);

  const [bookings, setBookings] = useState<IBookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(profile);

  useEffect(() => {
    setIsLoading(true);

    if (profile) {
      // const roleId = profile?.client ? roleIds["client"] : roleIds["lawyer"];
      const userId = profile?.client
        ? profile?.client[0].id
        : profile?.lawyer[0].id;

      (async () => {
        if (profile.client) {
          const { data } = await requestBookings(roleIds["client"], userId);
          setBookings(data);
        } else {
          if (
            routeId === "confirmados" ||
            routeId === "pendientes" ||
            routeId === "cancelados"
          ) {
            const { data } = await requestLawyerBookings(
              bookingStatusTypes[routeId],
              userId,
            );
            setBookings(data);
          }
        }

        setIsLoading(false);
      })();
    }
  }, [profile, routeId]);

  const handleAcceptRemoteBooking = async (link: string, bookingId: string) => {
    setIsLoading(true);
    try {
      const { data } = await requestConfirmRemoteBooking(
        roleIds.lawyer,
        bookingId,
        link,
      );

      let updatedBookings = [...bookings];

      if (profile.client) {
        const bookingIndex = bookings.findIndex(
          (booking) => booking.id === bookingId,
        );

        updatedBookings[bookingIndex].status.name = "Accepted";
      } else {
        updatedBookings = updatedBookings.filter(
          (booking) => booking.id !== bookingId,
        );
      }

      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const handleAcceptBooking = async (bookingId: string) => {
    setIsLoading(true);
    try {
      const { data } = await requestConfirmBooking(roleIds.lawyer, bookingId);

      let updatedBookings = [...bookings];

      if (profile.client) {
        const bookingIndex = bookings.findIndex(
          (booking) => booking.id === bookingId,
        );

        updatedBookings[bookingIndex].status.name = "Accepted";
      } else {
        updatedBookings = updatedBookings.filter(
          (booking) => booking.id !== bookingId,
        );
      }

      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const handleDeclineBooking = async (bookingId: string) => {
    setIsLoading(true);
    try {
      const { data } = await requestDeclineBooking(roleIds.lawyer, bookingId);

      let updatedBookings = [...bookings];

      if (profile.client) {
        const bookingIndex = bookings.findIndex(
          (booking) => booking.id === bookingId,
        );

        updatedBookings[bookingIndex].status.name = "Rejected";
      } else {
        updatedBookings = updatedBookings.filter(
          (booking) => booking.id !== bookingId,
        );
      }

      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto" />
      )}
      {!isLoading && (
        <div className="main-container relative py-[100px]">
          <>
            <p className="mb-[20px] text-[24px] font-bold">Tus consultas:</p>
            <div className="flex w-full flex-col gap-[20px]">
              {bookings.length === 0 && (
                <p className="text-center">¡No hay consultas todavía!</p>
              )}
              {bookings.length > 0 &&
                bookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    isClient={!!profile.client}
                    handleAcceptRemoteBooking={handleAcceptRemoteBooking}
                    handleDeclineBooking={handleDeclineBooking}
                    handleAcceptBooking={handleAcceptBooking}
                    {...booking}
                  />
                ))}
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default BookingList;
