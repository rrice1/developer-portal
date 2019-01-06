import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getResourceData = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resource.json`)
    .then((res) => {
      const resources = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          resources.push(res.data[key]);
        });
      }
      resolve(resources);
    })
    .catch(err => reject(err));
});

const deleteResource = resourceId => axios.delete(`${firebaseUrl}/resource/${resourceId}.json`);

const postResource = resource => axios.post(`${firebaseUrl}/resource.json`, resource);

const updateResource = (resourceId, isCompleted) => axios.patch(`${firebaseUrl}/resource/${resourceId}.json`, { isCompleted });

export default {
  getResourceData,
  deleteResource,
  postResource,
  updateResource,
};
