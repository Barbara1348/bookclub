import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { initializeAdmin } from "./utils/initAdmin";
import { initializeSiteContent } from "./utils/initContent";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  useEffect(() => {
    // Инициализируем администратора и контент при первом запуске
    initializeAdmin();
    initializeSiteContent();
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}