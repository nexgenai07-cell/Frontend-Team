import "./moviecard.css"; // styles for movie card

function MovieCard(props) {
    return (
        <div className="card"> {/* single movie card container */}
            <img src={props.poster} alt={props.name} /> {/* movie poster image */}
            <h2>{props.name}</h2> {/* movie title */}
            <p>⭐ {props.rating}</p> {/* movie rating */}
        </div>
    )
}
export default MovieCard; // exporting component for reuse