import { useNavigate } from "react-router-dom"
import './Dashboard.css'

function History() {
  const navigate = useNavigate()

  const history = JSON.parse(sessionStorage.getItem("history")) || []
  const viewed  = JSON.parse(sessionStorage.getItem("viewed"))  || []

  return (
    <div className="dashboard">

      <h1>Search History</h1>

      {history.length === 0 ? (
        <p className="no-results">Nothing to show yet</p>
      ) : (
        <div className="cards-grid">
          {history.map((item, index) => (
            <div key={index} className="history-card">
              ✈ {item}
            </div>
          ))}
        </div>
      )}

      <h1>Recently Viewed Flights</h1>

      {viewed.length === 0 ? (
        <p className="no-results">Koi viewed flight nahi</p>
      ) : (
        <div className="cards-grid">
          {viewed.map((item, index) => (
            <div key={index} className="flight-card">

              <div className="card-top">
                <img src={item.airline_logo} alt="logo" className="airline-logo" />
                <h3 className="airline-name">{item.flights[0].airline}</h3>
                <span className="flight-number">{item.flights[0].flight_number}</span>
              </div>

              <div className="card-middle">
                <div className="time-info">
                  <p className="time">{item.flights[0].departure_airport.time.slice(11)}</p>
                  <p className="airport">{item.flights[0].departure_airport.id}</p>
                </div>
                <div className="duration-info">
                  <p className="duration">{item.flights[0].duration} mins</p>
                  <p className="arrow">──✈──</p>
                </div>
                <div className="time-info">
                  <p className="time">{item.flights[0].arrival_airport.time.slice(11)}</p>
                  <p className="airport">{item.flights[0].arrival_airport.id}</p>
                </div>
              </div>

              <div className="card-bottom">
                <p className="price">${item.price}</p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default History