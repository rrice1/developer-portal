import React from 'react';
import './Input.scss';
import authRequests from '../../helpers/data/authRequests';


const baseInput = {
  name: '',
  url: '',
  uid: '',
  type: '',
  isCompleted: false,
};

class Input extends React.Component {
  state = {
    newInput: baseInput,
  }

inputFieldStringState = (name, e) => {
  e.preventDefault();
  const tempInput = { ...this.state.newInput };
  tempInput[name] = e.target.value;
  this.setState({ newInput: tempInput });
}

nameChange = e => this.inputFieldStringState('name', e);

urlchange = e => this.inputFieldStringState('url', e);

changeRadio = (e) => {
  const tempInput = { ...this.state.newInput };
  tempInput.type = e.target.value;
  this.setState({ newInput: tempInput });
}

uncheck = () => {
  document.querySelectorAll('.form-check-input:checked')[0].checked = false;
}

inputSubmit = (e) => {
  this.uncheck();
  e.preventDefault();
  const { onSubmit } = this.props;
  const myInput = { ...this.state.newInput };
  myInput.uid = authRequests.getCurrentUid();
  onSubmit(myInput);
  this.setState({ newInput: baseInput });
}

render() {
  const { newInput } = this.state;
  return (
      <div className="form">
        <form className="row" id= "add-form" onSubmit={this.inputSubmit}>
        <div className= "col-6">
          <div className="form-group">
            <label htmlFor="name" className="row">Name:</label>
            <div className="row">
              <input
                type="text"
                className="form-control"
                id="name"
                value= {newInput.name}
                placeholder="Learning is the best on winter break"
                onChange={this.nameChange}
                />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="URL" className="row">URL:</label>
            <div className="row">
              <input
                type="text"
                className="form-control"
                id="URL"
                placeholder="https://www.udemy.com"
                value= {newInput.url}
                onChange={this.urlchange}
                />
            </div>
          </div>
          </div>
          <div className="col-4">
          <div className="form-check">
            <label className="form-check-label">
            <input
            value="tutorial"
            className="form-check-input"
            type="checkbox"
            onChange={this.changeRadio}
            />Tutorial
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value="resources"
              onChange={this.changeRadio}
              />Resource
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value="podcast"
              onChange={this.changeRadio}
              />Podcast
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input
            className="form-check-input"
            type="checkbox"
            value="blog"
            onChange={this.changeRadio}
            />Blog
            </label>
          </div>
          </div>
          <div className="">
          <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </div>
  );
}
}

export default Input;
