import React, { Component } from 'react';
import request from 'request';
import consts from '../consts';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import './react-autocomplete2.css';

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestionValue(suggestion) {
    window.location.replace(consts.myurl + "coin/" + suggestion.name);
    return `${suggestion.fullname}`;//${suggestion.last}`;
  }
  
  function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.fullname}`;// ${suggestion.last}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query, {insideWords: true});
    const parts = AutosuggestHighlightParse(suggestionText, matches);
  
  
    // Div vs span
    return (
      <span >  {/*className={'suggestion-content ' + suggestion.twitter}> */}
      <img className="imagelol" src={"https://cryptocompare.com"+suggestion.image}></img>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
              console.log("cryptocompare.com" + suggestion.image);
              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  } 
  class SearchCoin2 extends Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: []
      };    
    }

    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };

    onSuggestionsFetchRequested = ({ value }) => {

        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
            this.setState({
                suggestions : []
            })
        } else {
          var url = 'http://localhost:4000/api/search/' + escapedValue;
            request.get(url, function(err, httpResponse, body) {
                this.setState({
                    suggestions : JSON.parse(body)
                })
            }.bind(this));
        }
    };
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    }
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Search coin...",
        value,
        onChange: this.onChange
      };
      return (
        <Autosuggest 
          suggestions={suggestions}
          insideWords
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected ={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      );
    }
  }
  
export default SearchCoin2;
  