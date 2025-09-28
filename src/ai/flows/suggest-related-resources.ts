'use server';

/**
 * @fileOverview AI tool that suggests relevant educational resources and books for blog posts.
 *
 * - suggestRelatedResources - A function that suggests resources based on blog post content.
 * - SuggestRelatedResourcesInput - The input type for the suggestRelatedResources function.
 * - SuggestRelatedResourcesOutput - The return type for the suggestRelatedResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedResourcesInputSchema = z.object({
  blogPostContent: z.string().describe('The content of the blog post.'),
});
export type SuggestRelatedResourcesInput = z.infer<
  typeof SuggestRelatedResourcesInputSchema
>;

const SuggestRelatedResourcesOutputSchema = z.object({
  suggestedResources: z
    .array(z.string())
    .describe('A list of suggested educational resources and books.'),
});
export type SuggestRelatedResourcesOutput = z.infer<
  typeof SuggestRelatedResourcesOutputSchema
>;

export async function suggestRelatedResources(
  input: SuggestRelatedResourcesInput
): Promise<SuggestRelatedResourcesOutput> {
  return suggestRelatedResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedResourcesPrompt',
  input: {schema: SuggestRelatedResourcesInputSchema},
  output: {schema: SuggestRelatedResourcesOutputSchema},
  prompt: `You are an AI assistant designed to suggest educational resources and books related to a given blog post content.

  Based on the following blog post content, suggest relevant educational resources and books that teachers can use for ludic activities. Provide a list of resources that can extend the activity and enrich teaching materials.

  Blog Post Content: {{{blogPostContent}}}

  Suggestions:`,
});

const suggestRelatedResourcesFlow = ai.defineFlow(
  {
    name: 'suggestRelatedResourcesFlow',
    inputSchema: SuggestRelatedResourcesInputSchema,
    outputSchema: SuggestRelatedResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
