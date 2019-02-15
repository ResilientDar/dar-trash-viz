import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextEllipsis from 'react-text-ellipsis'
import Draggable from 'react-draggable'


export class Info extends React.Component {


  static propTypes = {
    active: PropTypes.object.isRequired,
    currentFeature: PropTypes.object,
    infoActive: PropTypes.bool,
    showModalImg:  PropTypes.bool,
    zoomToFeature:  PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    
    var vari = {
      fontSize: '10px'
    }
    if(this.props.infoActive){
      
    return (
      <Draggable>
      <div className="bg-white popup row absolute pop bottom left shadow-darken10~ z1 wmax500 info ml12 mb36">
        <div> 
          <button className="info-close-button" onClick={() => 
            this.props.onClick(false, this.props.showModalImg)}>&#215;</button>
        </div>
        <div className='mb6 col popic spanpop'>
          <img src={this.props.currentFeature ? 
            this.props.currentFeature.properties.imp:''} 

          className="pic img-left" alt="Trash pile" onClick={() =>
           this.props.onClick(this.props.infoActive, true)} />

        </div>        
        <div className="col">
        <font size="5" face="Courier New" text-align="left" padding="0" >
          <table className="pop-table">
             <tbody>
                 <tr>
                     <th scope="row">Waste site type:</th>
                     {/* <td id="wst tx" style={vari}> {this.props.currentFeature?
                     this.props.currentFeature.properties.waste_site_type:''}</td> */}

                     <td id="wt tx" style={vari}>
                     <TextEllipsis lines={1}>
                     {this.props.currentFeature ? 
                      this.props.currentFeature.properties.ws : ''}
                     </TextEllipsis></td>

                 </tr>
                 <tr>
                      <th scope="row">Waste type:</th>
                      <td id="wt tx" style={vari}>
                      <TextEllipsis lines={5}>
                      {this.props.currentFeature ?
                       this.props.currentFeature.properties.wt :''}
                      </TextEllipsis></td>
                  </tr>
                  <tr>
                      <th scope="row">Trash size:</th>
                      <td id="ts tx" style={vari}>
                      {this.props.currentFeature ? 
                        this.props.currentFeature.properties.ts:''}
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">Clean Up Method:</th>
                      <td id="cu tx" style={vari}>
                      {this.props.currentFeature ? 
                        this.props.currentFeature.properties.clm :''}
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">Accessibility:</th>
                      <td id="at tx" style={vari}>
                      {this.props.currentFeature ? 
                        this.props.currentFeature.properties.at :''}
                      </td>
                  </tr>
                  <tr>
                      <th id="at tx" style={vari} onClick={() => 
                      this.props.onClick(this.props.infoActive,
                       this.props.showModalImg,
                       true)}>
                      <span className="zoom-point">Zoom to point</span>
                      </th>
                  </tr>
               
          </tbody> 
          </table>
          </font>
      </div>

      {this.props.showModalImg &&
        <div className="img-modal" onClick={() => 
           this.props.onClick(this.props.infoActive, false)}>
        <div className="modal-body">
          <img src={this.props.currentFeature ? 
            this.props.currentFeature.properties.imp:''} 
          className="modal-content" 
          alt="Trash pile"
          />
        </div>
      </div>
      }
      
      </div>
      </Draggable>
    );
  }else {return null;}

  }
}

function mapStateToProps(state) {
  let mainState = state["main"]
  return {
    active: mainState.active,
    options: mainState.options,
    currentFeature: mainState.currentFeature,
    infoActive: mainState.infoActive,
    showModalImg: mainState.showModalImg,
    zoomToFeature: mainState.zoomToFeature
  };
}

Info = connect(mapStateToProps)(Info);

export default Info;
