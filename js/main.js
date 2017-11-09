  gOrderItems = [];
  gSubtotal = 0;
  gTax = 0;
  gTotal = 0;

  function addItemToOrderList(name, price) {
      // add the item to the global order list
      gOrderItems.push({"name": name, "price":price});

      //  update the order list UI
      let $tableBody = $("#itemTB");
      let newRow = "<tr class='item-row'><td>" + name + "</td><td></td><td>" + price + "</td></tr>"
      let row = $(newRow);
      $tableBody.prepend(row);

      //  update the subtotal, tax, and total and their UIs
      // TODO: format to two decimal places
      gSubtotal += Math.round(Number(price.substring(1))*100)/100;
      gTax = Math.round(gSubtotal*0.1001*100)/100;
      gTotal = Math.round((gSubtotal+gTax)*100)/100;

      updateUITotals();
  }

  function updateUITotals() {
    let subtotalTD = $("#subtotalTD");
    let taxTD = $("#taxTD");
    let totalTD = $("#totalTD");
    subtotalTD.text("$" + gSubtotal.toFixed(2));
    taxTD.text("$" + gTax.toFixed(2));
    totalTD.text("$" + gTotal.toFixed(2));
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

  function clearOrderList() {
    gOrderItems = [];
    gSubtotal = 0;
    gTax = 0;
    gTotal = 0;

    //  update the order list UI
    $( ".item-row" ).remove();
    updateUITotals();
  }

  function validateForm() {
      var name = document.forms["infoForm"]["name"].value;
      var address = document.forms["infoForm"]["address"].value;
      var phone = document.forms["infoForm"]["phone"].value;
      if (name === "") {
        Materialize.toast('Please enter your name.', 3000) // 3000 is the duration of the toast
          return false;
      }
      if (phone === "") {
        Materialize.toast('Please enter your phone number.', 3000) // 3000 is the duration of the toast
          return false;
      }
      if (address === "") {
        Materialize.toast('Please enter your address.', 3000) // 3000 is the duration of the toast
          return false;
      }
      return true;
  }

  function processOrder() {
    if (gTotal === 0) {
      Materialize.toast('Add items you would like to purchase.', 3000) // 3000 is the duration of the toast
    } else if (validateForm()) {
      Materialize.toast('Thanks for your order!', 3000) // 3000 is the duration of the toast
      clearOrderList();
    }
  }

  function addFormSubmit() {
    $("#infoForm").submit(function(event) {
      event.preventDefault();
      processOrder();
    });
  }

  document.addEventListener("DOMContentLoaded", function() {


  addItemButtonListeners();
  addFormSubmit();

});  //  doc loaded
