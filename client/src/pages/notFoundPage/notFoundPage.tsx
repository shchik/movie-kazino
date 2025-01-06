import { Link } from "react-router-dom";
import "./notFoundPage.css";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page-container">
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </div>
  );
};
