const { Schema, model } = require("mongoose");

const Message = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "user", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  delivered: {type:Boolean, default:false},
  read: {type:Boolean, default:false},
  receiver:{type:Schema.Types.ObjectId, ref:"user", require:true}
});

const Chat = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "user", required: true }],
  messages: [Message], 
});

module.exports = model("chat", Chat);