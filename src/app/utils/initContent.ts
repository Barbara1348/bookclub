// Инициализация контента сайта по умолчанию
export function initializeSiteContent() {
  const savedContent = localStorage.getItem("siteContent");
  
  if (!savedContent) {
    const defaultContent = {
      hero: {
        title: "Книжный Клуб",
        subtitle: "Читаем вместе, обсуждаем с удовольствием",
        description: "Присоединяйтесь к сообществу любителей литературы",
        imageUrl: "https://images.unsplash.com/photo-1709855256067-12ad9a64ac06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYm9vayUyMGNsdWIlMjByZWFkaW5nfGVufDF8fHx8MTc3MjU1NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      features: [
        {
          id: "1",
          title: "Разнообразие жанров",
          description: "От классики до современной литературы — каждый найдёт книгу по душе",
          icon: "BookOpen"
        },
        {
          id: "2",
          title: "Дружное сообщество",
          description: "Общайтесь с единомышленниками и делитесь впечатлениями",
          icon: "Users"
        },
        {
          id: "3",
          title: "Живые обсуждения",
          description: "Обсуждайте сюжет, персонажей и делитесь своими мыслями",
          icon: "MessageCircle"
        }
      ],
      gallery: [
        {
          id: "1",
          title: "Ваша личная библиотека",
          description: "Доступ к электронным версиям книг",
          imageUrl: "https://images.unsplash.com/photo-1763616828336-e7fcd02086f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBsaWJyYXJ5JTIwaG9tZXxlbnwxfHx8fDE3NzI1NTY3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          id: "2",
          title: "Читайте вместе с нами",
          description: "Еженедельные встречи и обсуждения",
          imageUrl: "https://images.unsplash.com/photo-1713942590283-59867d5e3f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjByZWFkaW5nJTIwYm9va3MlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI1MjE0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        }
      ],
      booksSection: {
        title: "Наши книги",
        description: "Выберите книгу и присоединяйтесь к обсуждению. Делитесь мнениями, задавайте вопросы и находите новых друзей!"
      },
      footer: {
        text: "© 2026 Книжный Клуб. Читайте с удовольствием!"
      }
    };
    
    localStorage.setItem("siteContent", JSON.stringify(defaultContent));
  }
}
