import React, { Component } from 'react'
import { baseAPI } from './api/base'

const App = () => {
  return <ToDo />
}

class ToDo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoaded: false,
      items: [],
      updateId: '',
      updateTitle: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitleChange = this.updateTitleChange.bind(this);
  }
  //componentDidMount()はコンポーネントがマウントされた（ツリーに挿入された）直後に呼び出される
  componentDidMount() { //render直後に行いたい処理を書くところ
    this.initItems()
  }
  initItems() {
    baseAPI('posts', {}, 'GET')
      .then((res) => {
        console.log(res.data)
        this.setState({
          isLoaded: true,
          items: res.data
        })
      })
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
  setUpdateItem(id,title) {
    this.setState({
      updateId: id,
      updateTitle: title
    })
  }
  resetUpdateItem() {
    this.setState({
      updateId: '',
      updateTitle: ''
    })
  }
  updateItem(id) {
    const method = "PATCH"
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      "title": this.state.updateTitle
    });
    fetch(`http://localhost:3000/api/v1/posts/${id}`, { method, headers, body })
      .then(
        (res) => {
          console.log(res.stats)
          this.initItems()
          alert(`id:${id}のアイテムの編集に成功しました！`);
          this.setState({
            updateId: ''
          })
          return res.json()
        })
      .then(
        console.log
      )
      .catch((err) => {
        console.log(`err:${err}`);
      });
  }

  //Stateの値を更新する場合、this.setSate()で更新する


  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  updateTitleChange(event) {
    this.setState({ updateTitle: event.target.value });
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
          入力値：{this.state.text}
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder="新規タスクを入力"  value={this.state.text} onChange={this.handleChange} />
          </label>
          <input type="submit" value="送信" />
        </form>
        {this.state.items.map((item) => {
          if (this.state.updateId === item.id) {
            return <div key={item.id}>
              <input type="text" placeholder="編集後のタスクを入力" value={this.state.updateTitle} onChange={this.updateTitleChange}/>
              <button onClick={() => { this.updateItem(item.id) }}>OK</button>
              <button onClick={() => { this.resetUpdateItem() }}>キャンセル</button>
            </div>
          }
          else {
            return <div key={item.id}>
              {item.title}
              <button onClick={() => { this.deleteItem(item.id) }}>削除</button>
              <button onClick={() => this.setUpdateItem(item.id,item.title)}>編集</button>
            </div>
          }
        })}
      </div>
    );
  }
}

export default App;
