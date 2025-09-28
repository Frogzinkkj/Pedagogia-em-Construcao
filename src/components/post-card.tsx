import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/70 border-border/50">
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden group">
        <Image
          src={post.image.imageUrl}
          alt={post.title}
          width={400}
          height={250}
          className="w-full object-cover aspect-[16/10] transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={post.image.imageHint}
        />
      </Link>
      <CardHeader>
        <CardTitle className="font-headline text-xl leading-tight">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Badge variant="secondary">{post.category}</Badge>
        <Badge variant="outline">{post.skill}</Badge>
      </CardFooter>
    </Card>
  );
}
