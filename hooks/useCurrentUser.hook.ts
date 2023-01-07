import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
    const [id, setId] = useState<number>(-1);
    const [token, setToken] = useState<string>('');
    const [unAthenticated, setUnAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if(unAthenticated) {
            window.location.href = "/login"
        }
    }, [unAthenticated])

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('user') || "{}")
        if(!response.user) {
            setUnAuthenticated(true)
            return;
        }
        setId(response.user.id)
        setToken(response.token)
    }, []);

    return { id, token };
  };

  export default useCurrentUser;