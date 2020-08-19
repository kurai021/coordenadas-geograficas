import {Deck, _GlobeView as GlobeView} from '@deck.gl/core';
import {SolidPolygonLayer, GeoJsonLayer, ArcLayer, TextLayer} from '@deck.gl/layers';

const COUNTRIES = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line

const INITIAL_VIEW_STATE = {
    latitude: 20,
    longitude: 30,
    zoom: 1
  };

  export const deck = new Deck({
    views: new GlobeView(),
    canvas: 'globe',
    initialViewState: INITIAL_VIEW_STATE,
    controller: true,
    layers: [
      // A GeoJSON polygon that covers the entire earth
      // See /docs/api-reference/globe-view.md#remarks
      new SolidPolygonLayer({
        id: 'background',
        data: [
          // prettier-ignore
          [[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]
        ],
        opacity: 1,
        getPolygon: d => d,
        stroked: false,
        filled: true,
        getFillColor: [170,218,255]
      }),

      new SolidPolygonLayer({
        id: 'cancer',
        data: [
          // prettier-ignore
          {
              polygon: {
                  coordinates: [[-180,20],[-180,23],[-180,23],[180,23],[180,23],[180,20]]
              },
              name: "Trópico de Cáncer"
          }
        ],
        opacity: 1,
        getPolygon: d => d.polygon.coordinates,
        stroked: false,
        filled: true,
        getFillColor: [110,152,135],
        pickable: true,
        onClick: setTooltip
      }),

      new SolidPolygonLayer({
        id: 'capricornio',
        data: [
          // prettier-ignore
          {
              polygon: {
                  coordinates: [[-180,-20],[-180,-23],[-180,-23],[180,-23],[180,-23],[180,-20]],
              },
              name: "Tropico de Capricornio"
          }
        ],
        opacity: 1,
        getPolygon: d => d.polygon.coordinates,
        stroked: false,
        filled: true,
        getFillColor: [181,191,161],
        pickable: true,
        onClick: setTooltip
      }),

      new GeoJsonLayer({
        id: 'base-map',
        data: COUNTRIES,
        // Styles
        stroked: true,
        filled: true,
        lineWidthMinPixels: 2,
        getLineColor: [158,158,158],
        getFillColor: [171,206,131]
      }),

      new ArcLayer({
        id: "ecuador",
        data: [
            {
                from:{
                    coordinates: [90.00, 0]
                },
                to: {
                    coordinates: [-90.00, 0]
                },
                name: "Ecuador Geográfico"
            }
        ],
        getSourceColor: [104,116,232],
        getTargetColor: [104,116,232],
        getWidth: 10,
        getHeight: 0.05,
        getSourcePosition: d => d.from.coordinates,
        getTargetPosition: d => d.to.coordinates,
        getColor: d => d.color,
        pickable: true,
        onClick: setTooltip
      }),

      new ArcLayer({
        id: "ecuador2",
        data: [
            {
                from:{
                    coordinates: [-90.00, 0]
                },
                to: {
                    coordinates: [-270.00, 0]
                },
                name: "Ecuador Geográfico"
            }
        ],
        getSourceColor: [104,116,232],
        getTargetColor: [104,116,232],
        getWidth: 10,
        getHeight: 0.05,
        getSourcePosition: d => d.from.coordinates,
        getTargetPosition: d => d.to.coordinates,
        getColor: d => d.color,
        pickable: true,
        onClick: setTooltip
      }),
      
      new ArcLayer({
        id: "greenwich",
        data: [
            {
                from:{
                    coordinates: [0, 90]
                },
                to: {
                    coordinates: [0, -90]
                },
                name: "Meridiano de Greenwich"
            }
        ],
        getSourceColor: [255,100,100],
        getTargetColor: [255,100,100],
        getWidth: 10,
        getHeight: 0.05,
        getSourcePosition: d => d.from.coordinates,
        getTargetPosition: d => d.to.coordinates,
        getColor: d => d.color,
        pickable: true,
        onClick: setTooltip
      }),

      new ArcLayer({
        id: "greenwich2",
        data: [
            {
                from:{
                    coordinates: [0, -90]
                },
                to: {
                    coordinates: [0, -270]
                },
                name: "Meridiano de Greenwich"
            }
        ],
        getSourceColor: [255,100,100],
        getTargetColor: [255,100,100],
        getWidth: 10,
        getHeight: 0.05,
        getSourcePosition: d => d.from.coordinates,
        getTargetPosition: d => d.to.coordinates,
        getColor: d => d.color,
        pickable: true,
        onClick: setTooltip
      }),
      new TextLayer({
        id:"artico",
        data: [
          {position: [0, 90], text: 'Circulo polar Artico'}
        ],
        getPosition: d => d.position,
        getText: d => d.text,
      }),
      new TextLayer({
        id:"antartico",
        data: [
          {position: [0, -90], text: 'Circulo polar Antartico'}
        ],
        getPosition: d => d.position,
        getText: d => d.text,
      }),
      new TextLayer({
        id:"norte",
        data: [
          {position: [-90, 10], text: 'Hemisferio Norte'}
        ],
        getPosition: d => d.position,
        getText: d => d.text,
        billboard: false,
        getAngle: 180
      }),
      new TextLayer({
        id:"sur",
        data: [
          {position: [-90, -10], text: 'Hemisferio Sur'}
        ],
        getPosition: d => d.position,
        getText: d => d.text,
        billboard: false,
        getAngle: 180
      }),
      new TextLayer({
        id:"occidente",
        data: [
          {position: [-30, 10], text: 'Hemisferio Occidental'}
        ],
        getPosition: d => d.position,
        getText: d => d.text,
        billboard: false,
        getAngle: 180
      }),
      new TextLayer({
        id:"oriente",
        data: [
          {position: [30, 10], text: 'Hemisferio Oriental'}
        ],
        getPosition: d => d.position,
        getText: d => d.text,
        billboard: false,
        getAngle: 180
      })

    ]
  });

  function setTooltip({x, y, object}) {
    const tooltip = document.getElementById('tooltip');
    if (object) {
      tooltip.style.display = 'block';
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      tooltip.innerHTML = '<h2>'+ object.name + '</h2>';
    } else {
      tooltip.style.display = 'none';
    }
}