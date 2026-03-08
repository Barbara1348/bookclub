export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  pdfUrl: string;
  genre: string;
}

export interface Comment {
  id: string;
  bookId: string;
  author: string;
  text: string;
  date: string;
}

export const books: Book[] = [
  {
    id: "1",
    title: "Тайна старого особняка",
    author: "Анна Соколова",
    cover: "https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbm92ZWwlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzcyNTA5NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Захватывающая история о журналистке, которая расследует загадочные события в старом особняке на окраине города. По мере раскрытия тайн прошлого, она обнаруживает связь с собственной семейной историей.",
    pdfUrl: "#",
    genre: "Детектив"
  },
  {
    id: "2",
    title: "Ночь в библиотеке",
    author: "Дмитрий Волков",
    cover: "https://images.unsplash.com/photo-1748466990278-bc957f3dc7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9vayUyMGRhcmt8ZW58MXx8fHwxNzcyNTQxNjkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Мистическая история о библиотекаре, который обнаруживает, что книги в его библиотеке начинают оживать по ночам. Каждая книга рассказывает свою уникальную историю, полную загадок и приключений.",
    pdfUrl: "#",
    genre: "Мистика"
  },
  {
    id: "3",
    title: "Хроники забытого мира",
    author: "Елена Морозова",
    cover: "https://images.unsplash.com/photo-1769963030045-0339d9f759a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMG1hZ2ljfGVufDF8fHx8MTc3MjQ3MzE0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Эпическая фэнтези-сага о молодой волшебнице, которая должна спасти свой мир от надвигающейся тьмы. Магия, драконы и древние пророчества сплетаются в увлекательное повествование.",
    pdfUrl: "#",
    genre: "Фэнтези"
  },
  {
    id: "4",
    title: "Весна в Париже",
    author: "Мария Белова",
    cover: "https://images.unsplash.com/photo-1599276188787-63e64b366e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbm92ZWwlMjBmbG93ZXJzfGVufDF8fHx8MTc3MjUwMTgzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Трогательная романтическая история о художнице из Москвы, которая приезжает в Париж и встречает загадочного французского писателя. Их судьбы переплетаются среди весенних улиц города любви.",
    pdfUrl: "#",
    genre: "Романтика"
  },
  {
    id: "5",
    title: "Звёздный путь",
    author: "Игорь Космов",
    cover: "https://images.unsplash.com/photo-1752442533957-5300db5b6d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjUwMTgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Научно-фантастический роман о первой межзвёздной экспедиции человечества. Команда космонавтов сталкивается с неожиданными открытиями и моральными дилеммами на пути к далёкой звезде.",
    pdfUrl: "#",
    genre: "Научная фантастика"
  },
  {
    id: "6",
    title: "Дневник императрицы",
    author: "Ольга Историкова",
    cover: "https://images.unsplash.com/photo-1769905503357-3232daaede64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwZmljdGlvbiUyMHZpbnRhZ2V8ZW58MXx8fHwxNzcyNTU2NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Исторический роман, основанный на реальных событиях. Рассказывает о жизни российской императрицы через призму её личных дневников, раскрывая интимные детали жизни при дворе.",
    pdfUrl: "#",
    genre: "Историческая проза"
  }
];

export const initialComments: Comment[] = [
  {
    id: "1",
    bookId: "1",
    author: "Александр П.",
    text: "Потрясающая книга! Не мог оторваться до последней страницы.",
    date: "2026-02-28"
  },
  {
    id: "2",
    bookId: "1",
    author: "Мария К.",
    text: "Очень атмосферное произведение. Автор мастерски создаёт напряжение.",
    date: "2026-03-01"
  }
];
