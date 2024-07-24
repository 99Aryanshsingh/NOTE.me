const Notes = require("../models/notes.model");
const User = require("../models/users.model");

async function createNote(req, res) {
  // Creating a new note
  const {text}=req.body;
  try {
    if(req.userEmail){
      res.status(403).json({success: 403, message: "You're not authorized."});
    }
    console.log(req.userId);
    const user= await User.findById(req.userId);
    if(!user){
      res.status(405).json({success: 405, message: "User not found."});
    }
    console.log({user});
    const newNote= new Notes({
      text,
      userId: user._id,
    });
    await newNote.save();
    res.status(201).json({success: 200, data: newNote});
  } catch (error) {
    res.status(500).json({success: 500, message: `error creating note ${error}`});
  }
}

async function getNote(req, res) {
  // Get single Note
  try {
    const note=await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).json({message:"Note not found"});
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({message:"error fetching note",error});
  }
}

async function getAllNotes(req, res) {
  // Get All Note
}

async function updateNote(req, res) {
  // Update Single Note
}

async function deleteNote(req, res) {
  // delete Single Note
}

module.exports = {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
};
