import React, { PureComponent } from 'react';
import { MapManager } from './MapManager';

class Path extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = MapManager.getData('village', props.code);
    const color = MapManager.getColor(data);
    this.state = {
      color
    }
  }
  componentDidMount() {
    const { code } = this.props;
    MapManager.onSubscribe(code, this.updateColor)
  }
  updateColor = (color) => {
    this.setState({
      color
    })
  }
  render() {
    const {
      village,
      path,
      code,
      setInfo,
      clearSelectedVillage,
      zoomInSelectedVillage,
      setSelectedInfo,
    } = this.props;
    const { VILLNAME, TOWNNAME, COUNTYNAME } = village.properties;
    const { color } = this.state;
    return (
      <g
        id={VILLNAME}
        data-code={code}
        data-town={TOWNNAME}
        data-county={COUNTYNAME}
        className='village'
        style={{
          opacity: 0,
          display: 'none',
        }}
      >
        <path
          fill={color}
          stroke='white'
          strokeWidth={0.05}
          d={path(village)}
          onMouseOver={() => {
            setInfo('village', code);
          }}
          onClick={() => {
            setSelectedInfo('village', code);
            clearSelectedVillage();
            zoomInSelectedVillage(village);
          }}
        />
      </g>
    )
  }
}

class Village extends PureComponent {
  getProperties = (properties) => {
    const { country } = this.props;
    switch (country) {
      case 'kr':
        const { name, code } = properties;
        return {
          key: code,
          name
        }
      case 'tw':
      default:
        const { VILLNAME, VILLCODE } = properties;
        return {
          key: VILLCODE,
          name: VILLNAME,
        }
    }
  }
  render() {
    const {
      topoData,
      path,
      setInfo,
      clearSelectedVillage,
      zoomInSelectedVillage,
      setSelectedInfo
    } = this.props;

    return (
      <g className='villageContainer'>
        {
          topoData.features.map((village, i) => {
            const { key } = this.getProperties(village.properties);

            return (
              <Path
                key={key}
                code={key}
                village={village}
                path={path}
                setInfo={setInfo}
                clearSelectedVillage={clearSelectedVillage}
                zoomInSelectedVillage={zoomInSelectedVillage}
                setSelectedInfo={setSelectedInfo}
              />
            )
          })
        }
      </g>
    );
  }
}

export default Village;