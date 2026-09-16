import { Link, NavLink } from "react-router";
import logo from "../assets/logo.svg";

export const Navbar = (): React.ReactElement => {
  return (
    <nav className="flex items-center bg-gray-950 py-4 px-15">
      <Link to="/" className="flex items-center gap-2 text-white">
        <img src={logo} alt="Logo" className="h-7 w-7 mr-2 border-none" />
        <h1 className="text-xl">Music Player</h1>
      </Link>

      <div className="ml-auto flex items-center gap-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-300 hover:text-white"
          }
        >
          All Songs
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-300 hover:text-white"
          }
        >
          Playlists
        </NavLink>
      </div>
    </nav>
  );
};