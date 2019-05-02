import React, { Component, PureComponent } from 'react';
import isEqual from 'react-fast-compare';

class Path extends PureComponent {
  render() {
    const { county, path, name, data, description, setInfo, clearSelectedCounty, zoomInSelectedCounty } = this.props;


    return (
      <g
        id={name}
        className='county'
      >
        <path
          fill='#FEFEE9'
          stroke='#777'
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
  render() {
    const { topoData, data, path, setInfo, clearSelectedCounty, zoomInSelectedCounty } = this.props;

    return (
      <g className='countyContainer'>
        {
          topoData.features.map((county, i) => {
            const { COUNTYNAME, COUNTYCODE } = county.properties;
            {/* const targetData = data.filter(d => d.county_name === COUNTYNAME)[0]; */ }
            let targetData = data[i];
            if (targetData.county_name !== COUNTYNAME) {
              console.log('index Wrong!');
              targetData = data.filter(d => d.county_name === COUNTYNAME)[0];
            }
            return (
              <Path
                key={COUNTYCODE}
                county={county}
                name={COUNTYNAME}
                path={path}
                data={targetData.county_data}
                description={targetData.county_description}
                setInfo={setInfo}
                clearSelectedCounty={clearSelectedCounty}
                zoomInSelectedCounty={zoomInSelectedCounty}
              />
            )
          })
        }
      </g>
    );
  }
}

export default County;