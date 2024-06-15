import express from 'express'
import connectionDB from './db/connectionDB.js'
import userRouter from './src/modules/users/users.routes.js'
import postRouter from './src/modules/posts/posts.routes.js'
import commentRouter from './src/modules/comments/comments.routes.js'
const app = express()
const port = 3000


app.use(express.json())

connectionDB()

app.use("/users" , userRouter)
app.use("/posts" , postRouter)
app.use("/comments" , commentRouter)



app.use("*",(req , res) =>{
    res.status(404).json({msg:"Page Not Found!"})
})

app.listen(port , () => console.log(`Your App is Running... on port ${port}!`))