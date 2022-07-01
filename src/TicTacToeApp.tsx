import { UserProvider } from "./auth/context/UserProvider";
import { AppRouter } from "./router/AppRouter";

export const TicTacToeApp = () => {
   return (
      <UserProvider>
         <AppRouter />
      </UserProvider>
   );
};
