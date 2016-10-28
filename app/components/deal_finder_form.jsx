import React from 'react';
import API from '../api.js';
import CategoryPicker from './category_picker.jsx';

const DealFinderForm = React.createClass({
  propTypes: {
    handleChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    category: React.PropTypes.string.isRequired,
    threshold: React.PropTypes.number.isRequired,
    shippingPrice: React.PropTypes.number.isRequired,
    numPages: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      categories: []
    };
  },

  componentDidMount() {
    API.fetchCategories().done((response) => {
      this.setState({ categories: response.categories });
    });
  },

  handleChange(field, value) {
    this.props.handleChange(field, value);
  },

  handleCategoryChange(value) {
    this.handleChange('category', value);
  },

  handleThresholdChange(event) {
    this.handleChange('threshold', parseInt(event.target.value));
  },

  handleButtonClick() {
    this.props.handleSubmit();
  },

  render() {
    return (
      <div id="deal-finder-form">
        <div className="fields">
          <div className="field">
            <CategoryPicker
              categories={this.state.categories}
              selected={this.props.category}
              handleSelection={this.handleCategoryChange}/>
          </div>

          <div className="field">
            <label htmlFor="threshold">
              $ Above Price Guide Min:
            </label>
            <input id="threshold" name="threshold" type="text" value={this.props.threshold} onChange={this.handleThresholdChange} />
          </div>

          <div className="field">
            <button id="fetch-more" onClick={this.handleButtonClick}>
              <span>Fetch More!</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default DealFinderForm;
