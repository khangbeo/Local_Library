function findAccountById(accounts, id) {
  const account = accounts.find(user => user.id === id)
  return account
}

function sortAccountsByLastName(accounts) {
  accounts.sort((user1, user2) => (user1.name.last > user2.name.last) ? 1 : -1)
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  // object destructuring
  const { id } = account
  
  // set a counter for the total number of time a book has been borrowed
  let numberOfTimesBorrowed = 0
  
  // checks each book to see if the borrow id matches the account id
  // adds 1 to the counter if true
  books.forEach(book => {
    const { borrows } = book
    if (borrows.find(borrow => borrow.id === id)) numberOfTimesBorrowed += 1
  })
  return numberOfTimesBorrowed
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksCheckedOut = []
  const { id } = account
  
  // checks each book to see if the borrow id matches the account and the book is not returned
  books.forEach(book => {
    const { borrows } = book
    if (borrows.find(borrow => borrow.id === id && borrow.returned === false)) 
      booksCheckedOut.push(book)})
  
  // using helper function getBooksCheckedOut
  getBooksCheckedOut(books, authors)
  return booksCheckedOut;
}

// helper function for getBooksPossessedByAccount
// finds the books that are checked out
function getBooksCheckedOut(books, authors) {
  books.forEach(book => {
    let author = authors.find((person) => person.id === book.authorId)
    book['author'] = author
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
