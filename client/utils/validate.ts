export const validateDate = (value: string) => {
  const selected = new Date(value).getFullYear();
  const now = new Date().getFullYear();
  return now - selected >= 18 || "Debés tener al menos 18 años para acceder.";
};

export const validatePhoneNumber = (phone: string) => {
  const formattedPhone = phone.replace(/\D/g, "");

  const pattern =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})?\d{8}$/;

  return pattern.test(formattedPhone) || "¡El número no es válido!";
};
