import { scaleLinear } from 'd3-scale';

class Manager {
  loading = false;
  county_data = new Map();
  township_data = new Map();
  village_data = new Map();
  pathColorUpdater = new Map();
  colorLightest = '#4da6ff';
  colorDeepest = '#004080';
  colorScale = scaleLinear()
    .domain([0, 100])
    .range([this.colorLightest, this.colorDeepest])
    .clamp(true);

  onSubscribe = (code, event) => {
    this.pathColorUpdater.set(code, event);
  }
  init = () => {
    this.county_data.clear();
    this.township_data.clear();
    this.village_data.clear();
    this.pathColorUpdater.clear();
  }
  getData = (type, code) => {
    switch (type) {
      case 'county':
        return this.county_data.get(code);
      case 'township':
        return this.township_data.get(code);
      case 'village':
        return this.village_data.get(code);
      default:
        return null;
    }
  }

  setCountyData = (code, data) => {
    this.county_data.set(code, data)
  }
  /**
   * 設定 縣市 資料
   */
  set_county_data = (code, data) => {
    const targetData = this.county_data.get(code);
    if (targetData.data !== data) {
      this.county_data.set(code, {
        ...targetData,
        data: data
      })
      const colorUpdater = this.pathColorUpdater.get(code);
      colorUpdater(this.getColor(data))
    }
  }
  /**
   * 設定 縣市 描述
   */
  set_county_description = (code, data) => {
    const targetData = this.county_data.get(code);
    if (targetData.description !== data) {
      this.county_data.set(code, {
        ...targetData,
        description: data
      })
    }
  }

  setTownshipData = (code, data) => {
    this.township_data.set(code, data)
  }
  /**
   * 設定 鄉鎮區 資料
   */
  set_township_data = (code, data) => {
    const targetData = this.township_data.get(code);
    if (targetData.data !== data) {
      this.township_data.set(code, {
        ...targetData,
        data: data
      })
      const colorUpdater = this.pathColorUpdater.get(code);
      colorUpdater(this.getColor(data))
    }
  }
  /**
   * 設定 鄉鎮區 描述
   */
  set_township_description = (code, data) => {
    const targetData = this.township_data.get(code);
    if (targetData.description !== data) {
      this.township_data.set(code, {
        ...targetData,
        description: data
      })
    }
  }
  setVillageData = (code, data) => {
    this.village_data.set(code, data)
  }
  /**
   * 設定 村里 資料
   */
  set_village_data = (code, data) => {
    const targetData = this.village_data.get(code);
    if (targetData.data !== data) {
      this.village_data.set(code, {
        ...targetData,
        data: data
      })
      const colorUpdater = this.pathColorUpdater.get(code);
      colorUpdater(this.getColor(data))
    }
  }
  /**
   * 設定 村里 描述
   */
  set_village_description = (code, data) => {
    const targetData = this.village_data.get(code);
    if (targetData.description !== data) {
      this.village_data.set(code, {
        ...targetData,
        description: data
      })
    }
  }
  /**
   * 取得 所屬範圍的 顏色
   */
  getColor = (value) => {
    return this.colorScale(value);
  }
  /**
   * 設定 最淺 與 最深 的顏色
   */
  setColor = (min, max, lightest, deepest) => {
    this.colorLightest = lightest;
    this.colorDeepest = deepest;
    this.colorScale = scaleLinear()
      .domain([min, max])
      .range([this.colorLightest, this.colorDeepest])
      .clamp(true);
    this.county_data.forEach(({ data }, key) => {
      const colorUpdater = this.pathColorUpdater.get(key);
      colorUpdater(this.getColor(data))
    })
    this.township_data.forEach(({ data }, key) => {
      const colorUpdater = this.pathColorUpdater.get(key);
      colorUpdater(this.getColor(data))
    })
    this.village_data.forEach(({ data }, key) => {
      const colorUpdater = this.pathColorUpdater.get(key);
      colorUpdater(this.getColor(data))
    })
  }
}

export const MapManager = new Manager();