import React, { Component, PureComponent } from 'react';
import isEqual from 'react-fast-compare';

class Path extends PureComponent {
  render() {
    const { town, path, name, data, description, setInfo, clearSelectedTown, zoomInSelectedTown } = this.props;
    const { TOWNNAME, COUNTYNAME } = town.properties;

    return (
      <g
        id={TOWNNAME}
        data-county={COUNTYNAME}
        className='town'
        style={{
          opacity: 0,
          display: 'none'
        }}
      >
        <path
          fill='#FEFEE9'
          stroke='pink'
          strokeWidth={0.2}
          d={path(town)}
          onMouseOver={() => {
            setInfo({
              name,
              data,
              description
            });
          }}
          onClick={() => {
            clearSelectedTown();
            zoomInSelectedTown(town)
          }}
        />
      </g>
    )
  }
}

class Township extends Component {
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    if (!isEqual(data, nextProps.data)) {
      return true
    }
    return false;
  }
  render() {
    const { topoData, data, path, setInfo, clearSelectedTown, zoomInSelectedTown } = this.props;
    return (
      <g className='townContainer'>
        {
          topoData.features.map((town, i) => {
            const { TOWNNAME, COUNTYNAME, TOWNCODE } = town.properties;
            {/* const targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME)[0]; */ }
            let targetData = data[i];
            if (targetData.county_name !== COUNTYNAME && targetData.township_name !== TOWNNAME) {
              console.log('index Wrong!');
              targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME)[0];
            }
            return (

              <Path
                key={TOWNCODE}
                town={town}
                name={`${COUNTYNAME}${TOWNNAME}`}
                path={path}
                data={targetData.township_data}
                description={targetData.township_description}
                setInfo={setInfo}
                clearSelectedTown={clearSelectedTown}
                zoomInSelectedTown={zoomInSelectedTown}
              />
            )
          })
        }
      </g>
    );
  }
}

export default Township;