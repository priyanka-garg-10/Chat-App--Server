const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

const CHATTU_TOKEN = "chattu-toekn";

export { corsOptions, CHATTU_TOKEN };