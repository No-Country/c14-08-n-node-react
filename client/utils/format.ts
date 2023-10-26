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
