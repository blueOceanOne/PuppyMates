const toRadians = (degree) => {
  const oneDegree = Math.PI / 180;
  return oneDegree * degree;
};
const getDistanceFromLatLong = (lat1, long1, lat2, long2) => {
  const lat1Radian = toRadians(lat1);
  const long1Radian = toRadians(long1);
  const lat2Radian = toRadians(lat2);
  const long2Radian = toRadians(long2);

  const distanceLat = lat2Radian - lat1Radian;
  const distanceLong = long2Radian - long1Radian;

  let distance =
    Math.sin(distanceLat / 2) ** 2 +
    Math.cos(lat1Radian) * Math.cos(lat2Radian) * Math.sin(distanceLong / 2) ** 2;

  distance = 2 * Math.asin(Math.sqrt(distance));

  const radiusOfEarth = 3956; // in miles

  return distance * radiusOfEarth;
};

module.exports = getDistanceFromLatLong;
