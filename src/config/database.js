import mongoose, { Schema } from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://hyperlink0418_db_user:7lNrwOrhQ9UfKpV4@namastenode.dcnt9yc.mongodb.net/devTinder',
  );
};
