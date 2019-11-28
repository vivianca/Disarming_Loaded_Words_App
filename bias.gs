function onInstall() {
  onOpen();
}

function onOpen() {
  DocumentApp.getUi()
  .createAddonMenu()
  .addItem("Run", "showSidebar")
  .addToUi();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile("sidebar")
    .evaluate()
    .setTitle("Disarming Loaded Words");
  DocumentApp.getUi().showSidebar(html);
}

function highlightBiasedWords() {
  
  //Pseudocode for next steps
  /*
  1. Get body of document (DONE)
  2. Set the body of http request to the body of document (DONE)
  3. Send a POST request (DONE)
  4. When we get the list of words back -> highlight those words
  */
  
  /* COMMENTED OUT --- this code passes the body of the document to the model via an API call
  body_string = DocumentApp.getActiveDocument().getBody().getText();
 
  var document_body = {
    'body': body_string
  };
  
  var request_body= {
  'method' : 'post',
  'contentType': 'application/json',
  'payload' : JSON.stringify(document_body)
  }
  
  var response = UrlFetchApp.fetch('http://c4a7a068.ngrok.io/api/v2.0/post', request_body);
  DocumentApp.getUi().alert(response);
  */

  var corpusOfBiasedWords = ['bimbo', 'bitch', 'bombshell', 'catty', 'catfight', 'childish', 'cleavage', 'ditz', 'feisty', 'frump', 'matron', 'nasty', 'neckline', 'petite', 'pussy', 'sassy', 'sexy', 'scold', 'screech', 'shrew', 'shrill', 'slut', 'whine', 'whore'];
  var biasedWordsInText = [];
  var body = DocumentApp.getActiveDocument().getBody();
 
  for (var i = 0; i < corpusOfBiasedWords.length; i++) {
    var toFind = "(?i)" + corpusOfBiasedWords[i];
    var found = body.findText(toFind);
    while (found) {
      if (biasedWordsInText.indexOf(toFind)<0){
        biasedWordsInText.push(toFind);
      }
      var elem = found.getElement();
      if (found.isPartial()) {
        var start = found.getStartOffset();
        var end = found.getEndOffsetInclusive();
        elem.setBackgroundColor(start, end, "#FFB5B5");     
      }
      else {
        elem.setBackgroundColor("#FFB5B5");
      }
      found = body.findText(toFind, found);
    }
  }
  return biasedWordsInText;
}