const BASE_URL = "https://en.wikipedia.org/w/api.php";

export const searchWikipedia = async (query) => {
  if (!query.trim()) return [];

  const url = `${BASE_URL}?action=opensearch&search=${encodeURIComponent(
    query
  )}&limit=10&format=json&origin=*`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Search request failed");

  const data = await response.json();
  // data = [query, [titles], [descriptions], [urls]]
  const [, titles, descriptions, urls] = data;

  return titles.map((title, i) => ({
    title,
    description: descriptions[i] || "",
    url: urls[i],
  }));
};