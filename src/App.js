import React, { Component } from 'react'
import { ToDoRepository } from './models/ToDo'
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
  async initItems() {
    try {
      let res = await new ToDoRepository().all()
      this.setState({
        isLoaded: true,
        items: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  async deleteItem(id) {
    try {
      await new ToDoRepository().delete(id)
      this.initItems()
    } catch (err) {
      console.log(err)
    }
  }
  
  async updateItem(id) {
    try {
      await new ToDoRepository().update(id, { title: this.state.updateTitle })
      alert(`id:${id}のアイテムの編集に成功しました！`)
      this.initItems()
      this.setState({
        updateId: '',
        updateTitle: ''
      })
    } catch (err) {
      console.log(err)
    }
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

  //Stateの値を更新する場合、this.setSate()で更新する

  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  updateTitleChange(event) {
    this.setState({ updateTitle: event.target.value });
  }

  async handleSubmit(event) {
    try {
      await new ToDoRepository().create({ title: this.state.text })
      alert('アイテムの作成に成功しました！')
      this.initItems()
      this.setState({
        text: '',
      })
    } catch (err) {
      console.log(err)
    }
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
