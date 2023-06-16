export interface TimezoneData {
  [key: string]: string | boolean | number | null;
}

export interface SelectProps {
  timezones: string[];
  onSelect: (selectedTimezone: string) => void;
}

export interface DatetimeProps {
  datetime: string;
}
