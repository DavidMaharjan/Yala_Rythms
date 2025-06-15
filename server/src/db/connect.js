import mongoose  from 'mongoose'
async function connect(){
   const res = await mongoose.connect('mongodb://localhost:27017/yalarthm')
   if (res) {console.log("mongodb connected successfully")}
}

export default connect;