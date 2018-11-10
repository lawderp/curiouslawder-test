import React from 'react';
import PropTypes from 'prop-types';

import {ReactiveBase, DataSearch} from '@appbaseio/reactivesearch';


const Search = props => 
  <div className="searchDiv">
    <ReactiveBase
      // app="MovieAppFinal"
      app="agent-reviews-lawder-2"
      // credentials="RxIAbH9Jc:6d3a5016-5e9d-448f-bd2b-63c80b401484"
      credentials="RX8tr5U1J:b020bb52-c479-42f5-840c-0e592c9776b5"
    >
      <DataSearch     
        className="search-bar"                   
        componentId="mainSearch"            
        dataField={["Name"]}                      
        queryFormat="and"            
        placeholder="Search for your agent" 
        onSuggestion={(suggestion) => (
          {
            label: (<div>{suggestion._source.Name}</div>),
            value: suggestion._source.Name,
            source: suggestion._source  // for onValueSelected to work with onSuggestion
          })
        }
        onValueSelected={
          (value, cause, source) => props.setCall(value, cause, source)
        }
        downShiftProps={
          {
            defaultIsOpen: true,
            initialIsOpen: true,
            defaultHighlightedIndex: 0
          }
        }
      />
    </ReactiveBase>
  </div>;

  
  Search.propTypes = {
    setCall: PropTypes.func.isRequired,
  }


export default Search;