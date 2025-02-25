import { NlpManager } from "node-nlp";
import fs from "fs";

// Step 1: Initialize NLP Manager
const manager = new NlpManager({ languages: ["en"] });

// Step 2: Load dataset from JSON file
const dataset = JSON.parse(fs.readFileSync("dataset.json", "utf8"));

// Step 3: Train the model using dataset
dataset.forEach(({ question, correct_answer, explanation }) => {
  const category = `quiz.${correct_answer.replace(/\s+/g, "_").toLowerCase()}`; // Unique category

  manager.addDocument("en", question, category); // Train with question
  manager.addAnswer("en", category, `${correct_answer}: ${explanation}`); // Save answer + explanation
});

(async () => {
  console.log("Training the NLP model...");
  await manager.train();
  manager.save("model.nlp"); // Save trained model
  console.log("Training complete and model saved as model.nlp.");
})();
