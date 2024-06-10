import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { ChatIdValidator, addMemberValidator, newGroupValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

// After here user must be logged in  to access  the routes
app.use(isAuthenticated);

app.post("/new",newGroupValidator(), validateHandler, newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers",addMemberValidator(),validateHandler ,addMembers);
app.put("/removemember",removeMemberValidator(), validateHandler, removeMember);
app.delete("/leave/:id",ChatIdValidator(), validateHandler, leaveGroup);

app.post("/message",
    attachmentsMulter, 
    sendAttachmentsValidator(), 
    validateHandler, 
    sendAttachments
);

app.get("/message/:id",ChatIdValidator(), validateHandler, getMessages);

// app.get("/chat/:id/",A);
// app.put("/chat/:id/",B);
// app.delete("/chat/:id/",C);
app.route("/:id")
  .get(ChatIdValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(ChatIdValidator(), validateHandler, deleteChat);

export default app;