interface Cuaca {
  queryCost: number;
  latitude: String;
  longitude: String;
  resolvedAddress: String;
  address: String;
  timezone: String;
  tzoffset: String;
  description: String;
  days: Days;
}

interface Days {
  datetime: String;
  tempmax: String;
  tempmin: String;
  temp: String;
  conditions: String;
  description: String;
  icon: String;
  hours: Hours;
}

interface Hours {
  datetime: String;
  temp: String;
  feelslike: String;
  humidity: String;
  dew: String;

  conditions: String;
  icon: String;
}
