'use client';

import { useState } from 'react';
import { Lightbulb, BookOpen, LoaderCircle, AlertTriangle } from 'lucide-react';
import { getAiSuggestions } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AiSuggestions({ blogPostContent }: { blogPostContent: string }) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setIsTriggered(true);

    const cleanContent = blogPostContent.replace(/<[^>]*>?/gm, ' ');

    const result = await getAiSuggestions({ blogPostContent: cleanContent });
    
    if (result.success) {
      setSuggestions(result.suggestions);
    } else {
      setError(result.error);
      setSuggestions([]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="my-12">
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl">Sugestões de Recursos com IA</CardTitle>
          </div>
          <Button onClick={handleGetSuggestions} disabled={isLoading} variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0 shadow-md">
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              'Gerar Sugestões'
            )}
          </Button>
        </CardHeader>
        {isTriggered && (
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <LoaderCircle className="h-10 w-10 text-primary animate-spin" />
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && !error && suggestions.length > 0 && (
              <div>
                <p className="mb-4 text-muted-foreground">
                  Com base no conteúdo deste post, aqui estão alguns livros e materiais que podem enriquecer suas atividades:
                </p>
                <ul className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-background/50">
                      <BookOpen className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <span className="text-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!isLoading && !error && suggestions.length === 0 && (
              <p className="text-center text-muted-foreground p-4">Nenhuma sugestão encontrada. Clique novamente para tentar gerar.</p>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
