import "./Header.css";
import configData from "../../config.json";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../GlobalStates/Authstate";
export default function Header() {
  const navigator = useNavigate();
  const { authState, disconnect } = useContext(AuthContext);
  const [lastPage, setLastPage] = useState(null);

  return (
    <div className="header">
      <div className="home">
        <CustomLink setPage={setLastPage} to="/">
          <img
            className="logo-scardor"
            src={`${configData.SERVER_URL}/assets/images/scardorlogo.png`}
            alt="scardor"
          />
        </CustomLink>
      </div>
      <nav className="navigation">
        <CustomLink to="/ClassPicker" setPage={setLastPage}>
          ClassPicker
        </CustomLink>
        <CustomLink to="/Library" setPage={setLastPage}>
          Library
        </CustomLink>
      </nav>
      <div className="social-icons">
        <a
          href="https://www.twitch.tv/scardor/" target="_blank" rel="noreferrer">
          <img src={`${configData.SERVER_URL}/assets/images/twitch_logo_circle.svg`} alt="twitch"
          />
        </a>
        <a
          href="https://www.youtube.com/scardor" target="_blank" rel="noreferrer"          >
          <img src={`${configData.SERVER_URL}/assets/images/youtube_logo_circle.svg`} alt="youtube"
          />
        </a>
        <a href="https://discord.gg/6GM8H8gmbq" target="_blank" rel="noreferrer" >
          <img src={`${configData.SERVER_URL}/assets/images/discord_logo_circle.svg`} alt="discord" />
        </a>
        <a href="https://twitter.com/ScardorGaming" target="_blank" rel="noreferrer"          >
          <img src={`${configData.SERVER_URL}/assets/images/twitter_logo_circle.svg`} alt="twitter" />
        </a>
        <img
          className="user-image" src={`${configData.SERVER_URL}/assets/images/emptyuser.png`} alt={"Login"}
                      onClick={() => {
              if (!authState.username)
                navigator("/login", {
                  state: {
                    lastPage: lastPage,
                  },
                });
              else if (window.confirm("are you sure you want to disconnect?")) {
                disconnect();
              }
            }}
        />
      </div>

    </div>
  );
}

function CustomLink({ to, children, setPage, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li >
      <Link to={to} {...props} onClick={() => setPage(to)}>
        {children}
      </Link>
    </li>
  );
}
