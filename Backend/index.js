const express = require("express")
const cors = require("cors");
const {createConnection} = require("./connections.js")
const {restrictToLoggedIn} = require("./middleware/auth.js")
const userModel = require("./models/users.js")
const UserRouter = require("./routes/users.js")
const BlogRouter = require("./routes/blogs.js")
const userBlog  = require("./routes/userBlog.js")

const cookieParser = require("cookie-parser")

const PORT = 5000

const app = express()

createConnection().then(() => console.log("DB connected")).catch((err) => console.log(err))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/users", UserRouter)
app.use("/api/blogs", restrictToLoggedIn ,BlogRouter)
app.use("/api/edit", userBlog)

app.listen(PORT, () => console.log("server started"))