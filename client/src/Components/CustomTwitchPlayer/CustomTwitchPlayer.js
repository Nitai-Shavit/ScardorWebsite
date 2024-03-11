import { createRef, memo } from "react"
import { TwitchPlayer } from "react-twitch-embed"



const CustomTwitchPlayer = ({ channel, setOnline, style = { aspectRatio: "16/9", width: '72%', minWidth: '480px' } }) => {
    const player = createRef()
    return (<TwitchPlayer
        channel={channel}
        style={style}
        onOnline={() => setOnline(true)}        
        onOffline={() => setOnline(false)}
        onReady={(p) => { player.current = p }}
        parent={['scardor.com']}
    />
    )
}

export default memo(CustomTwitchPlayer)