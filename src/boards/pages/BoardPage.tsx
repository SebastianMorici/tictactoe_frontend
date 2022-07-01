import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../auth/context/UserContext";
import { getBoardPlayers, refreshBoard, sendPlay } from "../helpers";

export const BoardPage = () => {
   const {
      user: { id },
   } = useContext(UserContext);
   const { state: boardId } = useLocation();
   const navigate = useNavigate();

   const [board, setBoard] = useState<string[]>([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
   const [playerX, setPlayerX] = useState("");
   const [playerO, setPlayerO] = useState("");
   const [turn, setTurn] = useState<string>("x");
   const [winner, setWinner] = useState<string>("pending");

   // Obtiene el nombre de los jugadores y su simbolo.
   useEffect(() => {
      const setPlayers = async () => {
         const [player_x, player_o] = await getBoardPlayers(boardId as number);
         setPlayerX(player_x);
         setPlayerO(player_o);
      };

      try {
         setPlayers();
      } catch (e: any) {
         console.log(e.response.data.message);
      }
   });

   // Refresca el board cada cierto tiempo y al encontrar ganador frena el intervalo.
   useEffect(() => {
      let interval = setInterval(() => {
         const refresh = async () => {
            const [board, turn, winner] = await refreshBoard(boardId as number);
            setBoard(board);
            setTurn(turn);
            setWinner(winner);
         };
         try {
            refresh();
         } catch (e: any) {
            console.log(e.response.data.message);
            clearInterval(interval);
         }
      }, 500);
      if (winner !== "pending") clearInterval(interval);

      return () => {
         clearInterval(interval);
      };
   });

   const handleClick = async (index: number, id: number) => {
      try {
         await sendPlay(boardId as number, id, index);
      } catch (e: any) {
         console.log(e.response.data.message);
      }
   };

   return (
      <div className="row animate__animated animate__slideInLeft">
         <div className="col-md-4 mt-5 text-center">
            <h4>
               <b style={{ color: "#0a7897" }}>X: {playerX} </b>
            </h4>
         </div>
         <div className="col-md-4 mt-5 text-center">
            <div className="mx-auto">
               <div className="board-row">
                  <button className="cell" onClick={() => handleClick(0, id)}>
                     {board[0]}
                  </button>
                  <button className="cell" onClick={() => handleClick(1, id)}>
                     {board[1]}
                  </button>
                  <button className="cell" onClick={() => handleClick(2, id)}>
                     {board[2]}
                  </button>
               </div>
               <div className="board-row">
                  <button className="cell" onClick={() => handleClick(3, id)}>
                     {board[3]}
                  </button>
                  <button className="cell" onClick={() => handleClick(4, id)}>
                     {board[4]}
                  </button>
                  <button className="cell" onClick={() => handleClick(5, id)}>
                     {board[5]}
                  </button>
               </div>
               <div className="board-row">
                  <button className="cell" onClick={() => handleClick(6, id)}>
                     {board[6]}
                  </button>
                  <button className="cell" onClick={() => handleClick(7, id)}>
                     {board[7]}
                  </button>
                  <button className="cell" onClick={() => handleClick(8, id)}>
                     {board[8]}
                  </button>
               </div>
            </div>
            {winner === "pending" && (
               <div className="turn">
                  <h3>Turn: {turn}</h3>
               </div>
            )}
            <div
               className="winner animate__animated animate__flash"
               style={{ display: winner === "pending" ? "none" : "" }}
            >
               <h3>
                  <b> Winner: {winner.toUpperCase()} </b>
               </h3>
            </div>
            {winner !== "pending" && (
               <div>
                  <button
                     className="accept_button mt-3 animate__animated animate__fadeIn"
                     onClick={() => navigate("/")}
                  >
                     Accept
                  </button>
               </div>
            )}
         </div>
         <div className="col-md-4 mt-5 text-center">
            <h4>
               <b style={{ color: "#0a7897" }}>O: {playerO} </b>
            </h4>
         </div>
      </div>
   );
};
