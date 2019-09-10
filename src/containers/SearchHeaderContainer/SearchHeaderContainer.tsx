import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios, { CancelTokenSource } from 'axios';

import { RootStore } from '../../store';
import { setSearchIsWriting, setCurrentCriteriaAction, searchCocktailWithNameAction } from '../../store/search/action';
import SearchHeader from '../../components/SearchHeader';

interface Props {
  isWriting: boolean;
  currentSearchCriteria: string;
  isSearching: boolean;

  setSearchIsWriting: (value: boolean) => void;
  setCurrentCriteriaAction: (value: string) => void;
  searchCocktailWithNameAction: (name: string, cancelToken: CancelTokenSource) => Promise<any>;
}

type SearchHeaderContainerProps = typeof dispatchProps & Props;

const CancelToken = axios.CancelToken;

export class SearchHeaderContainer extends PureComponent<SearchHeaderContainerProps> {
  private source = CancelToken.source();

  public render() {
    return (
      <SearchHeader
        searchText={this.props.currentSearchCriteria}
        onFocusChange={(value: boolean) => () => {
          this.props.setSearchIsWriting(value);
        }}
        onTextChange={(text) => {
          if (text.length >= 3) {
            if (this.props.isSearching) {
              console.log(this.source.token);
              this.source.cancel()
              this.source = CancelToken.source();
            }

            // Attemp to search
            this.props.searchCocktailWithNameAction(text, this.source)
              .catch((exception) => {
                if (axios.isCancel(exception)) {
                  console.log('Request cancel', exception);
                  return;
                }
              });
          }
          
          this.props.setCurrentCriteriaAction(text);
        }}
      />
    )
  }
}

const stateToProps = ({Search}: RootStore) => {
  const {isWriting, currentSearchCriteria, isSearching} = Search;

  return {
    isWriting,
    currentSearchCriteria,
    isSearching,
  };
};

const dispatchProps = (dispatch: (_: any) => any) => {
  return {
    setSearchIsWriting: (value: boolean) => {
      return dispatch(setSearchIsWriting(value));
    },
    setCurrentCriteriaAction: (value: string) => {
      return dispatch(setCurrentCriteriaAction(value));
    },
    searchCocktailWithNameAction: (name: string, cancelToken: CancelTokenSource): Promise<any> => {
      return dispatch(searchCocktailWithNameAction(name, cancelToken));
    }
  }
};


export default connect(stateToProps, dispatchProps)(SearchHeaderContainer);
