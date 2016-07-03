const PRICE_GUIDE_PATH = 'https://reverb.com/api/priceguide';
const CATEGORIES_PATH = 'https://reverb.com/api/categories';
const $ = require("jquery");

const API = {
  fetchCategories() {
    return $.ajax({ type: 'GET', url: CATEGORIES_PATH });
  },

  fetchListings(page, category) {
    return $.ajax({
      url: CATEGORIES_PATH + '/' + category,
      data: { page: page }
    });
  },

  fetchPricing(query) {
    return $.ajax({
      url: PRICE_GUIDE_PATH,
      data: { query: query }
    });
  }
};

export default API;
