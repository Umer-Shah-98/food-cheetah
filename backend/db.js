const mongoose = require("mongoose");

// const mongoURI =
//   "mongodb+srv://foodDesk:finalproject@cluster0.cutxrxs.mongodb.net/foodDesk?retryWrites=true&w=majority";
const mongoURI =
  "mongodb://foodDesk:finalproject@ac-783time-shard-00-00.cutxrxs.mongodb.net:27017,ac-783time-shard-00-01.cutxrxs.mongodb.net:27017,ac-783time-shard-00-02.cutxrxs.mongodb.net:27017/foodDesk?ssl=true&replicaSet=atlas-8h9zcz-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo Successfully!");
    fetchedData();
  } catch (error) {
    console.log(error);
  }
};

const fetchedData = async () => {
  try {
    let food_items = mongoose.connection.db.collection("data");
    let foodItemsData = await food_items.find({}).toArray();
    let food_category = mongoose.connection.db.collection("foodCategory");
    let foodCategoryData = await food_category.find({}).toArray();
    global.foodItems = foodItemsData;
    global.foodCategory = foodCategoryData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
