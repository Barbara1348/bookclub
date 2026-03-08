import { useParams, useNavigate } from "react-router";
import { books as initialBooks, initialComments } from "../data/books";
import { CommentSection } from "../components/CommentSection";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, BookOpen } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { BookReader } from "../components/BookReader";
import { QuoteSection } from "../components/QuoteSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Book } from "../data/books";

export default function BookDiscussion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const { user, addBookToReading, removeBookFromReading, isBookInReading } = useAuth();
  const [quoteRefresh, setQuoteRefresh] = useState(0);

  useEffect(() => {
    // Загружаем книги из localStorage
    const savedBooks = localStorage.getItem("books");
    const loadedBooks = savedBooks ? JSON.parse(savedBooks) : initialBooks;
    setBooks(loadedBooks);
    
    // Находим текущую книгу
    const currentBook = loadedBooks.find((b: Book) => b.id === id);
    setBook(currentBook || null);
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Книга не найдена</h1>
          <Button onClick={() => navigate("/")}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к книгам
            </Button>
            {user && (
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Личный кабинет
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Book Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Book Cover */}
          <div>
            <div className="sticky top-24">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
              {user && (
                <Button
                  className="w-full mt-4"
                  variant={isBookInReading(book.id) ? "outline" : "default"}
                  onClick={() => {
                    if (isBookInReading(book.id)) {
                      removeBookFromReading(book.id);
                    } else {
                      addBookToReading(book.id);
                    }
                  }}
                >
                  {isBookInReading(book.id) ? "Убрать из чтения" : "Добавить в чтение"}
                </Button>
              )}
            </div>
          </div>

          {/* Book Info */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                {book.genre}
              </span>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {book.author}
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-3">О книге</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-3">
                  Электронная версия
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Скачайте книгу в формате PDF для чтения на любом устройстве
                </p>
                <Button
                  className="w-full sm:w-auto gap-2"
                  onClick={() => {
                    // В реальном приложении здесь была бы ссылка на скачивание файла
                    alert("Функция скачивания будет доступна после подключения файлового хранилища");
                  }}
                >
                  <Download className="w-4 h-4" />
                  Скачать PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for Reading, Quotes and Comments */}
        <Tabs defaultValue="read" className="border-t pt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="read">Читать</TabsTrigger>
            <TabsTrigger value="quotes">Цитаты</TabsTrigger>
            <TabsTrigger value="comments">Обсуждение</TabsTrigger>
          </TabsList>

          <TabsContent value="read" className="mt-6">
            <BookReader book={book} onQuoteAdded={() => setQuoteRefresh(prev => prev + 1)} />
          </TabsContent>

          <TabsContent value="quotes" className="mt-6">
            <QuoteSection bookId={book.id} refresh={quoteRefresh} />
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <CommentSection bookId={book.id} initialComments={initialComments} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t mt-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2026 Книжный Клуб. Читайте с удовольствием!</p>
        </div>
      </footer>
    </div>
  );
}