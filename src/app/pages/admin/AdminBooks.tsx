import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { books as initialBooks, Book } from "../../data/books";
import { toast } from "sonner";

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    cover: "",
    description: "",
    pdfUrl: "",
    genre: ""
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // Инициализируем начальными данными
      localStorage.setItem("books", JSON.stringify(initialBooks));
      setBooks(initialBooks);
    }
  };

  const handleSaveBook = () => {
    if (!formData.title || !formData.author) {
      toast.error("Заполните обязательные поля: название и автор");
      return;
    }

    let updatedBooks: Book[];

    if (editingBook) {
      // Редактируем существующую книгу
      updatedBooks = books.map(book =>
        book.id === editingBook.id ? { ...formData, id: editingBook.id } : book
      );
      toast.success("Книга успешно обновлена");
    } else {
      // Добавляем новую книгу
      const newBook: Book = {
        ...formData,
        id: Date.now().toString()
      };
      updatedBooks = [...books, newBook];
      toast.success("Книга успешно добавлена");
    }

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    closeDialog();
  };

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту книгу?")) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      toast.success("Книга успешно удалена");
    }
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      cover: book.cover,
      description: book.description,
      pdfUrl: book.pdfUrl,
      genre: book.genre
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      cover: "",
      description: "",
      pdfUrl: "",
      genre: ""
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      cover: "",
      description: "",
      pdfUrl: "",
      genre: ""
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Управление книгами</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить книгу
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBook ? "Редактировать книгу" : "Добавить новую книгу"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Название *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Введите название книги"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Автор *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Введите имя автора"
                  />
                </div>
                <div>
                  <Label htmlFor="genre">Жанр</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="Например: Детектив, Фэнтези"
                  />
                </div>
                <div>
                  <Label htmlFor="cover">URL обложки</Label>
                  <Input
                    id="cover"
                    value={formData.cover}
                    onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Краткое описание книги"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="pdfUrl">URL PDF файла</Label>
                  <Input
                    id="pdfUrl"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    placeholder="https://example.com/book.pdf"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeDialog}>
                  Отмена
                </Button>
                <Button onClick={handleSaveBook}>
                  {editingBook ? "Сохранить изменения" : "Добавить книгу"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Список книг ({books.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Обложка</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Автор</TableHead>
                  <TableHead>Жанр</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(book)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
