require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("graphql-tools");
const cron = require("node-cron");
const {
  constraintDirective,
  constraintDirectiveTypeDefs,
} = require("graphql-constraint-directive");
const jwt = require("jsonwebtoken");
const {
  typeDefs: UserTypeDefs,
  resolvers: UserResolvers,
} = require("./schemas/users");
const {
  typeDefs: BusinessTypeDefs,
  resolvers: BusinessResolvers,
} = require("./schemas/businesses");
const {
  typeDefs: QuestionTypeDefs,
  resolvers: QuestionResolvers,
} = require("./schemas/questions");

const {
  typeDefs: AuthCodeTypeDefs,
  resolvers: AuthCodeResolvers,
} = require("./schemas/AuthCode");

const {
  typeDefs: AdminTypeDefs,
  resolvers: AdminResolvers,
} = require("./schemas/Admin");

const {
  typeDefs: TriggerDefs,
  resolvers: TriggerResolvers,
} = require("./schemas/DBTriggers");

const {
  typeDefs: LeadDefs,
  resolvers: LeadResolvers,
} = require("./schemas/Services");

const connectDB = require("./db/db");
const { twilioSchedule } = require("./cronjobs/twilioSchedule");
const PORT = process.env.PORT || 4000;

connectDB();
//start cron job
cron.schedule("00 59 * * * *", () => {
  console.log("cron job running every hour");
  twilioSchedule();
});

const valid = cron.validate("59 * * * * *");

console.log("is valid", valid);

const url =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000`
    : "https://www.winfreeadvertising.com";

const corsOptions = {
  origin: [url, "https://seo.usasmallbusinessresources.com"],
  credentials: true, // <-- REQUIRED backend setting
};

console.log("node_env:", process.env.NODE_ENV);

const types = [
  UserTypeDefs,
  BusinessTypeDefs,
  QuestionTypeDefs,
  AuthCodeTypeDefs,
  AdminTypeDefs,
  TriggerDefs,
  LeadDefs,
];
const resolvers = [
  UserResolvers,
  BusinessResolvers,
  QuestionResolvers,
  AuthCodeResolvers,
  AdminResolvers,
  TriggerResolvers,
  LeadResolvers,
];

const mergedTypes = mergeTypeDefs(types);
const mergedResolvers = mergeResolvers(resolvers);

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, mergedTypes],
  resolvers: [mergedResolvers],
  schemaTransforms: [constraintDirective()],
});

const startApolloServer = async () => {
  try {
    const server = new ApolloServer({
      schema,
      playground: {
        endpoint: "/graphql",
      },
      introspection: true,
      context: ({ req }) => {
        const token = req.headers.authorization || "";

        if (!token) return;
        //verify token

        const newToken = token.split(" ")[1] || "";
        const user = jwt.verify(
          newToken,
          process.env.JWT_SECRET,
          (err, decoded) => {
            // console.log('decoded', decoded)
            console.log("error in auth?", err);
            if (err) throw new Error(err);
            const user = decoded.user || decoded.admin || "";
            console.log("is there a user?", user);
            return user;
          }
        );
        return { user };
      },
    });

    const app = express();

    app.use(express.json({ extended: false }));

    await server.start();

    server.applyMiddleware({ app, cors: corsOptions });

    // Start the server

    await new Promise((resolve) => app.listen(PORT, resolve));

    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );

    return { server, app };
  } catch (error) {
    console.error("server start error:", error);
  }
};

startApolloServer();
