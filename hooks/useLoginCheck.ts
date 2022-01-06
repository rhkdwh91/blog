import { getToken } from "../lib/cookieSet";
import { useEffect, useState } from "react";

export default function useLoginCheck() {
  const [isLogin, setIsLogin] = useState(false as boolean);
  const savedToken = getToken();
  console.log(savedToken);
  useEffect(() => {
    if (savedToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [savedToken]);

  return [isLogin];
}
