import axios from "axios";
const KEY = "22137336-626728f8e845457664aa471a0";

axios.defaults.baseURL = "https://pixabay.com";

const fetchImages = ({ searchQuery = "", currentPage = 1 }) => {
  return axios
    .get(
      `/api/?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};

export default { fetchImages };
