import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="NotFound">
            <h1>404 - Not Found!</h1>
            <div className="NotFoundLinks">
                <Link className="NotFoundLink" to="/">Home</Link>
                <Link to="/massage">Massage</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
}