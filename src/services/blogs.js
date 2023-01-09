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
  const response = await axios.post(baseUrl, blogData, getConfigWithAuth());

  return response.data;
}

const update = async (blog) => {
  const user = blog.user?.id;
  const {author, url, title, likes} = blog;

  const requestData = {
    author, url, title, likes, user
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, requestData, getConfigWithAuth());

  return response.data;
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getConfigWithAuth());

  return response.data;
}

const getConfigWithAuth = () => ({
  headers: {Authorization: token}
})

const blogService = {
  setToken, getAll, create, update, remove
}

export default blogService;
