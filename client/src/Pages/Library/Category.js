import './Library.css'

export default function Category({ title, content, backgroundImage }) {
    const categoryStyle = {
        background: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${backgroundImage})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundColor: 'rgba(58, 77, 117, 0.6)',
    };
    return (
        <div className="category-wrapper" style={categoryStyle}>
            <div className="category-header">
                {title}
            </div>
            <div className="category-content" >
                {content.map((item,index) => {
                    return (
                        <label key={index} onClick={() => window.open(item.link, '_blank').focus()} >{item.title} </label>
                    )
                })}

            </div>
        </div>
    )
}