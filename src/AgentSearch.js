import React, { Component } from 'react';
// import './App.css';

import Search from './Search';
import AgentCard from './AgentCard';

// for transition
// import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import {CSSTransitionGroup} from 'react-transition-group'



// for API request
const request = require('request');
var parseString = require('xml2js').parseString;
var util = require('util');

// yikes
const apiKey = 'X1-ZWz1go6ika8u8b_7q4l5';



class AgentSearch extends Component {

  state = {
    result: false,
    dataObject: null,
    loading: false,
    agentObject: {}
  }

  setCall = (value, cause, source) => {
    console.log("name: " + source.Name);
    console.log("email: " + source.Email); // this is the key
    this.setState({
        result: true,
        loading: true,
        dataObject: {
          name: source.Name,
          email: source.Email
        },
      },
      this.makeCall
    );
    // when get response, update loading to false and add result object to state
  }

  makeCall = () => {
    let email = this.state.dataObject.email;
    let url = `https://www.zillow.com/webservice/ProReviews.htm?zws-id=${apiKey}&email=${email}`;
    console.log(url);
    const that = this;

    request(url, function (err, response, body) {
      if(err) {
          console.log('error:', err);
      } else {
        let returnObject = {};
        parseString(body, function(err, result) {
          returnObject.emailInput = email;
          let messageCode = result['ProReviews:proreviewresults']['message'][0]['code'][0];
          // if invalid email
          if (messageCode == 504) {
            returnObject.error = "The email is invalid";
          } else if (messageCode == 0) {

            // function to navigate and clean response
            let getAttribute = key => {
              let starting = result['ProReviews:proreviewresults']['response'][0]['result'][0]['proInfo'][0];                        
              if (starting == null) {
                  return `No profile info`;
              } else {
                  let starting2 = result['ProReviews:proreviewresults']['response'][0]['result'][0]['proInfo'][0][key];
                  if (starting2 == null) {
                      return `No ${key} info in this profile`;
                  } else {
                      let attribute = result['ProReviews:proreviewresults']['response'][0]['result'][0]['proInfo'][0][key][0];
                      if (attribute == null) {
                          return `No attribute info for ${key} in this profile`;
                      } else {
                          return util.inspect(attribute, false, null).replace(/'/g, "");
                      }
                  }
                }
              }
            
            // name 
            returnObject.name = getAttribute('name');
            // photo URL
            returnObject.photoURL = getAttribute('photo');
            // profile URL
            returnObject.profileURL = getAttribute('profileURL');
            // business name
            returnObject.bizName = getAttribute('businessName');
            // address
            returnObject.address = getAttribute('address');
            // phone
            returnObject.phone = getAttribute('phone');
            // specialties
            returnObject.specialties = getAttribute('specialties');
            // review count
            returnObject.reviewCount = Number(getAttribute('reviewCount'));
            // avg rating
            returnObject.avgRating = parseFloat(getAttribute('avgRating')).toFixed(1);
          }
        });
        that.finalizeObject(returnObject);         
      }
    });
  }

  finalizeObject = (returnObject) => {
    console.log(this.state.loading);
    console.log(this.state.result);
    console.log(returnObject);
    this.setState({
      result: true,
      loading: false,
      agentObject: returnObject
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="left">
          <p className="instructions">Start typing, or try these agents:</p> <br />
          <p>Abbey Drummond</p> <br/>
          <p>Christine Bybee</p> <br />
          <p>Dale Rex</p> <br />
          <p>Daryl Petersen</p> <br />
          <p>And many more...</p>
        </div>
        <div className="right">
          <div className="header">
              Getting to Know You
          </div>

          <div className="task-form">
            <div className="chat-bubble">Lawder, are you working with an agent?</div>
            <Search 
              setCall={this.setCall}
            />
            {this.state.result &&
              <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
              >
                <AgentCard 
                  result={this.state.result}
                  loading={this.state.loading}
                  name={this.state.dataObject.name}
                  email={this.state.dataObject.email}
                  agentObject={this.state.agentObject}
                />
              </CSSTransitionGroup>
            }
            <button className="primaryButton">Continue</button>
            
          </div>
        </div> 
      </div>
    );
  }
}


export default AgentSearch;
