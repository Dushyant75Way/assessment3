/**
 * @swagger
 * /get-explanation:
 *   post:
 *     summary: Get AI-generated explanation for a quiz question
 *     description: Processes the question using NLP and returns the correct answer with an explanation.
 *     tags:
 *       - AI Explanation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 description: The quiz question for which an explanation is needed.
 *                 example: "What is the capital of France?"
 *     responses:
 *       200:
 *         description: Successfully retrieved the explanation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     correct_answer:
 *                       type: string
 *                       example: "Paris"
 *                     explanation:
 *                       type: string
 *                       example: "Paris is the capital of France."
 *                 message:
 *                   type: string
 *                   example: "Explanation fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
