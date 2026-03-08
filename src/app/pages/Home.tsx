import { BookCard } from "../components/BookCard";
import { books as initialBooks } from "../data/books";
import { BookOpen, Users, MessageCircle, User, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Book } from "../data/books";

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
  };
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  gallery: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  booksSection: {
    title: string;
    description: string;
  };
  footer: {
    text: string;
  };
}

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    // Загружаем книги
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      localStorage.setItem("books", JSON.stringify(initialBooks));
      setBooks(initialBooks);
    }

    // Загружаем контент
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      BookOpen,
      Users,
      MessageCircle
    };
    return icons[iconName] || BookOpen;
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg">Книжный Клуб</span>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => navigate("/admin")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Админ-панель
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.firstName}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => navigate("/login")}
                >
                  Войти
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/register")}
                >
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content?.hero.imageUrl || "https://images.unsplash.com/photo-1709855256067-12ad9a64ac06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYm9vayUyMGNsdWIlMjByZWFkaW5nfGVufDF8fHx8MTc3MjU1NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080"}
            alt="Уютное чтение"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {content?.hero.title || "Книжный Клуб"}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {content?.hero.subtitle || "Читаем вместе, обсуждаем с удовольствием"}
          </p>
          <p className="text-lg opacity-90">
            {content?.hero.description || "Присоединяйтесь к сообществу любителей литературы"}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {(content?.features || [
              { id: "1", title: "Разнообразие жанров", description: "От классики до современной литературы — каждый найдёт книгу по душе", icon: "BookOpen" },
              { id: "2", title: "Дружное сообщество", description: "Общайтесь с единомышленниками и делитесь впечатлениями", icon: "Users" },
              { id: "3", title: "Живые обсуждения", description: "Обсуждайте сюжет, персонажей и делитесь своими мыслями", icon: "MessageCircle" }
            ]).map((feature) => {
              const Icon = getIconComponent(feature.icon);
              return (
                <div key={feature.id} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Погрузитесь в мир литературы
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(content?.gallery || [
              { id: "1", title: "Ваша личная библиотека", description: "Доступ к электронным версиям книг", imageUrl: "https://images.unsplash.com/photo-1763616828336-e7fcd02086f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBsaWJyYXJ5JTIwaG9tZXxlbnwxfHx8fDE3NzI1NTY3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
              { id: "2", title: "Читайте вместе с нами", description: "Еженедельные встречи и обсуждения", imageUrl: "https://images.unsplash.com/photo-1713942590283-59867d5e3f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjByZWFkaW5nJTIwYm9va3MlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI1MjE0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080" }
            ]).map((item) => (
              <div key={item.id} className="relative h-[300px] rounded-lg overflow-hidden group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            {content?.booksSection.title || "Наши книги"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {content?.booksSection.description || "Выберите книгу и присоединяйтесь к обсуждению. Делитесь мнениями, задавайте вопросы и находите новых друзей!"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>{content?.footer.text || "© 2026 Книжный Клуб. Читайте с удовольствием!"}</p>
        </div>
      </footer>
    </div>
  );
}
