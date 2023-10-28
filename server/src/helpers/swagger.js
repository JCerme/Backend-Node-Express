import swaggerDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { logger } from "./logger.js";
import dotenv from 'dotenv';
import __dirname from "../../utils.js";
dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BoatPump REST API Documentation",
            version: process.env.NODE_VERSION,
        },
        components: {
            securitySchemes: {
                LocalAuth: {
                    type: "http",
                    scheme: "basic",
                    description: "Authentication based on sessions; A valid session cookie is required."
                },
                GitHubAuth: {
                    type: "oauth2",
                    flows: {
                        authorizationCode: {
                            authorizationUrl: "https://github.com/login/oauth/authorize",
                            tokenUrl: "https://github.com/login/oauth/access_token",
                            scopes: {
                                "read:user": "Read the user information",
                            },
                        },
                    },
                },
                GoogleAuth: {
                    type: "oauth2",
                    flows: {
                        authorizationCode: {
                            authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
                            tokenUrl: "https://accounts.google.com/o/oauth2/token",
                            scopes: {
                                "profile": "Get the user profile information",
                            },
                        },
                    },
                },
            },
        }
    },
    apis: [`${__dirname}/src/docs/*.yaml`]
}

const swaggerSpec = swaggerDoc(options)

const swaggerDocs = (app, port) => {
    // Swagger page
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    })

    logger.debug(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;