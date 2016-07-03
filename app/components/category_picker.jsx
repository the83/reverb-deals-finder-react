import React from 'react';

const CategoryPicker = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired,
    handleSelection: React.PropTypes.func.isRequired,
    selected: React.PropTypes.string
  },

  handleSelection(event) {
    this.props.handleSelection(event.currentTarget.value);
  },

  render() {
    return (
      <div className="field">
        <label htmlFor="#categories">Category</label>
        <select onChange={this.handleSelection}
          name="category-picker"
          id="category-picker"
          value={this.props.selected}>
          {
            this.props.categories.map((category) => {
              return <option key={category.slug} value={category.slug}>
                {category.name}
              </option>;
            })
          }
        </select>
      </div>
    );
  }
});

export default CategoryPicker;
