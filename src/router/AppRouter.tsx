import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { BoardPage } from "../boards/pages/BoardPage";
import { HomePage } from "../ui/pages/HomePage";
import { Navbar } from "../ui/components/Navbar";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
   return (
      <>
         <Routes>
            <Route
               path="/login"
               element={
                  <PublicRoute>
                     <LoginPage />
                  </PublicRoute>
               }
            />
            <Route
               path="/register"
               element={
                  <PublicRoute>
                     <RegisterPage />
                  </PublicRoute>
               }
            />
            <Route
               path="/board"
               element={
                  <PrivateRoute>
                     <Navbar /> <BoardPage />
                  </PrivateRoute>
               }
            />
            <Route
               path="/*"
               element={
                  <PrivateRoute>
                     <Navbar /> <HomePage />
                  </PrivateRoute>
               }
            />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
         </Routes>
      </>
   );
};
