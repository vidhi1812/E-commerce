import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const validuser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/auth/validtoken",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setIsUserLoggedIn(true);
          setUser(res.data);
          setIsLoading(false);
        } else {
          setIsUserLoggedIn(false);
          setIsLoading(false);
          
        }
      } catch (err) {
        toast.error('please login first');
      }
  };
  useEffect(() => {
    validuser();
  }, []);
  const LogoutUser = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsUserLoggedIn(false);
        setIsLoading(false);
        toast.success("Logout Successfully");
      } else {
        setIsUserLoggedIn(true);
        setIsLoading(false);
        toast.error(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider value={{ isloading, isUserLoggedIn, LogoutUser,validuser,user}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
