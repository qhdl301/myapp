import React, { Component } from 'react';

class Control extends Component{
  
  // this.setState가 쓰는 이유?
  // 리액트 입장에서는 setState를 사용하지 않으면 
  // 상태의 값은 바뀌지만 render()는 인식하지 못하여 화면이 바뀌지 않음
  render() {

      return (
        <ul>
          <li><a href="/create" onClick={function (e) {
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>Create</a></li>
          <li><a href="/update" onClick={function (e) {
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>Update</a></li>
          <li><input onClick={function (e) {
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)} type="button" value="Delete"></input></li>
        </ul>
      );
    
  }

};

export default Control;