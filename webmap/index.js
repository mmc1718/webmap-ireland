const map = new maplibregl.Map({
    container: "map",
    style: "http://localhost:8080/styles/natural/style.json", // stylesheet location
    center: [-8, 53], // starting position [lng, lat]
    zoom: 7, // starting zoom
    minZoom: 6,
    maxBounds: [
        [-17.7, 46.6],
        [2.7, 58.6],
    ],
});

function setUpMap() {
  map.addSource("peat_bogs", {
      type: "geojson",
      data: "data/ireland_peat_bogs_2012.geojson",
  });
  map.addSource("lost_bogs", {
      type: "geojson",
      data: "data/peat_bog_loss.geojson",
      // required for smooth rendering while zooming
      tolerance: 0,
  });

  map.addLayer({
      id: "peat_bogs",
      type: "fill",
      source: "peat_bogs",
      paint: {
          "fill-color": "#92a94a",
          "fill-opacity": 0.4,
      },
  });

  map.addLayer({
      id: "lost_bogs",
      type: "fill",
      source: "lost_bogs",
      paint: {
          "fill-color": "#744333",
          "fill-opacity": 0.4,
      },
  })
};
map.on("load", setUpMap);

  const legendInfo = {
      lost_bogs: "Lost Peat Bog (Derived from Corine Land Cover (CLC) 2000, Version 2020_20u1)",
      peat_bogs: "Peat Bog (Corine Land Cover (CLC) 2012, Version 2020_20u1)",
  };
  map.addControl(
      new MaplibreLegendControl.MaplibreLegendControl(legendInfo, {
          showDefault: true,
          showCheckbox: true,
          onlyRendered: false,
          reverseOrder: true,
          title: "Peat Bog loss in Ireland Between 2000 and 2012",
      }),
      "top-right"
  );