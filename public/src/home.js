function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0
  books.forEach(book => {
    let { borrows } = book
    borrows.find(borrow => {
      if (borrow.returned === false) borrowedBooks += 1
    })
  })
  return borrowedBooks
}

function getMostCommonGenres(books) {
  // reduces array to an object
  // check if the object contains a key
  // if not, then increment the counter
  // else, create a key with a nested object with the desired keys and values
  let popularGenres = books.reduce((acc, book) => {
    if (acc[book.genre] != null) {
      acc[book.genre].count++
    } else {
      acc[book.genre] = { name: book.genre, count: 1 }
    }
    return acc
  }, {})
  
  // get the values
  let values = Object.values(popularGenres)
  // sort them from most common to least
  return values.sort((a,b) => b.count - a.count).slice(0,5)
}

function getMostPopularBooks(books) {
  // reduces the array into an object
  // create a new object with a nested object with title and the borrow count
  let popularBooks = books.reduce((acc, book) => {
    acc[book.title] = { name: book.title, count: book.borrows.length}
    return acc
  }, {})
  
  // get the values
  let values = Object.values(popularBooks)
  // sort them from most count to least count
  return values.sort((a,b) => b.count - a.count).slice(0,5)
}
  
function getMostPopularAuthors(books, authors) {
  // reduces authors array to an object
  let popularAuthors = authors.reduce((acc, author) => {
    const { name: { first, last }, id } = author
    // create a nested object with name and count
    acc[id] = { name: `${first} ${last}`, count: 0}
    // loops through each book and checks if the authorID matches account id
    // add the number of times borrowed to the counter
    books.forEach(book => {
      if (book.authorId === id) acc[id].count += book.borrows.length
    })
    return acc
  }, {})
  
  let values = Object.values(popularAuthors)
  return values.sort((a,b) => b.count - a.count).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
