import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <h2 className="home-link" key="home-button">
            <Link to="/">
              Home
            </Link>
          </h2>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;