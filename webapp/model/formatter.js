sap.ui.define(function () {
	"use strict";

	return {
		formatValue: function (value) {
			return value && value.toUpperCase();
		},
		stockState: function(stock) {
			return stock < 10 ? 'Warning' : 'None'
		},
		formatPrice: function(price) {
			return '$' + price
		}
	};
});
