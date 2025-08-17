const Question= require("../models/Question");
const Session=require("../models/Session");


// @desc   Add additional questions to an existing session
// @route  POST/api/question/add
// @access Private
exports.addQuestionsToSession = async(req,res)=>{
   try{
    const {sessionId,questions}=req.body;

    if(!sessionId || !questions || !Array.isArray(questions)){
        return res.status(400).json({message:"Invalid input data"});
    }
    const session= await Session.findById(sessionId);
    if(!session){
        return res.status(404).json({message:"Session not found"});
    }
    //Create new questions
    const createdQuestions= await Question.insertMany(
        questions.map((q)=>({
            session:sessionId,
            question:q.question,
            answer:q.answer,
        }))
    );

    //Update session to include new question IDs
    session.questions.push(...createdQuestions.map((q)=>q._id));
    await session.save();

    res.status(201).json(createdQuestions);
   }catch(error){
    res.status(500).json({message:"Server Error"});
   }
};

exports.togglePinQuestion= async(req,res)=>{
    try{

    }catch(error){
         res.status(500).json({message:"Server Error"});
    }
};

exports.updateQuestionNote= async(req,res)=>{
   try{

    }catch(error){
         res.status(500).json({message:"Server Error"});
    } 
}
