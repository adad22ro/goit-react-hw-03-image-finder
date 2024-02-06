export default async function articles(value, page = 1) {
  const baseURL = 'https://pixabay.com/api/';
  const API_KEY = '41050906-5b737de2081c42fd9d8bf2fc7';

  return await fetch(
    `${baseURL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(Response => Response.json());
}
