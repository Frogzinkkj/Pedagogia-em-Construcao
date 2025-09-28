import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts, authors } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Tag, Shapes, User, Pencil } from 'lucide-react';
import { AiSuggestions } from '@/components/ai-suggestions';
import { CommentSection } from '@/components/comment-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const author = authors.find(a => a.id === post.authorId);

  return (
    <article className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <header className="space-y-4 mb-8 text-center">
        <Badge variant="secondary" className="text-base">{post.category}</Badge>
        <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          {author && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.avatar.imageUrl} alt={author.name} data-ai-hint={author.avatar.imageHint} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Link href={`/educators/${author.id}`} className="font-medium hover:text-primary">{author.name}</Link>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </div>
      </header>

      <Image
        src={post.image.imageUrl}
        alt={post.title}
        width={1200}
        height={600}
        className="rounded-xl shadow-lg mb-8 md:mb-12 w-full object-cover aspect-video"
        priority
        data-ai-hint={post.image.imageHint}
      />

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8">
          <div
            className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-headline prose-headings:text-foreground 
            prose-h2:text-4xl prose-h3:text-4xl
            prose-p:text-foreground/80 prose-strong:text-foreground
            prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-primary
            prose-a:text-accent hover:prose-a:text-accent/80
            text-justify hyphens-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <aside className="lg:col-span-4 space-y-6">
          <Card className="sticky top-24 bg-card/70">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Detalhes da Atividade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div><span className="font-semibold mr-1">Categoria:</span> {post.category}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Pencil className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div><span className="font-semibold mr-1">Habilidade:</span> {post.skill}</div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div><span className="font-semibold mr-1">Faixa Etária:</span> {post.ageGroup}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Shapes className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div><span className="font-semibold mr-1">Assunto:</span> {post.subject}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <CommentSection postId={post.id} />
      </div>

    </article>
  );
}