sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel" ,
  "sap/ui/core/Fragment"
], function(Controller, JSONModel, Fragment ) { 
  "use strict";

  const TABLE_ID = "productTable";
  const SORT_FIELD = "price";
  const SEARCH_FIELD = "name";

  return Controller.extend("com.omer.myapp.controller.Main", {  
    onInit: function () {
      this._bSortFalg = false;
      const oModel = new JSONModel();
      oModel.loadData("model/products.json");
      this.getView().setModel(oModel);
    },
	onItemPress: function(oEvent) {
		  const index = oEvent.getSource().getBindingContext().getPath().split("/")[2];
		  this.getOwnerComponent().getRouter().navTo("detail", {productIndex: index})
	},
  onSort: function() {
    const oTable = this.byId(TABLE_ID);
    const oBinding = oTable.getBinding("items");

    const oSorter = new sap.ui.model.Sorter(SORT_FIELD, this._bSortFalg);
    oBinding.sort([oSorter]);
    const oButton = this.byId("sortButton");
    oButton.setIcon(this._bSortFalg ? 'sap-icon://sort-ascending' : 'sap-icon://sort-descending');
    oButton.setTooltip(this._bSortFlag ? "Sort Ascending" : "Sort Descending");
    this._bSortFalg = !this._bSortFalg
  },

  onSearch:function(oEvent) {
    const searchValue = oEvent.getParameter("newValue");
    const oBinding = this.byId(TABLE_ID).getBinding("items");
    const oFilter = new sap.ui.model.Filter(SEARCH_FIELD, sap.ui.model.FilterOperator.Contains, searchValue);
    oBinding.filter([oFilter]);
  },

onAddProductPress: async function () {
  if (!this._productDialog) {
    this._productDialog = await Fragment.load({
      id: this.getView().getId(), // optional, for stable ID prefixing
      name: "com.omer.myapp.view.CreateProductDialog",
      controller: this
    });
    this._productDialog.setModel(new JSONModel({
      id: "",
    name: "",
    price: 0
}), "productModel");
    this.getView().addDependent(this._productDialog);
  }

  this._productDialog.open();
},
onCancel: function() {
  this._productDialog.close();
},
onCreateProduct: function() {
 const productData = this._productDialog.getModel("productModel").getData();
  console.log(productData);
}
  });
});
