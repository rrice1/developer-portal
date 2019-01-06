import React from 'react';
import PropTypes from 'prop-types';

import './Blogs.scss';
import authRequests from '../../helpers/data/authRequests';
import funPropz from '../../helpers/propz/funPropz';

class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  static propTypes = {
    blog: funPropz,
    deleteSingleBlog: PropTypes.func,
    updateSingleBlog: PropTypes.func,
  }

deleteEvent = (e) => {
  e.preventDefault();
  const { deleteSingleBlog, blog } = this.props;
  deleteSingleBlog(blog.id);
}

updateEvent = (e) => {
  e.preventDefault();
  const { updateSingleBlog, blog } = this.props;
  const isCompleted = e.target.checked;
  updateSingleBlog(blog.id, isCompleted);
}

render() {
  const { blog } = this.props;
  const uid = authRequests.getCurrentUid();
  const makeButtons = () => {
    if (blog.uid === uid) {
      return (
          <div>
            <span>
              <button className="btn btn-danger"
              onClick={this.deleteEvent}>
              <p>Delete</p>
              </button>
            </span>
          </div>
      );
    }
    return <span className="col-2"></span>;
  };
  return (
      <li className="blogClass">
        <span className="col-2">{blog.name}</span>
        <a href={blog.url} target="_blank" rel="noreferrer noopener" className="col-4">{blog.url}</a>
        {makeButtons()}
        <div className="checkbox-div">
          <input type="checkbox" value="blog" checked= {blog.isCompleted} id ={blog.id} onChange={this.updateEvent}/>
          <label>Completed</label>
      </div>
      </li>
  );
}
}

export default Blogs;
