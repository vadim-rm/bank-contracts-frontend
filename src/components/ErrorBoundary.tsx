import {Component, ErrorInfo, ReactNode} from 'react';
import {Modal} from 'react-bootstrap';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(_: Error): Partial<ErrorBoundaryState> {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });

        console.error("Uncaught error:", error.message, errorInfo);
    }

    handleClose = (): void => {
        this.setState({hasError: false, error: null, errorInfo: null});
    };

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <>
                    {this.props.children}
                    <Modal show={this.state.hasError} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Произошла ошибка</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{this.state.error?.message ?? "Произошла неизвестная ошибка"}</p>
                        </Modal.Body>
                    </Modal>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
