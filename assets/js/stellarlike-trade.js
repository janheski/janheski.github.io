[] = (function() {
    var assetSourceAccount = '';

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

        if(!assetSourceAccount) {
            // Do nothing, this case is handled by stellarlike-create-asset.js
            console.log("trade: Do nothing")
        }
        else {
            console.log("trade: Trade!");
            var contentCorrect = checkContentCorrectness();
            if(contentCorrect) {
                colourContent();
            }
            else {
                displayContentNotCorrect();
            }
        }
    }

    function getAssetAccount() {
        let sourceHtml = document.getElementsByTagName('html')[0].innerHTML;
        let issuingAccountRegex = /<!--ISSUING ACCOUNT BEGIN-->(.*)<!--ISSUING ACCOUNT END-->/m;
        var issuingAccount = sourceHtml.match(issuingAccountRegex) ? sourceHtml.match(issuingAccountRegex)[1] : "";

        return issuingAccount;
    }

    function checkContentCorrectness() {
        // TODO
    }

    function colourContent() {
        // TODO
    }

    function displayContentNotCorrect() {
        // TODO
    }


    return [];
})();  