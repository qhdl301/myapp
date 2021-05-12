import React, { Component } from 'react';

class Subject extends Component{
  
  // this.setState가 쓰는 이유?
  // 리액트 입장에서는 setState를 사용하지 않으면 
  // 상태의 값은 바뀌지만 render()는 인식하지 못하여 화면이 바뀌지 않음
  render() {

      return (
        <header>
          <h1><a href='/' onClick={function (e) {
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    
  }

};

export default Subject;