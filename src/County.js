import React, { PureComponent } from 'react';
import { MapManager } from './MapManager'

class Path extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = MapManager.getData('county', props.code);
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
      county,
      path,
      code,
      setInfo,
      clearSelectedCounty,
      zoomInSelectedCounty,
      setSelectedInfo
    } = this.props;

    const { name, color } = this.state;

    return (
      <g
        id={name}
        data-code={code}
        className='county'
      >
        <path
          fill={color}
          stroke='white'
          strokeWidth={0.2}
          d={path(county)}
          onMouseOver={() => {
            setInfo('county', code);
          }}
          onClick={() => {
            setSelectedInfo('county', code)
            clearSelectedCounty();
            zoomInSelectedCounty(county);
          }}
        />
      </g>
    )
  }
}
class County extends PureComponent {
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
        const { COUNTYNAME, COUNTYCODE } = properties;
        return {
          key: COUNTYCODE,
          name: COUNTYNAME,
        }
    }
  }
  render() {
    const {
      topoData,
      path,
      setInfo,
      clearSelectedCounty,
      zoomInSelectedCounty,
      setSelectedInfo
    } = this.props;

    return (
      <g className='countyContainer'>
        {
          topoData.features.map((county, i) => {
            const { key } = this.getProperties(county.properties)

            return (
              <Path
                key={key}
                code={key}
                county={county}
                path={path}
                setInfo={setInfo}
                clearSelectedCounty={clearSelectedCounty}
                zoomInSelectedCounty={zoomInSelectedCounty}
                setSelectedInfo={setSelectedInfo}
              />
            )
          })
        }
      </g>
    );
  }
}

export default County;