import {body, validationResult, check, param, query} from 'express-validator';
import { ErrorHandler } from '../utils/utility.js';

const validateHandler = (req,res,next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) =>  error.msg).join(", ");
    console.log(errorMessages);

    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages,400));
};

const registerValidator =() => [
    body("name", "Please enter name").notEmpty(),
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
];

const loginValidator =() => [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
];

const newGroupValidator =() => [
    body("name", "Please enter name").notEmpty(),
    body("members")
        .notEmpty()
        .isArray({min:2,max:100})
        .withMessage("Members must be 2-100"),
];

const addMemberValidator =() => [
    body("chatId", "Please enter chatId").notEmpty(),
    body("members")
        .notEmpty()
        .isArray({min:1,max:97})
        .withMessage("Members must be 1-97"),
];

const removeMemberValidator =() => [
    body("userId", "Please enter user Id").notEmpty(),
    body("chatId", "Please enter chat Id").notEmpty(),
];

const sendAttachmentsValidator =() => [
    body("chatId", "Please enter chat Id").notEmpty(),
];

const ChatIdValidator =() => [
    param("id", "Please enter chat Id").notEmpty(),
];

const renameGroupValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
    body("name", "Please enter name").notEmpty(),
];

const sendRequestValidator = () => [
    body("userId", "Please enter User Id").notEmpty(),
];

const acceptRequestValidator = () => [
    body("requestId", "Please enter Request Id").notEmpty(),
    body("accept")
      .notEmpty().withMessage("Please add accept")
      .isBoolean().withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
    body("secretKey", "Please enter secret  keyId").notEmpty()
];

export {
    registerValidator, 
    validateHandler, 
    loginValidator, 
    newGroupValidator,
    addMemberValidator,
    removeMemberValidator,
    sendAttachmentsValidator,
    ChatIdValidator,
    renameGroupValidator,
    sendRequestValidator,
    acceptRequestValidator,
    adminLoginValidator
};