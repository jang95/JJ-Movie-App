import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  nickName: string;
  email: string;
  password: string;
  createdAt?: Date; // DB에 저장 전 필드가 존재하지 않으므로 옵셔널 선언
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  /**
   * Mongoose는 'createdAt', 'updatedAt' 필드를 자동으로 추가
   * 문서가 생성되거나 수정될 때마다 자동으로 값을 갱신
   */
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
