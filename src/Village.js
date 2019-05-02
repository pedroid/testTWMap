import React, { Component, PureComponent } from 'react';
import isEqual from 'react-fast-compare';
class Path extends PureComponent {
  render() {
    const { village, path, name, data, description, setInfo, clearSelectedVillage, zoomInSelectedVillage } = this.props;
    const { VILLNAME, TOWNNAME, COUNTYNAME } = village.properties;

    return (
      <g
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
          d={path(village)}
          onMouseOver={() => {
            setInfo({
              name,
              data,
              description
            });
          }}
          onClick={() => {
            clearSelectedVillage();
            zoomInSelectedVillage(village)
          }}
        />
      </g>
    )
  }
}

class Village extends Component {
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    if (!isEqual(data, nextProps.data)) {
      return true
    }
    return false;
  }
  render() {
    const { topoData, data, path, setInfo, clearSelectedVillage, zoomInSelectedVillage } = this.props;

    return (
      <g className='villageContainer'>
        {
          topoData.features.map((village, i) => {
            const { VILLNAME, TOWNNAME, COUNTYNAME, VILLCODE } = village.properties;
            {/* const targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME && d.village_name === VILLNAME)[0]; */ }
            let targetData = data[i];
            if (targetData.county_name !== COUNTYNAME && targetData.township_name !== TOWNNAME && targetData.village_name !== VILLNAME) {
              console.log('index Wrong!');
              targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME && d.village_name === VILLNAME)[0];
            }
            return (
              <Path
                key={VILLCODE}
                village={village}
                name={`${COUNTYNAME}${TOWNNAME}${VILLNAME}`}
                path={path}
                data={targetData.village_data}
                description={targetData.village_description}
                setInfo={setInfo}
                clearSelectedVillage={clearSelectedVillage}
                zoomInSelectedVillage={zoomInSelectedVillage}
              />
            )
          })
        }
      </g>
    );
  }
}

export default Village;