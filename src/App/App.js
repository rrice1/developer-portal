import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Bio from '../components/Bio/Bio';
import Form from '../components/Input/Input';
import Websites from '../components/Websites/Websites';
import './App.scss';
import authRequests from '../helpers/data/authRequests';
import bioRequest from '../helpers/data/bioRequest';
import tutorialRequest from '../helpers/data/tutorialRequest';
import resourcesRequest from '../helpers/data/resourcesRequest';
import blogRequest from '../helpers/data/blogRequest';
import podcastRequest from '../helpers/data/podcastRequest';

class App extends Component {
    state = {
      authed: false,
      githubUsername: '',
      bio: [],
      tutorials: [],
      resources: [],
      blogs: [],
      podcasts: [],
    };

    componentDidUpdate() {
      if (this.state.githubUsername && this.state.bio.length === 0) {
        bioRequest.getUserInfo(this.state.githubUsername)
          .then((bio) => {
            this.setState({ bio });
          })
          .catch(err => console.error(err));
      }
    }

    componentDidMount() {
      connection();
      tutorialRequest.getTutorialData()
        .then((tutorials) => {
          this.setState({ tutorials });
        })
        .catch(error => console.error(error));

      resourcesRequest.getResourceData()
        .then((resources) => {
          this.setState({ resources });
        })
        .catch(error => console.error(error));

      blogRequest.getBlogData()
        .then((blogs) => {
          this.setState({ blogs });
        })
        .catch(error => console.error(error));

      podcastRequest.getPodcastData()
        .then((podcasts) => {
          this.setState({ podcasts });
        })
        .catch(error => console.error(error));

      this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const users = sessionStorage.getItem('githubUsername');
          this.setState({
            authed: true,
            githubUsername: users,
          });
        } else {
          this.setState({
            authed: false,
          });
        }
      });
    }

    componentWillUnmount() {
      this.removeListener();
      authRequests.logoutUser();
    }

isAuthenticated = (username) => {
  this.setState({ authed: true, githubUsername: username });
  sessionStorage.setItem('githubUsername', username);
}

updateTutorial = (tutorialId, isCompleted) => {
  tutorialRequest.updateTutorial(tutorialId, isCompleted)
    .then(() => {
      tutorialRequest.getTutorialData()
        .then((tutorials) => {
          tutorials.sort((x, y) => x.isCompleted - y.isCompleted);
          this.setState({ tutorials });
        });
    })
    .catch(err => console.error(err));
}

updateResource = (resourceId, isCompleted) => {
  resourcesRequest.updateResource(resourceId, isCompleted)
    .then(() => {
      resourcesRequest.getResourceData()
        .then((resources) => {
          resources.sort((x, y) => x.isCompleted - y.isCompleted);
          this.setState({ resources });
        });
    })
    .catch(err => console.error(err));
}

updateBlog = (blogId, isCompleted) => {
  blogRequest.updateBlog(blogId, isCompleted)
    .then(() => {
      blogRequest.getBlogData()
        .then((blogs) => {
          blogs.sort((x, y) => x.isCompleted - y.isCompleted);
          this.setState({ blogs });
        });
    })
    .catch(err => console.error(err));
}

updatePodcast = (podcastId, isCompleted) => {
  podcastRequest.updatePodcast(podcastId, isCompleted)
    .then(() => {
      podcastRequest.getPodcastData()
        .then((podcasts) => {
          podcasts.sort((x, y) => x.isCompleted - y.isCompleted);
          this.setState({ podcasts });
        });
    })
    .catch(err => console.error(err));
}

deleteTutorial = (tutorialId) => {
  tutorialRequest.deleteTutorial(tutorialId)
    .then(() => {
      tutorialRequest.getTutorialData()
        .then((tutorials) => {
          this.setState({ tutorials });
        });
    })
    .catch(err => console.error(err));
}

deleteResource = (resourceId) => {
  resourcesRequest.deleteResource(resourceId)
    .then(() => {
      resourcesRequest.getResourceData()
        .then((resources) => {
          this.setState({ resources });
        });
    })
    .catch(err => console.error(err));
}

deleteBlog = (blogId) => {
  blogRequest.deleteBlogData(blogId)
    .then(() => {
      blogRequest.getBlogData()
        .then((blogs) => {
          this.setState({ blogs });
        });
    })
    .catch(err => console.error(err));
}

deletePodcast = (podcastId) => {
  podcastRequest.deletePodcastData(podcastId)
    .then(() => {
      podcastRequest.getPodcastData()
        .then((podcasts) => {
          this.setState({ podcasts });
        });
    })
    .catch(err => console.error(err));
}

formSubmitEvent = (newWebsite) => {
  if (newWebsite.type === 'tutorial') {
    tutorialRequest.postRequest(newWebsite)
      .then(() => {
        tutorialRequest.getTutorialData()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error(err));
  } else if (newWebsite.type === 'resources') {
    resourcesRequest.postResource(newWebsite)
      .then(() => {
        resourcesRequest.getResourceData()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error(err));
  } else if (newWebsite.type === 'blog') {
    blogRequest.postBlog(newWebsite)
      .then(() => {
        blogRequest.getBlogData()
          .then((blogs) => {
            this.setState({ blogs });
          });
      })
      .catch(err => console.error(err));
  } else if (newWebsite.type === 'podcast') {
    podcastRequest.postPodcast(newWebsite)
      .then(() => {
        podcastRequest.getPodcastData()
          .then((podcasts) => {
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error(err));
  }
}

render() {
  const logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false, githubUsername: '' });
  };
  if (!this.state.authed) {
    return (
        <div>
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
    );
  }

  return (
      <div>
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
        <div className="row">
        <div className="col-3">
          <Bio
          bio={this.state.bio}
          commits={this.state.commits}
          />
        </div>
        <div className="col-8">
          <Form onSubmit={this.formSubmitEvent}/>
          <Websites
          tutorials = {this.state.tutorials}
          resources = {this.state.resources}
          blogs = {this.state.blogs}
          podcasts = {this.state.podcasts}
          deleteSingleTutorial = {this.deleteTutorial}
          deleteSingleResource = {this.deleteResource}
          deleteSingleBlog = {this.deleteBlog}
          deleteSinglePodcast = {this.deletePodcast}
          updateSingleTutorial = {this.updateTutorial}
          updateSingleResource = {this.updateResource}
          updateSingleBlog = {this.updateBlog}
          updateSinglePodcast = {this.updatePodcast}/>
        </div>
        </div>
      </div>
  );
}
}

export default App;
