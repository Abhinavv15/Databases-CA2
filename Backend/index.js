require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Books = require('./BookSchema');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then((console.log("MogoDB connected")))
    .catch(()=>("error connecting MongoDB"))

app.post('/addBook', async (req, res) => {
        try {
            const { title, author,genre, publishedYear,availableCopies,borrowedBy } = req.body;
    
            if (!title || !author || !publishedYear || !genre || !availableCopies || !borrowedBy) {
                return res.status(400).json({ error: "All fields are required" });
            }
    
            const newBook = new Books({
                title,
                author,
                genre,
                publishedYear,
                availableCopies,
                borrowedBy
            });
    
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } catch (error) {
            console.error("Error adding book:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    })

app.get('/viewBook',async(req,res)=>{
    try {
        const Book = await Books.find();
        if(!Book){
            res.send(404).json({message:"Book not Found"})
        }

    } catch (error) {
        console.error("Error finding book", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.put('/update/:id',async(req,res)=>{
    try {
        const { title, author,genre, publishedYear,availableCopies,borrowedBy } = req.body;
        const updatedBook = await Books.findByIdAndUpdate(req.params.id,
            { title, author,genre, publishedYear,availableCopies,borrowedBy }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook); 
    }
        catch (error) {
        console.error("Error updating", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        await Books.findByIdAndDelete(req.params.id)
        console.log("Deleted")
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Port is ruuning on ${process.env.PORT}`)
})
