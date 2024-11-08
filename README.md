# Zipcode Distance

`zipcode-distance` is an npm library for calculating the distance between two zip codes, determining proximity within a range, and retrieving additional zip code-related data. This library uses geolocation data to help developers work with zip code-based distances in various applications.

## Features

- Calculate the distance between two zip codes.
- Check if two zip codes are within a specified distance range.
- Find the nearest zip code to a given zip.
- List all zip codes within a certain radius.
- Retrieve city and state information by zip code.
- Sort zip codes by proximity to a given zip.
- Group zip codes by state or county.

## Installation

Install the package via npm:

```bash
npm install zipcode-distance
```

## Usage

Import the library in your project and use the available functions as shown below.

### 1. Calculate Distance Between Two Zip Codes

```javascript
const zipcodeDistance = require('zipcode-distance');

const distance = zipcodeDistance.getDistance(90210, 10001, 'miles');
console.log(`Distance: ${distance} miles`);
```

### 2. Check if Two Zip Codes Are Within a Specified Range

```javascript
const isWithinRange = zipcodeDistance.isDistanceInRange(90210, 10001, 50, 'miles');
console.log(`Within range: ${isWithinRange}`);
```

### 3. Find Closest Zip Code to a Given Zip

```javascript
const closestZip = zipcodeDistance.findClosestZip(90210);
console.log(`Closest Zip: ${closestZip}`);
```

### 4. List Zip Codes Within Radius

```javascript
const zipsInRange = zipcodeDistance.getZipCodesWithinRadius(90210, 100, 'miles');
console.log(`Zip Codes within 100 miles: ${zipsInRange}`);
```

### 5. Get City and State by Zip Code

```javascript
const location = zipcodeDistance.getCityAndState(90210);
console.log(`City: ${location.city}, State: ${location.state}`);
```

### 6. Sort a List of Zip Codes by Proximity

```javascript
const sortedZips = zipcodeDistance.sortZipsByProximity(90210, [10001, 30301, 33101]);
console.log(`Sorted Zip Codes by Proximity:`, sortedZips);
```

### 7. Group Zip Codes by State

```javascript
const zipsByState = zipcodeDistance.groupZipsByState();
console.log(`Zip Codes by State:`, zipsByState);
```

### 8. Group Zip Codes by County

```javascript
const zipsByCounty = zipcodeDistance.groupZipsByCounty();
console.log(`Zip Codes by County:`, zipsByCounty);
```

## Data Source

The library uses a JSON file (`csvjson.json`) that contains zip codes along with their corresponding latitude, longitude, city, state, and county information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have improvements or new feature ideas.

---

Feel free to reach out if you encounter any issues or have questions about using the library.

