import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) =>
   members.find((member) => member._id.toString() !== userId.toString());

export const getSockets = (users) => {
   if (!Array.isArray(users)) {
      // Handle the case where users is not an array
      console.error("Invalid users parameter. Expected an array.");
      return []; // or throw an error, e.g., throw new Error("Invalid users parameter");
   }
   const sockets = users.map((user) => userSocketIDs.get(user.toString()));
   return sockets;
}

export const getBase64 = (file) =>
   `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
