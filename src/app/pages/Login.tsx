import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { BookOpen } from "lucide-react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = loginUser(login, password);
    
    if (success) {
      navigate("/");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Вход</CardTitle>
          <CardDescription className="text-center">
            Войдите в свой аккаунт Книжного Клуба
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground text-center">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
          <div className="w-full pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Данные для входа в админ-панель:
            </p>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <p className="text-xs font-mono text-center">
                <span className="text-muted-foreground">Логин:</span> <strong>admin</strong>
              </p>
              <p className="text-xs font-mono text-center">
                <span className="text-muted-foreground">Пароль:</span> <strong>admin123</strong>
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
