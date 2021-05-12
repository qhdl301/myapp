import React, { Component } from 'react';

class Toc extends Component{
  
  // 1. render() 호출 전에 shouldComponentUpdate가 호출 된다
  // 2. 기본 Default True 값 True면 render 함수 호출 false면 호출하지 않음
  // 3. 새롭게 바뀐 데이터와, 이전 데이터를 알 수 있다.
  shouldComponentUpdate(newProps, newState) {
    
    console.log('===> TOC render shouldComponentUpdate');
    console.log('바뀐 데이터 : ' + newProps.data);      // 바꾼 데이터 
    console.log('이전 데이터 : ' + this.props.data);    // 이전 데이터 
    
    // 데이터가 변경이 없으면 render() 함수 호출하지 않고, 그러지 않으면 render() 함수 호출
    if (this.props.data === newProps.data) {
      return false;
    }

    return true;
    
  }
  // props는 클래스의 정의 된 엘레멘트 정보들을 가지고 오는것이다.(매우중요)
  render() {
    let lists = [];
    let data = this.props.data;
    let i = 0;
    while (i < data.length) {
      // 자동으로 엘레멘트 생성 시 key를 셋팅해줘야한다.(리액트 내부에서 필요한 데이터)
      // onclick 함수의 e는 onclick 자기가 이벤트를 발생한 엘레멘트를 가르키는 것이고
      lists.push(
        <li key={data[i].id}><a href={"/content/" + data[i].id} onClick={
          function (id, e) {
          e.preventDefault(); this.props.onChangePage(id);
        }.bind(this, data[i].id)}>{data[i].title}</a></li>);
      i++;
    }
  
      return (
        <nav>
            <ul>
              {lists}
            </ul>
        </nav>
      );
  }

};

export default Toc;