"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = require("./routes/userRoute");
const productServices_1 = require("./services/productServices");
const productRoute_1 = require("./routes/productRoute");
const cartRoute_1 = require("./routes/cartRoute");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", userRoute_1.router);
app.use("/products", productRoute_1.productRouter);
app.use("/Cart", cartRoute_1.cartRouter);
const port = 3001;
mongoose_1.default.connect(process.env.DATABASE_URL || '')
    .then(() => { console.log(' CONNECTED ON DB'); })
    .catch(() => { console.log("FAILED TO CONNECT ON DB "); });
// دالة لاضافة منتجات وهمية عند عدم توفر منتجات 
(0, productServices_1.seedInitialProducts)();
app.listen(port, () => {
    console.log(`RUNNING ON http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map