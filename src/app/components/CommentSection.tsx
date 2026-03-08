import { useState } from "react";
import { Comment } from "../data/books";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CommentSectionProps {
  bookId: string;
  initialComments?: Comment[];
}

export function CommentSection({ bookId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(
    initialComments.filter(c => c.bookId === bookId)
  );
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !text.trim()) {
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      bookId,
      author: author.trim(),
      text: text.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setComments([...comments, newComment]);
    setAuthor("");
    setText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Обсуждение ({comments.length})
        </h2>
        
        <div className="space-y-4 mb-8">
          {comments.length === 0 ? (
            <p className="text-muted-foreground">
              Пока нет комментариев. Станьте первым, кто поделится мнением!
            </p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{comment.author}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{comment.text}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Оставить комментарий</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-2">
                Ваше имя
              </label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Комментарий
              </label>
              <Textarea
                id="comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Поделитесь своими мыслями о книге..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Отправить комментарий
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
