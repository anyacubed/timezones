import { useState, useEffect } from 'react';
import { TimezoneData } from '../types/interfaces';
import Select from '../components/Select/Select';
import Datetime from '../components/Datetime/Datetime';
import './App.css';

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

  function handleSelect(selectedTimezone: string) {
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

  return <div className='app'>
    <Select timezones={timezones} onSelect={handleSelect} />
    <Datetime datetime={selectedTimezoneDatetime} />
  </div>;
}

export default App;
