sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("com.omer.myapp.controller.Detail", {
    onInit: function () {
      this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    },

   _onObjectMatched: function (oEvent) {
    const productIndex = oEvent.getParameter("arguments").productIndex;
  
    const oModel = this.getView().getModel();
  
    const sPath = `/Products/${productIndex}`;
  
    const oData = oModel.getProperty(sPath);
  
    if (oData) {
    this.getView().bindElement(sPath);
    } else {
    console.error("No data found at path:", sPath);
    }
  },
    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("main");
    }
  });
});
