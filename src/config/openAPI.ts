import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./openApiDoc.js";

export const openApiDocument = new OpenApiGeneratorV3(
    registry.definitions
).generateDocument({
    openapi: "3.0.0",
    info: {
        title: "My API",
        version: "1.0.0",
    },
});