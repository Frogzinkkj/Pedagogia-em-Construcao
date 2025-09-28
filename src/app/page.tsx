import Image from 'next/image';
import Link from 'next/link';
import { posts, authors } from '@/lib/data';
import { PostCard } from '@/components/post-card';

export default function Home() {
  const presentationPost = posts.find(p => p.category === 'Apresentação');
  const activityPosts = posts.filter(p => p.category !== 'Apresentação');
  const author = authors.find(a => a.id === presentationPost?.authorId);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <section className="text-center my-8 md:my-16">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
        Pedagogia em <span className="text-primary">Construção</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Explorando formas criativas e lúdicas de ensinar nossa língua.
        </p>
      </section>

      {presentationPost && author && (
        <section className="my-12 md:my-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                {presentationPost.title}
              </h2>
              <p
                className="text-lg text-muted-foreground mb-6"
              >
                {presentationPost.excerpt}
              </p>
              <Link href={`/posts/${presentationPost.slug}`} className="text-accent font-bold hover:underline text-lg">
                Leia mais &rarr;
              </Link>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={author.avatar.imageUrl}
                  alt={author.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                  data-ai-hint={author.avatar.imageHint}
                />
                <div>
                  <p className="font-semibold">{author.name}</p>
                  <Link href={`/educators/${author.id}`} className="text-sm text-muted-foreground hover:text-accent">
                    Ver perfil
                  </Link>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
                <Link href={`/posts/${presentationPost.slug}`}>
                    <Image
                      src={presentationPost.image.imageUrl}
                      alt={presentationPost.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[3/2] transition-transform duration-300 hover:scale-105"
                      data-ai-hint={presentationPost.image.imageHint}
                    />
                </Link>
            </div>
          </div>
        </section>
      )}

      <section id="atividades" className="my-12 md:my-20">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          Atividades Lúdicas
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activityPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
