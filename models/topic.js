const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;