import { useState, useEffect } from 'react';
import './App.css';

interface TimezoneData {
  [key: string]: string | boolean | number | null;
}

function App() {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');
  const [selectedTimezoneDatetime, setSelectedTimezoneDatetime] = useState<string>('');

  async function fetchTimezones(): Promise<void> {
    const response  = await fetch('http://worldtimeapi.org/api/timezone');
    const data: string[] = await response.json();

    setTimezones(data);
  }

  async function fetchSelectedTimezoneData(timezone: string) {
    const response  = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
    const data: TimezoneData = await response.json();

    const datetime = new Date(data.datetime as string).toLocaleString();

    setSelectedTimezoneDatetime(datetime);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTimezone = event.target.value;

    setSelectedTimezone(selectedTimezone);
  }

  useEffect(() => {
    fetchTimezones();
  }, []);

  useEffect(() => {
    if (selectedTimezone) {
      fetchSelectedTimezoneData(selectedTimezone);

      const interval = setInterval(() => {
        fetchSelectedTimezoneData(selectedTimezone);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedTimezone]);

  return <>
    <select onChange={handleSelect}>
      {timezones.map((timezone: string) => {
        return <option key={timezone} value={timezone}>{timezone}</option>;
      })}
    </select>
    {selectedTimezoneDatetime && <div>{selectedTimezoneDatetime}</div>}
  </>;
}

export default App;
