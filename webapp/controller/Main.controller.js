sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel" 
], function(Controller, JSONModel) { 
  "use strict";

  return Controller.extend("com.omer.myapp.controller.Main", {
    onInit: function () {
      const oModel = new JSONModel();
      oModel.loadData("model/products.json");
      this.getView().setModel(oModel);
    },
	onItemPress: function(oEvent) {
		  const index = oEvent.getSource().getBindingContext().getPath().split("/")[2];
		  this.getOwnerComponent().getRouter().navTo("detail", {productIndex: index})
	}
  });
});
