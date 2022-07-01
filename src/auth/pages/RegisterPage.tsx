import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
   const [userInputValue, setUserInputValue] = useState<string>("");
   const navigate = useNavigate();

   const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      setUserInputValue(e.target.value);
   };

   const handleInputClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setUserInputValue("");
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         await axios.post(
            "http://localhost:3000/players",
            JSON.stringify({
               name: userInputValue,
            }),
            {
               headers: {
                  "Content-type": "application/json; charset=UTF-8",
               },
            }
         );

         if (userInputValue.trim().length > 0) {
            setUserInputValue("");
         }
         navigate("/login");
      } catch (e) {
         alert(e);
      }
   };

   return (
      <div className="container">
         <div className="register_form">
            <h1> TIC-TAC-TOE </h1>
            <h5>Register</h5>
            <hr />
            <form onSubmit={handleSubmit}>
               <input
                  placeholder="User"
                  type="text"
                  value={userInputValue}
                  onChange={handleUserInputChange}
                  onClick={handleInputClick}
               />
               <button className="btn btn-outline-primary mt-1">Register</button>
            </form>
            <div>
               <Link to="/login">Login</Link>
            </div>
         </div>
      </div>
   );
};
