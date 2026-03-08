import { Book } from "../data/books";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useNavigate } from "react-router";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <p className="text-xs text-muted-foreground">{book.genre}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => navigate(`/book/${book.id}`)}
          className="w-full"
        >
          Перейти к обсуждению
        </Button>
      </CardFooter>
    </Card>
  );
}
