import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/user/login");
      }

      try {
        const seacretKey = new TextEncoder().encode(
          "next-market-route-handlers",
        );
        const decodedJwt = await jwtVerify(token, seacretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (err) {
        console.error("認証エラー:", err);
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);

  return loginUserEmail;
};

export default useAuth;
