import React from 'react';
import PropTypes from 'prop-types';
import './Podcasts.scss';
import funPropz from '../../helpers/propz/funPropz';
import authRequests from '../../helpers/data/authRequests';

class Podcasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  static propTypes = {
    podcast: funPropz,
    deleteSinglePodcast: PropTypes.func,
    updateSinglePodcast: PropTypes.func,
  }

deleteEvent = (e) => {
  e.preventDefault();
  const { deleteSinglePodcast, podcast } = this.props;
  deleteSinglePodcast(podcast.id);
}

updateEvent = (e) => {
  e.preventDefault();
  const { updateSinglePodcast, podcast } = this.props;
  const isCompleted = e.target.checked;
  updateSinglePodcast(podcast.id, isCompleted);
}

render() {
  const { podcast } = this.props;
  const uid = authRequests.getCurrentUid();
  const makeButtons = () => {
    if (podcast.uid === uid) {
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
      <li className="podcastClass">
        <span className="col-2">{podcast.name}</span>
        <a href={podcast.url} target="_blank" rel="noreferrer noopener" className="col-4">{podcast.url}</a>
        {makeButtons()}
        <div className="checkbox-div">
          <input type="checkbox" value= {this.state.value} checked={podcast.isCompleted} id={podcast.id} onChange={this.updateEvent}/>
          <label>Completed</label>
      </div>
    </li>
  );
}
}

export default Podcasts;
