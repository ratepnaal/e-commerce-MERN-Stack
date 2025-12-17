import mongoose , {Document , Schema} from "mongoose";

// تحديد نوع المعلومات المرسلة 

export interface IUser extends Document {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

// تحديد التنسيق 

const userSchema = new Schema<IUser>({
firstName:{type:String , required:true},
lastName:{type:String , required:true},
email:{type:String , required:true},
password:{type:String , required:true}
})

// تصدير المودل 

export const userModel = mongoose.model<IUser>('users' , userSchema);

