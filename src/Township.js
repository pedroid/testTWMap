import React, { Component, PureComponent } from 'react';
import isEqual from 'react-fast-compare';

class Path extends PureComponent {
  render() {
    const {
      town,
      path,
      name,
      code,
      data,
      description,
      setInfo,
      clearSelectedTown,
      zoomInSelectedTown,
      fill,
      setSelectedInfo
    } = this.props;
    const { TOWNNAME, COUNTYNAME } = town.properties;

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
          fill={fill}
          stroke='white'
          strokeWidth={0.05}
          d={path(town)}
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
      data,
      path,
      setInfo,
      clearSelectedTown,
      zoomInSelectedTown,
      getColor,
      setSelectedInfo
    } = this.props;
    return (
      <g className='townContainer'>
        {
          topoData.features.map((town, i) => {
            const { key, name } = this.getProperties(town.properties);
            /* const targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME)[0]; */
            let targetData = data[i];
            /* if (targetData.county_name !== COUNTYNAME && targetData.township_name !== TOWNNAME) {
              console.log('index Wrong!');
              targetData = data.filter(d => d.county_name === COUNTYNAME && d.township_name === TOWNNAME)[0];
            } */
            return (

              <Path
                key={key}
                code={key}
                town={town}
                name={name}
                path={path}
                fill={getColor(targetData.township_data)}
                data={targetData.township_data}
                description={targetData.township_description}
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