import axios from "axios";

export const getBoardPlayers = async (boardId: number) => {
   const boardResponse = await axios.get(`http://localhost:3000/boards/${boardId}/refresh`);
   const player_x_id = boardResponse.data.board.playerx_id;
   const player_o_id = boardResponse.data.board.playero_id;

   const player_x_response = await axios.get(`http://localhost:3000/players/${player_x_id}`);
   const player_o_response = await axios.get(`http://localhost:3000/players/${player_o_id}`);

   return [player_x_response.data.player.name, player_o_response.data.player.name];
};
