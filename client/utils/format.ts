export const formatQueryString = (inputString: string) => {
  let formattedString = inputString.trim().toLowerCase();

  formattedString = formattedString.replace(/\s+/g, "-");

  formattedString = formattedString
    .replace(/í/g, "i")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/ú/g, "u")
    .replace(/ó/g, "o");

  return formattedString;
};

export const unformatQueryString = (inputString: string) => {
  return inputString.replace(/-/g, " ");
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (inputDate: string) => {
  const dateObject = new Date(inputDate);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${year}-${month}-${day}`;
};
