import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon, {colorPalette} from 'material-icons-react';

var parser = require('parse-address'); 
var Loader = require('react-loaders').Loader;


class AgentCard extends React.Component {
  constructor() {
    super();

    this.getCity = this.getCity.bind(this);
    // this.state = {
    //   loading: false
    // };

  }

  getCity() {
    let parsed = parser.parseLocation(this.props.agentObject.address);
    if (parsed == null) {
      return "";
    }
    let location = parsed.city + ", " + parsed.state;
    if (location == null) {
      return "";
    }
    return location;
  }

  render() {
    return (
      <div className="agentCard">
        {this.props.loading &&
          <div className="loader"></div>
        }
        <div className={this.props.loading ? 'card-left loading' : 'card-left'}>
          <img src={this.props.agentObject.photoURL} alt="Profile pic" height="120" width="120"></img>
        </div>

        <div className={this.props.loading ? 'card-right loading' : 'card-right'}>

          <div className="card-header">
            <h3>{this.props.agentObject.name}</h3>
            <div className="rating">
              <MaterialIcon icon="star" size={20} color="#F6BD2A" />
              <p className="rating-avg">{this.props.agentObject.avgRating}</p>
              <p className="rating-count">({this.props.agentObject.reviewCount} reviews)</p>
            </div>
          </div>

          <div className="card-business">
            <MaterialIcon icon="business" size={24} color={"#C4C4C4"}/>
            <div className="card-location">
              <p className="location-biz">{this.props.agentObject.bizName}</p>
              <p className="location-city">{this.getCity()}</p>
            </div>
          </div>

          <div className="card-contact">
            <div className="contact-phone">
              <MaterialIcon icon="phone" size={24} color="#C4C4C4" />
              <p>{this.props.agentObject.phone}</p>              
            </div>
            <div className="contact-email">
              <MaterialIcon icon="email" size={24} color="#C4C4C4" />
              <p>{this.props.agentObject.emailInput}</p>
            </div>
          </div>
          
          <div className="zillow-link">
            <img className="zillow-logo"></img>
            <a href={this.props.agentObject.profileURL} target="_blank">Full profile on Zillow</a>
            <div className="zillow-icon"><MaterialIcon icon="chevron_right" color="#757575" size={20} /></div>
          </div>
        </div>
      </div>
    )
  }
}


  AgentCard.propTypes = {
    result: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    agentObject: PropTypes.object
  }


export default AgentCard;