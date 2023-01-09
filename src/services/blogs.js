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

const update = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }

  const user = blog.user?.id;
  const {author, url, title, likes} = blog;

  const requestData = {
    author, url, title, likes, user
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, requestData, config);

  return response.data;
}

const blogService = {
  setToken, getAll, create, update
}

export default blogService;
