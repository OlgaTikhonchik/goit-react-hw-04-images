const API_KEY = '34888063-32f27f7df2cbfc9058681e962';
const BASE_URL = 'https://pixabay.com/api/';

export const getImage = (searchText, page = 1) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        `Oops... there are no ${searchText} images matching your search... `
      )
    );
  });
};
