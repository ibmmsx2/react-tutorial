import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';


class App extends Component {
    componentDidMount() {
        const { number } = this.props;
        this.getPost(number);
    }

    componentWillReceiveProps(nextProps) {
        // 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
        if (this.props.number !== nextProps.number) {
            this.getPost(nextProps.number);
        }
    }

    getPost = async(postId) => {
        const { PostActions } = this.props;

        try {
            await PostActions.getPost(postId);
            console.log('요청이 완료된 다음에 실행됨');
        } catch(e) {
            console.log('에러 발생');
        }
    }

    render() {
        const { CounterActions, number, post, error, loading } = this.props;

        return (
            <div>
                <h1>{number}</h1>
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
                { loading && <h2>로딩중...</h2> }
                { error
                    ? <h1>에러발생</h1>
                    : (
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post: state.post.data,
        loading: state.post.pending,
        error: state.post.error
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);
