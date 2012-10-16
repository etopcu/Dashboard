/// <reference path="../../jquery/jquery-1.7.2.min.js" />

var settings = {debug:false};

if (typeof netchex !== 'object') var netchex = {};

/* see netchex reference */
netchex.alerts = {
    msgBoxModal: function (title, msg, obj) {
        if (typeof obj == 'undefined') obj = null;
        var objButtons = {
            Ok: function () {
                $(this).dialog("close");
                alert("helo");
            }
        }

        objButtons = (typeof obj === "function")
            ? { Ok: function () { obj(); } }
            : objButtons;

        objButtons = (typeof obj === "object" && obj != null)
            ? obj
            : objButtons;

        $("<div title='" + title + "'>" + msg + "</div>").dialog({
            modal: true,
            autoOpen: true,
            resizable: false,
            buttons: objButtons
        });

    },
    divAlert: function (msg) {
        // @TODO: 
        //<div class="ui-widget gbl-alert-wrapper">
        //    <div class="ui-state-error ui-corner-all"> 
        //        <p>
        //            <span class="ui-icon ui-icon-alert" ></span> 
        //            <b>Alert:</b> hard coded alert! I accept HTML!
        //        </p>
        //    </div>
        //</div>  

        $widget = $("<div></div>").addClass("ui-widget gbl-alert-wrapper");
        $error = $("<div></div>")
                    .addClass("ui-state-error")
                    .addClass("ui-corner-all");
        $p = $("<p></p>");
        $icon = $("<span></span>")
                    .addClass("ui-icon")
                    .addClass("ui-icon-alert");

        $icon.appendTo($p)
        //$("<strong>Alert:</strong>").appendTo($p);
        $p.append(msg);
        $error.append($p);

        return $widget.append($error);

    },
    barSpinnerOn: function (msg) {
        netchex.utility.disableEscape();
        msg = (typeof msg !== 'undefined' && msg !== '') ? msg : "Loading...";
        var title = "Loading, Please Wait!";
        $modal = $("<div id='jqBarModal' title='" + title + "'><div id='jqBarSpinnerWrapper' class='gbl-align-center'>" + msg + "<div id='jqBarSpinner'></div><div></div>");

        $('body').append($modal);

        $modal.dialog({
            closeOnEscape: false,
            draggable: false,
            autoOpen: true,
            height: 200,
            width: 600,
            resizable: false,
            modal: true,
            open: function (event, ui) {
                //hide close button. 
                $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                $("#jqBarSpinner").progressbar({ value: 100 });
            }
        });
    },
    barSpinnerOff: function () {
        if ($modal.length > 0) {
            $modal.dialog('close');
            $modal.remove();
        }
    }
}




netchex.utility = {
    setFocus: function (fieldID) {
        if (document.getElementById(fieldID)) setTimeout(function () { document.getElementById(fieldID).focus(); }, 0);
        else return;
    },
    disableEscape: function () {
        if ($.browser.mozilla) {
            $(document).keypress(function (e) {
                if (e.keyCode == 27) { e.preventDefault(); e.stopPropagation(); }   // esc                                 
            });
        } else {
            $(document).keydown(function (e) {
                if (e.keyCode == 27) { e.preventDefault(); e.stopPropagation(); }   // esc                                 
            });
        }
    }
}



if (typeof netchex.validate !== 'object') 
    netchex.validate = {};

netchex.validate.date = {
    isDate: function (dateStr, NoAlerts) {
        var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;
        var matchArray = dateStr.match(datePat); // is the format ok?
        if (matchArray == null) {
            if (!NoAlerts)
                alert("Date is not in a valid format." + " Please use mm/dd/yyyy format.");
            dateStr = "";
            return false;
        }
        month = matchArray[1]; // parse date into variables
        day = matchArray[3];
        year = matchArray[4];
        if (month < 1 || month > 12) { // check month range
            if (!NoAlerts)
                alert("Month must be between 1 and 12.");
            return false;
        }
        if (day < 1 || day > 31) {
            if (!NoAlerts)
                alert("Day must be between 1 and 31.");
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
            if (!NoAlerts) {
                if (month == 4)
                    alert("April doesn't have 31 days!");
                if (month == 6)
                    alert("June doesn't have 31 days!");
                if (month == 9)
                    alert("September doesn't have 31 days!");
                if (month == 11)
                    alert("November doesn't have 31 days!");
            }
            return false;
        }
        if (month == 2) { // check for february 29th
            if (day > 29) {
                if (!NoAlerts)
                    alert("February doesn't have " + day + " days!");
                return false;
            }
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day == 29 && !isleap) {
                if (!NoAlerts)
                    alert("February " + year + " doesn't have " + day + " days!");
                return false;
            }
        }
        if (year.length == 4) {  // 2 digit years will bypass this step
            if (year < 1753) {   // to prevent database date erros
                if (!NoAlerts)
                    alert("Invalid date.  Dates entered must take place after January 1, 1753.");
                return false;
            }
        }
        return true;  // date is valid
    },

    CompareEndDate: function (ctrlStartObj, ctrlEndObj) {
        try {
            if (!(ctrlEndObj.value) == "") {
                if (isDate(ctrlStartObj.value,false)) {
                    if (new Date(ctrlStartObj.value) > new Date(ctrlEndObj.value)) {
                        ctrlEndObj.value = ctrlStartObj.value;
                    }
                }
            } else {
                //Set end value.
                ctrlEndObj.value = ctrlStartObj.value;
            }
        }
        catch (e) {
            alert("Oops! Something wrong just happened...");
        }
    },   //CWF added 6/30/2010. CallBy:  onblur="CompareEndDate(this, ctlEndDate)  

    dateValid: function (objName) {
        var strDate;
        var strDateArray;
        var strDay;
        var strMonth;
        var strYear;
        var intday;
        var intMonth;
        var intYear;
        var booFound = false;
        var datefield = objName;
        var strSeparatorArray = new Array("-", " ", "/", ".");
        var intElementNr;
        var err = 0;
        var strMonthArray = new Array(12);
        strMonthArray[0] = "Jan";
        strMonthArray[1] = "Feb";
        strMonthArray[2] = "Mar";
        strMonthArray[3] = "Apr";
        strMonthArray[4] = "May";
        strMonthArray[5] = "Jun";
        strMonthArray[6] = "Jul";
        strMonthArray[7] = "Aug";
        strMonthArray[8] = "Sep";
        strMonthArray[9] = "Oct";
        strMonthArray[10] = "Nov";
        strMonthArray[11] = "Dec";
        strDate = datefield.value;
        if (strDate.length < 1) { return true; }

        for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
            if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
                strDateArray = strDate.split(strSeparatorArray[intElementNr]);
                if (strDateArray.length != 3) {
                    err = 1;
                    return false;
                } else {
                    strDay = strDateArray[0];
                    strMonth = strDateArray[1];
                    strYear = strDateArray[2];
                }
                booFound = true;
            }
        }
        if (booFound == false) {
            if (strDate.length > 5) {
                strDay = strDate.substr(0, 2);
                strMonth = strDate.substr(2, 2);
                strYear = strDate.substr(4);
            }
        }
        if (strYear.length == 2) { strYear = '20' + strYear; }

        strTemp = strDay;
        strDay = strMonth;
        strMonth = strTemp;
        intday = parseInt(strDay, 10);
        if (isNaN(intday)) {
            err = 2;
            return false;
        }
        intMonth = parseInt(strMonth, 10);
        if (isNaN(intMonth)) {
            for (i = 0; i < 12; i++) {
                if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
                    intMonth = i + 1;
                    strMonth = strMonthArray[i];
                    i = 12;
                }
            }
            if (isNaN(intMonth)) {
                err = 3;
                return false;
            }
        }
        intYear = parseInt(strYear, 10);
        if (isNaN(intYear)) {
            err = 4;
            return false;
        }
        if (intMonth > 12 || intMonth < 1) {
            err = 5;
            return false;
        }
        if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
            err = 6;
            return false;
        }
        if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
            err = 7;
            return false;
        }
        if (intMonth == 2) {
            if (intday < 1) {
                err = 8;
                return false;
            }
            if (this.LeapYear(intYear) == true) {
                if (intday > 29) {
                    err = 9;
                    return false;
                }
            } else {
                if (intday > 28) {
                    err = 10;
                    return false;
                }
            }
        }
        return true;
    },

    LeapYear: function (intYear) {
        if (intYear % 100 == 0) {
            if (intYear % 400 == 0) { return true; }
        } else {
            if ((intYear % 4) == 0) {
                return true;
            }
        }
        return false;
    }
}

/* VALIATE.FORM
------------------------------- */
netchex.validate.form = {
    isNotEmpty: function (textObj) {
        var newValue = textObj.value
        var nFailed = 0;
        if (newValue == "") {
            nFailed = 1;
        }
        if (nFailed == 1) {
            alert("Sorry, This is a required field!");
            textObj.value = "";
            textObj.focus();
            textObj.select();
        }
        return true
    },

    fieldNotEmpty: function (fieldObj, msgText, invalidValue) {
        if (fieldObj.value == "") {
            alert(msgText);
            fieldObj.focus();
            return false;
        }
        if (fieldObj.value == invalidValue) {
            alert(msgText);
            fieldObj.focus();
            return false;
        }
        return true;
    },


    fieldNotEmptyNoFocus: function (fieldObj, msgText, invalidValue) {
        if (fieldObj.value == "") {
            alert(msgText);
            return false;
        }
        if (fieldObj.value == invalidValue) {
            alert(msgText);
            return false;
        }
        return true;
    }
}



/* VALIATE.TEXT
------------------------------- */
netchex.validate.text = {
    isValidAlphaCharacter: function (txtObj) {
        var valid = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ok = "yes";
        var temp;

        for (var i = 0; i < txtObj.value.length; i++) {
            temp = "" + txtObj.value.substring(i, i + 1);
            if (valid.indexOf(temp) == "-1") ok = "no";
        }

        if (ok == "no") {
            alert("Invalid entry!  Only valid letters or numbers are accepted!");
            txtObj.value = "";
            txtObj.focus();
            txtObj.select();
            return false;
        }
        return true;
    }
}




/* VALIATE.NUMBER
------------------------------- */
netchex.validate.number = {

    checkDecimals: function (fieldName, fieldValue) {
        decimals = 2;  // how many decimals are allowed?
        if (fieldValue != "") {
            if (isNaN(fieldValue)) {
                alert("Oops!  That does not appear to be a valid number.  Please try again.");
                fieldName.value = "";
                fieldName.select();
                fieldName.focus();
            }
            else {
                timeshundred = parseFloat(fieldValue * Math.pow(10, decimals));
                integervalue = parseInt(parseFloat(fieldValue) * Math.pow(10, decimals));
                if (timeshundred != integervalue) {
                    alert("Oops!  Please enter a number with up to " + decimals + " decimal places.  Please try again.");
                    fieldName.select();
                    fieldName.focus();
                }
            }
        }
    },

    isInt: function (textObj) {
        var newValue = textObj.value
        var newLength = newValue.length
        var nFailed = 0;
        for (var i = 0; i != newLength; i++) {
            aChar = newValue.substring(i, i + 1)
            if (aChar < "0" || aChar > "9") {
                nFailed = 1;
            }
        }
        if (nFailed == 1) {
            alert("Invalid entry!  Only numbers are accepted!");
            textObj.value = "";
            textObj.focus();
            textObj.select();
            return false;
        }
        return true
    },

    //Added By DMN 01/05/2012.
    isInt2: function (textObj) {
        var newValue = textObj.value
        var newLength = newValue.length
        var nFailed = 0;
        for (var i = 0; i != newLength; i++) {
            aChar = newValue.substring(i, i + 1)
            if (aChar < "0" || aChar > "9") {
                nFailed = 1;
            }
        }
        if (nFailed == 1) {
            alert("Invalid entry!  Only numbers are accepted!");
            textObj.value = "";
            textObj.focus();
            textObj.select();

            return false;
        }
        return true;
    }, //Added By DMN

    isDecimalNumber: function (txtObj) {
        var numeric = /^([0-9]+)?(\.[0-9]+)?$/;

        var check = numeric.test(txtObj.value);

        if (!check) {
            alert("Invalid entry! Only numbers are accepted!");
            txtObj.value = "";
            txtObj.focus();
            txtObj.select();

            return false;
        }
        else
            return true;

    },

    isNumeric: function (txtObj) {
        var valid = "0123456789.";
        var ok = "yes";
        var temp;

        for (var i = 0; i < txtObj.value.length; i++) {
            temp = "" + txtObj.value.substring(i, i + 1);
            if (valid.indexOf(temp) == "-1") ok = "no";
        }
        // Allow for negative numbers
        if (txtObj.value.substring(0, 1) == "-")
            ok = "yes";

        if (ok == "no") {
            alert("Invalid entry!  Only numbers are accepted!");
            txtObj.value = 0;
            txtObj.focus();
            txtObj.select();
            return false;  // This change by TCS 6/20/01
        }
        return true     // This change by TCS 6/20/01
    },

    isNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    isNumeric2: function (txtObj) {
        var valid = "0123456789.";
        var ok = "yes";
        var temp;
        for (var i = 0; i < txtObj.value.length; i++) {
            temp = "" + txtObj.value.substring(i, i + 1);
            if (valid.indexOf(temp) == "-1") ok = "no";
        }
        if (ok == "no") {
            //	alert("Invalid entry!  Only numbers are accepted!");
            txtObj.value = 0;
            txtObj.focus();
            txtObj.select();
        }
    },

    isNumeric3: function (txtObj, name) {
        if (isNaN(txtObj.value)) {
            alert("Invalid entry! " + name + " must consist of only numbers.");

            txtObj.value = "";
            txtObj.focus();
            txtObj.select();

            return false;
        }

        return true
    }
}


/* VALIATE.SPECIAL
------------------------------- */
netchex.validate.special = {
    funcCalcBankRoutingCheckDigit: function (bankRoutingNumber) {
        var currRoutingNbr = "";
        var workRoutingNbrLength = "";

        var char1 = "";
        var char2 = "";
        var char3 = "";
        var char4 = "";
        var char5 = "";
        var char6 = "";
        var char7 = "";
        var char8 = "";
        var charCheckDigit = "";

        var weight1 = 3;
        var weight2 = 7;
        var weight3 = 1;
        var weight4 = 3;
        var weight5 = 7;
        var weight6 = 1;
        var weight7 = 3;
        var weight8 = 7;
        var nCheckDigit = 0;

        var totalSum = 0;

        currRoutingNbr = bankRoutingNumber.value;
        workRoutingNbrLength = currRoutingNbr.length;

        if (workRoutingNbrLength < 9) {
            alert("Bank routing numbers must be 9 characters in length.");
            bankRoutingNumber.select();
            bankRoutingNumber.focus();
            return false;
        }
        else {
            if (currRoutingNbr == "000000000") {
                alert("Invalid bank routing number.");
                bankRoutingNumber.select();
                bankRoutingNumber.focus();
                return false;
            }

            char1 = currRoutingNbr.substring(0, 1);
            char2 = currRoutingNbr.substring(1, 2);
            char3 = currRoutingNbr.substring(2, 3);
            char4 = currRoutingNbr.substring(3, 4);
            char5 = currRoutingNbr.substring(4, 5);
            char6 = currRoutingNbr.substring(5, 6);
            char7 = currRoutingNbr.substring(6, 7);
            char8 = currRoutingNbr.substring(7, 8);
            charCheckDigit = currRoutingNbr.substring(8, 9);

            totalSum = (weight1 * char1) + (weight2 * char2) + (weight3 * char3) +
                    (weight4 * char4) + (weight5 * char5) + (weight6 * char6) +
                    (weight7 * char7) + (weight8 * char8);

            nCheckDigit = (10 - (totalSum % 10)) % 10;

            if (nCheckDigit == charCheckDigit && charCheckDigit != " ") {

            }
            else {
                alert("Invalid bank routing number.");
                bankRoutingNumber.select();
                bankRoutingNumber.focus();
                return false;
            }
        }

        return true;
    }
}


if (typeof netchex.format !== 'object') 
    netchex.format = {};

/* VALIATE.SPECIAL
------------------------------- */
netchex.format.number = {
    formatCurrency: function (textObj, numberOfDecimals) {
        var lcNumber = textObj.value;
        var lcCents = 0;
        var lcSign = lcNumber.substring(0, 1);
        if (lcSign == "-") {
            lcSign = "-"
        }
        else {
            lcSign = ""
        }
        lcNumber = lcNumber.toString().replace(/\$|\-|,/g, '');

        if (isNaN(lcNumber)) lcNumber = "0";

        // In case the numberOfDecimals is not passed default to 2
        if (numberOfDecimals == null) numberOfDecimals = 2;

        lcCents = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) % Math.pow(10, numberOfDecimals));
        lcNumber = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) / Math.pow(10, numberOfDecimals)).toString();

        for (var i = 10; i < Math.pow(10, numberOfDecimals); i = i * 10) {
            if (lcCents < i) {
                lcCents = "0" + lcCents;
            }
        }

        for (var i = 0; i < Math.floor((lcNumber.length - (1 + i)) / 3); i++)
            lcNumber = lcNumber.substring(0, lcNumber.length - (4 * i + 3)) + ',' +
                    lcNumber.substring(lcNumber.length - (4 * i + 3));

        textObj.value = lcSign + '$' + lcNumber + '.' + lcCents;
        return (lcSign + '$' + lcNumber + '.' + lcCents);
    },

    roundIt: function (textObj, numberOfDecimals, lCurrencyIndicator) {
        // rounds number to numberOfDecimals decimal places, defaults to 2
        var nRetValue = 0;
        var lcNumber = textObj.value;
        lcNumber = lcNumber.toString().replace(/\$|\,/g, '');
        var lcSign = lcNumber.substring(0, 1);
        if (lcSign == "-") {
            lcSign = "-"
        } else {
            lcSign = ""
        }

        lcNumber = lcNumber.toString().replace(/\$|\-|,/g, '');
        if (isNaN(lcNumber)) lcNumber = "0";

        numberOfDecimals = (!numberOfDecimals ? 2 : numberOfDecimals);

        var lcCents = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) % Math.pow(10, numberOfDecimals));
        lcNumber = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) / Math.pow(10, numberOfDecimals)).toString();

        for (var i = 10; i < Math.pow(10, numberOfDecimals); i = i * 10) {
            if (lcCents < i) {
                lcCents = "0" + lcCents;
            }
        }

        if (lCurrencyIndicator) {
            textObj.value = '$' + lcSign + lcNumber + '.' + lcCents;
        } else {
            textObj.value = lcSign + lcNumber + '.' + lcCents;
        }
        return (lcSign + lcNumber + '.' + lcCents);
    },

    formatDecimals2: function (textObj, numberOfDecimals) {
        var lcNumber = textObj.value;
        var lcCents = 0;
        var lcSign = lcNumber.substring(0, 1);
        if (lcSign == "-") {
            lcSign = "-"
        }
        else {
            lcSign = ""
        }
        lcNumber = lcNumber.toString().replace(/\$|\-|,/g, '');

        if (isNaN(lcNumber)) lcNumber = "0";

        // In case the numberOfDecimals is not passed default to 2
        if (numberOfDecimals == null) numberOfDecimals = 2;

        lcCents = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) % Math.pow(10, numberOfDecimals));
        lcNumber = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) / Math.pow(10, numberOfDecimals)).toString();

        for (var i = 10; i < Math.pow(10, numberOfDecimals); i = i * 10) {
            if (lcCents < i) {
                lcCents = "0" + lcCents;
            }
        }

        for (var i = 0; i < Math.floor((lcNumber.length - (1 + i)) / 3); i++)
            lcNumber = lcNumber.substring(0, lcNumber.length - (4 * i + 3)) + ',' +
                    lcNumber.substring(lcNumber.length - (4 * i + 3));

        textObj.value = lcSign + lcNumber + '.' + lcCents;
        return (lcSign + lcNumber + '.' + lcCents);
    },

    formatPercent: function (textObj, numberOfDecimals) {
        var lcNumber = textObj.value;
        var lcCents = 0;
        var lcSign = lcNumber.substring(0, 1);
        if (lcSign == "-") {
            lcSign = "-"
        }
        else {
            lcSign = ""
        }
        lcNumber = lcNumber.toString().replace(/\$|\-|,/g, '');

        if (isNaN(lcNumber)) lcNumber = "0";

        // In case the numberOfDecimals is not passed default to 2
        if (numberOfDecimals == null) numberOfDecimals = 2;

        lcCents = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) % Math.pow(10, numberOfDecimals));
        lcNumber = Math.floor((lcNumber * Math.pow(10, numberOfDecimals) + 0.5) / Math.pow(10, numberOfDecimals)).toString();

        for (var i = 10; i < Math.pow(10, numberOfDecimals); i = i * 10) {
            if (lcCents < i) {
                lcCents = "0" + lcCents;
            }
        }

        for (var i = 0; i < Math.floor((lcNumber.length - (1 + i)) / 3); i++)
            lcNumber = lcNumber.substring(0, lcNumber.length - (4 * i + 3)) + ',' +
                    lcNumber.substring(lcNumber.length - (4 * i + 3));

        textObj.value = lcSign + lcNumber + '.' + lcCents + '%';
        return (lcSign + lcNumber + '.' + lcCents + '%');
    }
}

netchex.format.date = {
    dateFormat: function (vDateName, vDateValue, e) {
        var whichCode = (window.Event) ? e.which : e.keyCode;
        if (whichCode == 8) // Ignore the Netscape value for backspace. IE has no value for backspace
            return false;
        else {
            // Create numeric string values for 0123456789/
            var strCheck = '48,49,50,51,52,53,54,55,56,57,58,59,191';
            if (strCheck.indexOf(whichCode) != -1) {
                if (isNav4) {
                    if (vDateValue.length == 8) {
                        var mDay = vDateName.value.substr(0, 2);
                        var mMonth = vDateName.value.substr(2, 2);
                        var mYear = vDateName.value.substr(4, 4)
                        vDateName.value = mDay + strSeperator + mMonth + strSeperator + mYear;
                        if (!netchex.validate.date.dateValid(vDateName)) {
                            alert("Invalid Date\nPlease Re-Enter");
                            vDateName.value = "";
                            return true;
                        }
                    }
                }
                else {
                    if (vDateValue.length == 2) {
                        vDateName.value = vDateValue + strSeperator;
                    }
                    if (vDateValue.length == 5) {
                        vDateName.value = vDateValue + strSeperator;
                    }
                }
                if (vDateValue.length == 10) {
                    if (!netchex.validate.date.dateValid(vDateName)) {
                        alert("Invalid Date\nPlease Re-Enter");
                        vDateName.focus();
                        vDateName.select();
                    }
                }
                return false;
            }
            else {
                // If the value is not in the string return the string minus the last key entered
                vDateName.value = vDateName.value.substr(0, (vDateValue.length - 1));
                return false;
            }
        }
    },
    formatJsonDate: function (data) {
        try {
            var currentDt = new Date(parseInt(data.substr(6)));
            var mm = currentDt.getMonth() + 1;
            mm = (mm < 10) ? '0' + mm : mm;
            var dd = currentDt.getDate();
            dd = (dd < 10) ? '0' + dd : dd;
            var yyyy = currentDt.getFullYear();
            var date = mm + '/' + dd + '/' + yyyy;
            return date;
        } catch (e) {
            if (settings.debug)
                console.log('error in formatJsonDate: ' + e.message);
            else
                alert(e.message);
        }
    }
}

if (typeof netchex.constant !== 'object')
    netchex.constant = {};
netchex.constant.report = {
    initialQueueMessage: function () {
        return "I am the queue message";
    }
}

/// <reference path="http://10.4.0.102/includes/jquery/jquery-1.7.2.min.js" />
$(document).ready(function () {

    /* JQuery UI datepicker */
    //$(".DateMask").datepicker(
    //    {
    //        showButtonPanel: true,
    //        changeMonth: true,
    //        changeYear: true
    //    }
    //);


    /* Tables
    -----------------------------------------------*/
    // add padding to first and last cell of every row
    //$("table.gbl-table").each(function () {
    //    $(this).children("thead").children("tr").children("th:nth-child(1)").css("padding-left", "25px");
    //    $(this).children("thead").children("tr").children("th:last-child").css("padding-right", "25px");
    //    $(this).children("tbody").children("tr").children("td:nth-child(1)").css("padding-left", "25px");
    //    $(this).children("tbody").children("tr").children("td:last-child").css("padding-right", "25px");
    //    $(this).children("tfoot").children("tr").children("td:nth-child(1)").css("padding-left", "25px");
    //    $(this).children("tfoot").children("tr").children("td:last-child").css("padding-right", "25px");
    //});

    // row highlight plugin
    $(".gbl-table-row tr:not(tfoot tr), .gbl-table-row-hover tr:not(tfoot tr)").hover(
        function () {
            $(this).children("td").addClass("gbl-hover");
        },
        function () {
            $(this).children("td").removeClass("gbl-hover");
        }
    );

});



// Begin Functions 
//////////////////////////////////////////////////////////////////// 
//(function ($) {
//    $.fn.clearableCall = function () {
//        $('.jq-clearable').clearable((typeof clearableCallBack === 'function') ? clearableCallBack : '');
//    };
//})(jQuery);


//(function ($) {
//    $.fn.textBoxHintsCall = function () {
//        $(".jq-hint").textBoxHints();
//    };
//})(jQuery);


//(function ($) {
//    //STUFF TO ADD
//    $.fn.tableSort = function () {
//        $("table.jq-table-sort").tablesorter({
//            cssAsc: "gbl-icon-table-sorter-asc",
//            cssDesc: "gbl-icon-table-sorter-desc",
//            //widgets: ['zebra', 'repeatHeaders','stickyHeaders'], // if not required you can remove 'repeatHeaders' 
//            widgets: ['zebra', 'stickyHeaders', 'columns'],
//            widgetOptions: { zebra: ["gbl-even", "gbl-odd"] }
//        }).find("th.tablesorter-header").css("color", "#0040E2");
//    };
//})(jQuery);








// Global Functions
///////////////////////////////////////////////////////////////////////
jQuery(function ($) {
    // override the getscript func
    $.getScript = function (url, callback, cache) {
        $.ajax({
            type: "GET",
            url: url,
            success: callback,
            dataType: "script",
            cache: cache
        });
    };

    //if ($('#content .jq-clearable').length != 0) {
    //    $.getScript('http://10.4.0.102/includes/jquery/plugins/jquery.clearable.js', $.fn.clearableCall, true);
    //}

    //if ($('#content .jq-hint').length != 0) {
    //    $.getScript('http://10.4.0.102/includes/jquery/plugins/jquery.textBoxHints.js', $.fn.textBoxHintsCall, true);
    //}

    //if ($('#content .jq-table-sort').length != 0) {
    //    
    //    $.getScript('http://10.4.0.102/includes/jquery/plugins/table-sorter/jquery.tablesorter.js', function(){
    //
    //        $.getScript('http://10.4.0.102/includes/jquery/plugins/table-sorter/jquery.tablesorter.widgets.js', $.fn.tableSort, true);
    //    
    //    }, true);
    //}


});




// created by:  Chris Fontan
// comments:    adds clear icon in any textbox with 'jq-clearable' class
// usage:       $('.jq-clearable').textBoxClear(callbackFunc);
(function ($) {
    // $.fn.textBoxClear()
    ////////////////////////////////////////////////////////////////////
    jQuery.fn.textBoxClear = function (func) {
        return this.each(function () {

            // hack for mozilla & IE difference in text input heights
            var txtHeight = ($.browser.mozilla) ? 20 : 18;
            var divHeight = ($.browser.mozilla) ? 22 : 20;

            $(this).css({ 'border-width': '0px', 'outline': 'none', 'height': txtHeight + 'px' })   // remove borders from textbox
                .bind("keyup", function () {
                    if ($(this).val().length > 0) {
                        $(this).next().children('a.gbl-clearlink').fadeIn(300);     // on keyup in textbox fade in clear icon
                    }
                    else {
                        $(this).next().children('a.gbl-clearlink').fadeOut(300);    // remove icon if all text is removed
                    }
                })
                .wrap('<div id="sq" class="gbl-divclearable" style="height:' + divHeight + 'px"></div>')
                .parent()
                .attr('class', $(this).attr('class') + ' gbl-divclearable')
                .append('<span class="gbl-clearlink"><a class="gbl-clearlink" href="javascript:" style="display:none"></a></span>');

            $('a.gbl-clearlink')
                .attr('title', 'Click to clear textbox')
                .click(function () {
                    $(this).fadeOut(300).parent().prev().val('').focus();
                    if (typeof func == "function") func();
                });
        });
        return $(this);
    }
})(jQuery);



// created by:  Chris Fontan
// comments:    puts default text in textbox style in italic gray and removed on focus.
// usage:        $(".jq-hint").textBoxHints();
(function ($) {
    // $.fn.textBoxHints()
    ////////////////////////////////////////////////////////////////////
    // loop through all .hint items
    // set the item to the defaultValue <-- handle browser page refresh
    // if the value is the same as the title italicize
    // bind in and out events
    ////////////////////////////////////////////////////////////////////

    jQuery.fn.textBoxHints = function () {
        $(this).each(function () {
            $(this).val($(this).prop('defaultValue'));
            var o = $(this);
            if (o.val() == o.attr("title")) { o.css({ "color": "#888", "fontStyle": "italic" }); }

            o.bind({
                focusin: function () {
                    if (o.val() == o.attr("title")) { o.val(""); o.css({ "color": "#000", "fontStyle": "normal" }); }
                },
                focusout: function () {
                    if (o.val() == "") { o.val(o.attr("title")); o.css({ "color": "#888", "fontStyle": "italic" }); }
                }
            });
        });
        return $(this);
    }
})(jQuery);



(function ($) {
    /* /////////////////////////////////////////////////////////////////// 
    Return the depth of the current page URL.. 
    Author: Chris Fontan
    /////////////////////////////////////////////////////////////////// */

    if (!jQuery.isFunction(jQuery.fn.dirDepth)) {
        $.fn.dirDepth = function () {
            var pathname = window.location.pathname;
            var regex = /\//g;
            var count = pathname.match(regex).length - 1;
            var depth = "";
            var i = 0;
            for (i = 0; i < count; i++) {
                depth += "../"
            };
            return depth
        };
    }
})(jQuery);


(function ($) {
    /* /////////////////////////////////////////////////////////////////// 
    Plugin Created to remove selection ability on text. 
    Disables the users ability to drag and highlight text in selector.
    Use this on text style buttons, accordion menues etc.. 

    example:
    $('#divPickDepartments').disableSelection(); 

    file: 
    Reports\Payroll\rptLaborDistributionReport.asp 

    Author: Chris Fontan
    /////////////////////////////////////////////////////////////////// */

    $.fn.disableSelection = function () {
        $(this).attr('unselectable', 'on')
        .css('-moz-user-select', 'none')
        .each(function () {
            this.onselectstart = function () {
                return false;
            };
        });
    };
})(jQuery);


(function ($) {
    /* /////////////////////////////////////////////////////////////////// 
    Function returns previous or next element filtered by the selector 
    specifier. code found on stackoverflow:nickf
    
    usage:
    $('.myLinks').click(function() {
    $(this)
    .prevALL('.findme:first')
    .html("You found me!");

    // set previous nodes to blue
    $(this).prevALL().css('backgroundColor', 'blue');

    // set following nodes to red
    $(this).nextALL().css('backgroundColor', 'red');
    });

    Author: Chris Fontan
    /////////////////////////////////////////////////////////////////// */

    if (!jQuery.isFunction(jQuery.fn.reverse)) {
        // function doesn't exists, so we can now create it
        $.fn.reverse = function () {
            /// <summary>
            /// Add on function to reverse the stack.  
            /// All elements in the DOM are in the stack
            /// with an index. When reversed we can get 
            /// the next "previous" index.
            /// </summary
            return this.pushStack(this.get().reverse(), arguments);
        };
    }

    if (!jQuery.isFunction(jQuery.fn.prevALL)) {
        // function doesn't exists, so we can now create it
        $.each(['prev', 'next'], function (unusedIndex, name) {
            $.fn[name + 'ALL'] = function (matchExpr) {
                /// <summary>
                /// Create two new functions: prevALL and nextALL
                /// Bubble up DOM all the way to body tag create
                /// and index in an array and use it to get the
                /// instance of the element.
                /// Slice the $all object according to which way
                /// we're looking. Filter the matches if specified.
                /// TODO: Removed due to infinite loop in IE
                /// .andSelf()
                /// </summary>
                var $all = $('body').find(matchExpr);
                $all = (name == 'prev')
            ? $all.slice(0, $all.index(this)).reverse()
            : $all.slice($all.index(this) + 1);

                if (matchExpr) $all = $all.filter(matchExpr);
                return $all;
            };
        });
    }

    /*///////////////////////////////////////////////////////////////////
    Use to exclude nonEmptyValues
    usage:
    $('#lstReturnVendorsCd >option:nonEmptyValue').appendTo('#lstPositivePayVendorCd');
    •••••••••••••••••• 2011-7-1 Chris Fontan ••••••••••••••••••
    ///////////////////////////////////////////////////////////////////*/

    $.expr[':'].nonEmptyValue = function (obj) {
        return $(obj).val() != '';
    };

    $.expr[':'].EmptyValue = function (obj) {
        return $(obj).val() == '';
    };


})(jQuery);





(function ($) {
    /* /////////////////////////////////////////////////////////////////// 
    Plugin Created to add spinner with default Loading.. text appended to 
    selector. 
    You can also send the text as a parameter.

    example:
    //turn spinner on
                
    //default spinner Loading..  
    $('#divPickDepartments').spinnerOn();  
                
    //specify txt:  spinner Loading Report...  
    $('#divPickDepartments').spinnerOn('Loading Report...');  

    //turns spinner off
    $('#divPickDepartments').spinnerOff();
        
    file: 
    Reports\Payroll\rptLaborDistributionReport.asp 

    Author: Chris Fontan
    /////////////////////////////////////////////////////////////////// */

    $.each(['On', 'Off'], function (unusedIndex, name) {
        $.fn['spinner' + name] = function (txt) {
            if (typeof txt == 'undefined') txt = 'Loading..';
            if (name == 'On') {
                $(this).append('<span class="ClassLoading"><img src="' + $.fn.dirDepth() + 'Images/loading.gif" /> ' + txt + '</span>');
            }
            else {
                $(this).children('.ClassLoading').remove();
            }
        }
    });
})(jQuery);


