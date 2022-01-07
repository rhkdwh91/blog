import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setToken = (authtoken) => {
  const expiryDate = new Date(Date.now() + 60000 * 60 * 24 * 14 - 60000); // (2 weeks - 1 min)
  if (process.env.NODE_ENV === "production") {
    cookies.set("authtoken", authtoken, {
      httpOnly: true,
      secure: true,
      expires: expiryDate,
      domain: ".josns.pe.kr",
    });
  } else {
    cookies.set("authtoken", authtoken, {
      expires: expiryDate,
    });
  }
};

export const removeToken = () => {
  if (process.env.NODE_ENV === "production") {
    cookies.remove("authtoken", { domain: ".josns.pe.kr" });
  } else {
    cookies.remove("authtoken");
  }
};

export const getToken = () => {
  return cookies.get("authtoken");
};
