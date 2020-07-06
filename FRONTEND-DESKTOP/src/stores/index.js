import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'

// const Counter = ...

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)