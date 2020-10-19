// ==UserScript==
// @name         Eurobank Payroll
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Eurobank payroll Helper
// @author       htsachakis
// @match        https://services.eurobank.gr/ebanking/cashmanagement/epayroll.faces
// @match        https://services.eurobank.gr/ebanking/cashmanagement/epayroll_new.faces
// @updateURL    https://github.com/htsachakis/EUROBANK-Payroll-Helper/raw/main/eurobank.user.js
// @downloadURL  https://github.com/htsachakis/EUROBANK-Payroll-Helper/raw/main/eurobank.user.js
// @grant        none
// ==/UserScript==

(function($){
    //Saved Data

    var savedData = "";

    function findTableID(){
        return document.getElementById("panelEpayrollRecords").getElementsByTagName("table")[0].id;
    }
    function findTableRowsNum(){
        var tbl = document.getElementById(findTableID() + ":tb");
        return tbl.getElementsByTagName("tr").length
    }
    function findtableLastRow(){
        return findTableRowsNum() - 1;
    }
    function findRemoveRecordButtonID(){
        var tblRows = document.getElementById(findTableID() + ":tb").getElementsByTagName("tr");
        var addBTN = tblRows[0].getElementsByTagName("a");
        return addBTN[0].id;
    }
    function findAddNewRecordButtonID(){
        var tblRows = document.getElementById(findTableID() + ":tb").getElementsByTagName("tr");
        var addBTN = tblRows[findtableLastRow()].getElementsByTagName("a");
        return addBTN[1].id;
    }
    function findFormID(){
        return document.getElementById("epayrollPanelContainer").getElementsByTagName("form")[0].id;
    }
    function findFieldIBANID(){
        return findFormID() + ":creditAccount";
    }
    function findFieldPayID(){
        return findFormID() + ":inputAmount";
    }
    function findAddButtonID(){
        return document.getElementById(findFormID()).getElementsByClassName("buttons")[0].getElementsByTagName("input")[0].id;
    }
    function findCancelButtonID(){
        return document.getElementById(findFormID()).getElementsByClassName("buttons")[0].getElementsByTagName("input")[1].id;
    }

    function step_zero(){
        // 1. Create the button
        var button = document.createElement("div");
        button.innerHTML = "Step 0 - Find Elemnts";
        button.setAttribute("style", "background-color: black; color: white; display: block; padding: 10px; text-align: center;cursor:pointer;");
        if(document.getElementById("epayrollPanelContainer")){
            // 2. Append somewhere
            var body = document.getElementsByClassName("buttons")[0];
            body.appendChild(button);
        }
        // 3. Add event handler
        button.addEventListener ("click", function() {
            console.log("Table ID:"+findTableID());
            console.log("Table ROWS Num:"+findTableRowsNum());
            console.log("Table LAST ROW Num:"+findtableLastRow());
            console.log("Remove Button ID:"+findRemoveRecordButtonID());
            console.log("Add Button ID:"+findAddNewRecordButtonID());
            document.getElementById(findAddNewRecordButtonID()).click();
            console.log("Forms ID:"+findFormID());
            console.log("Forms IBAN ID:"+findFieldIBANID());
            console.log("Forms Pay ID:"+findFieldPayID());
            console.log("Forms AddBTN ID:"+findAddButtonID());
            console.log("Forms CancelBTN ID:"+findCancelButtonID());
            document.getElementById(findCancelButtonID()).click();
        });
    }

    function add_input_data_elements(){
        // Button for add data
        var button = document.createElement("div");
        button.innerHTML = "Step 1 - Add Data";
        button.setAttribute("style", "background-color: black; color: white; display: block; padding: 10px; text-align: center;");


        //create the modal window
        var modal = document.createElement("div");
        //modal.innerHTML = "Add Data element";
        modal.setAttribute("id", "modal_payroll");
        modal.setAttribute("style", "display: block;background: rgba(50, 115, 220, 0.3);position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;");
        //create the input in modal
        var payroll_data = document.createElement("textarea");
        payroll_data.setAttribute("id", "payroll_data");
        payroll_data.setAttribute("style", "width:800px;height:500px;margin:50px;");
        payroll_data.setAttribute("placeholder", 'You need to add data in JSON format ,  Sample Data : {"0" : {"IBAN" : "YOURIBANAHERE", "pay" : "payamounthere"}, "1" : {"IBAN" : "GR1234567894646435" , "pay": "400.00"}');
        modal.appendChild(payroll_data);
        //create buttons container
        var buttons = document.createElement("div");
        buttons.setAttribute("id", "payroll_buttons");
        buttons.setAttribute("style", "width: 800px;display: block;margin: 0px auto;");
        //create upload button
        var upload_button = document.createElement("div");
        upload_button.innerHTML = "Upload Data";
        upload_button.setAttribute("id", "payroll_upload_button");
        upload_button.setAttribute("style", "background-color: black; color: white; display: block; padding: 10px; text-align: center;float:left;cursor:pointer;");
        buttons.appendChild(upload_button);
        //create cancel button
        var cancel_button = document.createElement("div");
        cancel_button.innerHTML = "Cancel";
        cancel_button.setAttribute("id", "payroll_cancel_button");
        cancel_button.setAttribute("style", "background-color: black; color: white; display: block; padding: 10px; text-align: center;float:right;cursor:pointer;");
        buttons.appendChild(cancel_button);
        //attach the buttons in modal
        modal.appendChild(buttons);

        // on click for add data button
        button.addEventListener ("click", function() {
            console.log("Works...");
            document.body.appendChild(modal);
        });

        // on click cancel button
        cancel_button.addEventListener ("click", function() {
            console.log("modal Works...");
            document.getElementById("modal_payroll").remove();
        });

        // on click upload data button
        upload_button.addEventListener ("click", function() {
            var data = JSON.parse(document.getElementById("payroll_data").value);
            savedData = data;
            document.getElementById("payroll_data").value = '';
            document.getElementById("modal_payroll").remove();
        });

        // append the add data button on main site
        if(document.getElementById("epayrollPanelContainer")){
            // 2. Append somewhere
            var body = document.getElementsByClassName("buttons")[0];
            body.appendChild(button);
        }

    }

    function add_execute_button(){
        // Button for add data
        var button = document.createElement("div");
        button.innerHTML = "Step 2 - Run";
        button.setAttribute("style", "background-color: black; color: white; display: block; padding: 10px; text-align: center;");

        // on click for add data button
        button.addEventListener ("click", function() {
            console.log(savedData);
            actionLoop();
        });

        // append the add data button on main site
        if(document.getElementById("epayrollPanelContainer")){
            // 2. Append somewhere
            var body = document.getElementsByClassName("buttons")[0];
            body.appendChild(button);
        }
    }
    function add_clear_button(){
        // Button for add data
        var button = document.createElement("div");
        button.innerHTML = "Step 1.5 - Clear Form";
        button.setAttribute("style", "background-color: black; color: white; display: block; padding: 10px; text-align: center;");

        // on click for add data button
        button.addEventListener ("click", function() {
            (function myLoop(j,datalen) {
                setTimeout(function() {
                    document.getElementById(findRemoveRecordButtonID()).click();
                    console.log(j + 1);
                    j++;
                    if (j < datalen) myLoop(j,datalen);
                }, 100)
            })(0,findTableRowsNum() - 1);
        });

        // append the add data button on main site
        if(document.getElementById("epayrollPanelContainer")){
            // 2. Append somewhere
            var body = document.getElementsByClassName("buttons")[0];
            body.appendChild(button);
        }
    }


    // here is all the action
    var i = 0;
    function actionLoop() {
        setTimeout(function() {
            // ##Add
            document.getElementById(findAddNewRecordButtonID()).click()
            setTimeout(function(){
                // ##ACCOUNT SELECT##
                document.getElementById(findFieldIBANID()).value = savedData[i]["IBAN"]
                // ##AMOUNT INSERT##
                document.getElementById(findFieldPayID()).value = savedData[i]["pay"]
                // ##ADD THE RECORD##
                document.getElementById(findAddButtonID()).click()
                console.log(i + 1 +"/"+ Object.keys(savedData).length )
                i++;
            },200);
            if (i < Object.keys(savedData).length - 1) {
                actionLoop();
            }
        }, 500)
    }
    // add the first button
    //step_zero();
    add_input_data_elements();
    add_clear_button();
    // add the do button
    add_execute_button();
})();
