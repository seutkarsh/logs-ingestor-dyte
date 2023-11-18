import logo from './images/dyte-logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);

    const handleSearch = async () => {
        try {
            const result = await axios.post('http://localhost:3000/api/search', {
                searchQuery: searchQuery,
                levelFilter:selectedLevel
            });
            setFilteredLogs(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="dyte-logo" />
        <h2>Log Ingestor Assignment</h2>
      </header>
        <div className="search-section">
            <div className="search-container">
                <div className='input-wrap'>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        name="log-search"
                        id="log-search"
                        placeholder="Search Logs"
                    />
                </div>

                <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                >
                    <option value="">-- Select Log Level --</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                    <option value="info">Info</option>
                </select>

                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
        {filteredLogs.length ? <ul >
            {filteredLogs.map((log) => (
                <li className="list-item"
                    key={log["_id"]}>
                    <p>level: {log._source.level}</p>
                    <p>level: {log._source.message}</p>
                    <p>level: {log._source.traceId}</p>
                    <p>level: {log._source.spanId}</p>
                </li>
            ))}
        </ul> : <div className="no-results">
            <h2>No Results Found</h2>
        </div>}

    </div>
  );
}

export default App;
