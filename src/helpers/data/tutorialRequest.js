import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getTutorialData = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/tutorial.json`)
    .then((res) => {
      const tutorials = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tutorials.push(res.data[key]);
        });
      }
      resolve(tutorials);
    })
    .catch(error => reject(error));
});

const deleteTutorial = tutorialId => axios.delete(`${firebaseUrl}/tutorial/${tutorialId}.json`);

const postRequest = tutorial => axios.post(`${firebaseUrl}/tutorial.json`, tutorial);

const updateTutorial = (tutorialId, isCompleted) => axios.patch(`${firebaseUrl}/tutorial/${tutorialId}.json`, { isCompleted });

export default {
  getTutorialData,
  deleteTutorial,
  postRequest,
  updateTutorial,
};
