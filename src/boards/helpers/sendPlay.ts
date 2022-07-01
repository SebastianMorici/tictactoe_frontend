import axios from "axios";

export const sendPlay = async (boardId: number, id: number, index: number) => {
   await axios.post(`http://localhost:3000/boards/${boardId}/play`, JSON.stringify({ player_id: id, index: index }), {
      headers: { "Content-type": "application/json; charset=UTF-8" },
   });
};
