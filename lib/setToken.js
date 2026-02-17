import Cookies from "js-cookie";

export const setUserToken = async (user) => {
  const token = await user.getIdToken();
  Cookies.set("token", token);
};
