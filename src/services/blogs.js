import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const blogs = await axios.get(baseUrl);

  return blogs.data;
};

const create = async (blogData) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, blogData, config);

  return response.data;
}

const blogService = {
  setToken, getAll, create,
}

export default blogService;
