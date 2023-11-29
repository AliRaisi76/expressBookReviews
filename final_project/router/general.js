const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

const doesExist = (username) => {
  let usersWithSameName = users.filter((user) => {
    return user.username === username;
  });
  if (usersWithSameName.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post('/register', (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({ message: 'Registred. Now you can login' });
    } else {
      return res.status(404).json({ message: 'User already exists!' });
    }
  }
  return res.status(404).json({ message: 'Unable to register user.' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  if (!req.params.isbn) {
    return res.status(404).json({
      message: 'Please provide an isbn',
    });
  }
  const book = books.find((el) => el.isbn === req.params.isbn);
  return res
    .status(300)
    .json({ message: 'Book found with the isbn provided!', data: book });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  if (!req.params.author) {
    return res.status(404).json({
      message: 'Please provide an author',
    });
  }
  const book = books.find((el) => el.author === req.params.author);
  return res
    .status(300)
    .json({ message: 'Book found with the author name provided!', data: book });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  if (!req.params.title) {
    return res.status(404).json({
      message: 'Please provide a title',
    });
  }
  const book = books.find((el) => el.title === req.params.title);
  return res
    .status(300)
    .json({ message: 'Book found with the title provided!', data: book });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  if (!req.params.author) {
    return res.status(404).json({
      message: 'Please provide an isbn',
    });
  }
  const reviews = books.find((el) => el.isbn === req.params.isbn).reviews;
  return res.status(300).json({ message: 'Reviews fetched!', data: reviews });
});

module.exports.general = public_users;
