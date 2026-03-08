import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  LogOut,
  Home
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      path: "/admin",
      label: "Панель управления",
      icon: LayoutDashboard
    },
    {
      path: "/admin/books",
      label: "Управление книгами",
      icon: BookOpen
    },
    {
      path: "/admin/users",
      label: "Управление пользователями",
      icon: Users
    },
    {
      path: "/admin/content",
      label: "Управление контентом",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl">Админ-панель</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
