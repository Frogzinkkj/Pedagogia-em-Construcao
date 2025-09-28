import { notFound } from 'next/navigation';
import Image from 'next/image';
import { authors, posts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/post-card';
import { GraduationCap, Star, BookHeart } from 'lucide-react';

export async function generateStaticParams() {
  return authors.map(author => ({
    id: author.id,
  }));
}

export default function EducatorProfilePage({ params }: { params: { id: string } }) {
  const author = authors.find(a => a.id === params.id);
  
  if (!author) {
    notFound();
  }

  const authorPosts = posts.filter(p => p.authorId === author.id);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 bg-card/70 p-8 rounded-xl border">
        <Image
          src={author.avatar.imageUrl}
          alt={author.name}
          width={150}
          height={150}
          className="rounded-full shadow-lg border-4 border-primary/80 shrink-0"
          data-ai-hint={author.avatar.imageHint}
        />
        <div className="text-center md:text-left">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{author.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{author.bio}</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="bg-card/70 lex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline"><GraduationCap className="text-primary"/> Formação e Atuação</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="list-disc list-inside space-y-10 text-muted-foreground">
              {author.experience.map((item, i) => <li key={i} className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><i>{item}</i></li>)}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-card/70 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline">
              <Star className="text-primary"/> 
              Foco de Estudo e Interesses
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-4"> 
              {author.expertise.map((item, i) => (  
                <Badge key={i} variant="secondary" className="text-sm p-2"> 
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/70 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline"><BookHeart className="text-primary"/>  Projetos e Atividades em Destaque</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-muted-foreground">
              {author.publications.map((item, i) => <li key={i} className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span><i>{item}</i></li>)}
            </ul>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-8">Posts de {author.name}</h2>
        {authorPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Ainda não há posts deste autor.</p>
        )}
      </section>
    </div>
  );
}
