import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  imageUrl: { type: String }, // Store image URL or path here
  condition: { type: String, enum: ['new', 'used'], default: 'used' },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export const Product= mongoose.model('Product', productSchema);