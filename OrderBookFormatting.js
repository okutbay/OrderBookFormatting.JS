// JavaScript source code
// orderformatting.js
// used to format items in your orderbook related to price changes

function test() {
    //TEST: splitWeakStrong
    var number1 = "7265.3";
    var number2 = "7264.4";
    var parts = new Array(2);
    parts = splitWeakStrong(number2, number1);

    //TEST: splitIntegerPart
    var number1 = "1.531,4063";
    parts = new Array(2);
    parts = splitIntegerPart(number1, ',');
}

function splitWeakStrong(NumberToSplit, ReferenceNumber) {
    var mask = "";
    var compareResult = false;

    var numberToSplit = String(NumberToSplit);
    var referenceNumber = String(ReferenceNumber);

    //if lengths are not equal we need to add enough zeros to the front of the short one
    var numberToSplitLength = NumberToSplit.length;
    var referenceNumberLength = ReferenceNumber.length;

    if (referenceNumberLength < numberToSplitLength) {
        referenceNumber = PadLeft(ReferenceNumber, numberToSplitLength, '0');
    } else if (numberToSplitLength < referenceNumberLength) {
        numberToSplit = PadLeft(NumberToSplit, referenceNumberLength, '0');
    }

    console.log(`numberToSplit: ${numberToSplit} referenceNumber: ${referenceNumber} `);
    console.log(`numberToSplit.length: ${numberToSplit.length} `);

    //create a mask value to see changed digits against to the reference number
    for (var i = numberToSplit.length - 1; i >= 0; i--) {
        var charToCompare = numberToSplit.charAt(i);
        var referenceChar = referenceNumber.charAt(i);

        if (charToCompare == referenceChar /*&& charToCompare != '.'*/) {
            compareResult = true;
        } else {
            compareResult = false;
        }

        if (compareResult) {
            mask = "0" + mask;
        } else {
            mask = "1" + mask;
        }

        console.log(`charToCompare: ${charToCompare} referenceChar: ${referenceChar} compareResult: ${compareResult}`);
    }

    //mask created
    console.log(`mask: ${mask} `);

    //the first 1 value in the mask show where the change is beginning
    var index = mask.indexOf('1');
    console.log(`index: ${index} `);

    //get weak part
    var weakPart = String(NumberToSplit).substr(0, index);

    //get strong part
    var strongPart = String(NumberToSplit).substr(index, numberToSplitLength);

    console.log(`splitWeakStrong -> weakPart: ${weakPart} strongPart: ${strongPart}`);

    //return obtained parts as array
    var parts = new Array(2);
    parts[0] = weakPart;
    parts[1] = strongPart;

    return parts;
}

function splitIntegerPart(NumberToSplit, SplitChar) {

    var numberToSplit = String(NumberToSplit);
    var numberToSplitLength = NumberToSplit.length;

    //get point location (we assumed that decimal seperator is dot (.))
    var index = numberToSplit.indexOf(SplitChar);
    var partOffset = index + 1;

    //get weak part
    var weakPartLength = numberToSplitLength - index;
    var weakPart = numberToSplit.substr(partOffset, weakPartLength);

    //get strong part
    var strongPart = numberToSplit.substr(0, partOffset); //Math.trunc(NumberToSplit);
    //strongPart = 

    console.log(`splitIntegerPart -> strongPart: ${strongPart} weakPart: ${weakPart}`);

    //return obtained parts as array
    var parts = new Array(2);
    parts[0] = weakPart;
    parts[1] = strongPart;

    return parts;
}

function PadLeft(n, width, z) {
    z = z || '0';
    n = n + '';
    var result = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    console.log(`PadLeft result: ${result} `);
    return result;
}

function renderOrderBookHTML() {
    /*
                { "price": "", "qty": "", "totalqty": "", "ordertype": "sell" },
                { "price": "", "qty": "", "totalqty": "", "ordertype": "buy" },
                */

    var data = [
        { "price": "7166.9", "qty": "0.75000000", "totalqty": "16.24826053", "ordertype": "sell" },
        { "price": "7166.5", "qty": "0.34000000", "totalqty": "15.49826053", "ordertype": "sell" },
        { "price": "7166.2", "qty": "0.20000000", "totalqty": "15.15826053", "ordertype": "sell" },
        { "price": "7166.0", "qty": "0.15950758", "totalqty": "14.95826053", "ordertype": "sell" },
        { "price": "7165.7", "qty": "4.04024000", "totalqty": "14.79875295", "ordertype": "sell" },
        { "price": "7165.3", "qty": "0.14000000", "totalqty": "10.75851295", "ordertype": "sell" },
        { "price": "7164.4", "qty": "0.99000000", "totalqty": "10.61851295", "ordertype": "sell" },
        { "price": "7164.3", "qty": "0.47249397", "totalqty": "9.62851295", "ordertype": "sell" },
        { "price": "7164.1", "qty": "0.84483451", "totalqty": "9.15601898", "ordertype": "sell" },
        { "price": "7164.0", "qty": "4.18200000", "totalqty": "8.31118447", "ordertype": "sell" },
        { "price": "7163.2", "qty": "1.57450725", "totalqty": "4.12918447", "ordertype": "sell" },
        { "price": "7162.5", "qty": "2.00000000", "totalqty": "2.55467722", "ordertype": "sell" },
        { "price": "7162.4", "qty": "0.22907076", "totalqty": "0.55467722", "ordertype": "sell" },
        { "price": "7161.6", "qty": "0.02560646", "totalqty": "0.32560646", "ordertype": "sell" },
        { "price": "7161.2", "qty": "0.30000000", "totalqty": "0.30000000", "ordertype": "sell" },
        { "price": "7160.9", "qty": "1.77670476", "totalqty": "1.77670476", "ordertype": "buy" },
        { "price": "7160.0", "qty": "0.60000000", "totalqty": "2.37670476", "ordertype": "buy" },
        { "price": "7159.6", "qty": "0.04000000", "totalqty": "2.41670476", "ordertype": "buy" },
        { "price": "7158.7", "qty": "1.00000000", "totalqty": "3.41670476", "ordertype": "buy" },
        { "price": "7158.3", "qty": "2.00000000", "totalqty": "5.41670476", "ordertype": "buy" },
        { "price": "7157.6", "qty": "1.00000000", "totalqty": "6.41670476", "ordertype": "buy" },
        { "price": "7156.7", "qty": "3.30808636", "totalqty": "9.72479112", "ordertype": "buy" },
        { "price": "7156.6", "qty": "0.10000000", "totalqty": "9.82479112", "ordertype": "buy" },
        { "price": "7156.5", "qty": "0.84480581", "totalqty": "10.66959693", "ordertype": "buy" },
        { "price": "7156.4", "qty": "0.08000000", "totalqty": "10.74959693", "ordertype": "buy" },
        { "price": "7156.1", "qty": "1.00000000", "totalqty": "11.74959693", "ordertype": "buy" },
        { "price": "7155.8", "qty": "1.29000000", "totalqty": "13.03959693", "ordertype": "buy" },
        { "price": "7154.8", "qty": "0.13540000", "totalqty": "13.17499693", "ordertype": "buy" },
        { "price": "7154.7", "qty": "1.00000000", "totalqty": "14.17499693", "ordertype": "buy" },
        { "price": "7154.2", "qty": "4.10960000", "totalqty": "18.28459693", "ordertype": "buy" }
    ];

    var ordertype = "";
    var price = "";
    var qty = "";
    var totalqty = "";

    var priceweak = "";
    var pricestrong = "";
    var qtystrong = "";
    var qtyweak = "";
    var totalqtystrong = "";
    var totalqtyweak = "";

    var htmlresult = "";

    var itemcount = data.length;
    console.log(`${itemcount}`);

    var previousprice = 0;

    for (var i = 0; i < itemcount; i++) {
        var obj = data[i];
        for (var key in obj) {

            var attrName = key;
            //var attrValue = obj[key];
            price = data[i]["price"];
            qty = obj["qty"];
            totalqty = obj["totalqty"];
            ordertype = obj["ordertype"];

            if (i > 0 && i < itemcount - 1) {
                previousprice = data[i - 1]["price"];
            }

            //exceptions if first of sell or buy and last sell item they will be rendered as strong
            //first sell item has this logic by default since there is no previous price to compare.
            //we only need a logic to cover for last sell item and first buy item
            //temporary logic: use index numbar of the items (if there will be a two sperate list this will be skipped and other logic will be applied)
            if (i == 14 || i == 15) {
                previousprice = 0;
            }

            var parts = new Array(2);

            //split price
            parts = splitWeakStrong(price, previousprice);
            priceweak = parts[0];
            pricestrong = parts[1];
            console.log(`${previousprice} > ${price}-=> ${priceweak} | ${pricestrong}`);

            //split Qty
            parts = splitIntegerPart(qty, '.');
            qtyweak = parts[0];
            qtystrong = parts[1];

            //split totalQty
            parts = splitIntegerPart(totalqty, '.');
            totalqtyweak = parts[0];
            totalqtystrong = parts[1];
        }

        var htmltemplate = `<li><span class=\"${ordertype}weak\">${priceweak}</span><span class=\"${ordertype}strong\">${pricestrong}</span><span>&nbsp;&nbsp;&nbsp;</span><span class=\"strong\">${qtystrong}</span><span class=\"weak\">${qtyweak}</span><span>&nbsp;&nbsp;&nbsp;</span><span class=\"strong\">${totalqtystrong}</span><span class=\"weak\">${totalqtyweak}</span></li>`;
        console.log(htmltemplate);
        htmlresult = htmlresult + htmltemplate;
    }

    var result = "<ul>" + htmlresult + "</ul>";

    document.getElementById("orderbook").innerHTML = result;
}