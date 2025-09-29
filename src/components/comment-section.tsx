"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Importa a configuração do Firebase
import { collection, addDoc, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Importamos o Input para o nome
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';

// Interface atualizada para usar o Timestamp do Firebase
interface Comment {
  id?: string;
  postId: string;
  authorName: string;
  content: string;
  date: Timestamp;
}

export function CommentSection({ postId }: { postId: string }) {
  // Estado para guardar os comentários vindos do Firebase
  const [comments, setComments] = useState<Comment[]>([]);
  // Estado para controlar os inputs do novo comentário
  const [newComment, setNewComment] = useState({ authorName: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Busca os comentários em tempo real do Firestore
  useEffect(() => {
    if (!postId) return;
    const q = query(
      collection(db, "comments"), 
      where("postId", "==", postId),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(commentsData);
    });
    return () => unsubscribe();
  }, [postId]);

  // Função para enviar um novo comentário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.authorName.trim() === '' || newComment.content.trim() === '') {
      alert("Por favor, preencha seu nome e o comentário.");
      return;
    }
    setIsLoading(true);
    try {
      await addDoc(collection(db, "comments"), {
        postId: postId,
        authorName: newComment.authorName,
        content: newComment.content,
        date: Timestamp.now(),
      });
      setNewComment({ authorName: '', content: '' });
    } catch (error) {
      console.error("Erro ao adicionar comentário: ", error);
      alert("Ocorreu um erro ao enviar seu comentário.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-12">
      <Card className="bg-card/70">
        <CardHeader>
          <div className='flex items-center gap-3'>
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Discussão</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Formulário agora funcional */}
            <form onSubmit={handleSubmit} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/guest/40/40" alt="Você" />
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <Input
                  placeholder="Seu nome"
                  value={newComment.authorName}
                  onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
                  disabled={isLoading}
                  required
                />
                <Textarea 
                  placeholder="Deixe seu comentário construtivo..." 
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  disabled={isLoading}
                  required
                />
                <Button type="submit" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                  <Send size={16} />
                  {isLoading ? 'Enviando...' : 'Comentar'}
                </Button>
              </div>
            </form>

            {/* Lista de comentários agora vinda do Firebase */}
            {comments.length > 0 ? (
              <div className="space-y-6 pt-8 border-t">
                {comments.map(comment => (
                  <div key={comment.id} className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`https://picsum.photos/seed/${comment.authorName}/40/40`} alt={comment.authorName} />
                      <AvatarFallback>{comment.authorName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="w-full bg-background/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-foreground">{comment.authorName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(comment.date.toDate(), { addSuffix: true, locale: ptBR })}
                        </p>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-center text-muted-foreground pt-8 border-t'>Seja o primeiro a comentar!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}