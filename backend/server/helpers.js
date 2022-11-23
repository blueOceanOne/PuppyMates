module.exports = {
  coordToMilesConverter: (coord1, coord2) => {
    const latDiff = Math.abs(coord1[0] - coord2[0]);
    const longDiff = Math.abs(coord1[1] - coord2[1]);
    const latMiles = latDiff * 69;
    const longMiles = longDiff * 54.6;
    return Math.sqrt((latMiles * latMiles) + (longMiles * longMiles));
  },
}