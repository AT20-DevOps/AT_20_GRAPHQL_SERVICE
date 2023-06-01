      import express from 'express';
      import { ApolloServer } from 'apollo-server-express';
      import cors  from 'cors';
      import bodyParser from 'body-parser';
      import mongoose from 'mongoose';
      import  graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.mjs';
      
      export async function startApolloServer(typeDefs, resolvers){
         
          const app = express();
          app.use('/graphql', cors());
          //app.use(cors());
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: true }));
      
          const port = process.env.PORT || 5000;
    
          mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:${process.env.MONGO_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin&directConnection=true`)
          .then(() => console.log('MongoDB connected App'))
          .catch(err => console.log(err));
      
          const server = new ApolloServer({  typeDefs, resolvers, });
         
          await server.start();
          app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
              "Access-Control-Allow-Methods",
              "OPTIONS, GET, POST, PUT, PATCH, DELETE"
            );
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

           if (req.method === "OPTIONS") {
                 return res.sendStatus(200);
           }
           next();
          });
        
          app.use(graphqlUploadExpress());
          server.applyMiddleware({ app });
      
          
          app.listen(port, () => {
            console.log( `Graphql server on port http://localhost:5000/graphql`);
        
        });
      }
      