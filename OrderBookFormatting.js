// OrderFormatting.JS
// used to format items in your orderbook related to price changes

function splitWeakStrong(NumberToSplit, ReferenceNumber) {
    const equalizerCharForNumber = '*';
    const equalizerCharForRef = '#';
    const maskCharNoChange = '0';
    const maskCharChanged = '1';

    var mask = "";
    var compareResult = false;
    var maskResult = "";

    var numberToSplit = String(NumberToSplit);
    var referenceNumber = String(ReferenceNumber);
    var numberToSplitLength = NumberToSplit.length;
    var referenceNumberLength = ReferenceNumber.length;

    //console.log(`numberToSplit: ${numberToSplit} referenceNumber: ${referenceNumber}`);
    //console.log(`NumberToSplit.length: ${numberToSplitLength} ReferenceNumber.length: ${referenceNumberLength}`);

    //if lengths are not equal we need to add enough chars to the front of the short one to equalize
    if (referenceNumberLength < numberToSplitLength) {
        referenceNumber = PadLeft(ReferenceNumber, numberToSplitLength, equalizerCharForRef);
    } else if (numberToSplitLength < referenceNumberLength) {
        numberToSplit = PadLeft(NumberToSplit, referenceNumberLength, equalizerCharForNumber);
    }

    //create a mask value to see changed digits against to the reference number
    for (var i = numberToSplit.length - 1; i >= 0; i--) {
        var charToCompare = numberToSplit.charAt(i);
        var referenceChar = referenceNumber.charAt(i);

        if (charToCompare == referenceChar) {
            //no change
            compareResult = true;
        } else {
            //there is a change
            compareResult = false;	
        }

        if (compareResult) {
            maskResult = maskCharNoChange;
        } else {
            maskResult = maskCharChanged;
        }

        mask = maskResult + mask;

        //console.log(`charToCompare: ${charToCompare} referenceChar: ${referenceChar} compareResult: ${compareResult}  maskResult: ${maskResult}`);
    }

    //mask created
    //console.log(`mask: ${mask} `);

    //the first 1 value in the mask show where the change is beginning
    var index = mask.indexOf('1');
    //console.log(`index: ${index} `);

    //get weak part
    var weakPart = String(NumberToSplit).substr(0, index);

    //get strong part
    var strongPart = String(NumberToSplit).substr(index, numberToSplitLength);

    console.log(`NumberToSplit: ${NumberToSplit} => mask: ${mask} => weakPart: ${weakPart} strongPart: ${strongPart}`);

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
    var strongPart = numberToSplit.substr(0, partOffset);

    //return obtained parts as array
    var parts = new Array(2);
    parts[0] = weakPart;
    parts[1] = strongPart;

    return parts;
}

function PadLeft(SourceNumber, Width, PadChar) {
    const defaultPadChar = '0';

    PadChar = PadChar || defaultPadChar;
    SourceNumber = SourceNumber + '';

    var result = SourceNumber.length >= Width ? SourceNumber : new Array(Width - SourceNumber.length + 1).join(PadChar) + SourceNumber;
    //console.log(`PadLeft result: ${result} `);

    return result;
}

function renderOrderBookHTML() {
    /*
                { "price": "", "qty": "", "totalqty": "", "ordertype": "sell" },
                { "price": "", "qty": "", "totalqty": "", "ordertype": "buy" },
                */

    var data = [
        { "price": "17166.9", "qty": "0.75000000", "totalqty": "16.24826053", "ordertype": "sell" },
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
        { "price": "27161.6", "qty": "0.02560646", "totalqty": "0.32560646", "ordertype": "sell" },
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
    //console.log(`data itemcount: ${itemcount}`);

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
        }
		
		//split price
		var parts = new Array(2);
		parts = splitWeakStrong(price, previousprice);
		priceweak = parts[0];
		pricestrong = parts[1];
		//console.log(`STEP ${i} RESULT: ${previousprice}, ${price} => ${priceweak} | ${pricestrong}`);

		//split Qty
		var parts = new Array(2);
		parts = splitIntegerPart(qty, '.');
		qtyweak = parts[0];
		qtystrong = parts[1];
        //console.log(`splitIntegerPart -> strongPart: ${qtystrong} weakPart: ${qtyweak}`);

		//split totalQty
		var parts = new Array(2);
		parts = splitIntegerPart(totalqty, '.');
		totalqtyweak = parts[0];
		totalqtystrong = parts[1];	
        //console.log(`splitIntegerPart -> strongPart: ${totalqtystrong} weakPart: ${totalqtyweak}`);

        var htmltemplate = `<div id="price"><span class=\"${ordertype}weak\">${priceweak}</span><span class=\"${ordertype}strong\">${pricestrong}</span></div><div id="qty"><span class=\"strong\">${qtystrong}</span><span class=\"weak\">${qtyweak}</span></div><div id="totalqty"><span class=\"strong\">${totalqtystrong}</span><span class=\"weak\">${totalqtyweak}</span></div>`;
        //console.log(htmltemplate);
        htmlresult = htmlresult + htmltemplate;
    }

    var result = "" + htmlresult + "";

    document.getElementById("orderbook").innerHTML = result;
}