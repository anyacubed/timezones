import { DatetimeProps } from '../../types/interfaces';

function Datetime({ datetime }: DatetimeProps) {
  return datetime ? <div className='datetime'>{datetime}</div> : null;
}

export default Datetime;
