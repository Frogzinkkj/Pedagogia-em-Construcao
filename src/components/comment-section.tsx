import { comments } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export function CommentSection({ postId }: { postId: string }) {
  const postComments = comments.filter(c => c.postId === postId);

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
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/guest/40/40" alt="Você" />
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <Textarea placeholder="Deixe seu comentário construtivo..." />
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Comentar</Button>
              </div>
            </div>

            {postComments.length > 0 ? (
                <div className="space-y-6 pt-8 border-t">
                {postComments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-4">
                    <Avatar>
                        <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorName} />
                        <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full bg-background/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-foreground">{comment.authorName}</p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString('pt-BR')}
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
