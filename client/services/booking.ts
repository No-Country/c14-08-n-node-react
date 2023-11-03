import axios from "@/lib/axios";

export const requestCreateBooking = async (
  idClient: string,
  idLawyers: string,
  hour: string,
  birthdate: string,
  modalityId: string,
) => {
  console.log({
    idClient,
    idLawyers,
    hour,
    birthdate,
    modalityId,
  });

  const response = await axios.post(`/users/appointment/create`, {
    idClient,
    idLawyers,
    hour,
    birthdate,
    modalityId,
  });

  return response;
};

export const requestBookings = async (idRol: string, idUser: string) => {
  const response = await axios.get(
    `users/appointment/filter/user?idRol=${idRol}&idUser=${idUser}`,
  );

  return response;
};

export const requestConfirmBooking = async (
  idRol: string,
  idAppointment: string,
  links: string,
) => {
  console.log(idRol, idAppointment, links);
  const response = await axios.patch(
    `users/appointment/update/accepted?idRol=${idRol}&idAppointment=${idAppointment}&links=${links}`,
  );

  return response;
};

export const requestDeclineBooking = async (
  idRol: string,
  idAppointment: string,
) => {
  const response = await axios.patch(
    `users/appointment/update/refused?idRol=${idRol}&idAppointment=${idAppointment}`,
  );

  return response;
};
