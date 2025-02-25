import express from "express";
import { NlpManager } from "node-nlp";
import fs from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./app/config/swagger.config.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Step 1: Initialize NLP Manager and Load Trained Model
const manager = new NlpManager({ languages: ["en"] });
manager.load("model.nlp"); // Load saved model

// Step 2: API Endpoint for Quiz Explanations
app.post("/get-explanation", async (req, res) => {
  const { question } = req.body;
  const response = await manager.process("en", question);
  console.log("response", response);
  if (response.answer) {
    const [correct_answer, explanation] = response.answer.split(": ");
    return res.json({
      data: { correct_answer, explanation },
      message: "Explanation fetched successfully",
      success: true,
    });
  } else {
    return res.json({
      data: { correct_answer: "Unknown", explanation: "No explanation found." },
      message: "No Explanation fetched.",
      success: true,
    });
  }
});

// Step 3: Start the Server
app.listen(5000, () => console.log("Server running on port 5000"));
