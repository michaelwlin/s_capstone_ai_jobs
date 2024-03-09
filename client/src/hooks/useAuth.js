import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    console.log("useAuth accessed")
    return useContext(AuthContext);
}

export default useAuth;

