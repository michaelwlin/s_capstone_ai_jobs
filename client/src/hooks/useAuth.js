import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    console.log("useAuth accessed")
    const { auth, setAuth, validateToken, isLoading } = useContext(AuthContext)
    return { auth, setAuth, validateToken, isLoading };
}

export default useAuth;

