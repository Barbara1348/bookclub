import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { books as initialBooks, Book } from "../data/books";
import { getUserQuotes } from "../data/quotes";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BookOpen, Quote, User, LogOut } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { useState, useEffect } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Загружаем книги из localStorage
    const savedBooks = localStorage.getItem("books");
    setBooks(savedBooks ? JSON.parse(savedBooks) : initialBooks);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const readingBooks = books.filter((book) => user.readingBooks.includes(book.id));
  const userQuotes = getUserQuotes(user.id);

  // Группируем цитаты по книгам
  const quotesByBook = userQuotes.reduce((acc, quote) => {
    if (!acc[quote.bookId]) {
      acc[quote.bookId] = [];
    }
    acc[quote.bookId].push(quote);
    return acc;
  }, {} as Record<string, typeof userQuotes>);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              ← Главная
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* User Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-muted-foreground">@{user.login}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{readingBooks.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Книг в чтении
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{userQuotes.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Цитат сохранено
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="books" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">Мои книги</TabsTrigger>
            <TabsTrigger value="quotes">Мои цитаты</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-4">
            {readingBooks.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      Вы ещё не добавили книги в список для чтения
                    </p>
                    <Button onClick={() => navigate("/")}>
                      Посмотреть каталог
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {readingBooks.map((book) => (
                  <Card
                    key={book.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    <div className="aspect-[2/3] overflow-hidden">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-base mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      {quotesByBook[book.id] && (
                        <p className="text-xs text-primary mt-2">
                          {quotesByBook[book.id].length} цитат
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-6">
            {userQuotes.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Quote className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      У вас пока нет сохранённых цитат
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              Object.entries(quotesByBook).map(([bookId, quotes]) => {
                const book = books.find((b) => b.id === bookId);
                if (!book) return null;

                return (
                  <div key={bookId}>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold">{book.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        ({quotes.length})
                      </span>
                    </div>
                    <div className="space-y-3 mb-8">
                      {quotes.map((quote) => (
                        <Card key={quote.id} className="border-l-4 border-primary">
                          <CardContent className="pt-4">
                            <blockquote className="text-sm italic border-l-2 border-muted pl-4 py-2">
                              "{quote.text}"
                            </blockquote>
                            <p className="text-xs text-muted-foreground mt-3">
                              {new Date(quote.date).toLocaleDateString('ru-RU')}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Separator />
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
