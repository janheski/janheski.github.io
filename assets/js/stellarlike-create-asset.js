[stellarLike, assetPriceOnChange, keybaseUserChanged, createTransaction] = (function() {
    var assetSourceAccount = '';
    var asset = {initialPrice: 10};

    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(start);

    function start() {
        assetSourceAccount = getAssetAccount();

        console.log("assetSourceAccount:" + assetSourceAccount);
    
        if(!assetSourceAccount) {
            console.log("create asset: Create asset!")
            createStellarLikeButton();
        }
        else {
            console.log("create asset: Do nothing")
            // Do nothing, this case is handled by stellarlike-trade.js
        }
    }

    function getAssetAccount() {
        let sourceHtml = document.getElementsByTagName('html')[0].innerHTML;
        let issuingAccountRegex = /<!--ISSUING ACCOUNT BEGIN-->(.*)<!--ISSUING ACCOUNT END-->/m;
        var issuingAccount = sourceHtml.match(issuingAccountRegex) ? sourceHtml.match(issuingAccountRegex)[1] : "";

        return issuingAccount;
    }

    function createStellarLikeButton() {
        var buttonTemplate = `<div class="stellarlike">
            <a onclick="stellarLike()" class="stellarlikeLink">Stellar Like</a>
        </div>`;

        var div = document.createElement('div');
        div.innerHTML = buttonTemplate;
        document.body.appendChild(div);
    }

    function stellarLike() {
        var stellarLikeContent = readStellarLikeContent();
        asset.amount = stellarLikeContent.length;
        var assetNameProposalText = assetNameProposal(stellarLikeContent);
        buildStellarLikeForm(assetNameProposalText);
    }

    function readStellarLikeContent() {
        let sourceHtml = document.getElementsByTagName('html')[0].innerHTML;
        let contentRegex = /<!--STELLARLIKE CONTENT START-->(.*)<!--STELLARLIKE CONTENT END-->/m;
        var stellarLikeContent = sourceHtml.match(contentRegex)[1];
        // console.log("stellarLikeContent:" + stellarLikeContent);
        return stellarLikeContent;
    }

    function assetNameProposal(stellarLikeContent) {
        var div = document.createElement("div");
        div.innerHTML = stellarLikeContent;
        var text = div.textContent || div.innerText || "";
        // console.log(text);
        text = text.replace(/ /g,'');
        // console.log(text);
        return text.slice(0,12);
    }

    function buildStellarLikeForm(assetNameProposalText) {
        
        var template = `
            <H3>Stellar Like</H3>
            <label title="This is number of characters from your content. You are going to create same number of your Asset">Asset Amount: </label>${asset.amount}
            <br><label title="Please specify Asset Name. It can have maximum 12 characters. Any characters from the set [a-z][A-Z][0-9] are allowed." for="assetNameInput">Asset Name* </label>
            <input id="assetNameInput" name="assetNameInput" type="text" maxlength="12" value="${assetNameProposalText}" />
            <br><label title="Please specify price for 1 Asset in XLM (Stellar Lumens)" for="assetPriceInput">Asset Price* </label>
            <input id="assetPriceInput" name="assetPriceInput" type="number" value="${asset.initialPrice}" onchange="assetPriceOnChange()" /> XLM
            <br><label title="If all assets would be sold at your price, this is how much you would get.">Maximum possible earning: </label><span id="maxEarning">${calculateMaxEarning()}</span> XLM
            <br><label title="Please provide your keybase user. Your public Stellar Account ID will be retrieved." for="keybaseUser">Your Keybase user </label>
            <input id="keybaseUser" name="keybaseUser" type="text" onchange="keybaseUserChanged()" />
            <br><label title="Please provide your Stellar Account ID (public key). If you provide keybase user, your public Stellar Account ID will be retrieved here." for="stellarAccountId">Your Stellar Account ID* </label>
            <input id="stellarAccountId" name="stellarAccountId" type="text" size="70" maxlength="56" minlength="56" />
            <br><label title="" for="contentURL">Content URL: </label>
            <input id="contentURL" name="contentURL" type="text" value="${getURL()}" />
            <br><a id="createTransaction" onclick="createTransaction()" class="stellarlikeLink">Create Transaction</a>
            <br><span id="message"></span>
        `;
        var div = document.body.querySelector("div.stellarlike");
        div.innerHTML = template;
        window.scrollTo(0, document.body.scrollHeight);
    }

    function assetPriceOnChange() {
        var maxEarning = calculateMaxEarning();
        document.getElementById('maxEarning').innerText = maxEarning;
    }

    function calculateMaxEarning() {
        var price = document.getElementById('assetPriceInput') ? document.getElementById('assetPriceInput').value : asset.initialPrice;
        var maxEarning = price * asset.amount;
        return maxEarning;
    }

    function keybaseUserChanged() {
        var keybaseUser = document.getElementById('keybaseUser').value;

        if(keybaseUser) {
            var stellarAccountId = getStellarAccount(keybaseUser);
        }
    }

    function getStellarAccount(keybaseUser) {
        var xhr = new XMLHttpRequest();
        var stellarId = '';

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var responseJSON = xhr.response;
                var response = JSON.parse(responseJSON);

                if(response.them[0]) {
                    stellarId = response.them[0].stellar.primary.account_id;

                    if(stellarId && stellarId.length == 56) {
                        setStellarAccountId(stellarId);
                    }
                    else {
                        console.log("Stellar ID retrieved for keybase user is in incorrect format: " + stellarId);
                        setStellarAccountId("");
                    }
                }
                else {
                    console.log("No keybase user found: " + keybaseUser);
                    setStellarAccountId("");
                }
            } else {
                console.log('The request failed!');
                setStellarAccountId("");
            }
        };

        xhr.open('GET', 'https://keybase.io/_/api/1.0/user/lookup.json?usernames=' + keybaseUser);
        xhr.send();
    }

    function setStellarAccountId(stellarAccountId) {
        document.getElementById('stellarAccountId').value = stellarAccountId;
    }

    function getURL() {        
        return document.location.href;
    }

    function createTransaction() {
        info("");
        var assetNameOk = validateAssetName();
        
        if(!assetNameOk) {
            error("Asset Name is not ok");
        }
        else {
            var stellarAccountIdOk = validateStellarAccountId();

            if(!stellarAccountIdOk) {
                error("Stellar Account ID is not ok");
            }
            else {
                var decision = confirm("Are you sure?");

                if(decision) {
                    console.log("Starting generating transaction");
                }
            }
        }
    }

    function validateAssetName() {
        asset.name = document.getElementById('assetNameInput').value;
        var regex = /[a-zA-Z0-9]+/;
        var regexedText = asset.name.match(regex);

        if(regexedText[0].length === asset.name.length) {
            return true;
        }
        else {
            return false;
        }
    }

    function validateStellarAccountId() {
        asset.stellarAccountId = document.getElementById('stellarAccountId').value;

        if(asset.stellarAccountId.length == 56) {
            return true;
        }
        else {
            return false;
        }
    }

    function error(message) {
        setMessage(message, "error");
        window.scrollTo(0, document.body.scrollHeight);
    }

    function info(message) {
        setMessage(message, "info");
        window.scrollTo(0, document.body.scrollHeight);
    }

    function setMessage(message, level) {
        var messageEl = document.getElementById("message");
        messageEl.innerText = message;
        messageEl.setAttribute("class", level);
    }

    return [stellarLike, assetPriceOnChange, keybaseUserChanged, createTransaction];
})();  