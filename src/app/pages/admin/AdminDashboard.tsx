import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { BookOpen, Users, MessageCircle, Quote } from "lucide-react";
import { books } from "../../data/books";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalComments: 0,
    totalQuotes: 0
  });

  useEffect(() => {
    // Загружаем статистику
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
    const booksData = JSON.parse(localStorage.getItem("books") || JSON.stringify(books));

    setStats({
      totalBooks: booksData.length,
      totalUsers: users.length,
      totalComments: comments.length,
      totalQuotes: quotes.length
    });
  }, []);

  const statCards = [
    {
      title: "Всего книг",
      value: stats.totalBooks,
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Пользователей",
      value: stats.totalUsers,
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Комментариев",
      value: stats.totalComments,
      icon: MessageCircle,
      color: "text-purple-600"
    },
    {
      title: "Цитат",
      value: stats.totalQuotes,
      icon: Quote,
      color: "text-orange-600"
    }
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Панель управления</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Добро пожаловать в админ-панель!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Здесь вы можете управлять всеми аспектами сайта книжного клуба:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Добавлять, редактировать и удалять книги</li>
              <li>• Управлять учётными записями пользователей</li>
              <li>• Редактировать контент главной страницы</li>
              <li>• Просматривать статистику активности</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
