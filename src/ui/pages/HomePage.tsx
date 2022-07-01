import { useContext, useState } from "react";
import { UserContext } from "../../auth/context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const HomePage = () => {
   const { user } = useContext(UserContext);
   const navigate = useNavigate();
   const [loading, setLoading] = useState<boolean>(false);

   let full: boolean = false;

   const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay)); // Para usar un timeout dentro de una funcion "async"

   const handleSearchGame = async () => {
      try {
         setLoading(true);
         const response = await axios.post(`http://localhost:3000/players/${user.id}/create_board`);

         const boardId: number = response.data.board.id;

         full = response.data.board.full;

         while (!full) {
            const response = await axios.get(`http://localhost:3000/boards/${boardId}/refresh`);
            full = response.data.board.full;
            await wait(500);
         }
         navigate("/board", { state: boardId });
         setLoading(false);
      } catch (e: any) {
         alert(e.response.data.message);
      }
   };

   return (
      <div className="search_container">
         <button
            className="search_button animate__animated animate__slideInLeft"
            onClick={handleSearchGame}
            style={{ display: loading ? "none" : "" }}
         >
            Search Game
         </button>
         {loading && <Loading loading={loading} />}
      </div>
   );
};
