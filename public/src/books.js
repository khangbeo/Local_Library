function findAuthorById(authors, id) {
  let result = authors.find(author => author.id === id)
  return result
}

function findBookById(books, id) {
  let result = books.find(book => book.id === id)
  return result
}

function partitionBooksByBorrowedStatus(books) {
  const loanedBooks = []
  const returnedBooks = []
  
  // check each books to see if borrow.returned is false
  // if true then the book goes into loanedBooks array
  // it goes to returnedBooks if false
  books.forEach(book => {
    let { borrows } = book
    // ternary operator
    let condition = borrows.find(borrow => borrow.returned === false) 
      ? loanedBooks.push(book) 
      : returnedBooks.push(book)
    return condition
  })
  
  // combining the 2 arrays
  const bookList = [loanedBooks, returnedBooks]
  return bookList
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book
  const listOfBorrowers = []
  
  // check each accounts and books
  // compares account id with borrow id
  // if true then the listOfBorrowers get the person's details
  // adds the returned status to each person
  accounts.forEach(person => {
    let { id } = person
    borrows.forEach(borrow => {
      if (id === borrow.id) {
      listOfBorrowers.push(person)
      person["returned"] = borrow.returned
    }
    })
  })
  return listOfBorrowers.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
