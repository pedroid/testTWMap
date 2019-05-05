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
    country: 'tw',
    selectedInfo: {}
  }
  setInfo = (info) => {
    this.setState({
      info
    })
  }
  setDatas = ({ counties, towns, villages }) => {
    const { country } = this.state;
    const selectedCounty = counties[0];
    let selectedTown = {};
    let selectedVillage = {}
    switch (country) {
      case 'kr':
        selectedTown = towns.filter(t => t.code.indexOf(selectedCounty.code) === 0)[0];
        selectedVillage = villages.filter(v => v.code.indexOf(selectedTown.code) === 0)[0];
        break;
      case 'tw':
      default:
        selectedTown = towns.filter(t => t.code.indexOf(selectedCounty.code) === 0)[0];
        selectedVillage = villages.filter(v => v.code.indexOf(selectedTown.code) === 0)[0]
        break;
    }

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
    const { code } = JSON.parse(e.target.value);
    const selectedTown = towns.filter(t => t.code.indexOf(code) === 0)[0];
    const selectedVillage = villages.filter(v => v.code.indexOf(selectedTown.code) === 0)[0];
    this.setState({
      selectedCounty: e.target.value,
      selectedTown: JSON.stringify(selectedTown),
      selectedVillage: JSON.stringify(selectedVillage),
    })
  }
  onTownSelect = (e) => {
    const { villages } = this.state;
    const { code } = JSON.parse(e.target.value);
    const selectedVillage = villages.filter(v => v.code === code)[0]
    this.setState({
      selectedTown: e.target.value,
      selectedVillage: JSON.stringify(selectedVillage)
    })
  }
  onVillageSelect = (e) => {
    this.setState({
      selectedVillage: e.target.value
    })
  }
  toCounty = () => {
    const { selectedCounty } = this.state;
    if (selectedCounty !== '') {
      const { code } = JSON.parse(selectedCounty);
      this.map.goto_county(code)
    }
  }
  getCountyData = () => {
    const { selectedCounty } = this.state;
    if (selectedCounty !== '') {
      const { code } = JSON.parse(selectedCounty);
      const data = this.map.get_county_data(code);
      alert(data);
    }
  }
  setCountyData = () => {
    const { selectedCounty } = this.state;
    const { code } = JSON.parse(selectedCounty);
    const data = this.countyData.value;
    this.map.set_county_data(code, data)
  }
  getCountyDescription = () => {
    const { selectedCounty } = this.state;
    if (selectedCounty !== '') {
      const { code } = JSON.parse(selectedCounty);
      const desciption = this.map.get_county_description(code)
      alert(desciption);
    }
  }
  setCountyDescription = () => {
    const { selectedCounty } = this.state;
    const { code } = JSON.parse(selectedCounty);
    const data = this.countyDescription.value;
    this.map.set_county_description(code, data)
  }
  toTown = () => {
    const { selectedTown } = this.state;
    if (selectedTown !== '') {
      const { code } = JSON.parse(selectedTown);
      this.map.goto_township(code)
    }
  }
  getTownshipData = () => {
    const { selectedTown } = this.state;
    if (selectedTown !== '') {
      const { code } = JSON.parse(selectedTown);
      const data = this.map.get_township_data(code);
      alert(data);
    }
  }
  setTownshipData = () => {
    const { selectedTown } = this.state;
    const { code } = JSON.parse(selectedTown);
    const data = this.townshipData.value;
    this.map.set_township_data(code, data)
  }
  getTownshipDescription = () => {
    const { selectedTown } = this.state;
    if (selectedTown !== '') {
      const { code } = JSON.parse(selectedTown);
      const desciption = this.map.get_township_description(code)
      alert(desciption);
    }
  }
  setTownshipDescription = () => {
    const { selectedTown } = this.state;
    const { code } = JSON.parse(selectedTown);
    const data = this.townshipDescription.value;
    this.map.set_township_description(code, data)
  }
  toVillage = () => {
    const { selectedVillage } = this.state;
    if (selectedVillage !== '') {
      const { code } = JSON.parse(selectedVillage);
      this.map.goto_village(code)
    }
  }
  getVillageData = () => {
    const { selectedVillage } = this.state;
    if (selectedVillage !== '') {
      const { code } = JSON.parse(selectedVillage);
      const data = this.map.get_village_data(code);
      alert(data);
    }
  }
  setVillageData = () => {
    const { selectedVillage } = this.state;
    const { code } = JSON.parse(selectedVillage);
    const data = this.villageData.value;
    this.map.set_village_data(code, data)
  }
  getVillageDescription = () => {
    const { selectedVillage } = this.state;
    if (selectedVillage !== '') {
      const { code } = JSON.parse(selectedVillage);
      const desciption = this.map.get_village_description(code)
      alert(desciption);
    }
  }
  setVillageDescription = () => {
    const { selectedVillage } = this.state;
    const { code } = JSON.parse(selectedVillage);
    const data = this.villageDescription.value;
    this.map.set_village_description(code, data)
  }
  backToTopLevel = () => {
    this.map.zoom_fit();
  }
  exportToPNG = () => {
    this.map.exportToPNG();
  }
  setSelectedInfo = (selectedInfo) => {
    this.setState({
      selectedInfo
    })
  }
  render() {
    const {
      info,
      counties,
      towns,
      villages,
      selectedCounty,
      selectedTown,
      selectedVillage,
      country,
      selectedInfo
    } = this.state;
    return (
      <div className="App">
        <div style={{ flex: 2 }}>
          <Map
            ref={ref => this.map = ref}
            country={country}
            setInfo={this.setInfo}
            setDatas={this.setDatas}
            setSelectedInfo={this.setSelectedInfo}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <div className='controller'>
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
                <input type="button" onClick={this.toCounty} value="傳送" />
                <input type="button" onClick={this.getCountyData} value="取得資料" />
                <input type="button" onClick={this.getCountyDescription} value="取得描述" />
              </div>
              <div>
                <input type="text" ref={ref => this.countyData = ref} />
                <input type="button" onClick={this.setCountyData} value="設定資料" />
              </div>
              <div>
                <input type="text" ref={ref => this.countyDescription = ref} />
                <input type="button" onClick={this.setCountyDescription} value="設定描述" />
              </div>
            </div>
            <div className='controller'>
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
                      const { name, code } = t;
                      const scounty = JSON.parse(selectedCounty);
                      if (t.code.indexOf(scounty.code) === 0) {
                        return (
                          <option key={code} value={JSON.stringify(t)}>{name}</option>
                        )
                      }
                    })
                  }
                </select>
                <input type="button" onClick={this.toTown} value="傳送" />
                <input type="button" onClick={this.getTownshipData} value="取得資料" />
                <input type="button" onClick={this.getTownshipDescription} value="取得描述" />
              </div>
              <div>
                <input type="text" ref={ref => this.townshipData = ref} />
                <input type="button" onClick={this.setTownshipData} value="設定資料" />
              </div>
              <div>
                <input type="text" ref={ref => this.townshipDescription = ref} />
                <input type="button" onClick={this.setTownshipDescription} value="設定描述" />
              </div>
            </div>
            <div className='controller'>
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
                      const { name, code } = v;
                      const stown = JSON.parse(selectedTown);
                      if ((v.code.indexOf(stown.code) === 0) && name !== '') {
                        return (
                          <option key={code} value={JSON.stringify(v)}>{name}</option>
                        )
                      }
                    })
                  }
                </select>
                <input type="button" onClick={this.toVillage} value="傳送" />
                <input type="button" onClick={this.getVillageData} value="取得資料" />
                <input type="button" onClick={this.getVillageDescription} value="取得描述" />
              </div>
              <div>
                <input type="text" ref={ref => this.villageData = ref} />
                <input type="button" onClick={this.setVillageData} value="設定資料" />
              </div>
              <div>
                <input type="text" ref={ref => this.villageDescription = ref} />
                <input type="button" onClick={this.setVillageDescription} value="設定描述" />
              </div>
            </div>
            <div>
              <input type="button" value="回到最上層" onClick={this.backToTopLevel} />
            </div>
            <div>
              <input type="button" value="儲存PNG圖檔" onClick={this.exportToPNG} />
            </div>
            {
              Object.keys(selectedInfo).length !== 0 ? (
                <div className='controller'>
                  <p>名稱： {selectedInfo.name}</p>
                  <p>Code： {selectedInfo.code}</p>
                  <p>資料： {selectedInfo.data}</p>
                  <p>描述： {selectedInfo.description}</p>
                </div>
              ) : null
            }
          </div>
          <InfoModal info={info} />
        </div>
      </div>
    );
  }
}
