const baseUrl = 'https://pixabay.com/api/';
const KEY_API = '33301172-db6a954cc7cf3c460999838e3';

let pageNumber = 1;
const perPage = 12;

export const incrementPage = () => {
  pageNumber += 1;
};

export const resetPage = () => {
  pageNumber = 1;
};

export const getImages = async name => {
  const response = await fetch(
    `${baseUrl}?key=${KEY_API}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`
  );
  if (response.ok) {
    const images = await response.json('');

    return images;
  }
  return Promise.reject(new Error(`There is no photos for ${name} query `));
};
