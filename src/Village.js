import React, { Component, PureComponent } from 'react';
import isEqual from 'react-fast-compare';
class Path extends PureComponent {
  render() {
    const {
      village,
      path,
      code,
      name,
      data,
      description,
      setInfo,
      clearSelectedVillage,
      zoomInSelectedVillage,
      setSelectedVillageInfo,
      fill
    } = this.props;
    const { VILLNAME, TOWNNAME, COUNTYNAME } = village.properties;

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
          fill={fill}
          stroke='white'
          strokeWidth={0.05}
          d={path(village)}
          onMouseOver={() => {
            setInfo({
              name,
              data,
              description
            });
          }}
          onClick={() => {
            setSelectedVillageInfo({
              name,
              code,
              data,
              description
            });
            clearSelectedVillage();
            zoomInSelectedVillage(village);
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
      data,
      path,
      setInfo,
      clearSelectedVillage,
      zoomInSelectedVillage,
      getColor,
      setSelectedVillageInfo
    } = this.props;

    return (
      <g className='villageContainer'>
        {
          topoData.features.map((village, i) => {
            const { key, name } = this.getProperties(village.properties);
            /* const targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME && d.village_name === VILLNAME)[0]; */
            let targetData = data[i];
            /* if (targetData.county_name !== COUNTYNAME && targetData.township_name !== TOWNNAME && targetData.village_name !== name) {
              console.log('index Wrong!');
              targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME && d.village_name === name)[0];
            } */
            return (
              <Path
                key={key}
                code={key}
                village={village}
                name={name}
                path={path}
                fill={getColor(targetData.village_data)}
                data={targetData.village_data}
                description={targetData.village_description}
                setInfo={setInfo}
                clearSelectedVillage={clearSelectedVillage}
                zoomInSelectedVillage={zoomInSelectedVillage}
                setSelectedVillageInfo={setSelectedVillageInfo}
              />
            )
          })
        }
      </g>
    );
  }
}

export default Village;