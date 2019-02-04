import React from 'react'
import PropTypes from 'prop-types'

export default class Tooltip extends React.Component {

  render() {
    const { features } = this.props;

    const renderFeature = (feature, i) => {
      if(feature.layer && feature.layer.id === 'wards'){
        return (
        <div key={i}>
          <strong className='mr3 center'>WARD DETAILS</strong> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > Ward name :  </span>
           {feature && feature.properties && feature.properties.ward_name}
           </span> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > District name : </span>
           {feature && feature.properties && feature.properties.district_n}
           </span> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > Total waste piles count :  </span>
          {feature &&  feature.properties && feature.properties.trash_pile}
          </span>
        </div>
      )
      }else if(feature.layer && feature.layer.id === 'sub-wards') {
        return (
        <div key={i}>
          <strong className='mr3 center'>SUBWARD DETAILS</strong> <br></br>
          <span className='color-gray-light'>
            <span className='txt-bold' > Subward name :  </span>
           {feature && feature.properties && feature.properties.adm4_vil_m}
           </span> <br></br>
           <span className='color-gray-light'>
           <span className='txt-bold' > Ward name :  </span>
           {feature && feature.properties && feature.properties.adm3_ward}
           </span> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > District name : </span>
           {feature && feature.properties && feature.properties.adm2_distr}
           </span> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > Total waste piles count : </span>  
          {feature &&  feature.properties && feature.properties.trash_sub}
          </span>
        </div>
      )
      }
      else if(feature.layer && feature.layer.id === 'shinas') {
        return (
        <div key={i}>
          <strong className='mr3 center'>SHINA DETAILS</strong> <br></br>
          <span className='color-gray-light'>
            <span className='txt-bold' > Shina number :  </span>
           {feature && feature.properties && feature.properties.shina_numb}
           </span> <br></br>
           <span className='color-gray-light'>
           <span className='txt-bold' > Shina leader (Mjumbe) :  </span>
           {feature && feature.properties && feature.properties.mjumbe}
           </span> <br></br>
           <span className='color-gray-light'>
            <span className='txt-bold' > Subward name :  </span>
           {feature && feature.properties && feature.properties.subward}
           </span> <br></br>
           <span className='color-gray-light'>
           <span className='txt-bold' > Ward name :  </span>
           {feature && feature.properties && feature.properties.ward}
           </span> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > District name : </span>
           {feature && feature.properties && feature.properties.district}
           </span> <br></br>
          <span className='color-gray-light'>
          <span className='txt-bold' > Total waste piles count : </span>  
          {feature &&  feature.properties && feature.properties.trash_sh}
          </span>
        </div>
      )
      }
    };

    return (
      <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom">
        <div className="flex-child px12 py12 bg-gray-dark color-white shadow-darken10 round txt-s w300 clip txt-truncate">
          {/*Check if features are defined then map them*/}

          {features && features.map(renderFeature)}
          
        </div>
        <span className="flex-child color-gray-dark triangle triangle--d"></span>
      </div>
    );
  }
}