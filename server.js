const express = require('express')

const connectDB = require('./config/dbConnection.ts')
const errorHandler  = require('./middleware/errorHandler.ts')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000


connectDB() 
app.use(express.json())
app.use("/api/users",require("./routes/user.ts"))
app.use("/api/contacts",require("./routes/contact.ts"))
app.use("/api/upload",require("./routes/file.ts"))
app.use(errorHandler)

// app.post('/api/upload', upload.single('file'), (req, res) => {
//   if (req.file && req.file.path) {
//     res.status(201).json({
//       message: 'File uploaded successfully',
//       url: req.file.path, // The URL to access the uploaded image
//     });
//   } else {
//     res.status(400).json({ message: 'Failed to upload file' });
//   }
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})