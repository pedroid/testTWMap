import React, { Component } from 'react';
import * as topojson from 'topojson';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select, event } from 'd3-selection';
import { geoPath, geoMercator } from 'd3-geo';
import { saveSvgAsPng } from 'save-svg-as-png';
import throttle from 'lodash.throttle';

import County from './County';
import Township from './Township';
import Village from './Village';

import { MapManager } from './index';


export default class Map extends Component {
  static defaultProps = {
    country: 'tw'
  }

  constructor(props) {
    super(props);

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

    const width = (document.body.clientWidth / 3) * 2 - 10;
    const height = document.body.clientHeight;

    this.zoom = zoom().on('zoom', this.zoomEvent);

    this.state = {
      width,
      height,
      center: [width / 2, height / 2],
      loading: true
    }
  }
  dealwithCountyData = (country, topoCounty, data = []) => {
    const counties = [];
    const county_template = [];
    switch (country) {
      case 'kr':
        topoCounty.features.forEach((c, i) => {
          const { name, code } = c.properties;
          /**
           * 此為 app.js 內 縣市 的select 資料
           */
          counties.push({
            name,
            code
          });
          /**
           * 未傳入data值 或是 data順序亂掉 導致code不對應
           * 會進入 demo 模式(自動產生隨機資料)
           */
          if (data.length !== 0 && data[i].county_code === code) {
            MapManager.setCountyData(code, {
              name: data[i].county_name,
              data: data[i].county_data,
              description: data[i].description
            })
          } else {
            MapManager.setCountyData(code, {
              name: name,
              data: parseInt(Math.random() * 100, 10),
              description: `我是 ${name} 的描述內容`
            })
          }
          /**
           * 此為 預設資料模板
           * 方便輸出為json
           */
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
          /**
           * 此為 app.js 內 縣市 的select 資料
           */
          counties.push({
            name: COUNTYNAME,
            code: COUNTYCODE
          })
          /**
           * 未傳入data值 或是 data順序亂掉 導致code不對應
           * 會進入 demo 模式(自動產生隨機資料)
           */
          if (data.length !== 0 && data[i].county_code === COUNTYCODE) {
            MapManager.setCountyData(COUNTYCODE, {
              name: data[i].county_name,
              data: data[i].county_data,
              description: data[i].description
            })
          } else {
            MapManager.setCountyData(COUNTYCODE, {
              name: COUNTYNAME,
              data: parseInt(Math.random() * 100, 10),
              description: `我是 ${COUNTYNAME} 的描述內容`
            })
          }
          /**
           * 此為 預設資料模板
           * 方便輸出為json
           */
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
      county_template
    }
  }
  dealwithTownshipData = (country, topoTownship, data = []) => {
    const towns = [];
    const township_template = [];
    switch (country) {
      case 'kr':
        topoTownship.features.forEach((t, i) => {
          const { name, code } = t.properties;
          /**
           * 此為 app.js 內 鄉鎮區 的select 資料
           */
          towns.push({
            name,
            code
          });
          /**
           * 未傳入data值 或是 data順序亂掉 導致code不對應
           * 會進入 demo 模式(自動產生隨機資料)
           */
          if (data.length !== 0 && data[i].township_code === code) {
            MapManager.setTownshipData(code, {
              name: data[i].township_name,
              data: data[i].township_data,
              description: data[i].township_description
            })
          } else {
            MapManager.setTownshipData(code, {
              name: name,
              data: parseInt(Math.random() * 100, 10),
              description: `我是 ${name} 的描述內容`
            })
          }
          /**
           * 此為 預設資料模板
           * 方便輸出為json
           */
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
          /**
           * 此為 app.js 內 鄉鎮區 的select 資料
           */
          towns.push({
            name: TOWNNAME,
            code: TOWNCODE
          });
          /**
           * 未傳入data值 或是 data順序亂掉 導致code不對應
           * 會進入 demo 模式(自動產生隨機資料)
           */
          if (data.length !== 0 && data[i].township_code === TOWNCODE) {
            MapManager.setTownshipData(TOWNCODE, {
              name: data[i].township_name,
              data: data[i].township_data,
              description: data[i].township_description
            })
          } else {
            MapManager.setTownshipData(TOWNCODE, {
              name: TOWNNAME,
              data: parseInt(Math.random() * 100, 10),
              description: `我是 ${COUNTYNAME}${TOWNNAME} 的描述內容`
            })
          }
          /**
           * 此為 預設資料模板
           * 方便輸出為json
           */
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
      township_template
    }
  }
  dealwithVillageData = (country, topoVillage, data = []) => {
    const villages = [];
    const village_template = [];

    switch (country) {
      case 'kr':
        topoVillage.features.forEach((v, i) => {
          const { name, code } = v.properties;
          /**
           * 此為 app.js 內 村里 的select 資料
           */
          villages.push({
            name,
            code
          });
          MapManager.setVillageData(code, {
            name: name,
            data: parseInt(Math.random() * 100, 10),
            description: `我是 ${name} 的描述內容`
          })
          /**
           * 未傳入data值 或是 data順序亂掉 導致code不對應
           * 會進入 demo 模式(自動產生隨機資料)
           */
          if (data.length !== 0 && data[i].village_code === code) {
            MapManager.setVillageData(code, {
              name: data[i].village_name,
              data: data[i].village_data,
              description: data[i].village_description
            })
          } else {
            MapManager.setVillageData(code, {
              name: name,
              data: parseInt(Math.random() * 100, 10),
              description: `我是 ${name} 的描述內容`
            })
          }
          /**
           * 此為 預設資料模板
           * 方便輸出為json
           */
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
          /**
           * 此為 app.js 內 村里 的select 資料
           */
          villages.push({
            name: VILLNAME,
            code: VILLCODE
          });
          /**
           * 未傳入data值 或是 data順序亂掉 導致code不對應
           * 會進入 demo 模式(自動產生隨機資料)
           */
          if (data.length !== 0 && data[i].village_code === VILLCODE) {
            MapManager.setVillageData(VILLCODE, {
              name: data[i].village_name,
              data: data[i].village_data,
              description: data[i].village_description
            })
          } else {
            MapManager.setVillageData(VILLCODE, {
              name: VILLNAME,
              data: parseInt(Math.random() * 100, 10),
              description: `我是 ${COUNTYNAME}${TOWNNAME}${VILLNAME} 的描述內容`
            })
          }
          /**
           * 此為 預設資料模板
           * 方便輸出為json
           */
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
    const { loading } = this.state;
    const { country } = this.props;
    if (country !== nextProps.country) {
      this.initialMapSouces(nextProps.country)
    }
    if (loading !== nextState.loading) {
      return true;
    }
    return false
  }
  componentWillMount() {
    const { country } = this.props;
    this.initialMapSouces(country)
  }
  initialMapSouces = (country) => {
    const { width, height } = this.state;
    const { setDatas } = this.props;

    this.setState({
      loading: true
    }, () => {
      MapManager.init()
      switch (country) {
        case 'kr':
          import('../assets/South Korea/MapSources')
            .then(({ krProvince, krMunicipality, krSubMunicipality }) => {
              const topoCounty = topojson.feature(krProvince, krProvince.objects.skorea_provinces_2018_geo);
              const topoTownship = topojson.feature(krMunicipality, krMunicipality.objects.skorea_municipalities_2018_geo);
              const topoVillage = topojson.feature(krSubMunicipality, krSubMunicipality.objects.skorea_submunicipalities_2018_geo);

              const { counties, county_template } = this.dealwithCountyData(country, topoCounty);
              const { towns, township_template } = this.dealwithTownshipData(country, topoTownship);
              const { villages, village_template } = this.dealwithVillageData(country, topoVillage);

              /**
               * 此為 輸出 data模板的method
               * 取消註解 重新整理頁面
               * 會在一開始時 就跑出下載的視窗
               */
              // this.writeTemplateToFile('county_data', county_template)
              // this.writeTemplateToFile('township_data', township_template)
              // this.writeTemplateToFile('village_data', village_template)

              setDatas({
                counties: counties,
                towns: towns,
                villages: villages
              });

              const center = [128, 36];
              const scale = 7000;
              const prj = geoMercator().center(center).translate([width / 2, height / 2]).scale(scale);
              this.path = geoPath().projection(prj);

              this.setState({
                loading: false,
                topoCounty: topoCounty,
                topoTownship: topoTownship,
                topoVillage: topoVillage
              }, () => {
                select(this.mapRef)
                  .on('wheel', throttle(this.wheelEvent, 400));
              })
            })
            .catch(err => {
              console.log(err);
              // Handle failure
            });

          break;
        case 'tw':
        default:
          import('../assets/Taiwan/MapSources')
            .then(({
              twVillage,
              twTownship,
              twCounty,
              county_data,
              township_data,
              village_data
            }) => {
              const topoCounty = topojson.feature(twCounty, twCounty.objects.county);
              const topoVillage = topojson.feature(twVillage, twVillage.objects.village);
              const topoTownship = topojson.feature(twTownship, twTownship.objects.town);
              const { counties, county_template } = this.dealwithCountyData(country, topoCounty, county_data);
              const { towns, township_template } = this.dealwithTownshipData(country, topoTownship, township_data);
              const { villages, village_template } = this.dealwithVillageData(country, topoVillage, village_data);

              /**
               * 此為 輸出 data模板的method
               * 取消註解 重新整理頁面
               * 會在一開始時 就跑出下載的視窗
               */
              // this.writeTemplateToFile('county_data', county_template)
              // this.writeTemplateToFile('township_data', township_template)
              // this.writeTemplateToFile('village_data', village_template)

              setDatas({
                counties: counties,
                towns: towns,
                villages: villages
              });

              const center = [121, 23.9];
              const scale = 10000;
              const prj = geoMercator().center(center).translate([width / 2, height / 2]).scale(scale);
              this.path = geoPath().projection(prj);

              this.setState({
                loading: false,
                topoCounty: topoCounty,
                topoTownship: topoTownship,
                topoVillage: topoVillage
              }, () => {
                select(this.mapRef)
                  .on('wheel', throttle(this.wheelEvent, 400));
              })
            })
            .catch(err => {
              console.log(err);
              // Handle failure
            });

          break;
      }
    })
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
    let dataCode;

    this.clearSelectedCounty();
    this.selectedCounty.element = county;

    switch (country) {
      case 'kr':
        const { code } = county.properties;
        dataCode = code;
        break;
      case 'tw':
      default:
        const { COUNTYCODE } = county.properties;
        dataCode = COUNTYCODE;
        break;
    }

    this.selectedCounty.selection[0] = select(this.mapRef)
      .select('g.countyContainer')
      .select(`g[data-code='${dataCode}']`);
    this.selectedCounty.selection[1] = select(this.mapRef)
      .select('g.townContainer')
      .selectAll(`g[data-code^='${dataCode}']`);

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
    let dataCode;
    this.clearSelectedTown()

    this.selectedTown.element = town;
    switch (country) {
      case 'kr':
        const { code } = town.properties;
        dataCode = code;
        break;
      case 'tw':
      default:
        const { TOWNCODE } = town.properties;
        dataCode = TOWNCODE;
        break;
    }

    this.selectedTown.selection[0] = select(this.mapRef)
      .select('g.townContainer')
      .selectAll(`g[data-code='${dataCode}']`);
    this.selectedTown.selection[1] = select(this.mapRef)
      .select('g.villageContainer')
      .selectAll(`g[data-code^='${dataCode}']`);

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
    let dataCode;
    this.clearSelectedVillage()

    this.selectedVillage.element = village;
    switch (country) {
      case 'kr':
        const { code } = village.properties;
        dataCode = code;
        break;
      case 'tw':
      default:
        const { VILLCODE } = village.properties;
        // if (VILLNAME === '') {
        //   return;
        // }
        dataCode = VILLCODE;
        break;
    }

    this.selectedVillage.selection = select(this.mapRef)
      .select('g.villageContainer')
      .selectAll(`g[data-code='${dataCode}']`);

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
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const vw = Math.max((bounds[1][1] - bounds[0][1]), (bounds[1][0] - bounds[0][0]));
    const scale = (height / vw) * 0.7;
    const translate = [center[0] - x * scale, center[1] - y * scale];

    select(this.mapRef)
      .transition()
      .duration(750)
      .call(this.zoom.transform, zoomIdentity.translate(translate[0], translate[1]).scale(scale));
  }
  /**
   * d3 zoomEvent
   */
  zoomEvent = () => {
    select(this.mapRef)
      .selectAll('g.countyContainer, g.townContainer, g.villageContainer')
      .attr('transform', event.transform);
  }
  /**
   * Zoom Out 至初始視圖
   */
  zoom_fit = () => {
    this.clearSelectedCounty();

    select(this.mapRef)
      .transition()
      .duration(750)
      .call(this.zoom.transform, zoomIdentity);

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
    if (event === null) {
      return;
    }
    const direction = event.deltaY >= 0 ? 'down' : 'up';

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
    const { country, setSelectedInfo } = this.props;
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

    setSelectedInfo('county', code);
    this.zoomInSelectedCounty(targetCounty[0]);
  }
  /**
   * zoom in 至指定 鄉鎮區
   */
  goto_township = (code) => {
    const { topoCounty, topoTownship } = this.state;
    const { country, setSelectedInfo } = this.props;
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

    setSelectedInfo('township', code);
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
  }
  /**
   * zoom in 至指定 村里
   */
  goto_village = (code) => {
    const { topoCounty, topoTownship, topoVillage } = this.state;
    const { country, setSelectedInfo } = this.props;
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

    setSelectedInfo('village', code)
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
    this.zoomInSelectedVillage(targetVillage[0])
  }
  render() {
    const { setInfo, country, setSelectedInfo } = this.props;
    const { height, topoCounty, topoTownship, topoVillage, loading } = this.state;

    if (loading) {
      return (
        <div>
          <h1>載入地圖中</h1>
        </div>
      )
    }
    return (
      <svg ref={ref => this.mapRef = ref} width={'100%'} height={height}>
        <County
          country={country}
          topoData={topoCounty}
          path={this.path}
          setInfo={setInfo}
          clearSelectedCounty={this.clearSelectedCounty}
          zoomInSelectedCounty={this.zoomInSelectedCounty}
          setSelectedInfo={setSelectedInfo}
        />
        <Township
          country={country}
          topoData={topoTownship}
          path={this.path}
          setInfo={setInfo}
          clearSelectedTown={this.clearSelectedTown}
          zoomInSelectedTown={this.zoomInSelectedTown}
          setSelectedInfo={setSelectedInfo}
        />
        <Village
          country={country}
          topoData={topoVillage}
          path={this.path}
          setInfo={setInfo}
          clearSelectedVillage={this.clearSelectedVillage}
          zoomInSelectedVillage={this.zoomInSelectedVillage}
          setSelectedInfo={setSelectedInfo}
        />
      </svg>
    );
  }
}

export { MapManager };