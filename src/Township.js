import React, { PureComponent } from 'react';
import { MapManager } from './MapManager';

class Path extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = MapManager.getData('township', props.code);
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
      town,
      path,
      code,
      setInfo,
      clearSelectedTown,
      zoomInSelectedTown,
      setSelectedInfo
    } = this.props;
    const { TOWNNAME, COUNTYNAME } = town.properties;

    const { color } = this.state;

    return (
      <g
        id={TOWNNAME}
        data-code={code}
        data-county={COUNTYNAME}
        className='town'
        style={{
          opacity: 0,
          display: 'none'
        }}
      >
        <path
          fill={color}
          stroke='white'
          strokeWidth={0.05}
          d={path(town)}
          onMouseOver={() => {
            setInfo('township', code);
          }}
          onClick={() => {
            setSelectedInfo('township', code)
            clearSelectedTown();
            zoomInSelectedTown(town)
          }}
        />
      </g>
    )
  }
}

class Township extends PureComponent {
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
        const { TOWNNAME, TOWNCODE } = properties;
        return {
          key: TOWNCODE,
          name: TOWNNAME,
        }
    }
  }
  render() {
    const {
      topoData,
      path,
      setInfo,
      clearSelectedTown,
      zoomInSelectedTown,
      setSelectedInfo
    } = this.props;
    return (
      <g className='townContainer'>
        {
          topoData.features.map((town, i) => {
            const { key } = this.getProperties(town.properties);
            return (

              <Path
                key={key}
                code={key}
                town={town}
                path={path}
                setInfo={setInfo}
                clearSelectedTown={clearSelectedTown}
                zoomInSelectedTown={zoomInSelectedTown}
                setSelectedInfo={setSelectedInfo}
              />
            )
          })
        }
      </g>
    );
  }
}

export default Township;