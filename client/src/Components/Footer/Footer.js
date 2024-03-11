import "./Footer.css";
import configData from "../../config.json";


export default function Footer() {
    return (
        <div className="footer">
            <div className="socials">
                <a
                    href="https://www.twitch.tv/scardor/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="logo-socials"
                        src={`${configData.SERVER_URL}/assets/images/twitch_logo_circle.svg`}
                        alt="twitch"
                    />
                </a>
                <a
                    href="https://www.youtube.com/scardor"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="logo-socials"
                        src={`${configData.SERVER_URL}/assets/images/youtube_logo_circle.svg`}
                        alt="youtube"
                    />
                </a>
                <a
                    href="https://discord.gg/6GM8H8gmbq"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="logo-socials"
                        src={`${configData.SERVER_URL}/assets/images/discord_logo_circle.svg`}
                        alt="discord"
                    />
                </a>
                <a
                    href="https://twitter.com/ScardorGaming"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="logo-socials"
                        src={`${configData.SERVER_URL}/assets/images/twitter_logo_circle.svg`}
                        alt="twitter"
                    />
                </a>
            </div>
            <div className="logo">
                <img
                    src={`${configData.SERVER_URL}/assets/images/scardorlogo.png`}
                    alt="scardor"
                />
            </div>
            <div className="legal">
                <href > Privacy Policy</href> |
                <href > Terms of Service</href> |
                <href > Cookie Policy</href> |
                <href > Licenses</href>
            </div>
            <div className="copyright">copyright © 2024 Scardor, All rights reserved.</div>
        </div>
    )

}
