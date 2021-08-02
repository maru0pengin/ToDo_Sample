import React, { Component } from 'react'

const App = () => {
  return <Counter />
}

class Counter extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Stateの値を更新する場合、this.setSate()で更新する

  //インクリメントする関数
  onIncrement = () => {
    //setStateでstateの値を更新する
    this.setState({ value: this.state.value + 1 });
  }

  //デクリメントする関数
  onDecrement = () => {
    //setStateでstateの値で更新する
    this.setState({ value: this.state.value - 1 });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.text);
    this.setState({ text: ''})
    event.preventDefault();
  }

  //Stateの値が変更されるとrenderが走る
  render() {
    return (
      <div>
        <div>
          カウント値：{this.state.value}<br />
          入力値：{this.state.text}
        </div>
        <div>
          <button type="button" onClick={this.onIncrement}>+</button>
          <button type="button" onClick={this.onDecrement}>-</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.text} onChange={this.handleChange} />
          </label>
          <input type="submit" value="送信" />
        </form>
      </div>
    );
  }
}

export default App;
