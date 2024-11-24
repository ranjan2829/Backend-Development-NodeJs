const mongoose = require("mongoose");

const uri = "mongodb+srv://ranjanshitole3129:ranjan3129@cluster0.qpnmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


const userDb = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,  
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User", userDb);

async function AddRecord() {
    try {
        const newUser = await User.create({
            name: "Ranjan",
            email: "Ranjan.shitole3129@gmail.com",
            age: 21,  
            isActive: true,
            tags: ["developer"]
        });

        console.log("New user created: ", newUser); 
        const gettrue=await User.find({isActive:true});
        console.log(gettrue);
        const selectedFields = await User.find().select("name email -_id");
        console.log(selectedFields);
    // const allUsers = await User.find({});
    // console.log(allUsers);
    // const getUserOfActiveFalse = await User.find({ isActive: true });
    // console.log(getUserOfActiveFalse);
    // const getJohnDoeUser = await User.findOne({ name: "John Doe" });
    // console.log(getJohnDoeUser);
    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserByUserId, "getLastCreatedUserByUserId");
    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);
    // const limitedUsers = await User.find().limit(5).skip(1);
    // console.log(limitedUsers);
    // const sortedUsers = await User.find().sort({ age: 1 });
    // console.log(sortedUsers);

    // const countDocuments = await User.countDocuments({ isActive: true });
    // console.log(countDocuments);

    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted user ->", deletedUser);

    } catch (err) {
        console.error("Error creating user: ", err); 
    }
    finally{

    
     await mongoose.connection.close();
    }
    
}



AddRecord();
