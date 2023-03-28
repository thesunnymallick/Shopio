import { createReducer } from "@reduxjs/toolkit";

export const filtersReducer = createReducer(
  {
    searchText: "",
    FilterProducts: [],
  },
  {
    SEARCH_TEXT: (state, action) => {
      state.searchText = action.payload;
    },

    SEARCH_FILTER: (state, action) => {
      const { products, search } = action.payload;

      const SearchFilter = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.FilterProducts = SearchFilter;
    },
    SORT_FILTER: (state, action) => {
      const { sort, products } = action.payload;
      let TempProducts = [];
      if (sort === "Latest") {
        TempProducts = products;
      }
      if (sort === "Lowest-price") {
        TempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "Highest-price") {
        TempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "A-Z") {
        TempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "Z-A") {
        TempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      console.log("Temp is", TempProducts);
      state.FilterProducts = TempProducts;
    },

    CATEGORY_FILTER: (state, action) => {
      const { category, products } = action.payload;
      let TempProducts = [];
      if (category === "ALL") {
        TempProducts = products;
      } else {
        TempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.FilterProducts = TempProducts;
    },

    BRAND_FILTER: (state, action) => {
      const { brand, products } = action.payload;
      let TempProducts = [];
      if (brand === "ALL") {
        TempProducts = products;
      } else {
        TempProducts = products.filter((product) => product.brand === brand);
      }
      state.FilterProducts = TempProducts;
    },

    PRICE_FILTER: (state, action) => {
      const { price, products } = action.payload;
      let TempProducts = [];
      TempProducts = products.filter((product) => product.price <= price);
      state.FilterProducts = TempProducts;
    },
  }
);
