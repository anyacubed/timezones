import { SelectProps } from '../../types/interfaces';
import './Select.css';

function Select({ timezones, onSelect }: SelectProps) {
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedTimezone = event.target.value;

    onSelect(selectedTimezone);
  }

  return <select onChange={handleSelect} className='select' defaultValue='Select'>
    <option value='Select' disabled>Select time zone</option>
    {timezones.map((timezone: string) => {
      return <option key={timezone} value={timezone}>{timezone}</option>;
    })}
  </select>
}

export default Select;
