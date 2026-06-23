import express, { type Request, type Response, type NextFunction } from "express";
import connectDB from "./config/database.js";
import leadRouter from "./routes/lead.routes.js";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./config/openAPI.js";
import registerRouter from "./routes/register.routes.js";
import loginRoute from "./routes/login.routes.js";
import cookieParser from "cookie-parser";
import { PORT } from "./utils/constant.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRoute)

app.use("/", (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(500).json({
            isSuccess: false,
            message: "Something went wrong, Please try again.",
            data: []
        })
    }
});

connectDB().then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => { console.log("Successfully connected to the port ", PORT) });
}).catch(() => {
    console.log("Database not connected successfully.");
});