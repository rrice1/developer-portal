import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getBlogData = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/blog.json`)
    .then((res) => {
      const blogs = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          blogs.push(res.data[key]);
        });
      }
      resolve(blogs);
    })
    .catch(err => reject(err));
});

const deleteBlogData = blogId => axios.delete(`${firebaseUrl}/blog/${blogId}.json`);

const postBlog = blog => axios.post(`${firebaseUrl}/blog.json`, blog);

const updateBlog = (blogId, isCompleted) => axios.patch(`${firebaseUrl}/blog/${blogId}.json`, { isCompleted });

export default {
  getBlogData,
  deleteBlogData,
  postBlog,
  updateBlog,
};
