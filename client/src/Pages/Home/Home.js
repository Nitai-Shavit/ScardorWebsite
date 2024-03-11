import { useState } from "react";
import TwitchFrame from "./TwitchFrame";
import YoutubeEmbed from "./YoutubeEmbed";
import './Home.css'
import MediaScroller from "./MediaScroller";



export default function Home() {
    const [isOnline, setOnline] = useState(true)
    return (
        <>
            <div className="media">
                <MediaScroller TwitchOnline={isOnline}>
                    <TwitchFrame isOnline={isOnline} setOnline={setOnline} />
                    <YoutubeEmbed />
                </MediaScroller>
            </div>
        </>
    )
}