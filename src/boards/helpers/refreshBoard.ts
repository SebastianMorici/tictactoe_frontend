import axios from "axios";
export const refreshBoard = async (boardId: number) => {
   const response = await axios.get(`http://localhost:3000/boards/${boardId}/refresh`);
   let board = response.data.board.state.split(",");
   let turn = response.data.board.turn;
   let winner = response.data.board.winner;

   return [board, turn, winner];
};
