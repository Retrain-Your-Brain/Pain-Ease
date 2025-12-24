import SymptomControl from "../src/controllers/symptomController";
import isAuthenticated from "../src/middleware/isAuth";

const express = require("express");

const symptomRouter = express.Router();

symptomRouter.post("/add-symptom", isAuthenticated, SymptomControl.add);
symptomRouter.get("/get-symptom", isAuthenticated, SymptomControl.get);

export default symptomRouter;