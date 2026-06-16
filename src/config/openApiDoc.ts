import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createLeadSchema } from "../validations/lead.validation.js";
import { createUserSchema } from "../validations/user.validation.js";

export const registry = new OpenAPIRegistry();

// Schema
registry.register("Lead", createLeadSchema);
registry.register("User", createUserSchema);

// ✅ API ROUTE (THIS IS WHAT YOU ARE MISSING)
registry.registerPath({
    method: "post",
    path: "/api/v1/leads",
    tags: ["Lead"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createLeadSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Lead created successfully",
        },
    },
});

//Update Lead
registry.registerPath({
    method: "post",
    path: "/api/v1/edit",
    tags: ["Lead"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createLeadSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Lead created successfully",
        },
    },
});

//Create user
registry.registerPath({
    method: "post",
    path: "/api/v1/users",
    tags: ["User"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createUserSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "User created successfully",
        },
    },
});
