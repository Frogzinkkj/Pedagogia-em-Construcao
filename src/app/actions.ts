'use server';

import { suggestRelatedResources, type SuggestRelatedResourcesOutput } from '@/ai/flows/suggest-related-resources';
import { z } from 'zod';

const inputSchema = z.object({
  blogPostContent: z.string(),
});

type AiSuggestionResult = {
  success: true;
  suggestions: string[];
} | {
  success: false;
  error: string;
};

export async function getAiSuggestions(
  input: { blogPostContent: string }
): Promise<AiSuggestionResult> {
  const parsedInput = inputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { success: false, error: 'Entrada inválida.' };
  }

  try {
    const result: SuggestRelatedResourcesOutput = await suggestRelatedResources(parsedInput.data);
    if (!result.suggestedResources || result.suggestedResources.length === 0) {
        return { success: true, suggestions: [] };
    }
    return { success: true, suggestions: result.suggestedResources };
  } catch (error) {
    console.error('AI suggestion error:', error);
    return { success: false, error: 'Não foi possível obter sugestões. Tente novamente mais tarde.' };
  }
}
