import React, { Component, PureComponent } from 'react';
import isEqual from 'react-fast-compare';

class Path extends PureComponent {
  render() {
    const {
      county,
      path,
      name,
      code,
      data,
      description,
      setInfo,
      clearSelectedCounty,
      zoomInSelectedCounty,
      fill,
      setSelectedInfo
    } = this.props;


    return (
      <g
        id={name}
        data-code={code}
        className='county'
      >
        <path
          fill={fill}
          stroke='white'
          strokeWidth={0.2}
          d={path(county)}
          onMouseOver={() => {
            setInfo({
              name,
              data,
              description
            });
          }}
          onClick={() => {
            setSelectedInfo({
              name,
              code,
              data,
              description
            })
            clearSelectedCounty();
            zoomInSelectedCounty(county);
          }}
        />
      </g>
    )
  }
}
class County extends Component {
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
      data,
      path,
      setInfo,
      clearSelectedCounty,
      zoomInSelectedCounty,
      getColor,
      setSelectedInfo
    } = this.props;

    return (
      <g className='countyContainer'>
        {
          topoData.features.map((county, i) => {
            const { key, name } = this.getProperties(county.properties)
            /* const targetData = data.filter(d => d.county_name === COUNTYNAME)[0]; */
            let targetData = data[i];
            if (targetData.county_name !== name) {
              console.log('index Wrong!');
              targetData = data.filter(d => d.county_name === name)[0];
            }
            return (
              <Path
                key={key}
                code={key}
                county={county}
                name={name}
                path={path}
                fill={getColor(targetData.county_data)}
                data={targetData.county_data}
                description={targetData.county_description}
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