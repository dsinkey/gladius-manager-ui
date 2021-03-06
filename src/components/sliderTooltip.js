import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import bemify from '../util/bemify';
import Tooltip from './shared/tooltip/tooltip';

const bem = bemify('slider-tooltip');

export default class SliderTooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values,
      isPristine: true,
    };

    this.onValuesUpdated = this.onValuesUpdated.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      values: props.values,
    });
  }

  onValuesUpdated(e) {
    this.setState({
      values: e.values,
      isPristine: false,
    });
  }

  apply() {
    this.setState({
      isPristine: true,
    });

    this.props.onApply(this.state.values);
  }

  render() {
    return (
      <Tooltip.TooltipContent
        onSubmit={this.apply}
        disableSubmit={this.state.isPristine}
        submitText="Apply"
        cancelText=""
      >
        <div className={bem()}>
          {this.props.descriptionRenderer(this.state.values)}
          <Rheostat
            className={bem('slider')}
            min={this.props.min}
            max={this.props.max}
            values={this.state.values}
            onValuesUpdated={this.onValuesUpdated}
          />
        </div>
      </Tooltip.TooltipContent>
    );
  }
}

SliderTooltip.defaultProps = {
  min: 0,
  max: 100,
};

SliderTooltip.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  onApply: PropTypes.func.isRequired,
  descriptionRenderer: PropTypes.func.isRequired,
};
