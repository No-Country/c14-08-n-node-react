const clientRoutes = ["/settings"];
const lawyerRoutes = ["/settings"];
const noLawyerRoutes = ["/"];

export const checkAuth = (url: string) => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    const { state } = JSON.parse(auth);

    const isClient = state?.profile?.client?.length > 0;
    const isLawyer = state?.profile?.lawyer?.length > 0;

    if (clientRoutes.includes(url)) {
    }

    if (lawyerRoutes.includes(url)) {
    }

    if (noLawyerRoutes.includes(url)) {
    }

    return true;
  }
};
