import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './action';
class Counter extends React.Component {
    state = { count: 0 };
    Increment = () => { 
        console.log("BEFORE ACTION CALLL COUNTER======>>",this.props.count);
        this.props.increment(); // << use it here
        console.log("AFTER ACTION CALLL COUNTER======>>",this.props.count);

    };
    Decrement = () => {
        this.props.decrement();
    };
    render() {
        // console.log("INSIDE ACTION RENDER",this.props.count);
        
        return (
            <div className="counter">
                <h2>Counter</h2>
                <div>
                    <button onClick={this.Decrement}>-</button>
                    <span className="count">{
                        this.props.count
                    }</span>
                    <button onClick={this.Increment}>+</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("UPDATED VALUE to render",state.count);

    return {
        count: state.count
    };
}
const mapDispatchToProps = {
    increment,
    decrement
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);