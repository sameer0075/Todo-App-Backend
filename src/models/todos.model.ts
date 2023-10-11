import mongoose from 'mongoose'
enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [20, "name must be less than 20 characters"],
    trim: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: Object.values(StatusEnum),  
    default: StatusEnum.ACTIVE,
    validate: {
      validator: function(value:any) {
        return Object.values(StatusEnum).includes(value);
      },
      message: "Invalid status value. Must be 'ACTIVE' or 'INACTIVE'.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
