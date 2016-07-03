import React from 'react';

const Listing = React.createClass({
  propTypes: {
    threshold: React.PropTypes.number.isRequired,
    shippingPrice: React.PropTypes.number.isRequired
  },

  price() {
    try {
      return this.props.listing.condition + ': ' +
        this.props.listing.price.display + '/' +
        this.props.listing.shipping.us_rate.display;
    } catch (_err) {
      return 'pricing not found';
    }
  },

  guidePrice() {
    try {
      return this.props.listing.price_guide.estimated_value.price_low.display + '-' +
        this.props.listing.price_guide.estimated_value.price_high.display;
    } catch (_err) {
      return 'price guide data not found';
    }
  },

  image() {
    return this.props.listing.photos[0]._links.thumbnail.href;
  },

  link() {
    return this.props.listing._links.web.href;
  },

  isGoodDeal() {
    try {
      const comparisonPrice = this.props.listing.price_guide.estimated_value.bottom_price +
        this.props.threshold +
        this.props.shippingPrice;

      const listingPrice = this.props.listing.price.amount +
        parseInt(this.props.listing.shipping.us_rate.amount);

      return comparisonPrice >= listingPrice;
    } catch(_err) {
      return false;
    }
  },

  render() {
    if (!this.isGoodDeal()) { return false; }
    return (
      <div className="card">
        <a href={this.link()}>
          <div className="card-header">
            {this.props.listing.title}
          </div>
          <img className="card-image" src={this.image()} />
          <div className="card-footer">
            <div>{this.price()}</div>
            <div>{this.guidePrice()}</div>
          </div>
        </a>
      </div>
    );
  }
});

export default Listing;
