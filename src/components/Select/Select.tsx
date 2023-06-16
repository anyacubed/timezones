import { SelectProps } from '../../types/interfaces';
import './Select.css';

function Select({ timezones, onSelect }: SelectProps) {
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTimezone = event.target.value;

    onSelect(selectedTimezone);
  }

  return <select onChange={handleSelect} className="select">
    {timezones.map((timezone: string) => {
      return <option key={timezone} value={timezone}>{timezone}</option>;
    })}
  </select>
}

export default Select;
