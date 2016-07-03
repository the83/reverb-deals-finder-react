import React from 'react';
import update from 'immutability-helper';
import API from '../api.js';
import Q from 'q';
import DealFinderForm from './deal_finder_form.jsx';
import Listings from './listings.jsx';

const defaultState = {
  category: 'effects-and-pedals',
  threshold: 10,
  shippingPrice: 10,
  numPages: 1,
};

const DealFinder = React.createClass({
  componentDidMount() {
    this.fetchPages();
  },

  getInitialState() {
    return {
      listings: [],
      category: localStorage.getItem('category') || defaultState.category,
      threshold: parseInt(localStorage.getItem('threshold')) || defaultState.threshold,
      shippingPrice: parseInt(localStorage.getItem('shippingPrice')) || defaultState.shippingPrice,
      numPages: parseInt(localStorage.getItem('numPages')) || defaultState.numPages
    };
  },

  fetchPages() {
    let timeout = 0;

    for (let page = 1; page <= this.state.numPages; page++) {
      Q.delay(timeout).then(() => {
        API.fetchListings(page, this.state.category).done((response) => {
          this.addListings(response.listings);
        });
      });

      timeout += 2000;
    }
  },

  addListings(listings) {
    let timeout = 0;

    listings.forEach((listing) => {
      if (this.alreadyFetched(listing)) { return; }

      Q.delay(timeout).then(() => {
        API.fetchPricing(this.pricingQueryFor(listing)).done((response) => {
          listing.price_guide = response.price_guides[0] || {};
          this.addListing(listing);
        });
      });

      timeout += 200;
    });
  },

  addListing(listing) {
    let newListings = update(this.state, {
      listings: { $push : [listing] }
    });

    this.setState(newListings);
  },

  alreadyFetched(listing) {
    return this.state.listings.find((l) => { return l.id === listing.id; });
  },

  pricingQueryFor(listing) {
    return `${listing.make} ${listing.model} ${listing.year}`;
  },

  handleSubmit() {
    this.fetchPages();
  },

  handleChange(field, value) {
    const sanitizedValue = (field != 'category' && isNaN(value)) ? 0 : value;
    localStorage.setItem(field, sanitizedValue);
    this.setState({ [field]: sanitizedValue });
  },

  render() {
    return (
      <div>
        <Listings
          listings={this.state.listings}
          shippingPrice={this.state.shippingPrice}
          threshold={this.state.threshold} />
        <DealFinderForm
          category={this.state.category}
          threshold={this.state.threshold}
          shippingPrice={this.state.shippingPrice}
          numPages={this.state.numPages}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
      </div>
    );
  }
});

export default DealFinder;
