import React, { Component } from 'react';
import './App.css';
import * as topojson from 'topojson';
// import twVillage from './assets/tw-village-topo';
// import twTown from './assets/tw-town-topo';
// import twCounty from './assets/tw-county-topo';
// import twVillage from './assets/taiwan_village.topo';
// import twTown from './assets/taiwan_town.topo';
// import twCounty from './assets/taiwan_county.topo';
import twVillage from './assets/tw-village.topo';
import twTown from './assets/tw-town.topo';
import twCounty from './assets/tw-county.topo';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import { geoPath, geoMercator } from 'd3-geo';
import { saveSvgAsPng } from 'save-svg-as-png';
import throttle from 'lodash.throttle';

export default class Map extends Component {
  constructor(props) {
    super(props);

    // this.topoVillage = topojson.feature(twVillage, twVillage.objects.tracts);
    // this.topoTown = topojson.feature(twTown, twTown.objects.town);
    // this.topoCounty = topojson.feature(twCounty, twCounty.objects.counties);

    // this.topoVillage = topojson.feature(twVillage, twVillage.objects.taiwan_village);
    // this.topoTown = topojson.feature(twTown, twTown.objects.taiwan);
    // this.topoCounty = topojson.feature(twCounty, twCounty.objects.layer1);


    this.topoVillage = topojson.feature(twVillage, twVillage.objects.village);
    this.topoTown = topojson.feature(twTown, twTown.objects.town);
    this.topoCounty = topojson.feature(twCounty, twCounty.objects.county);

    this.selectedCounty = {
      selection: null,
      element: null
    };
    this.selectedTown = {
      selection: null,
      element: null
    };
    this.selectedVillage = {
      selection: null,
      element: null
    };
    this.currentViewport = {
      x: 480,
      y: 480,
      w: 960
    };
    const width = (document.body.clientWidth / 3) * 2 - 10;
    const height = document.body.clientHeight;

    this.zoom = d3.zoom().on('zoom', this.zoomed);
    const prj = geoMercator().center([121, 23.9]).translate([width / 2, height / 2]).scale(10000);
    this.path = geoPath().projection(prj)
    this.state = {
      city: '',
      selectedCity: '',
      topo: {
        features: []
      },
      width,
      height,
      center: [width / 2, height / 2]
    }
  }
  handleCityPress = (properties) => {
    console.log(properties);
    this.setState({
      city: properties.name,
      selectedCity: properties.COUNTYSN,
    });
  }
  shouldComponentUpdate() {
    // return false
    return false
  }

  componentDidMount() {
    const { center } = this.state;
    const { setDatas } = this.props;
    // var width = document.body.clientWidth
    // var height = document.body.clientHeight
    // var center = [width / 2, height / 2]
    //[121, 23.9]
    const prj = geoMercator().center([121, 24]).translate(center).scale(10000);

    // this.renderCounty(prj);
    // this.renderTown(prj);
    // this.renderVillage(prj);
    const counties = [];
    this.topoCounty.features.forEach(c => {
      const { COUNTYNAME, COUNTYCODE } = c.properties;
      counties.push({
        name: COUNTYNAME,
        code: COUNTYCODE
      })
    });
    const towns = [];
    this.topoTown.features.forEach(t => {
      const { TOWNNAME, COUNTYNAME, TOWNCODE } = t.properties;
      towns.push({
        name: TOWNNAME,
        countyName: COUNTYNAME,
        code: TOWNCODE
      })
    });
    const villages = [];
    this.topoVillage.features.forEach(v => {
      const { VILLNAME, TOWNNAME, COUNTYNAME, VILLCODE } = v.properties;
      villages.push({
        name: VILLNAME,
        townName: TOWNNAME,
        countyName: COUNTYNAME,
        code: VILLCODE
      })
    });
    setDatas({
      counties,
      towns,
      villages
    });

    select(this.mapRef)
      .on('wheel', throttle(this.wheelEvent, 400));
  }
  renderCounty = (prj) => {
    const { height, center } = this.state;
    const { setCounties } = this.props;
    const path = geoPath().projection(prj);
    const counties = [];
    this.topoCounty.features.forEach(c => {
      counties.push(c)
    });
    setCounties(counties)
    select(this.mapRef)
      // .style('z-index', '0')
      // .append('g')
      // .attr('class', 'countyContainer')
      // // .attr('transform', 'translate(' + (center[0] - 480 * ((height / 960) * 0.8)) + ',' + (center[1] - 480 * ((height / 960) * 0.8)) + ')scale(' + (height / 960) * 0.8 + ')')
      // .selectAll('path')
      // .data(this.topoCounty.features)
      // .enter()
      // .append('g')
      // .attr('class', 'county')
      // .attr('id', (d) => d.properties.COUNTYNAME)
      // .attr('stroke-width', 0.3)
      // .attr('stroke', 'black')
      // .append('path')
      // .attr('class', 'county')
      // .attr('d', path)
      // .attr('fill', '#FEFEE9')
      .select('g.countyContainer')
      .selectAll('path')
    // .on('mouseover', this.renderCountyInfo)
    // .on('click', (county) => {
    //   // console.log(county)
    //   this.clearSelectedCounty();

    //   this.zoomInSelectedCounty(county);
    // });
  }
  renderCountyInfo = (d) => {
    const { setInfo } = this.props;
    console.log(d);
    // setInfo({
    //   name: d.properties.COUNTYNAME
    // });
  }
  renderTown = (prj) => {
    const { height, center } = this.state;
    const path = geoPath().projection(prj);
    // select(this.townRef)
    //   .style('z-index', '-1')

    select(this.mapRef)
    // .append('g')
    // .attr('class', 'townContainer')
    // // .attr('transform', 'translate(' + (center[0] - 480 * ((height / 960) * 0.8)) + ',' + (center[1] - 480 * ((height / 960) * 0.8)) + ')scale(' + (height / 960) * 0.8 + ')')
    // .selectAll('path')
    // .data(this.topoTown.features)
    // .enter()
    // .append('g')
    // .attr('class', 'town')
    // // .attr('id', (d) => d.properties.name)
    // .attr('id', (d) => d.properties.TOWNNAME)
    // .attr('data-county', (d) => d.properties.COUNTYNAME)
    // .attr('stroke-width', 0.3)
    // .attr('stroke', 'pink')
    // .style('display', 'none')
    // .style('opacity', 0)
    // .append('path')
    // .attr('class', 'town')
    // .attr('d', path)
    // .attr('fill', '#FEFEE9')
    // .on('mouseover', this.renderTownInfo)
    // .on('click', (town) => {

    //   this.clearSelectedTown();
    //   this.zoomInSelectedTown(town)
    // });
  }
  renderTownInfo = (d) => {
    const { setInfo } = this.props;
    const { COUNTYNAME, TOWNNAME } = d.properties;
    setInfo({
      name: `${COUNTYNAME}${TOWNNAME}`
    });
  }
  renderVillage = (prj) => {
    const { height, center } = this.state;
    const path = geoPath().projection(prj);
    // select(this.townRef)
    //   .style('z-index', '-1')

    // select(this.mapRef)
    //   .append('g')
    //   .attr('class', 'villageContainer')
    //   // .attr('transform', 'translate(' + (center[0] - 480 * ((height / 960) * 0.8)) + ',' + (center[1] - 480 * ((height / 960) * 0.8)) + ')scale(' + (height / 960) * 0.8 + ')')
    //   .selectAll('path')
    //   .data(this.topoVillage.features)
    //   .enter()
    //   .append('g')
    //   .attr('class', 'village')
    //   // .attr('id', (d) => d.properties.name)
    //   .attr('id', (d) => d.properties.VILLNAME)
    //   .attr('data-town', (d) => d.properties.TOWNNAME)
    //   .attr('data-county', (d) => d.properties.COUNTYNAME)
    //   .attr('stroke-width', 0.3)
    //   .attr('stroke', 'skyblue')
    //   .style('display', 'none')
    //   .style('opacity', 0)
    //   .append('path')
    //   .attr('class', 'town')
    //   .attr('d', path)
    //   .attr('fill', '#FEFEE9')
    //   .on('mouseover', this.renderVillageInfo)
  }
  renderVillageInfo = (d) => {
    const { setInfo } = this.props;
    const { COUNTYNAME, TOWNNAME, VILLNAME } = d.properties;
    setInfo({
      name: `${COUNTYNAME}${TOWNNAME}${VILLNAME}`
    });
  }
  /**
   * zoom out 所有 
   */
  clearSelectedCounty = () => {
    if (this.selectedCounty.selection !== null) {
      const tmpSelectedCounty = this.selectedCounty.selection
      this.selectedCounty.selection
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', () => {
          tmpSelectedCounty
            .style('display', 'none')
        });
    }
    if (this.selectedTown.selection !== null) {
      const tmpSelectedTown = this.selectedTown.selection
      this.selectedTown.selection
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', (town) => {
          tmpSelectedTown
            .style('display', 'none')
        });
    }
  }
  clearSelectedTown = () => {
    if (this.selectedTown.selection !== null) {
      const tmpSelectedTown = this.selectedTown.selection
      this.selectedTown.selection
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', () => {
          tmpSelectedTown
            .style('display', 'none')
        });
    }
    if (this.selectedVillage.selection !== null) {
      const tmpSelectedVillage = this.selectedVillage.selection
      tmpSelectedVillage
        .select('path')
        .attr('fill', '#FEFEE9')
    }
  }
  clearSelectedVillage = () => {
    if (this.selectedVillage.selection !== null) {
      const tmpSelectedVillage = this.selectedVillage.selection
      tmpSelectedVillage
        .select('path')
        .attr('fill', '#FEFEE9')
    }
  }
  /**
   * 點擊 縣市 進入 鄉鎮市 Level 的 method
   * 
   */
  zoomInSelectedCounty = (county, animate = true) => {
    if (county === null) {
      return;
    }
    const { COUNTYNAME } = county.properties;
    this.clearSelectedCounty();
    this.selectedCounty.element = county

    this.selectedCounty.selection = select(this.mapRef)
      .select('g.townContainer')
      .selectAll(`g[data-county=${COUNTYNAME}]`);

    this.selectedCounty.selection
      .style('display', 'block')
      .transition()
      .duration(500)
      .style('opacity', 1);

    this.selectedTown = {
      selection: null,
      element: null
    };

    if (animate) {
      this.zoomAnimate(county)
    }
  }
  /**
   * 點擊 鄉鎮市 進入 村里 Level 的 method
   *
   */
  zoomInSelectedTown = (town, animate = true) => {
    if (town === null) {
      return;
    }
    const { TOWNNAME, COUNTYNAME } = town.properties;

    this.clearSelectedTown()

    this.selectedTown.element = town;
    this.selectedTown.selection = select(this.mapRef)
      .select('g.villageContainer')
      .selectAll(`g[data-town=${TOWNNAME}][data-county=${COUNTYNAME}]`);

    this.selectedTown.selection
      .style('display', 'block')
      .transition()
      .duration(500)
      .style('opacity', 1);

    if (animate) {
      this.zoomAnimate(town)
    }
  }
  zoomInSelectedVillage = (village) => {
    if (village === null) {
      return;
    }
    const { VILLNAME, TOWNNAME, COUNTYNAME } = village.properties;
    if (VILLNAME === '') {
      return;
    }

    this.clearSelectedVillage()

    this.selectedVillage.element = village;
    this.selectedVillage.selection = select(this.mapRef)
      .select('g.villageContainer')
      .select(`g#${VILLNAME}[data-town=${TOWNNAME}][data-county=${COUNTYNAME}]`)

    this.selectedVillage.selection
      .select('path')
      .attr('fill', 'skyblue')
      .transition()
      .duration(500);

  }
  /**
   * 處理zoom in/out animation 的 method
   * level: 1 => 縣市層級, 2 => 鄉鎮市村里層級
   */
  zoomAnim = (target, level) => {
    const { height, center } = this.state;

    const shape = geoPath().bounds(target)
    const x = this.currentViewport.x;
    const y = this.currentViewport.y;
    const w = this.currentViewport.w;


    let from = [];
    let to = [];
    if (level === 2) {
      this.currentViewport.x = (shape[1][0] + shape[0][0]) / 2;
      this.currentViewport.y = (shape[1][1] + shape[0][1]) / 2;
      this.currentViewport.w = Math.max((shape[1][1] - shape[0][1]), (shape[1][0] - shape[0][0]));
      from = [x, y, w]
      to = [this.currentViewport.x, this.currentViewport.y, this.currentViewport.w]
    } else {
      this.currentViewport.x = 480;
      this.currentViewport.y = 480;
      this.currentViewport.w = 960;
      from = [x, y, w]
      to = [this.currentViewport.x, this.currentViewport.y, this.currentViewport.w]
    }
    var i = d3.interpolateZoom(from, to);
    select(this.mapRef)
      .selectAll('g.countyContainer, g.townContainer, g.villageContainer')
      .transition()
      .duration(750)
      .attrTween('transform', function () {
        return function (t) {
          return transform(i(t));
        };
      })

    function transform(p) {
      let k = (height / p[2]) * 0.8;
      return 'translate(' + (center[0] - p[0] * k) + ',' + (center[1] - p[1] * k) + ')scale(' + k + ')';
    }
  }
  zoomAnimate = (target) => {
    const { width, height, center } = this.state;
    var bounds = this.path.bounds(target),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      vw = Math.max((bounds[1][1] - bounds[0][1]), (bounds[1][0] - bounds[0][0])),
      // scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))) * 0.8,
      scale = (height / vw) * 0.7,
      // translate = [width / 2 - scale * x, height / 2 - scale * y],
      translate = [center[0] - x * scale, center[1] - y * scale];

    select(this.mapRef)
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
  }
  zoomed = () => {
    select(this.mapRef)
      .selectAll('g.countyContainer, g.townContainer, g.villageContainer')
      .attr('transform', d3.event.transform);
  }
  /**
   * Zoom Out 至初始視圖
   */
  zoom_fit = () => {
    this.clearSelectedCounty();
    // this.zoomAnim(null, 1);
    select(this.mapRef)
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
    this.selectedCounty = {
      selection: null,
      element: null
    };
    this.selectedCounty = {
      selection: null,
      element: null
    };
  }
  zoom_out = () => {
    if (this.selectedTown.element !== null) {
      this.zoomInSelectedCounty(this.selectedCounty.element)
    } else if (this.selectedCounty.element !== null) {
      this.zoom_fit()
    }
  }
  wheelEvent = () => {
    if (d3.event === null) {
      return;
    }
    const direction = d3.event.wheelDelta < 0 ? 'down' : 'up';
    if (direction === 'up') {
      this.zoom_out()
    }
  }
  exportToPNG = () => {
    saveSvgAsPng(this.mapRef, 'map.png')
  }
  goto_county = (countyName) => {
    const targetCounty = this.topoCounty.features.filter(c => c.properties.COUNTYNAME === countyName);
    this.zoomInSelectedCounty(targetCounty[0]);
  }
  goto_township = (countyName, townName) => {
    const targetCounty = this.topoCounty.features.filter(c => c.properties.COUNTYNAME === countyName);

    const targetTown = this.topoTown.features.filter(t => {
      const { COUNTYNAME, TOWNNAME } = t.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName;
    });
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
  }
  goto_village = (countyName, townName, villageName) => {
    const targetCounty = this.topoCounty.features.filter(c => c.properties.COUNTYNAME === countyName);
    const targetTown = this.topoTown.features.filter(t => {
      const { COUNTYNAME, TOWNNAME } = t.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName;
    });
    const targetVillage = this.topoVillage.features.filter(v => {
      const { COUNTYNAME, TOWNNAME, VILLNAME } = v.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName && VILLNAME === villageName;
    });
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
    this.zoomInSelectedVillage(targetVillage[0])
  }
  render() {
    const { setInfo } = this.props;
    return (
      <svg ref={ref => this.mapRef = ref} width={'100%'} height={'100%'}>
        <g className='countyContainer'>
          {
            this.topoCounty.features.map((county) => {
              const { COUNTYNAME, COUNTYCODE } = county.properties;
              return (
                <g
                  key={COUNTYCODE}
                  id={COUNTYNAME}
                  className='county'
                >
                  <path
                    fill='#FEFEE9'
                    stroke='#777'
                    strokeWidth={0.2}
                    d={this.path(county)}
                    onMouseOver={() => {
                      setInfo({
                        name: COUNTYNAME
                      });
                    }}
                    onClick={() => {
                      // console.log(this)
                      this.clearSelectedCounty();

                      this.zoomInSelectedCounty(county);
                    }}
                  />
                </g>
              )
            })
          }
        </g>
        <g className='townContainer'>
          {
            this.topoTown.features.map((town) => {
              const { TOWNNAME, COUNTYNAME, TOWNCODE } = town.properties;
              return (
                <g
                  key={TOWNCODE}
                  id={TOWNNAME}
                  data-county={COUNTYNAME}
                  className='town'
                  style={{
                    opacity: 0,
                    display: 'none'
                  }}
                >
                  <path
                    fill='#FEFEE9'
                    stroke='pink'
                    strokeWidth={0.2}
                    d={this.path(town)}
                    onMouseOver={() => {
                      setInfo({
                        name: `${COUNTYNAME}${TOWNNAME}`
                      });
                    }}
                    onClick={() => {
                      this.clearSelectedTown();
                      this.zoomInSelectedTown(town)
                    }}
                  />
                </g>
              )
            })
          }
        </g>
        <g className='villageContainer'>
          {
            this.topoVillage.features.map((village) => {
              const { VILLNAME, TOWNNAME, COUNTYNAME, VILLCODE } = village.properties;
              return (
                <g
                  key={VILLCODE}
                  id={VILLNAME}
                  data-town={TOWNNAME}
                  data-county={COUNTYNAME}
                  className='village'
                  style={{
                    opacity: 0,
                    display: 'none',
                  }}
                >
                  <path
                    fill='#FEFEE9'
                    stroke='skyblue'
                    strokeWidth={0.2}
                    d={this.path(village)}
                    onMouseOver={() => {
                      setInfo({
                        name: `${COUNTYNAME}${TOWNNAME}${VILLNAME}`
                      });
                    }}
                    onClick={() => {
                      this.clearSelectedVillage();
                      this.zoomInSelectedVillage(village)
                    }}
                  />
                </g>
              )
            })
          }
        </g>
      </svg>
    );
  }
}
