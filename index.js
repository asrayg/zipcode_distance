const zipData = require('./csvjson.json');

function toRadians(angle) {
  return (angle * Math.PI) / 180;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getCoordinates(zip) {
  const location = zipData.find(entry => entry.zip_code === zip);
  if (!location) {
    throw new Error(`Zip code ${zip} not found.`);
  }
  return { latitude: location.latitude, longitude: location.longitude };
}

function getDistance(zip1, zip2, unit = 'km') {
  const { latitude: lat1, longitude: lon1 } = getCoordinates(zip1);
  const { latitude: lat2, longitude: lon2 } = getCoordinates(zip2);
  const distance = haversine(lat1, lon1, lat2, lon2);
  return unit === 'miles' ? distance * 0.621371 : distance;
}

function findClosestZip(zip) {
  const { latitude: lat1, longitude: lon1 } = getCoordinates(zip);
  let closestZip = null;
  let minDistance = Infinity;
  zipData.forEach(entry => {
    if (entry.zip_code !== zip) {
      const distance = haversine(lat1, lon1, entry.latitude, entry.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closestZip = entry.zip_code;
      }
    }
  });
  return closestZip;
}

function getZipCodesWithinRadius(zip, radius, unit = 'km') {
  const { latitude: lat1, longitude: lon1 } = getCoordinates(zip);
  const multiplier = unit === 'miles' ? 0.621371 : 1;
  const zipCodesInRange = zipData
    .filter(entry => {
      const distance = haversine(lat1, lon1, entry.latitude, entry.longitude) * multiplier;
      return distance <= radius;
    })
    .map(entry => entry.zip_code);
  return zipCodesInRange;
}

function getCityAndState(zip) {
  const location = zipData.find(entry => entry.zip_code === zip);
  if (!location) {
    throw new Error(`Zip code ${zip} not found.`);
  }
  return { city: location.city, state: location.state };
}

function isValidZip(zip) {
  return zipData.some(entry => entry.zip_code === zip);
}

function isDistanceInRange(zip1, zip2, range, unit = 'km') {
  const distance = getDistance(zip1, zip2, unit);
  return distance <= range;
}

function getBoundingBoxZips(zip, distance) {
  const { latitude: lat1, longitude: lon1 } = getCoordinates(zip);
  return zipData.filter(entry => {
    const distanceToZip = haversine(lat1, lon1, entry.latitude, entry.longitude);
    return distanceToZip <= distance;
  }).map(entry => entry.zip_code);
}

function getMidpoint(zip1, zip2) {
  const { latitude: lat1, longitude: lon1 } = getCoordinates(zip1);
  const { latitude: lat2, longitude: lon2 } = getCoordinates(zip2);
  return {
    latitude: (lat1 + lat2) / 2,
    longitude: (lon1 + lon2) / 2,
  };
}

function getZipSummary(zip) {
  const location = zipData.find(entry => entry.zip_code === zip);
  if (!location) throw new Error(`Zip code ${zip} not found.`);
  return {
    zip_code: zip,
    city: location.city,
    state: location.state,
    county: location.county,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

function sortZipsByProximity(baseZip, zipCodes) {
  const { latitude: lat1, longitude: lon1 } = getCoordinates(baseZip);
  return zipCodes.map(zip => {
    const { latitude: lat2, longitude: lon2 } = getCoordinates(zip);
    const distance = haversine(lat1, lon1, lat2, lon2);
    return { zip, distance };
  }).sort((a, b) => a.distance - b.distance);
}

function groupZipsByState() {
  return zipData.reduce((groups, entry) => {
    const state = entry.state;
    if (!groups[state]) groups[state] = [];
    groups[state].push(entry.zip_code);
    return groups;
  }, {});
}

function groupZipsByCounty() {
  return zipData.reduce((groups, entry) => {
    const county = entry.county;
    if (!groups[county]) groups[county] = [];
    groups[county].push(entry.zip_code);
    return groups;
  }, {});
}


module.exports = {
  getDistance,
  findClosestZip,
  getZipCodesWithinRadius,
  getCityAndState,
  isValidZip,
  isDistanceInRange,
  getBoundingBoxZips,
  getMidpoint,
  getZipSummary,
  sortZipsByProximity,
  groupZipsByState,
  groupZipsByCounty,
};
