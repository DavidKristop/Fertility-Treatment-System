import { fetchWrapper } from '.';
import type { FAQResponse } from '@/lib/types/faq';

export const getFAQs = async (
  page: number,
  search?: string,
  limit: number = 6
): Promise<FAQResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    });

    const response = await fetchWrapper(`faqs?${queryParams.toString()}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch FAQs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};