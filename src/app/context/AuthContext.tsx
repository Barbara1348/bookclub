import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  readingBooks: string[]; // массив ID книг, которые читает пользователь
  role: "admin" | "user"; // роль пользователя
}

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => boolean;
  register: (email: string, firstName: string, lastName: string, login: string, password: string) => boolean;
  logout: () => void;
  addBookToReading: (bookId: string) => void;
  removeBookFromReading: (bookId: string) => void;
  isBookInReading: (bookId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Загружаем пользователя из localStorage при монтировании
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Убедимся, что у пользователя есть роль (для совместимости со старыми данными)
      if (!userData.role) {
        userData.role = "user";
        localStorage.setItem("currentUser", JSON.stringify(userData));
      }
      setUser(userData);
    }
  }, []);

  const register = (email: string, firstName: string, lastName: string, login: string, password: string): boolean => {
    // Получаем всех пользователей
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Проверяем, существует ли пользователь с таким логином или email
    if (users.some((u: any) => u.login === login || u.email === email)) {
      return false;
    }

    // Создаём нового пользователя
    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      login,
      readingBooks: [],
      role: "user" // по умолчанию роль пользователя
    };

    // Сохраняем пароль отдельно (в реальном приложении пароли должны быть зашифрованы)
    users.push({ ...newUser, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Автоматически входим
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    return true;
  };

  const login = (login: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.login === login && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      // Убедимся, что у пользователя есть роль (для совместимости со старыми данными)
      if (!userWithoutPassword.role) {
        userWithoutPassword.role = "user";
      }
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const addBookToReading = (bookId: string) => {
    if (!user) return;
    
    if (!user.readingBooks.includes(bookId)) {
      const updatedUser = {
        ...user,
        readingBooks: [...user.readingBooks, bookId]
      };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      // Обновляем в списке всех пользователей
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].readingBooks = updatedUser.readingBooks;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  };

  const removeBookFromReading = (bookId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      readingBooks: user.readingBooks.filter(id => id !== bookId)
    };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Обновляем в списке всех пользователей
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].readingBooks = updatedUser.readingBooks;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const isBookInReading = (bookId: string): boolean => {
    return user?.readingBooks.includes(bookId) || false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, addBookToReading, removeBookFromReading, isBookInReading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
