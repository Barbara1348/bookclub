import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getQuotes, Quote, deleteQuote } from "../data/quotes";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Trash2, Quote as QuoteIcon } from "lucide-react";

interface QuoteSectionProps {
  bookId: string;
  refresh: number;
}

export function QuoteSection({ bookId, refresh }: QuoteSectionProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadQuotes();
  }, [bookId, refresh]);

  const loadQuotes = () => {
    const bookQuotes = getQuotes(bookId);
    setQuotes(bookQuotes);
  };

  const handleDeleteQuote = (quoteId: string) => {
    deleteQuote(quoteId);
    loadQuotes();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Цитатник ({quotes.length})
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Любимые цитаты читателей из этой книги
        </p>

        {quotes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <QuoteIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Пока нет цитат. Станьте первым, кто добавит понравившийся отрывок!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <Card key={quote.id} className="border-l-4 border-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {quote.userName}
                      </CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {new Date(quote.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {user && user.id === quote.userId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm italic border-l-2 border-muted pl-4 py-2">
                    "{quote.text}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
