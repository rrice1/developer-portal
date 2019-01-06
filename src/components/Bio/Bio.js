import React from 'react';
import './Bio.scss';

class Bio extends React.Component {
  render() {
    const { bio } = this.props;
    return (
      <div>
        <div className="card">
          <img src={bio.avatar_url} alt="github pic"></img>
          <h2>{bio.login}</h2>
          <p> {bio.login} might have commits in the last 5 days.</p>
          <a href={bio.html_url}>{bio.html_url}</a>
        </div>
      </div>
    );
  }
}

export default Bio;
