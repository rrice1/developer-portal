import axios from 'axios';
import apiKeys from '../apiKeys';

const clientId = apiKeys.githubApi.client_id;
const clientSecret = apiKeys.githubApi.client_secret;

const getUserInfo = githubUsername => new Promise((resolve, reject) => {
  axios
    .get(`https://api.github.com/users/${githubUsername}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => reject(err));
});

// const getCommits = githubUsername => new Promise((resolve, reject) => {
//   axios
//     .get(`https://api.github.com/users/${githubUsername}/events/public`)
// }

export default {
  getUserInfo,
};
