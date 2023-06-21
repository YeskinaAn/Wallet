const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "mysecretkey";

const prisma = new PrismaClient();
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

app.get("/expenses", authenticateUser, async (req, res) => {
  const userId = req.userId;
  const { category } = req.query;

  let expensesQuery = {
    where: {
      userId,
    },
  };

  if (category) {
    expensesQuery.where.category = category.toString();
  }

  const myExpenses = await prisma.expenses.findMany(expensesQuery);
  res.json(myExpenses);
});


app.post(`/expenses`, authenticateUser, async (req, res) => {
  const { expenseValue, category } = req.body;
  const userId = req.userId;

  const expenses = await prisma.expenses.create({
    data: {
      expenseValue,
      category,
      user: { connect: { id: userId } },
    },
  });
  res.json(expenses);
});

app.get("/income", authenticateUser, async (req, res) => {
  const userId = req.userId;
  const { category } = req.query;

  let incomeQuery = {
    where: {
      userId,
    },
  };

  if (category) {
    incomeQuery.where.category = category.toString();
  }

  const myIncome = await prisma.income.findMany(incomeQuery);
  res.json(myIncome);
});

app.post(`/income`, authenticateUser, async (req, res) => {
  const { incomeValue, category } = req.body;
  const userId = req.userId;

  const income = await prisma.income.create({
    data: {
      incomeValue,
      category,
      user: { connect: { id: userId } },
    },
  });
  res.json(income);
});

const server = app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`)
);
