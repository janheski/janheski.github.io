(function() {
    var text = document.createTextNode("Stellar Like");
    var button = document.createElement("a");
    button.setAttribute('onclick', 'stellarLike()');
    button.appendChild(text);
    var div = document.createElement('div');
    div.setAttribute('class','stellarlike');    
    div.appendChild(button);
    document.body.appendChild(div);
})();  

function stellarLike() {
    var stellarLikeContent = readStellarLikeContent();
    var assetAmount = stellarLikeContent.length;
    var assetNameProposalText = assetNameProposal(stellarLikeContent);
    // console.log('assetNameProposal:' + assetNameProposalText);
    buildStellarLikeForm(assetAmount, assetNameProposalText);
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

function buildStellarLikeForm(assetAmount, assetNameProposalText) {
    var div = document.body.querySelector("div.stellarlike");

    var br = document.createElement('br');
    div.appendChild(br);

    var assetAmountText = document.createTextNode("Asset Amount: " + assetAmount);
    div.appendChild(assetAmountText);
    
    var br = document.createElement('br');
    div.appendChild(br);

    var assetNameLabel = document.createElement('label');
    assetNameLabel.setAttribute('for','assetNameInput');
    assetNameLabelText = document.createTextNode("Asset Name: ");
    assetNameLabel.appendChild(assetNameLabelText);
    div.appendChild(assetNameLabel);

    var assetNameInput = document.createElement('input');
    assetNameInput.setAttribute('id','assetNameInput');
    assetNameInput.setAttribute('name','assetNameInput');
    assetNameInput.setAttribute('type','text');
    assetNameInput.setAttribute('maxLength','12');
    assetNameInput.setAttribute('value',assetNameProposalText);
    div.appendChild(assetNameInput);

    var br = document.createElement('br');
    div.appendChild(br);

    var assetPriceLabel = document.createElement('label');
    assetPriceLabel.setAttribute('for','assetPriceInput');
    assetPriceLabelText = document.createTextNode("Asset Price: ");
    assetPriceLabel.appendChild(assetPriceLabelText);
    div.appendChild(assetPriceLabel);

    var assetPriceInput = document.createElement('input');
    assetPriceInput.setAttribute('id','assetPriceInput');
    assetPriceInput.setAttribute('name','assetPriceInput');
    assetPriceInput.setAttribute('type','number');
    assetPriceInput.setAttribute('value',10);
    assetPriceInput.setAttribute('onChange', "assetPriceOnChange()");
    div.appendChild(assetPriceInput);

    var assetPriceText = document.createTextNode(" XLM");
    div.appendChild(assetPriceText);
}

function assetPriceOnChange() {
    
}