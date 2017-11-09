document.addEventListener("DOMContentLoaded", function() {

  gOrderItems = [];
  gSubtotal = 0;
  gTax = 0;
  gTotal = 0;

  function addItemToOrderList(name, price) {
      // add the item to the global order list
      gOrderItems.push({"name": name, "price":price});

      //  update the order list UI
      let $tableBody = $("#itemTB");
      let newRow = "<tr><td>" + name + "</td><td></td><td>" + price + "</td></tr>"
      let row = $(newRow);
      $tableBody.prepend(row);

      //  update the subtotal, tax, and total and their UIs
      // TODO: format to two decimal places
      gSubtotal += Math.round(Number(price.substring(1))*0.05*100)/100;
      gTax = Math.round(gSubtotal*0.05*100)/100;
      gTotal = Math.round((gSubtotal+gTax)*0.05*100)/100;

      let subtotalTD = $("#subtotalTD");
      let taxTD = $("#taxTD");
      let totalTD = $("#totalTD");
      subtotalTD.text("$" + gSubtotal);
      taxTD.text("$" + gTax);
      totalTD.text("$" + gTotal);

  }

  function processItemButton(event) {
    //  grab the price and label assoc'd with this item and add them to the order
    let name = $(event.target).closest('.card').find('h5').text();
    let price = $(event.target).closest('.card').find('p').text();
    addItemToOrderList(name, price);
  }

  // set up listeners on the menu item buttons
  function addItemButtonListeners() {
    let itemButtons = document.querySelectorAll('.itemButton');

    //  TODO:  fix this...can't I apply listener to all buttons at once?
    for (var i = 0; i < itemButtons.length; i++) {
      $(itemButtons[i]).click(function() {
        processItemButton(event);
      })
    }
  }

  function addFormSubmit() {
    $("#infoForm").submit(function() {
      alert("submit");
    });
  }

  addItemButtonListeners();
  addFormSubmit();

});  //  doc loaded
