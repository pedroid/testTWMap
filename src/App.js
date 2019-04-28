import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import { InfoModal } from './InfoModal';

export default class App extends Component {
  state = {
    info: null,
    counties: []
  }
  setInfo = (info) => {
    this.setState({
      info
    })
  }
  setCounties = (counties) => {
    this.setState({
      counties
    })
  }
  toCounty = () => {
    if (this.countySelect.value !== '') {
      this.map.zoomInSelectedCounty(JSON.parse(this.countySelect.value))
    }
  }
  backToTopLevel = () => {
    this.map.zoom_fit();
  }
  exportToPNG = () => {
    this.map.exportToPNG();
  }
  render() {
    const { info, counties } = this.state;
    return (
      <div className="App">
        <div style={{ flex: 2 }}>
          <Map ref={ref => this.map = ref} setInfo={this.setInfo} setCounties={this.setCounties} />
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <select name="county" id="selectCounty" ref={ref => this.countySelect = ref}>
              {
                counties.map(c => <option key={c.properties.name} value={JSON.stringify(c)}>{c.properties.name}</option>)
              }
            </select>
            <input type="button" onClick={this.toCounty} value="傳送" style={{ marginLeft: 5 }} />
            <div>
              <input type="button" value="回到最上層" onClick={this.backToTopLevel} />
            </div>
            <div>
              <input type="button" value="儲存PNG圖檔" onClick={this.exportToPNG} />
            </div>
          </div>
          <InfoModal info={info} />
        </div>
      </div>
    );
  }
}
