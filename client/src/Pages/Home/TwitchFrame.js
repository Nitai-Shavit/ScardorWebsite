
import { TwitchChat } from "react-twitch-embed"
import CustomTwitchPlayer from "../../Components/CustomTwitchPlayer/CustomTwitchPlayer"
import useToggle from "../../Hooks/useToggle"
import CollapsingButton from "../../SubComponents/CollapsingButton/CollapsingButton"
import "./TwitchFrame.css"
import configData from "../../config.json";

export default function TwitchFrame({ isOnline, setOnline, selected = false, setSelected }) {
    const twitch_logo = `${configData.SERVER_URL}/assets/images/twitch_logo_white_circle.svg`;
    const CHANNEL_NAME = 'Scardor'
    const [chatToggle, setChatToggle] = useToggle(true)
    return selected ? (
        <div>
            <div className="twitch-container" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                <CustomTwitchPlayer
                    channel={CHANNEL_NAME}
                    setOnline={setOnline} />
                <div class="expand-container">
                    <div id="expand-content" class={chatToggle ? "expanded" : "collapsed"} >
                        <TwitchChat
                            channel={CHANNEL_NAME}
                            style={{ width: "340px", height: "100%", minHeight: "270px" }}
                        />
                    </div>
                    <CollapsingButton value={chatToggle} onClick={() => setChatToggle()} />
                </div>
            </div >
        </div>
    ) :
        (
            <div className="twitch-selector" onClick={() => setSelected()}>
                <img src={twitch_logo} style={{ position: "relative", width: '85%', top: '2%' }} />
            </div>
        )
}
