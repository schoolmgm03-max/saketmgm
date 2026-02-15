import { Schema, model, models } from "mongoose";

const bookListSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BookList = models.BookList || model("BookList", bookListSchema);
export default BookList;
