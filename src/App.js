import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import { InfoModal } from './InfoModal';

export default class App extends Component {
  state = {
    info: null,
    counties: [],
    towns: [],
    villages: [],
    selectedCounty: '',
    selectedTown: '',
    selectedVillage: '',
  }
  setInfo = (info) => {
    this.setState({
      info
    })
  }
  setDatas = ({ counties, towns, villages }) => {
    const selectedCounty = counties[0];
    const selectedTown = towns.filter(t => t.countyName === selectedCounty.name)[0];
    const selectedVillage = villages.filter(v => v.countyName === selectedCounty.name && v.townName === selectedTown.name)[0]
    this.setState({
      counties,
      towns,
      villages,
      selectedCounty: JSON.stringify(selectedCounty),
      selectedTown: JSON.stringify(selectedTown),
      selectedVillage: JSON.stringify(selectedVillage),
    })
  }
  onCountySelect = (e) => {
    const { towns, villages } = this.state;
    const { name } = JSON.parse(e.target.value);
    const selectedTown = towns.filter(t => t.countyName === name)[0];
    const selectedVillage = villages.filter(v => v.countyName === name && v.townName === selectedTown.name)[0]
    this.setState({
      selectedCounty: e.target.value,
      selectedTown: JSON.stringify(selectedTown),
      selectedVillage: JSON.stringify(selectedVillage),
    })
  }
  onTownSelect = (e) => {
    const { villages } = this.state;
    const { name, countyName } = JSON.parse(e.target.value);
    const selectedVillage = villages.filter(v => v.countyName === countyName && v.townName === name)[0]
    this.setState({
      selectedTown: e.target.value,
      selectedVillage: JSON.stringify(selectedVillage)
    })
  }
  onVillageSelect = (e) => {
    const { name } = JSON.parse(e.target.value);
    this.setState({
      selectedVillage: e.target.value
    })
  }
  toCounty = () => {
    const { selectedCounty } = this.state;
    if (selectedCounty !== '') {
      const { name } = JSON.parse(selectedCounty);
      this.map.goto_county(name)
    }
  }
  toTown = () => {
    const { selectedTown } = this.state;
    if (selectedTown !== '') {
      const { name, countyName } = JSON.parse(selectedTown);
      this.map.goto_township(countyName, name)
    }
  }
  toVillage = () => {
    const { selectedVillage } = this.state;
    if (selectedVillage !== '') {
      const { name, countyName, townName } = JSON.parse(selectedVillage);
      this.map.goto_village(countyName, townName, name)
    }
  }
  backToTopLevel = () => {
    this.map.zoom_fit();
  }
  exportToPNG = () => {
    this.map.exportToPNG();
  }
  render() {
    const {
      info,
      counties,
      towns,
      villages,
      selectedCounty,
      selectedTown,
      selectedVillage
    } = this.state;
    return (
      <div className="App">
        <div style={{ flex: 2 }}>
          <Map
            ref={ref => this.map = ref}
            setInfo={this.setInfo}
            setDatas={this.setDatas}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <div>
              <select
                name="county"
                id="selectCounty"
                ref={ref => this.countySelect = ref}
                onChange={this.onCountySelect}
                value={selectedCounty}
              >
                {
                  counties.map((c, i) => <option key={c.code} value={JSON.stringify(c)}>{c.name}</option>)
                }
              </select>
              <input type="button" onClick={this.toCounty} value="傳送" style={{ marginLeft: 5 }} />
            </div>
            <div>
              <select
                name="town"
                id="selectTown"
                ref={ref => this.townSelect = ref}
                onChange={this.onTownSelect}
                value={selectedTown}
              >
                {
                  towns.map(t => {
                    const { name, countyName, code } = t;
                    if (JSON.parse(selectedCounty).name === countyName) {
                      return (
                        <option key={code} value={JSON.stringify(t)}>{name}</option>
                      )
                    }
                  })
                }
              </select>
              <input type="button" onClick={this.toTown} value="傳送" style={{ marginLeft: 5 }} />
            </div>
            <div>
              <select
                name="village"
                id="selectVillage"
                ref={ref => this.villageSelect = ref}
                onChange={this.onVillageSelect}
                value={selectedVillage}
              >
                {
                  villages.map(v => {
                    const { name, countyName, townName, code } = v;
                    if (JSON.parse(selectedCounty).name === countyName && JSON.parse(selectedTown).name === townName && name !== '') {
                      return (
                        <option key={code} value={JSON.stringify(v)}>{name}</option>
                      )
                    }
                  })
                }
              </select>
              <input type="button" onClick={this.toVillage} value="傳送" style={{ marginLeft: 5 }} />
            </div>
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
