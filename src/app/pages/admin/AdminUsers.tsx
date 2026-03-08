import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { User, useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

interface UserWithPassword extends User {
  password: string;
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserWithPassword | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    role: "user" as "admin" | "user"
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  };

  const handleSaveUser = () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.login) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    let updatedUsers: UserWithPassword[];

    if (editingUser) {
      // Проверяем уникальность логина и email (кроме текущего пользователя)
      const isDuplicate = users.some(
        u => u.id !== editingUser.id && (u.login === formData.login || u.email === formData.email)
      );

      if (isDuplicate) {
        toast.error("Пользователь с таким логином или email уже существует");
        return;
      }

      // Редактируем существующего пользователя
      updatedUsers = users.map(user =>
        user.id === editingUser.id
          ? {
              ...user,
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              login: formData.login,
              role: formData.role,
              ...(formData.password ? { password: formData.password } : {})
            }
          : user
      );
      toast.success("Пользователь успешно обновлён");
    } else {
      // Проверяем уникальность
      const isDuplicate = users.some(
        u => u.login === formData.login || u.email === formData.email
      );

      if (isDuplicate) {
        toast.error("Пользователь с таким логином или email уже существует");
        return;
      }

      if (!formData.password) {
        toast.error("Укажите пароль для нового пользователя");
        return;
      }

      // Добавляем нового пользователя
      const newUser: UserWithPassword = {
        id: Date.now().toString(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        login: formData.login,
        password: formData.password,
        role: formData.role,
        readingBooks: []
      };
      updatedUsers = [...users, newUser];
      toast.success("Пользователь успешно добавлен");
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    // Если редактируем текущего пользователя, обновляем его данные в currentUser
    if (editingUser && currentUser && editingUser.id === currentUser.id) {
      const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id);
      if (updatedCurrentUser) {
        const { password: _, ...userWithoutPassword } = updatedCurrentUser;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      }
    }
    
    closeDialog();
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    
    if (user?.role === "admin" && users.filter(u => u.role === "admin").length === 1) {
      toast.error("Невозможно удалить последнего администратора");
      return;
    }

    if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      
      // Также удаляем пользователя из currentUser если он был авторизован
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser);
        if (parsedCurrentUser.id === userId) {
          localStorage.removeItem("currentUser");
        }
      }
      
      toast.success("Пользователь успешно удалён");
    }
  };

  const openEditDialog = (user: UserWithPassword) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      password: "",
      role: user.role
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingUser(null);
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      role: "user"
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Управление пользователями</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить пользователя
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? "Редактировать пользователя" : "Добавить нового пользователя"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Иван"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Иванов"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="login">Логин *</Label>
                  <Input
                    id="login"
                    value={formData.login}
                    onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    Пароль {editingUser ? "(оставьте пустым, чтобы не менять)" : "*"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Роль</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "admin" | "user") =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Пользователь</SelectItem>
                      <SelectItem value="admin">Администратор</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeDialog}>
                  Отмена
                </Button>
                <Button onClick={handleSaveUser}>
                  {editingUser ? "Сохранить изменения" : "Добавить пользователя"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Список пользователей ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Логин</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Книг в чтении</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.login}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? "Администратор" : "Пользователь"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.readingBooks?.length || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.role === "admin" && users.filter(u => u.role === "admin").length === 1}
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
