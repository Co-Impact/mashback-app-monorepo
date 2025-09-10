import axios from 'axios';

export const isRSSFeed = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
    );

    // Check if the response contains items and a valid feed structure
    return Array.isArray(response.data.items) && response.data.items.length > 0;
  } catch (error) {
    console.error('RSS feed validation failed:', error);
    return false;
  }
};
