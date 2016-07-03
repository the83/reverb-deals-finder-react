import React from 'react';
import Listing from './listing.jsx';

const Listings = React.createClass({
  propTypes: {
    listings: React.PropTypes.array.isRequired,
    shippingPrice: React.PropTypes.number.isRequired,
    threshold: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <div id="deals">
        {this.props.listings.map((listing) => {
          return <Listing key={listing.id}
            listing={listing}
            shippingPrice={this.props.shippingPrice}
            threshold={this.props.threshold}/>;
        })}
      </div>
    );
  }
});

export default Listings;
