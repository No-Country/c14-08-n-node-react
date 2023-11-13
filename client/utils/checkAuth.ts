const authRoutes = ["reservar", "abogado", "cliente"];
const noAuthRoutes = ["ingreso", "registro"];
const noLawyerRoutes = ["/", "busqueda", "reservar", "abogados", "cliente"];
const noClientRoutes = ["abogado"];

export const checkAuth = (pathname: string) => {
  const auth = localStorage.getItem("auth");
  console.log("pathname", pathname);
  if (auth) {
    const { state } = JSON.parse(auth);
    const isClient = state?.profile?.client?.length > 0;
    const isLawyer = state?.profile?.lawyer?.length > 0;

    if (!isLawyer && !isClient && authRoutes.includes(pathname)) {
      return "/ingreso";
    }

    if ((isLawyer || isClient) && noAuthRoutes.includes(pathname)) {
      if (isLawyer) {
        return "/abogado/panel";
      }

      if (isClient) {
        return "/";
      }
    }

    if (isLawyer && noLawyerRoutes.includes(pathname)) {
      return "/abogado/panel";
    }

    if (isClient && noClientRoutes.includes(pathname)) {
      return "/";
    }
  }

  return "";
};
