import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import * as topojson from 'topojson';
import twVillage from './assets/tw-village-topo';
import twTown from './assets/tw-town-topo';
import twCounty from './assets/tw-county-topo';
// import twVillage from './assets/taiwan_village.topo';
// import twTown from './assets/taiwan_town.topo';
// import twCounty from './assets/taiwan_county.topo';
import * as d3 from "d3";
import { select } from 'd3-selection';
import { geoPath, geoMercator } from 'd3-geo';
import { saveSvgAsPng } from 'save-svg-as-png';
import throttle from 'lodash.throttle';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.topoVillage = topojson.feature(twVillage, twVillage.objects.tracts);
    this.topoTown = topojson.feature(twTown, twTown.objects.town);
    this.topoCounty = topojson.feature(twCounty, twCounty.objects.counties);
    this.selectedCounty = {
      selection: null,
      element: null
    };
    this.selectedTown = {
      selection: null,
      element: null
    };
    this.currentViewport = {
      x: 480,
      y: 480,
      w: 960
    };
    const width = (document.body.clientWidth / 3) * 2;
    const height = document.body.clientHeight;
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
    return true
  }
  // componentDidMount() {
  //   // console.log(topoTown)
  //   console.log('====================================');
  //   console.log(twVillage);
  //   console.log(twTown);
  //   console.log(twCounty);
  //   console.log('====================================');
  //   // this.setState({
  //   //   topo: topojson.feature(twTopo, twTopo.objects.taiwan)
  //   // })
  //   var width = document.body.clientWidth
  //   var height = document.body.clientHeight
  //   var center = [width / 2, height / 2]
  //   const prj = geoMercator().center([121, 23.9]).scale(10000);

  //   const path = geoPath().projection(prj);

  //   // const topoVillage = topojson.feature(twVillage, twVillage.objects.tracts);
  //   // const topoTown = topojson.feature(twTown, twTown.objects.town)
  //   // const topoCounty = topojson.feature(twCounty, twCounty.objects.counties)

  //   const topoVillage = topojson.feature(twVillage, twVillage.objects.taiwan_village);
  //   const topoTown = topojson.feature(twTown, twTown.objects.taiwan)
  //   const topoCounty = topojson.feature(twCounty, twCounty.objects.layer1)
  //   // console.log(topoTown)
  //   select(this.mapRef)
  //     .append('g')
  //     .attr('class', 'mapContainer')
  //     .selectAll('path')
  //     .data(topoCounty.features)
  //     .enter()
  //     .append('g')
  //     .attr('id', (d) => d.properties.name)
  //     .attr('strokeWidth', 1)
  //     .attr('stroke', 'black')
  //     .append('path')
  //     .attr('class', 'county')
  //     .attr('d', path)
  //     .attr('fill', '#FEFEE9')
  //     .on('click', (d) => {
  //       console.log(d.properties)
  //       const { name } = d.properties;

  //       select(this.mapRef)
  //         .selectAll('.selected')
  //         .classed('selected', false)
  //         .attr('strokeWidth', 1)
  //         .attr('stroke', 'black')
  //         .selectAll('g')
  //         .remove()

  //       const g = select(this.mapRef)
  //         .select(`g#${name}`)
  //       g
  //         .classed('selected', true)
  //         .attr('strokeWidth', 0.1)
  //         .attr('stroke', 'pink')
  //         .selectAll('path')
  //         .data(topoTown.features.filter(t => t.properties.C_Name === name))
  //         .enter()
  //         .append('g')
  //         .attr('id', (d) => d.properties.T_UID)
  //         .attr('strokeWidth', 0.1)
  //         .attr('stroke', 'pink')
  //         .append('path')
  //         .attr('class', 'town')
  //         .attr('d', path)
  //         .attr('fill', '#FEFEE9')


  //       var b = path.bounds(d)
  //       select(this.mapRef)
  //       select('g')
  //         .transition().duration(750).attr("transform",
  //           "translate(" + prj.translate() + ")"
  //           + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
  //           + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
  //     });
  // }
  componentDidMount() {

    var width = document.body.clientWidth
    var height = document.body.clientHeight
    var center = [width / 2, height / 2]
    const prj = geoMercator().center([121, 23.9]);

    this.renderCounty();
    this.renderTown();
    this.renderVillage();
    select(this.mapRef)
      .on('wheel', throttle(this.wheelEvent, 400));
  }
  renderCounty = () => {
    const { height, center } = this.state;
    const { setCounties } = this.props;
    const path = geoPath();
    const counties = [];
    this.topoCounty.features.forEach(c => {
      counties.push(c)
    });
    setCounties(counties)
    select(this.mapRef)
      .style('z-index', '0')
      .append('g')
      .attr('class', 'countyContainer')
      .attr("transform", "translate(" + (center[0] - 480 * ((height / 960) * 0.8)) + "," + (center[1] - 480 * ((height / 960) * 0.8)) + ")scale(" + (height / 960) * 0.8 + ")")
      .selectAll('path')
      .data(this.topoCounty.features)
      .enter()
      .append('g')
      .attr('class', 'county')
      .attr('id', (d) => d.properties.name)
      .attr('stroke-width', 0.3)
      .attr('stroke', 'black')
      .append('path')
      .attr('class', 'county')
      .attr('d', path)
      .attr('fill', '#FEFEE9')
      .on('mouseover', this.renderCountyInfo)
      .on('click', (county) => {
        // console.log(county)
        this.clearSelectedCounty();

        this.zoomInSelectedCounty(county)
      });
  }
  renderCountyInfo = (d) => {
    const { setInfo } = this.props;
    setInfo(d.properties);
  }
  renderTown = () => {
    const { height, center } = this.state;
    const path = geoPath();
    // select(this.townRef)
    //   .style('z-index', '-1')

    select(this.mapRef)
      .append('g')
      .attr('class', 'townContainer')
      .attr("transform", "translate(" + (center[0] - 480 * ((height / 960) * 0.8)) + "," + (center[1] - 480 * ((height / 960) * 0.8)) + ")scale(" + (height / 960) * 0.8 + ")")
      .selectAll('path')
      .data(this.topoTown.features)
      .enter()
      .append('g')
      .attr('class', 'town')
      .attr('id', (d) => d.properties.name)
      .attr('stroke-width', 0.3)
      .attr('stroke', 'pink')
      .style('display', 'none')
      .style('opacity', 0)
      .append('path')
      .attr('class', 'town')
      .attr('d', path)
      .attr('fill', '#FEFEE9')
      .on('mouseover', this.renderTownInfo)
      .on('click', (town) => {

        this.clearSelectedTown();
        this.zoomInSelectedTown(town)
      });
  }
  renderTownInfo = (d) => {
    const { setInfo } = this.props;
    setInfo(d.properties);
  }
  renderVillage = () => {
    const { height, center } = this.state;
    const path = geoPath();
    // select(this.townRef)
    //   .style('z-index', '-1')

    select(this.mapRef)
      .append('g')
      .attr('class', 'villageContainer')
      .attr("transform", "translate(" + (center[0] - 480 * ((height / 960) * 0.8)) + "," + (center[1] - 480 * ((height / 960) * 0.8)) + ")scale(" + (height / 960) * 0.8 + ")")
      .selectAll('path')
      .data(this.topoVillage.features)
      .enter()
      .append('g')
      .attr('class', 'town')
      .attr('id', (d) => d.properties.name)
      .attr('stroke-width', 0.3)
      .attr('stroke', 'skyblue')
      .style('display', 'none')
      .style('opacity', 0)
      .append('path')
      .attr('class', 'town')
      .attr('d', path)
      .attr('fill', '#FEFEE9')
      .on('mouseover', this.renderVillageInfo)
  }
  renderVillageInfo = (d) => {
    const { setInfo } = this.props;
    setInfo(d.properties);
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
        .on('end', (town) => {
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
        .on('end', (town) => {
          tmpSelectedTown
            .style('display', 'none')
        });
    }
  }
  /**
   * 點擊 縣市 進入 鄉鎮市 Level 的 method
   * 
   */
  zoomInSelectedCounty = (county) => {
    const { name } = county.properties;
    this.clearSelectedCounty();
    this.selectedCounty.element = county
    this.selectedCounty.selection = select(this.mapRef)
      .select('g.townContainer')
      .selectAll('g')
      .filter(t => t.properties.name.includes(name));

    this.selectedCounty.selection
      .style('display', 'block')
      .transition()
      .duration(500)
      .style('opacity', 1);

    this.selectedTown = {
      selection: null,
      element: null
    };

    this.zoomAnim(county, 2);
  }
  /**
   * 點擊 鄉鎮市 進入 村里 Level 的 method
   *
   */
  zoomInSelectedTown = (town) => {
    const { name } = town.properties;
    this.clearSelectedTown()
    this.selectedTown.element = town;
    this.selectedTown.selection = select(this.mapRef)
      .select('g.villageContainer')
      .selectAll('g')
      .filter(t => t.properties.name.includes(name))
    this.selectedTown.selection
      .style('display', 'block')
      .transition()
      .duration(500)
      .style('opacity', 1);

    this.zoomAnim(town, 2);
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
      .attrTween("transform", function () {
        return function (t) {
          return transform(i(t));
        };
      })

    function transform(p) {
      let k = (height / p[2]) * 0.8;
      return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
    }
  }
  /**
   * Zoom Out 至初始視圖
   */
  zoom_fit = () => {
    this.clearSelectedCounty();
    this.zoomAnim(null, 1);
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
  render() {

    const { width, height } = this.state;
    return (
      <svg ref={ref => this.mapRef = ref} width={width} height={height} ></svg>
    );
  }
}
