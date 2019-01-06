import React from 'react';
import PropTypes from 'prop-types';
import './Resources.scss';
import authRequests from '../../helpers/data/authRequests';
import funPropz from '../../helpers/propz/funPropz';


class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  static propTypes = {
    resource: funPropz,
    deleteSingleResource: PropTypes.func,
    updateSingleResource: PropTypes.func,
  }

deleteEvent = (e) => {
  e.preventDefault();
  const { deleteSingleResource, resource } = this.props;
  (deleteSingleResource(resource.id));
}

updateEvent = (e) => {
  e.preventDefault();
  const { updateSingleResource, resource } = this.props;
  const isCompleted = e.target.checked;
  updateSingleResource(resource.id, isCompleted);
}

render() {
  const { resource } = this.props;
  const uid = authRequests.getCurrentUid();
  const makeButtons = () => {
    if (resource.uid === uid) {
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
      <li className="resourceClass">
        <span className="col-2">{resource.name}</span>
        <a href={resource.url} target="_blank" rel="noreferrer noopener" className="col-4">{resource.url}</a>
        {makeButtons()}
        <div className="checkbox-div">
          <input type="checkbox" value={this.state.value} checked={resource.isCompleted} id={resource.id} onChange={this.updateEvent}/>
          <label>Completed</label>
        </div>
      </li>
  );
}
}

export default Resources;
