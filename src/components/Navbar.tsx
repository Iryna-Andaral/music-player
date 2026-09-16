import { Link, NavLink } from "react-router";
import logo from "../assets/logo.svg";

export const Navbar = (): React.ReactElement => {
  return (
    <nav className="flex items-center bg-gray-950 px-4 py-4 sm:px-8 xl:px-15">
      <Link to="/" className="flex items-center gap-2 text-white">
        <img src={logo} alt="Logo" className="h-7 w-7 mr-2 border-none" />
        <h1 className="text-xl">Music Player</h1>
      </Link>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded border px-2 py-1 text-xs transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
              isActive
                ? "border-lime-400 text-lime-400"
                : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200"
            }`
          }
        >
          All Songs
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `rounded border px-2 py-1 text-xs transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
              isActive
                ? "border-lime-400 text-lime-400"
                : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200"
            }`
          }
        >
          Playlists
        </NavLink>
      </div>
    </nav>
  );
};