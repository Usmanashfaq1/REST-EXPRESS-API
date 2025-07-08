import express from "express"; //express frame work for api creation
import dotenv from "dotenv/config";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js"; //must add .js at end for custom modules
import productRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log("hey you meet me again wow! okay now go to next door");
  next(); // pass control to next middleware
});
//middleware 1  (To log incoming request)
app.use(morgan("dev"));

// Middleware 2  to parse incoming JSON body  (convert json body into js obj)
app.use(express.json());


// routes

app.use("/api/users",userRoutes);

app.use("/api/products", productRoutes);




// for error testing
app.get("/Error", (req, res) => {
  throw new Error("Fake crash");
});

app.use(errorHandler); // general error handler middleware

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
