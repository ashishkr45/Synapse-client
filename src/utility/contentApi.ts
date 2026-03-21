import { api } from './api';
import { z } from 'zod';

export const contentFormSchema = z.object({
  type: z.enum([
    "article", "tweet", "link", "document", "youtube", 
    "code", "thread", "note", "quote", "event", 
    "bookmark", "post", "reel",
  ]),
  title: z.string(),
  link: z.string().optional(),
  note: z.string().optional(),
  tags: z.array(z.string()),
});

export type ContentFormData = z.infer<typeof contentFormSchema>;

export const fetchUserContent = async () => {
  const response = await api.get('/content/board');
  return response.data.content;
};

export const createNewContent = async (newContentData: ContentFormData) => {
  const response = await api.post('/content/board', newContentData);
  return response.data;
};

export const deleteContent = async (id: string) => {
  const response = await api.delete(`/content/board/${id}`);
  return response.data;
};

export const shareContent = async (contentId: string) => {
  const response = await api.post('/content/share', { contentId });
  return response.data;
};