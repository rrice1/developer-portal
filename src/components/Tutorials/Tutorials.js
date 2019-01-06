import React from 'react';
import PropTypes from 'prop-types';

import './Tutorials.scss';
import authRequests from '../../helpers/data/authRequests';
import funPropz from '../../helpers/propz/funPropz';

class Tutorials extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  static propTypes = {
    tutorial: funPropz,
    deleteSingleTutorial: PropTypes.func,
    updateSingleTutorial: PropTypes.func,
  }

deleteEvent = (e) => {
  e.preventDefault();
  const { deleteSingleTutorial, tutorial } = this.props;
  deleteSingleTutorial(tutorial.id);
}

updateEvent = (e) => {
  e.preventDefault();
  const { updateSingleTutorial, tutorial } = this.props;
  const isCompleted = e.target.checked;
  updateSingleTutorial(tutorial.id, isCompleted);
}

render() {
  const { tutorial } = this.props;
  const uid = authRequests.getCurrentUid();
  const makeButtons = () => {
    if (tutorial.uid === uid) {
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
    return <span className= "col-2"></span>;
  };

  return (
    <li className="tutorialClass">
      <span className="col-2">{tutorial.name}</span>
      <a href={tutorial.url} target="_blank" rel="noreferrer noopener" className="col-4">{tutorial.url}</a>
      {makeButtons()}
      <div className="checkbox-div">
          <input type="checkbox" value={this.state.value} checked={tutorial.isCompleted} id={tutorial.id} onChange={this.updateEvent}/>
          <label>Completed</label>
      </div>
    </li>
  );
}
}

export default Tutorials;
