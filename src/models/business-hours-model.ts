interface BusinessHoursModel {
  hour_type: string;
  open: OpenHourModel[];
  is_open_now: boolean;
}

interface OpenHourModel {
  day: number;
  start: string;
  end: string;
  is_overnight: boolean;
}
