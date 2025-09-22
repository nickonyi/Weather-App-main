const temperatureOptions = {
  celsius: "Celsius (°C)",
  fahrenheit: "Fahrenheit (°F)",
};

console.log(
  Object.entries(temperatureOptions).map(([label, value]) => [label, value])
);
