import React, { Component } from 'react';
import Toc from "./components/Toc"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';

class App extends Component{
  // 상위 컴포넌트 > props > 하위 컴포넌트
  // 하위 컴포넌트 > 이벤트 실행 > 상위 컴포넌트의 state 호출 > state 값 수정
  // props는 컴포넌트 외부에서 사용하는 속성(Read-only), 상위 컴포넌트에서 하위 컴포넌트에 데이터를 전달 할 때 사용.
  // state는 컴포넌트 내부에서 사용하는 상태(setState를 통해 값 변경 가능).
  // event로 하위 컴포넌트가 상위 컴포넌트의 UI를 바꾸기 위해 상위 컴포넌트의 state를 호출 및 수정 함.
  // constructor : 생성자 안에 코드를 구현한다(초기화 단계)
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id : 2,
      welcome: {title: 'Welcome', desc:'Hello, React!!'},
      subject: { title: 'WEB', sub: 'World Wide Web!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }

  getReadContent() {

      let i = 0;
      while (i < this.state.contents.length) {
        let data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i++;
      }

  }

  getContent() {
    
    console.log('App Render');
    let _title, _desc, _article = null;

    if (this.state.mode === 'welcome') {
      
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      
    } else if (this.state.mode === 'read') {
      
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === 'create') {
   
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id++;
        // concat을 통해 기존에 배열을 원본 데이터를 유지하여 데이터를 추가한다 => 원본을 복제
        // 비슷한 방법 Array.from() => 배열, Object.assign() => 객체
        // immutable.js => 나중에 공부 필요 
        let _contents = this.state.contents.concat(
          { id: this.max_content_id, title: _title, desc: _desc }
        );
        this.setState({
          contents: _contents
        });
      }.bind(this)}></CreateContent>

    } else if (this.state.mode === 'update') {

      _content = this.getReadContent();

      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          let i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = {id:_id, title:_title, desc:_desc}
                break;
              }
            i++;
        }
        this.setState({
          contents: _contents
        });
          
      }.bind(this)}></UpdateContent>

    }

    return _article;

  }

  // props나 state 값이 바뀌면 상태 값을 가지고 있는 render 함수의 Component는 다시 그려지도록 리액트에서 약속 함.
  render() {

      return (
        <div className="App">
          
          <Subject onChangePage={function (e) {
            this.setState({ mode: 'welcome' })
          }.bind(this)} title={this.state.subject.title} sub={this.state.subject.sub}></Subject>

          <Toc onChangePage={function (target_data) {
            this.setState({ mode: 'read', selected_content_id: Number(target_data) })
          }.bind(this)} data={this.state.contents}></Toc>

          <Control onChangeMode={function (_mode) {
            if (_mode === 'delete') {
              if (window.confirm('진짜 삭제할꺼니??')) {
                
                var _contents = Array.from(this.state.contents);
                let i = 0;

                while (i < _contents.length) {
                  
                  if (_contents[i].id === this.state.selected_content_id) {
                    console.log("delete Target id : " + i);
                    _contents.splice(i, 1);
                    break;
                  }

                  i++;
                }
            
                this.setState({
                  mode: 'welcome',
                  contents: _contents
                });

                alert('deleted!!');

              } 

            } else {
              
              this.setState({
                mode: _mode
              });

            }
          }.bind(this)}></Control>
          
          {this.getContent()}

        </div>
        );
  }

};

export default App;
