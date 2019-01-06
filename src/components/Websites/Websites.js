import React from 'react';
import PropTypes from 'prop-types';
import './Websites.scss';

import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';

import classnames from 'classnames';
import funPropz from '../../helpers/propz/funPropz';
import Tutorials from '../Tutorials/Tutorials';
import Resources from '../Resources/Resources';
import Blogs from '../Blogs/Blogs';
import Podcasts from '../Podcasts/Podcasts';

class Websites extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(funPropz),
    resources: PropTypes.arrayOf(funPropz),
    blogs: PropTypes.arrayOf(funPropz),
    podcasts: PropTypes.arrayOf(funPropz),
    updateSingleTutorial: PropTypes.func,
    updateSingleResource: PropTypes.func,
    updateSingleBlog: PropTypes.func,
    updateSinglePodcast: PropTypes.func,
    deleteSingleTutorial: PropTypes.func,
    deleteSingleResource: PropTypes.func,
    deleteSingleBlog: PropTypes.func,
    deleteSinglePodcast: PropTypes.func,
    isCompleted: PropTypes.bool,
    isCompletedRes: PropTypes.bool,
    isCompletedBlog: PropTypes.bool,
    isCompletedPodcast: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      tutorials, deleteSingleTutorial, updateSingleTutorial, isCompleted,
    } = this.props;
    const tutorialsItemComponent = tutorials.map(tutorial => (
      <Tutorials
      tutorial = {tutorial}
      key={tutorial.id}
      deleteSingleTutorial = {deleteSingleTutorial}
      updateSingleTutorial = {updateSingleTutorial}
      isCompleted = {isCompleted}/>
    ));
    const {
      resources, deleteSingleResource, updateSingleResource, isCompletedRes,
    } = this.props;
    const resourcesItemCompent = resources.map(resource => (
      <Resources
      resource = {resource}
      key={resource.id}
      deleteSingleResource = {deleteSingleResource}
      updateSingleResource = {updateSingleResource}
      isCompletedRes = {isCompletedRes}/>
    ));
    const {
      blogs, deleteSingleBlog, updateSingleBlog, isCompletedBlog,
    } = this.props;
    const blogsItemComponent = blogs.map(blog => (
      <Blogs
      blog = {blog}
      key={blog.id}
      deleteSingleBlog = {deleteSingleBlog}
      updateSingleBlog= {updateSingleBlog}
      isCompletedBlog = {isCompletedBlog}/>
    ));
    const {
      podcasts, deleteSinglePodcast, updateSinglePodcast, isCompletedPodcast,
    } = this.props;
    const podcastsItemComponent = podcasts.map(podcast => (
      <Podcasts
      podcast = {podcast}
      key={podcast.id}
      deleteSinglePodcast = {deleteSinglePodcast}
      updateSinglePodcast = {updateSinglePodcast}
      isCompletedPodcast = {isCompletedPodcast}/>
    ));
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>Tutorials</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>Resources</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}>Podcasts</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}>Blogs</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1"><p>{tutorialsItemComponent}</p></TabPane>
          <TabPane tabId="2"><p>{resourcesItemCompent}</p></TabPane>
          <TabPane tabId="3"><p>{podcastsItemComponent}</p></TabPane>
          <TabPane tabId="4"><p>{blogsItemComponent}</p></TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Websites;
