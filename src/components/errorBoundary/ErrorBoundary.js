import { Component } from "react/cjs/react.production.min";
import ErrorMesage from "../errorMessage/ErrorMesage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <h2><ErrorMesage/></h2>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;