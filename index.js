import express from "express";
import bodyParser from "body-parser";
import { Book } from "../backend/models/book.js";
import cors from "cors";

var books = [
  {
    id: 1,
    author: "Moussa Ba",
    title: "Express Js",
    likes: "248",
  },
  {
    id: 2,
    author: "Basse",
    title: "Java",
    likes: "230",
  },
  {
    id: 3,
    author: "Paul",
    title: "Java",
    likes: "220",
  },
  {
    id: 4,
    author: "Anne",
    title: "Reseau",
    likes: "430",
  },
  {
    id: 5,
    author: "Kaire",
    title: "Php",
    likes: "230",
  },
];

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Dolphin app listening on port ${port}!`));

app.get("/", (req, res) => {
  res.json({ books: books });
});

app.post("/books", (req, res) => {
  const data = req.body; // Assuming you are using body-parser middleware
  console.log(data);
  const book = new Book();
  book.author = data.author;
  book.likes = data.likes;
  book.title = data.title;
  book.id = books.length + 1;
  books.push(book);
  res.json({ data: book });
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const myBook = books.find((book) => book.id === id);
  if (myBook) {
    res.status(200).json({ book: myBook });
  } else {
    res.status(404).json({ message: "This Book doesn't exist" });
  }
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const book = books.find((book) => book.id === id);
  if (book) {
    book.likes = data.likes;
    book.author = data.author;
    book.title = data.title;
  }
  res.status(200).json({ book: book });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);
  try {
    books.splice(index, 1);
    res.status(200);
    json({ message: "Element is deleted" });
    console.log("Element is deleted");
  } catch (error) {
    res.status(300).json({ message: error });
  }
});
