import { useReducer } from "react";
import { User, UserContext, UserContextType } from "./UserContext";
import { UserAction, userReducer } from "./userReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState: UserContextType = {
   user: {} as User,
   logged: false,
};

const init = (): UserContextType => {
   const value: string | null = localStorage.getItem("user");
   if (typeof value !== "string") {
      return initialState;
   }
   const user: User = JSON.parse(value);

   return {
      user: user,
      logged: !!user,
   };
};

export const UserProvider = ({ children }: props) => {
   const [userState, dispatch] = useReducer(userReducer, initialState, init);
   const navigate = useNavigate();

   // Login Function
   const login = async (name: string) => {
      try {
         const response = await axios.post("http://localhost:3000/players/login", JSON.stringify({ name: name }), {
            headers: { "Content-type": "application/json; charset=UTF-8" },
         });

         const user: User = { id: response.data.player.id, name: response.data.player.name };

         const action: UserAction = {
            type: "login",
            payload: user,
         };

         localStorage.setItem("user", JSON.stringify(user));
         dispatch(action);
         navigate("/", {
            replace: true, // Evita que pueda volver al 'login' con la flecha para atras del navegador
         });
      } catch (e: any) {
         alert(e.response.data.message);
      }
   };

   // Logout Function
   const logout = () => {
      localStorage.removeItem("user");
      const action: UserAction = {
         type: "logout",
         payload: {} as User,
      };
      dispatch(action);
   };

   return (
      <UserContext.Provider value={{ ...userState, login: login, logout: logout }}>{children}</UserContext.Provider>
   );
};

interface props {
   children: JSX.Element | JSX.Element[];
}
