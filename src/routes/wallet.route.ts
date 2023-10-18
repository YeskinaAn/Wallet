import * as express from "express";
import WalletController from "../controllers/wallet.controller";

const router = express.Router();

router.get("/expenses", WalletController.getExpenses);
router.post("/createExpenses", WalletController.createExpenses);
router.get("/income", WalletController.getIncome);
router.post("/createIncome", WalletController.createIncome);
router.put("/updateExpense/:id", WalletController.updateExpense);
router.delete("/deleteExpense/:id", WalletController.deleteExpense);
router.delete("/deleteIncome/:id", WalletController.deleteIncome);

export default router;
