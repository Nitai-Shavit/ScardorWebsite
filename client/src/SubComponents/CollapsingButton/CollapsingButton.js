import "./CollapsingButton.css"
export default function CollapsingButton({ value, onClick }) {

    return (
        <button className="collapsing-button" onClick={onClick}>
            <span>
                &#11166;
            </span>
        </button>

    );
}
