import React, { Component } from 'react'

const App = () => {
  return <Counter />
}

class Counter extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      text: '',
      isLoaded: false,
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //componentDidMount()はコンポーネントがマウントされた（ツリーに挿入された）直後に呼び出される
  componentDidMount() { //render直後に行いたい処理を書くところ
    this.initItems()
  }
  initItems() {
    fetch("http://localhost:3000/api/v1/posts") //api
    .then(res => res.json()) 
    .then(json => {
      console.log(json.data);
      this.setState({
        isLoaded: true,
        items: json.data
      });
    });
  }

  deleteItem(id) {
    const method = "DELETE"
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch(`http://localhost:3000/api/v1/posts/${id}`, { method, headers })
      .then(
        (res) => {
          this.initItems()
          alert(`id:${id}のアイテムの削除に成功しました！`);
          return res.json()
        })
      .then(console.log)
      .catch(console.error);
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
    const method = "POST"
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      "title": this.state.text
    });
    fetch("http://localhost:3000/api/v1/posts", { method, headers, body })
      .then(
        (res) => {
          this.initItems()
          return res.json()
        })
      .then(console.log)
      .catch(console.error);
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
        {this.state.items.map((item) => {
          return <div key={item.id}>{item.title}<button onClick={() => { this.deleteItem(item.id) }}>削除</button></div>
        })}
      </div>
    );
  }
}

export default App;
