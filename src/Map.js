import React, { Component } from 'react';
import './App.css';
import * as topojson from 'topojson';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import { geoPath, geoMercator } from 'd3-geo';
import { saveSvgAsPng } from 'save-svg-as-png';
import throttle from 'lodash.throttle';
import isEqual from 'react-fast-compare';
import update from 'immutability-helper';

import County from './County';
import Township from './Township';
import Village from './Village';
import twVillage from './assets/Taiwan/tw-village.topo';
import twTownship from './assets/Taiwan/tw-town.topo';
import twCounty from './assets/Taiwan/tw-county.topo';
import krProvince from './assets/South Korea/skorea-provinces-2018-topo';
import krMunicipality from './assets/South Korea/skorea-municipalities-2018-topo';
import krSubMunicipality from './assets/South Korea/skorea-submunicipalities-2018-topo';
import RangeColor from './assets/data_range_color';

export default class Map extends Component {
  constructor(props) {
    super(props);



    let topoCounty;
    let topoTownship;
    let topoVillage;
    /**
     * Taiwan: center([121, 23.9]) scale(10000)
     * SouthKorea: center([128, 36]) scale(7000)
     */
    let center;
    let scale;

    switch (props.country) {
      case 'kr':
        topoCounty = topojson.feature(krProvince, krProvince.objects.skorea_provinces_2018_geo);
        topoTownship = topojson.feature(krMunicipality, krMunicipality.objects.skorea_municipalities_2018_geo);
        topoVillage = topojson.feature(krSubMunicipality, krSubMunicipality.objects.skorea_submunicipalities_2018_geo);
        center = [128, 36];
        scale = 7000;
        break;
      case 'tw':
      default:
        topoCounty = topojson.feature(twCounty, twCounty.objects.county);
        topoVillage = topojson.feature(twVillage, twVillage.objects.village);
        topoTownship = topojson.feature(twTownship, twTownship.objects.town);
        center = [121, 23.9];
        scale = 10000;
        break;
    }
    // for Demo only
    const { counties, county_data, county_template } = this.demoCountyData(props.country, topoCounty);
    const { towns, township_data, township_template } = this.demoTownshipData(props.country, topoTownship);
    const { villages, village_data, village_template } = this.demoVillageData(props.country, topoVillage);
    // this.writeTemplateToFile('county_data', county_template)
    // this.writeTemplateToFile('township_data', township_template)
    // this.writeTemplateToFile('village_data', village_template)

    props.setDatas({
      counties: counties,
      towns: towns,
      villages: villages
    });
    //---------------------------------

    this.selectedCounty = {
      selection: [],
      element: null
    };
    this.selectedTown = {
      selection: [],
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

    this.zoom = d3.zoom().on('zoom', this.zoomEvent);

    const prj = geoMercator().center(center).translate([width / 2, height / 2]).scale(scale);
    this.path = geoPath().projection(prj)
    this.state = {
      width,
      height,
      center: [width / 2, height / 2],
      topoCounty: topoCounty,
      topoTownship: topoTownship,
      topoVillage: topoVillage,
      county_data,
      village_data,
      township_data
    }
  }
  demoCountyData = (country, topoCounty) => {
    const counties = [];
    const county_data = [];
    const county_template = [];
    switch (country) {
      case 'kr':
        topoCounty.features.forEach((c, i) => {
          const { name, code } = c.properties;
          counties.push({
            name,
            code
          })
          county_data.push({
            county_name: name,
            county_code: code,
            county_data: parseInt(Math.random() * 100, 10),
            county_description: `我是 ${name} 的描述內容`,
          })
          county_template.push({
            county_name: name,
            county_code: code,
            county_data: 0,
            county_description: ''
          })
        });
        break;
      case 'tw':
      default:
        topoCounty.features.forEach((c, i) => {
          const { COUNTYNAME, COUNTYCODE } = c.properties;
          counties.push({
            name: COUNTYNAME,
            code: COUNTYCODE
          })
          county_data.push({
            county_name: COUNTYNAME,
            county_code: COUNTYCODE,
            county_data: parseInt(Math.random() * 100, 10),
            county_description: `我是 ${COUNTYNAME} 的描述內容`,
          })
          county_template.push({
            county_name: COUNTYNAME,
            county_code: COUNTYCODE,
            county_data: 0,
            county_description: ''
          })
        });
        break;
    }
    return {
      counties,
      county_data,
      county_template
    }
  }
  demoTownshipData = (country, topoTownship) => {
    const towns = [];
    const township_data = [];
    const township_template = [];
    switch (country) {
      case 'kr':
        topoTownship.features.forEach((t, i) => {
          const { name, code } = t.properties;
          towns.push({
            name,
            code
          });
          township_data.push({
            township_name: name,
            township_code: code,
            township_data: parseInt(Math.random() * 100, 10),
            township_description: `我是 ${name} 的描述內容`,
          })
          township_template.push({
            township_name: name,
            township_code: code,
            township_data: 0,
            township_description: ''
          })
        });
        break;
      case 'tw':
      default:
        topoTownship.features.forEach((t, i) => {
          const { TOWNNAME, COUNTYNAME, TOWNCODE } = t.properties;
          towns.push({
            name: TOWNNAME,
            code: TOWNCODE
          });
          township_data.push({
            township_name: TOWNNAME,
            township_code: TOWNCODE,
            township_data: parseInt(Math.random() * 100, 10),
            township_description: `我是 ${COUNTYNAME}${TOWNNAME} 的描述內容`,
          })
          township_template.push({
            township_name: TOWNNAME,
            township_code: TOWNCODE,
            township_data: 0,
            township_description: ''
          })
        });
        break;
    }
    return {
      towns,
      township_data,
      township_template
    }
  }
  demoVillageData = (country, topoVillage) => {
    const villages = [];
    const village_data = [];
    const village_template = [];

    switch (country) {
      case 'kr':
        topoVillage.features.forEach((v, i) => {
          const { name, code } = v.properties;
          villages.push({
            name,
            code
          });
          village_data.push({
            village_name: name,
            village_code: code,
            village_data: parseInt(Math.random() * 100, 10),
            village_description: `我是 ${name} 的描述內容`,
          })
          village_template.push({
            village_name: name,
            village_code: code,
            village_data: 0,
            village_description: ''
          })
        });
        break;
      case 'tw':
      default:
        topoVillage.features.forEach((v, i) => {
          const { VILLNAME, TOWNNAME, COUNTYNAME, VILLCODE } = v.properties;
          villages.push({
            name: VILLNAME,
            code: VILLCODE
          });
          village_data.push({
            village_name: VILLNAME,
            village_code: VILLCODE,
            village_data: parseInt(Math.random() * 100, 10),
            village_description: `我是 ${COUNTYNAME}${TOWNNAME}${VILLNAME} 的描述內容`,
          })
          village_template.push({
            village_name: VILLNAME,
            village_code: VILLCODE,
            village_data: 0,
            village_description: ''
          })
        });
        break;
    }
    return {
      villages,
      village_data,
      village_template
    }
  }
  /**
   *  export data template json file
   */
  writeTemplateToFile = (filename, objectData) => {
    let contentType = "application/json;charset=utf-8;";
    const a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { county_data, village_data, township_data } = this.state;
    if (!isEqual(county_data, nextState.county_data)) {
      return true
    }
    if (!isEqual(village_data, nextState.village_data)) {
      return true
    }
    if (!isEqual(township_data, nextState.township_data)) {
      return true
    }
    return false
  }

  componentDidMount() {
    /**
      mouse wheel event
     */
    select(this.mapRef)
      .on('wheel', throttle(this.wheelEvent, 400));
  }
  /**
   * 清除已選的 縣市 
   */
  clearSelectedCounty = () => {
    if (this.selectedCounty.selection.length !== 0) {
      const tmpSelectedCounty = this.selectedCounty.selection[1]
      this.selectedCounty.selection[0]
        .select('path')
        .attr('stroke', 'white')
        .attr('stroke-width', "0.05")
      this.selectedCounty.selection[1]
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', () => {
          tmpSelectedCounty
            .style('display', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', "0.05");
        });
    }
    if (this.selectedTown.selection.length !== 0) {
      const tmpSelectedTown = this.selectedTown.selection[1]
      this.selectedTown.selection[0]
        .select('path')
        .attr('stroke', 'white')
        .attr('stroke-width', "0.05")
      this.selectedTown.selection[1]
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', () => {
          tmpSelectedTown
            .style('display', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', "0.05");
        });
    }
  }
  /**
   * 清除已選的 鄉鎮區
   */
  clearSelectedTown = () => {
    if (this.selectedTown.selection.length !== 0) {
      const tmpSelectedTown = this.selectedTown.selection[1]
      this.selectedTown.selection[0]
        .select('path')
        .attr('stroke', 'white')
        .attr('stroke-width', "0.05")
      this.selectedTown.selection[1]
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', () => {
          tmpSelectedTown
            .style('display', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', "0.05");
        });
    }
    if (this.selectedVillage.selection !== null) {
      const tmpSelectedVillage = this.selectedVillage.selection
      tmpSelectedVillage
        .select('path')
        .attr('stroke', 'white')
        .attr('stroke-width', "0.05");
    }
  }
  /**
   * 清除已選的 村里
   */
  clearSelectedVillage = () => {
    if (this.selectedVillage.selection !== null) {
      const tmpSelectedVillage = this.selectedVillage.selection
      tmpSelectedVillage
        .select('path')
        .attr('stroke', 'white')
        .attr('stroke-width', "0.05");
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
    const { country } = this.props;
    this.clearSelectedCounty();
    this.selectedCounty.element = county;

    switch (country) {
      case 'kr':
        const { code } = county.properties;
        this.selectedCounty.selection[0] = select(this.mapRef)
          .select('g.countyContainer')
          .select(`g[data-code='${code}']`);
        this.selectedCounty.selection[1] = select(this.mapRef)
          .select('g.townContainer')
          .selectAll(`g[data-code^='${code}']`);

        break;
      case 'tw':
      default:
        const { COUNTYCODE } = county.properties;
        this.selectedCounty.selection[0] = select(this.mapRef)
          .select('g.countyContainer')
          .select(`g[data-code='${COUNTYCODE}']`);
        this.selectedCounty.selection[1] = select(this.mapRef)
          .select('g.townContainer')
          .selectAll(`g[data-code^='${COUNTYCODE}']`);
        break;
    }
    this.selectedCounty.selection[0]
      .select(function () {
        return this.parentNode.appendChild(this)
      })
    this.selectedCounty.selection[0]
      .select('path')
      .attr('stroke', '#ffcc00')
      .attr('stroke-width', "0.7");
    this.selectedCounty.selection[1]
      .style('display', 'block')
      .transition()
      .duration(500)
      .style('opacity', 1);

    this.selectedTown = {
      selection: [],
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
    const { country } = this.props;
    this.clearSelectedTown()

    this.selectedTown.element = town;
    switch (country) {
      case 'kr':
        const { code } = town.properties;
        this.selectedTown.selection[0] = select(this.mapRef)
          .select('g.townContainer')
          .selectAll(`g[data-code='${code}']`);
        this.selectedTown.selection[1] = select(this.mapRef)
          .select('g.villageContainer')
          .selectAll(`g[data-code^='${code}']`);
        break;
      case 'tw':
      default:
        const { TOWNCODE } = town.properties;
        this.selectedTown.selection[0] = select(this.mapRef)
          .select('g.townContainer')
          .selectAll(`g[data-code='${TOWNCODE}']`);
        this.selectedTown.selection[1] = select(this.mapRef)
          .select('g.villageContainer')
          .selectAll(`g[data-code^='${TOWNCODE}']`);
        break;
    }
    this.selectedCounty.selection[0]
      .select('path')
      .attr('stroke', 'white')
      .attr('stroke-width', "0.05");
    this.selectedTown.selection[0]
      .select(function () {
        return this.parentNode.appendChild(this)
      });
    this.selectedTown.selection[0]
      .select('path')
      .attr('stroke', '#ffcc00')
      .attr('stroke-width', "0.2");
    this.selectedTown.selection[1]
      .style('display', 'block')
      .transition()
      .duration(500)
      .style('opacity', 1);

    if (animate) {
      this.zoomAnimate(town)
    }
  }
  /**
   * 點擊 村里 的 method
   */
  zoomInSelectedVillage = (village) => {
    if (village === null) {
      return;
    }

    const { country } = this.props;

    this.clearSelectedVillage()

    this.selectedVillage.element = village;
    switch (country) {
      case 'kr':
        const { code } = village.properties;
        this.selectedVillage.selection = select(this.mapRef)
          .select('g.villageContainer')
          .selectAll(`g[data-code='${code}']`);
        break;
      case 'tw':
      default:
        const { VILLNAME, VILLCODE } = village.properties;
        if (VILLNAME === '') {
          return;
        }
        this.selectedVillage.selection = select(this.mapRef)
          .select('g.villageContainer')
          .selectAll(`g[data-code='${VILLCODE}']`);
        break;
    }
    this.selectedTown.selection[0]
      .select('path')
      .attr('stroke', 'white')
      .attr('stroke-width', "0.05");
    this.selectedVillage.selection
      .select(function () {
        return this.parentNode.appendChild(this)
      })
    this.selectedVillage.selection
      .select('path')
      .attr('stroke', '#ffcc00')
      .attr('stroke-width', "0.07")
      .transition()
      .duration(500);

  }
  /**
   * 處理zoom in/out animation 的 method
   */
  zoomAnimate = (target) => {
    const { height, center } = this.state;
    const bounds = this.path.bounds(target);
    // const dx = bounds[1][0] - bounds[0][0];
    // const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const vw = Math.max((bounds[1][1] - bounds[0][1]), (bounds[1][0] - bounds[0][0]));
    // scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))) * 0.8,
    const scale = (height / vw) * 0.7;
    // translate = [width / 2 - scale * x, height / 2 - scale * y],
    const translate = [center[0] - x * scale, center[1] - y * scale];
    // if (scale > 25) {
    //   select(this.mapRef)
    //   .selectAll('path')
    //   .attr('stroke-width', 0.05)
    // } else if (scale > 30) {
    //   select(this.mapRef)
    //   .selectAll('path')
    //   .attr('stroke-width', 0.02)
    // } else {
    //   select(this.mapRef)
    //   .selectAll('path')
    //   .attr('stroke-width', 0.2)
    // }
    select(this.mapRef)
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
  }
  /**
   * d3 zoomEvent
   */
  zoomEvent = () => {
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
      selection: [],
      element: null
    };
    this.selectedTown = {
      selection: [],
      element: null
    };
  }
  /**
   * zoom out for wheel event
   * - auto detect current viewport level
   */
  zoom_out = () => {
    if (this.selectedTown.element !== null) {
      this.zoomInSelectedCounty(this.selectedCounty.element)
    } else if (this.selectedCounty.element !== null) {
      this.zoom_fit()
    }
  }
  /**
   * 滾輪 method
   */
  wheelEvent = () => {
    if (d3.event === null) {
      return;
    }
    const direction = d3.event.deltaY >= 0 ? 'down' : 'up';

    if (direction === 'down') {
      this.zoom_out()
    }
  }
  /**
   * 輸出 當下svg 為 png圖檔 並下載
   */
  exportToPNG = () => {
    saveSvgAsPng(this.mapRef, 'map.png')
  }
  /**
   * zoom in 至指定 縣市
   */
  goto_county = (code) => {
    const { topoCounty } = this.state;
    const { country } = this.props;
    let targetCounty = []
    switch (country) {
      case 'kr':
        targetCounty = topoCounty.features.filter(c => c.properties.code === code);
        break;
      case 'tw':
      default:
        targetCounty = topoCounty.features.filter(c => c.properties.COUNTYCODE === code);
        break;
    }

    this.zoomInSelectedCounty(targetCounty[0]);
  }
  /**
   * 取得 縣市 資料
   */
  get_county_data = (code) => {
    const { county_data } = this.state;
    const targetCounty = county_data.filter(c => c.county_code === code);
    return targetCounty[0].county_data
  }
  /**
   * 設定 縣市 資料
   */
  set_county_data = (code, data) => {
    const { county_data } = this.state;
    county_data.forEach((c, i) => {
      if (c.county_code === code) {
        if (data === c.county_data) {
          return;
        }

        this.setState(({
          county_data: update(county_data, { [i]: { county_data: { $set: data } } })
        }))
      }
    })
  }
  /**
   * 取得 縣市 描述
   */
  get_county_description = (code) => {
    const { county_data } = this.state;
    const targetCounty = county_data.filter(c => c.county_code === code);
    return targetCounty[0].county_description
  }
  /**
   * 設定 縣市 描述
   */
  set_county_description = (code, data) => {
    const { county_data } = this.state;
    county_data.forEach((c, i) => {
      if (c.county_code === code) {
        if (data === c.description) {
          return;
        }

        this.setState(({
          county_data: update(county_data, { [i]: { county_description: { $set: data } } })
        }))
      }
    })
  }
  /**
   * zoom in 至指定 鄉鎮區
   */
  goto_township = (code) => {
    const { topoCounty, topoTownship } = this.state;
    const { country } = this.props;
    let targetCounty = [];
    let targetTown = [];

    switch (country) {
      case 'kr':
        targetCounty = topoCounty.features.filter(c => code.indexOf(c.properties.code) === 0);
        targetTown = topoTownship.features.filter(t => t.properties.code === code);
        break;
      case 'tw':
      default:
        targetCounty = topoCounty.features.filter(c => code.indexOf(c.properties.COUNTYCODE) === 0);
        targetTown = topoTownship.features.filter(t => t.properties.TOWNCODE === code);
        break;
    }

    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
  }
  /**
   * 取得 鄉鎮區 資料
   */
  get_township_data = (code) => {
    const { township_data } = this.state
    const targetTown = township_data.filter(t => {
      const { township_code } = t;
      return township_code === code;
    });
    return targetTown[0].township_data;
  }
  /**
   * 設定 鄉鎮區 資料
   */
  set_township_data = (code, data) => {
    const { township_data } = this.state
    township_data.forEach((t, i) => {
      const { township_code } = t;
      if (township_code === code) {
        if (data === t.township_data) {
          return;
        }

        this.setState(({
          township_data: update(township_data, { [i]: { township_data: { $set: data } } })
        }))
      }
    })
  }
  /**
   * 取得 鄉鎮區 描述
   */
  get_township_description = (code) => {
    const { township_data } = this.state
    const targetTown = township_data.filter(t => {
      const { township_code } = t;
      return township_code === code;
    });
    return targetTown[0].township_description;
  }
  /**
   * 設定 鄉鎮區 描述
   */
  set_township_description = (code, data) => {
    const { township_data } = this.state
    township_data.forEach((t, i) => {
      const { township_code } = t;
      if (township_code === code) {
        if (data === t.township_description) {
          return;
        }

        this.setState(({
          township_data: update(township_data, { [i]: { township_description: { $set: data } } })
        }))
      }
    })
  }
  /**
   * zoom in 至指定 村里
   */
  goto_village = (code) => {
    const { topoCounty, topoTownship, topoVillage, village_data } = this.state;
    const { country, setSelectedVillageInfo } = this.props;
    let targetCounty = [];
    let targetTown = [];
    let targetVillage = [];

    switch (country) {
      case 'kr':
        targetCounty = topoCounty.features.filter(c => code.indexOf(c.properties.code) === 0);
        targetTown = topoTownship.features.filter(t => code.indexOf(t.properties.code) === 0);
        targetVillage = topoVillage.features.filter(v => v.properties.code === code);
        break;
      case 'tw':
      default:
        targetCounty = topoCounty.features.filter(c => code.indexOf(c.properties.COUNTYCODE) === 0);
        targetTown = topoTownship.features.filter(t => code.indexOf(t.properties.TOWNCODE) === 0);
        targetVillage = topoVillage.features.filter(v => v.properties.VILLCODE === code);
        break;
    }
    const targetData = village_data.filter(vd => vd.village_code === code)[0]
    setSelectedVillageInfo({
      name: targetData.village_name,
      code: targetData.village_code,
      data: targetData.village_data,
      description: targetData.village_description
    })
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
    this.zoomInSelectedVillage(targetVillage[0])
  }
  /**
   * 取得 村里 資料
   */
  get_village_data = (code) => {
    const { village_data } = this.state;
    const targetVillage = village_data.filter(v => {
      const { village_code } = v;
      return village_code === code;
    });
    return targetVillage[0].village_data;
  }
  /**
   * 設定 村里 資料
   */
  set_village_data = (code, data) => {
    const { village_data } = this.state;
    village_data.forEach((v, i) => {
      const { village_code } = v;
      if (village_code === code) {
        if (data === v.village_data) {
          return;
        }
        this.setState(({
          village_data: update(village_data, { [i]: { village_data: { $set: data } } })
        }))
      }
    });
  }
  /**
   * 取得 村里 描述
   */
  get_village_description = (code) => {
    const { village_data } = this.state;
    const targetVillage = village_data.filter(v => {
      const { village_code } = v;
      return village_code === code;
    });
    return targetVillage[0].village_description;
  }
  /**
   * 設定 村里 描述
   */
  set_village_description = (code, data) => {
    const { village_data } = this.state;
    village_data.forEach((v, i) => {
      const { village_code } = v;
      if (village_code === code) {
        if (data === v.village_description) {
          return;
        }
        this.setState(({
          village_data: update(village_data, { [i]: { village_description: { $set: data } } })
        }))
      }
    });
  }
  /**
   * 取得 所屬範圍的 顏色
   */
  getDataRangeColor = (value) => {
    const color = RangeColor.filter((rc) => value >= rc.value_min && value <= rc.value_max)[0].color
    return color;
  }
  render() {
    const { setInfo, country, setSelectedVillageInfo } = this.props;
    const { height, topoCounty, topoTownship, topoVillage, county_data, township_data, village_data } = this.state;
    console.log('render Map')
    return (
      <svg ref={ref => this.mapRef = ref} width={'100%'} height={height}>
        <County
          country={country}
          topoData={topoCounty}
          data={county_data}
          path={this.path}
          setInfo={setInfo}
          clearSelectedCounty={this.clearSelectedCounty}
          zoomInSelectedCounty={this.zoomInSelectedCounty}
          getColor={this.getDataRangeColor}
        />
        <Township
          country={country}
          topoData={topoTownship}
          data={township_data}
          path={this.path}
          setInfo={setInfo}
          clearSelectedTown={this.clearSelectedTown}
          zoomInSelectedTown={this.zoomInSelectedTown}
          getColor={this.getDataRangeColor}
        />
        <Village
          country={country}
          topoData={topoVillage}
          data={village_data}
          path={this.path}
          setInfo={setInfo}
          clearSelectedVillage={this.clearSelectedVillage}
          zoomInSelectedVillage={this.zoomInSelectedVillage}
          getColor={this.getDataRangeColor}
          setSelectedVillageInfo={setSelectedVillageInfo}
        />
      </svg>
    );
  }
}
