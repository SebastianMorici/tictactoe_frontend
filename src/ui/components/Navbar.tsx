import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../auth/context/UserContext";

export const Navbar = () => {
   const { user, logout } = useContext(UserContext);
   const navigate = useNavigate();

   const handleLogout = () => {
      if (logout === undefined) return;

      logout();
      navigate("/login", {
         replace: true, // Evita que pueda volver con la flecha para atras del navegador
      });
   };

   return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
         <Link className="navbar-brand" to="/">
            TicTacToe
         </Link>
         <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
            <ul className="navbar-nav ml-auto">
               <span className="nav-item nav-link text-primary">{user?.name}</span>

               <button className="nav-item nav-link btn" onClick={handleLogout}>
                  Logout
               </button>
            </ul>
         </div>
      </nav>
   );
};
