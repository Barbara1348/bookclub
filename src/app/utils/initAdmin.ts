// Инициализация администратора по умолчанию
export function initializeAdmin() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  
  // Проверяем, есть ли уже администратор
  const hasAdmin = users.some((u: any) => u.role === "admin");
  
  if (!hasAdmin) {
    // Создаём администратора по умолчанию
    const admin = {
      id: "admin-1",
      email: "admin@bookclub.com",
      firstName: "Админ",
      lastName: "Книжный Клуб",
      login: "admin",
      password: "admin123", // В реальном приложении пароль должен быть зашифрован
      readingBooks: [],
      role: "admin"
    };
    
    users.push(admin);
    localStorage.setItem("users", JSON.stringify(users));
  }
}
