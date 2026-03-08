export interface Quote {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  text: string;
  date: string;
}

export function getQuotes(bookId?: string): Quote[] {
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  if (bookId) {
    return quotes.filter((q: Quote) => q.bookId === bookId);
  }
  return quotes;
}

export function getUserQuotes(userId: string, bookId?: string): Quote[] {
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  let userQuotes = quotes.filter((q: Quote) => q.userId === userId);
  
  if (bookId) {
    userQuotes = userQuotes.filter((q: Quote) => q.bookId === bookId);
  }
  
  return userQuotes;
}

export function addQuote(quote: Quote): void {
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  quotes.push(quote);
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

export function deleteQuote(quoteId: string): void {
  const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  const filteredQuotes = quotes.filter((q: Quote) => q.id !== quoteId);
  localStorage.setItem("quotes", JSON.stringify(filteredQuotes));
}
