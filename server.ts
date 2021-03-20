import express from "express";
import next from "next";
import { ApolloServer } from "apollo-server-express";
import { bodyParserGraphQL } from "body-parser-graphql";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
// 환경변수 설정(dotenv 라이브러리 사용)
// import env from "./config/env";
import api from "./api";
import config from "./server_config.json";
import resolvers from "./graphql/resolvers";
import fs from "fs";
import { sequelize } from './sqlz';

//const dev:boolean = process.env.NODE_ENV !== "production";
let nextApp;
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  nextApp = next({ dev: false });
} else if (process.env.NODE_ENV === "development") {
  nextApp = next({ dev: true });
}
sequelize.sync({force: false});

const handle = nextApp.getRequestHandler();
// Node file system을 사용하여 gql schema 가져옴
const typeDefs = fs.readFileSync("graphql/schema.graphql", {
    encoding: "utf-8",
  });

nextApp.prepare().then(() => {
    const app = express(); 
    // view engine setup
    if (process.env.NODE_ENV === "production") {
        app.use(morgan("combined"));
    } else {
        // development
        app.use(morgan("dev"));
    }
    app.use(bodyParserGraphQL());
    app.use(compression());
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
        cors({
        exposedHeaders: config.corsHeaders,
        })
    );
    app.use("/api", api);
    
    // ApolloServer 생성
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true, // 스키마 검사 활성화 default: true
        playground: true, // playgorund 활성화 default: true
    });
    server.applyMiddleware({
        app,
        path: "/graphql",
    });
    app.get('*', (req, res) => {
        return handle(req, res)
    })

    const reversePort = 3000;
    app.listen(reversePort, () => {
        console.log(`next+expresss running on port ${reversePort}`);
    });
});