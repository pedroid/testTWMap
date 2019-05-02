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
import isEqual from 'react-fast-compare';

import update, { extend } from 'immutability-helper';

import County from './County';
import Township from './Township';
import Village from './Village';

export default class Map extends Component {
  constructor(props) {
    super(props);

    // this.topoVillage = topojson.feature(twVillage, twVillage.objects.tracts);
    // this.topoTown = topojson.feature(twTown, twTown.objects.town);
    // this.topoCounty = topojson.feature(twCounty, twCounty.objects.counties);

    // this.topoVillage = topojson.feature(twVillage, twVillage.objects.taiwan_village);
    // this.topoTown = topojson.feature(twTown, twTown.objects.taiwan);
    // this.topoCounty = topojson.feature(twCounty, twCounty.objects.layer1);


    const topoVillage = topojson.feature(twVillage, twVillage.objects.village);
    const topoTown = topojson.feature(twTown, twTown.objects.town);
    const topoCounty = topojson.feature(twCounty, twCounty.objects.county);


    // for Demo only
    this.counties = [];
    const county_data = [];
    topoCounty.features.forEach((c, i) => {
      const { COUNTYNAME, COUNTYCODE } = c.properties;
      this.counties.push({
        name: COUNTYNAME,
        code: COUNTYCODE
      })
      county_data.push({
        county_name: COUNTYNAME,
        county_data: parseInt(Math.random() * 100, 10),
        county_description: `我是 ${COUNTYNAME} 的描述內容`,
      })
    });
    this.towns = [];
    const township_data = [];
    topoTown.features.forEach((t, i) => {
      const { TOWNNAME, COUNTYNAME, TOWNCODE } = t.properties;
      this.towns.push({
        name: TOWNNAME,
        countyName: COUNTYNAME,
        code: TOWNCODE
      });
      township_data.push({
        county_name: COUNTYNAME,
        township_name: TOWNNAME,
        township_data: parseInt(Math.random() * 100, 10),
        township_description: `我是 ${COUNTYNAME}${TOWNNAME} 的描述內容`,
      })
    });
    this.villages = [];
    const village_data = []
    topoVillage.features.forEach((v, i) => {
      const { VILLNAME, TOWNNAME, COUNTYNAME, VILLCODE } = v.properties;
      this.villages.push({
        name: VILLNAME,
        townName: TOWNNAME,
        countyName: COUNTYNAME,
        code: VILLCODE
      });
      village_data.push({
        county_name: COUNTYNAME,
        township_name: TOWNNAME,
        village_name: VILLNAME,
        village_data: parseInt(Math.random() * 100, 10),
        village_description: `我是 ${COUNTYNAME}${TOWNNAME}${VILLNAME} 的描述內容`,
      })
    });
    props.setDatas({
      counties: this.counties,
      towns: this.towns,
      villages: this.villages
    });
    //---------------------------------

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

    this.zoom = d3.zoom().on('zoom', this.zoomEvent);
    const prj = geoMercator().center([121, 23.9]).translate([width / 2, height / 2]).scale(10000);
    this.path = geoPath().projection(prj)
    this.state = {
      width,
      height,
      center: [width / 2, height / 2],
      topoCounty: topoCounty,
      topoTownship: topoTown,
      topoVillage: topoVillage,
      county_data,
      village_data,
      township_data
    }
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
  /**
   * 清除已選的 鄉鎮區
   */
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
  /**
   * 清除已選的 村里
   */
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
  /**
   * 點擊 村里 的 method
   */
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
   */
  // zoomAnim = (target, level) => {
  //   const { height, center } = this.state;

  //   const shape = geoPath().bounds(target)
  //   const x = this.currentViewport.x;
  //   const y = this.currentViewport.y;
  //   const w = this.currentViewport.w;


  //   let from = [];
  //   let to = [];
  //   if (level === 2) {
  //     this.currentViewport.x = (shape[1][0] + shape[0][0]) / 2;
  //     this.currentViewport.y = (shape[1][1] + shape[0][1]) / 2;
  //     this.currentViewport.w = Math.max((shape[1][1] - shape[0][1]), (shape[1][0] - shape[0][0]));
  //     from = [x, y, w]
  //     to = [this.currentViewport.x, this.currentViewport.y, this.currentViewport.w]
  //   } else {
  //     this.currentViewport.x = 480;
  //     this.currentViewport.y = 480;
  //     this.currentViewport.w = 960;
  //     from = [x, y, w]
  //     to = [this.currentViewport.x, this.currentViewport.y, this.currentViewport.w]
  //   }
  //   var i = d3.interpolateZoom(from, to);
  //   select(this.mapRef)
  //     .selectAll('g.countyContainer, g.townContainer, g.villageContainer')
  //     .transition()
  //     .duration(750)
  //     .attrTween('transform', function () {
  //       return function (t) {
  //         return transform(i(t));
  //       };
  //     })

  //   function transform(p) {
  //     let k = (height / p[2]) * 0.8;
  //     return 'translate(' + (center[0] - p[0] * k) + ',' + (center[1] - p[1] * k) + ')scale(' + k + ')';
  //   }
  // }
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
      selection: null,
      element: null
    };
    this.selectedCounty = {
      selection: null,
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
    const direction = d3.event.wheelDelta < 0 ? 'down' : 'up';
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
  goto_county = (countyName) => {
    const { topoCounty } = this.state;
    const targetCounty = topoCounty.features.filter(c => c.properties.COUNTYNAME === countyName);
    this.zoomInSelectedCounty(targetCounty[0]);
  }
  /**
   * 取得 縣市 資料
   */
  get_county_data = (countyName) => {
    const { county_data } = this.state;
    const targetCounty = county_data.filter(c => c.county_name === countyName);
    return targetCounty[0].county_data
  }
  /**
   * 設定 縣市 資料
   */
  set_county_data = (countyName, data) => {
    const { county_data } = this.state;
    county_data.forEach((c, i) => {
      if (c.county_name === countyName) {
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
  get_county_description = (countyName) => {
    const { county_data } = this.state;
    const targetCounty = county_data.filter(c => c.county_name === countyName);
    return targetCounty[0].county_description
  }
  /**
   * 設定 縣市 描述
   */
  set_county_description = (countyName, data) => {
    const { county_data } = this.state;
    county_data.forEach((c, i) => {
      if (c.county_name === countyName) {
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
  goto_township = (countyName, townName) => {
    const { topoCounty, topoTownship } = this.state;
    const targetCounty = topoCounty.features.filter(c => c.properties.COUNTYNAME === countyName);

    const targetTown = topoTownship.features.filter(t => {
      const { COUNTYNAME, TOWNNAME } = t.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName;
    });
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
  }
  /**
   * 取得 鄉鎮區 資料
   */
  get_township_data = (countyName, townName) => {
    const { township_data } = this.state
    const targetTown = township_data.filter(t => {
      const { county_name, township_name } = t;
      return county_name === countyName && township_name === townName;
    });
    return targetTown[0].township_data;
  }
  /**
   * 設定 鄉鎮區 資料
   */
  set_township_data = (countyName, townName, data) => {
    const { township_data } = this.state
    township_data.forEach((t, i) => {
      const { county_name, township_name } = t;
      if (county_name === countyName && township_name === townName) {
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
  get_township_description = (countyName, townName) => {
    const { township_data } = this.state
    const targetTown = township_data.filter(t => {
      const { county_name, township_name } = t;
      return county_name === countyName && township_name === townName;
    });
    return targetTown[0].township_description;
  }
  /**
   * 設定 鄉鎮區 描述
   */
  set_township_description = (countyName, townName, data) => {
    const { township_data } = this.state
    township_data.forEach((t, i) => {
      const { county_name, township_name } = t;
      if (county_name === countyName && township_name === townName) {
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
  goto_village = (countyName, townName, villageName) => {
    const { topoCounty, topoTownship, topoVillage } = this.state
    const targetCounty = topoCounty.features.filter(c => c.properties.COUNTYNAME === countyName);
    const targetTown = topoTownship.features.filter(t => {
      const { COUNTYNAME, TOWNNAME } = t.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName;
    });
    const targetVillage = topoVillage.features.filter(v => {
      const { COUNTYNAME, TOWNNAME, VILLNAME } = v.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName && VILLNAME === villageName;
    });
    this.zoomInSelectedCounty(targetCounty[0], false);
    this.zoomInSelectedTown(targetTown[0]);
    this.zoomInSelectedVillage(targetVillage[0])
  }
  /**
   * 取得 村里 資料
   */
  get_village_data = (countyName, townName, villageName) => {
    const { village_data } = this.state;
    const targetVillage = village_data.filter(v => {
      const { county_name, township_name, village_name } = v;
      return county_name === countyName && township_name === townName && village_name === villageName;
    });
    return targetVillage[0].village_data;
  }
  /**
   * 設定 村里 資料
   */
  set_village_data = (countyName, townName, villageName, data) => {
    const { village_data } = this.state;
    village_data.forEach((v, i) => {
      const { county_name, township_name, village_name } = v;
      if (county_name === countyName && township_name === townName && village_name === villageName) {
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
  get_village_description = (countyName, townName, villageName) => {
    const { topoVillage } = this.state;
    const targetVillage = topoVillage.features.filter(v => {
      const { COUNTYNAME, TOWNNAME, VILLNAME } = v.properties;
      return COUNTYNAME === countyName && TOWNNAME === townName && VILLNAME === villageName;
    });
    return targetVillage[0].properties.village_description;
  }
  /**
   * 設定 村里 描述
   */
  set_village_description = (countyName, townName, villageName, data) => {
    const { village_data } = this.state;
    village_data.forEach((v, i) => {
      const { county_name, township_name, village_name } = v;
      if (county_name === countyName && township_name === townName && village_name === villageName) {
        if (data === v.village_description) {
          return;
        }
        this.setState(({
          village_data: update(village_data, { [i]: { village_description: { $set: data } } })
        }))
      }
    });
  }
  render() {
    const { setInfo } = this.props;
    const { topoCounty, topoTownship, topoVillage, county_data, township_data, village_data } = this.state
    return (
      <svg ref={ref => this.mapRef = ref} width={'100%'} height={'100%'}>
        <County
          topoData={topoCounty}
          data={county_data}
          path={this.path}
          setInfo={setInfo}
          clearSelectedCounty={this.clearSelectedCounty}
          zoomInSelectedCounty={this.zoomInSelectedCounty}
        />
        <Township
          topoData={topoTownship}
          data={township_data}
          path={this.path}
          setInfo={setInfo}
          clearSelectedTown={this.clearSelectedTown}
          zoomInSelectedTown={this.zoomInSelectedTown}
        />
        <Village
          topoData={topoVillage}
          data={village_data}
          path={this.path}
          setInfo={setInfo}
          clearSelectedVillage={this.clearSelectedVillage}
          zoomInSelectedVillage={this.zoomInSelectedVillage}
        />
        {/* <g className='countyContainer'>
          {
            topoCounty.features.map((county) => {
              const { COUNTYNAME, COUNTYCODE, county_data, county_description } = county.properties;
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
                        name: COUNTYNAME,
                        data: county_data,
                        description: county_description
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
            topoTownship.features.map((town) => {
              const { TOWNNAME, COUNTYNAME, TOWNCODE, township_data, township_description } = town.properties;
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
                        name: `${COUNTYNAME}${TOWNNAME}`,
                        data: township_data,
                        description: township_description
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
            topoVillage.features.map((village) => {
              const { VILLNAME, TOWNNAME, COUNTYNAME, VILLCODE, village_data, village_description } = village.properties;
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
                        name: `${COUNTYNAME}${TOWNNAME}${VILLNAME}`,
                        data: village_data,
                        description: village_description
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
        </g> */}
      </svg>
    );
  }
}
