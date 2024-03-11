import { useEffect, useState } from "react";

export default function MediaScroller({ TwitchOnline, children }) {

    const [tabIndex, setTabIndex] = useState(TwitchOnline ? 0 : 1)

    useEffect(() => {
        setTabIndex(TwitchOnline ? 0 : 1)
    }, [TwitchOnline])

    return (
        <>
            {children.map((child, index) => {

                return { ...child, props: { ...child.props, selected: index == tabIndex , setSelected:() => setTabIndex(index) } }
            })}

        </>
    )

}