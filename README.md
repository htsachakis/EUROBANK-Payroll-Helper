# EUROBANK-Payroll-Helper
A Simple Tampermonkey script to help you with the payroll

## How to use it 
1. First you need to have install the add exstension for you browser .
For Chrome install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
For Firefox install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

2. Install the EUROBANK-Payroll-Helper by clicking [here](https://github.com/htsachakis/EUROBANK-Payroll-Helper/raw/main/eurobank.user.js) and then install

3. Login to your bank account and then go to payroll where you normaly input the data manually.

4. There you will see 3 new buttons ("Step 1 - Add Data" , "Step 1.5 - Clear Form" , "Step 2 - Run")

5. "Step 1 - Add Data" when you click it it will apear a new input area so you can put your data in JSON format .
Example
```JSON
{
  "0" : {"IBAN" : "GR1234567943135464654165456" , "pay" : "100,00"},
  "1" : {"IBAN" : "GR6596465464654564654654872" , "pay" : "200,00"},
  "2" : {"IBAN" : "GR6876286465467823647664646" , "pay" : "300,00"},
  "3" : {"IBAN" : "GR1902601080000750200595168" , "pay" : "400,55"}
}
```
6. "Step 1.5" - Clear Form" if the form have data and you need to clear it just press this button .

7. "Step 2 - Run" Just press it to run the script and fill the form .

8. Check if everything is correct and proceed as you normaly do . 


### Disclaimer
This script created by me for me , and i'm not responsible if anything go wrong . This script don't upload any data to anywhere , all the process is done locally to your computer.
# Use it your own risk
