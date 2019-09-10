import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { RootStore } from '../../store';
import { setSearchIsWriting, setCurrentCriteriaAction } from '../../store/search/action';
import Button from '../../components/Button';
import { Keyboard } from 'react-native';
import { setDrinkAction } from '../../store/cocktail/action';

interface Props {
  isWriting: boolean;
  currentSearchCriteria: string;
}

type CancelButtonProps = Props & typeof dispatchProps;

export class CancelHeaderButtonContainer extends PureComponent<CancelButtonProps> {
  public render() {
    if (this.props.isWriting === false) {
      return null;
    }

    return (
      <Button
        style={{marginHorizontal: 5}}
        buttonType={'PlainText'}
        onClick={this.cancelSearch}
        textStyle={{color: '#EB7571', fontSize: 20, fontWeight: '400'}}
        text={'Cancel'}
      />
    );
  }

  private cancelSearch = () => {
    // Clean criteria field
    this.props.setCurrentCriteriaAction('');

    // Set not writing
    this.props.setSearchIsWriting(false);

    // Set empty list of drinks
    this.props.setDrinkAction([]);

    // Hide kryboard
    Keyboard.dismiss();
  }
}

const stateToProps = ({Search}: RootStore) => {
  const {isWriting, currentSearchCriteria} = Search;

  return {
    isWriting,
    currentSearchCriteria,
  };
};

const dispatchProps = {
  setSearchIsWriting,
  setCurrentCriteriaAction,
  setDrinkAction,
};



export default connect(stateToProps, dispatchProps)(CancelHeaderButtonContainer);
