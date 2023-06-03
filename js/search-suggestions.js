export async function getSearchSuggestions(input) {
  const apiKey = "baccad5e87644ed197c133503233005";
  const request = await fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`);
  const data = await request.json();
  return new Promise((resolve) => resolve(data));
}
