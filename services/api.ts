import { FeedItemType } from '../types/Feed';

export const fetchFeedData = async (page: number, limit = 20): Promise<FeedItemType[]> => {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch feed data');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
