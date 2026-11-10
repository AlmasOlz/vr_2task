// The article's Magnemite and classic GPS components. Only the anchor is adapted:
// choose a fixed nearby GPS point once, instead of requiring the user to be in Rome.
(function () {
  'use strict';
  let anchored = false;
  window.addEventListener('gps-camera-origin-coord-set', function () {
    if (anchored) return;
    const gps = document.querySelector('[gps-camera]').components['gps-camera'];
    if (!gps || !gps.originCoords) return;
    anchored = true;
    const origin = gps.originCoords;
    const heading = Number.isFinite(gps.heading) ? gps.heading : 0;
    const bearing = heading * Math.PI / 180;
    const latitude = origin.latitude + 8 * Math.cos(bearing) / 111320;
    const longitude = origin.longitude + 8 * Math.sin(bearing) /
      (111320 * Math.max(0.01, Math.cos(origin.latitude * Math.PI / 180)));
    const model = document.getElementById('magnemite');
    model.setAttribute('gps-entity-place', { latitude, longitude });
    model.setAttribute('visible', true);
  });
}());
