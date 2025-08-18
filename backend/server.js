require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const {protect} = require("./middlewares/authMiddleware");
const {generateInterviewQuestions , generateInterviewExplanation} = require("./controllers/aiController");

const app = express();
connectDB();
app.use(
 cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
 })
);
// Middleware
app.use(express.json());
app.use('/api/auth' , authRoutes);

app.use("/api/ai/generate-questions", protect , generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect , generateInterviewExplanation);


// Routes
app.use('/api/questions' , questionRoutes);
app.use('/api/sessions' , sessionRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

/**/