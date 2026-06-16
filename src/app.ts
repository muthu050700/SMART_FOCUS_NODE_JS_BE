import express, { type Request, type Response, type NextFunction } from "express";
import connectDB from "./config/database.js";
import { PORT } from "./utils/constant.js";
import leadRouter from "./routes/lead.routes.js";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/user.routes.js";
import { openApiDocument } from "./config/openAPI.js";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/users", userRouter);

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
    app.listen(PORT, () => {
        console.log("Successfully connected to the port ", PORT);
    });
}).catch(() => {
    console.log("Database not connected successfully.");
});