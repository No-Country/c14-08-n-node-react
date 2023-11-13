const authRoutes = ["/settings"];
const noAuthRoutes = ["ingreso", "registro"];
const noLawyerRoutes = ["/", "busqueda", "abogados"];
const noClientRoutes = ["/", "busqueda", "reservar"];

export const checkAuth = (pathname: string) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const { state } = JSON.parse(auth);
    const isClient = state?.profile?.client?.length > 0;
    const isLawyer = state?.profile?.lawyer?.length > 0;

    if ((isLawyer || isClient) && noAuthRoutes.includes(pathname)) {
      if (isLawyer) {
        return "";
      }

      if (isClient) {
        return "/";
      }
    }

    if ((!isLawyer || !isClient) && authRoutes.includes(pathname)) {
      return "/";
    }

    if (isLawyer && noLawyerRoutes.includes(pathname)) {
      return "/abogado/panel";
    }
  }
  return "";
};
