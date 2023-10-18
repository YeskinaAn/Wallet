import WalletRouter from "./routes/wallet.route";

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET_KEY = "mysecretkey"; 

const app = express();
const port = 8080;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors(corsOptions));
// Replace with your actual secret key


function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No Authorization Header"); // Add this for debugging
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Token Verification Error:", err); // Add this for debugging
    res.status(401).json({ error: "Unauthorized" });
  }
}


app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is already taken
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);

  res.json({ user, token });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);

  res.json({ user, token });
});

// Routes for posts (protected by authentication middleware)
app.use("/api/wallet", authenticateUser);
app.use("/api/wallet", WalletRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
