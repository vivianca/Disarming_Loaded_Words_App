var cache = CacheService.getScriptCache();

function highSensitivity(){
  cache.put('sensitivity_threshold', 0.5);
  showSidebar();
}

function mediumSensitivity(){
  cache.put('sensitivity_threshold', 0.4);
  showSidebar();
}

function lowSensitivity(){
  cache.put('sensitivity_threshold', 0.25);
  showSidebar();
}

function onInstall() {
  onOpen();
}

function onOpen() {
  DocumentApp.getUi()
  .createAddonMenu()
  //.addItem("Run", "showSidebar")
   .addItem("Run - High Sensitivity", "highSensitivity")
   .addItem("Run - Medium Sensitivity", "mediumSensitivity")
   .addItem("Run - Low Sensitivity", "lowSensitivity")
  .addToUi();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile("sidebar")
    .evaluate()
    .setTitle("Disarming Loaded Words");
  DocumentApp.getUi().showSidebar(html);
}

function highlightBiasedWords() {  
  
  //DocumentApp.getUi().alert(cache.get('sensitivity_threshold'));
  //Pseudocode for next steps
  /*
  1. Get body of document (DONE)
  2. Set the body of http request to the body of document (DONE)
  3. Send a POST request (DONE)
  4. When we get the list of words back -> highlight those words
  */
  
  //this code passes the body of the document to the model via an API call
  body_string = DocumentApp.getActiveDocument().getBody().getText();
  th = cache.get('sensitivity_threshold').toString();
 
  var document_body = {
    'body': body_string,
    'sensitivity': th
  };
  
  var request_body= {
  'method' : 'post',
  'contentType': 'application/json',
  'payload' : JSON.stringify(document_body)
  }
  
  var response = UrlFetchApp.fetch('http://7cdba659.ngrok.io/api/v2.0/post', request_body);
  //DocumentApp.getUi().alert(response);
  
  //Take response and build a custom list of biased words.
  var jsonObj = JSON.parse(response);
  var wordsInContext = []
  
  //always biased words
  var corpusOfBiasedWords = ['bimbo', 'bitch', 'bombshell', 'catty', 'catfight', 'childish', 'cleavage', 'ditz', 'feisty', 'frump', 'matron', 'nasty', 'neckline', 'petite', 'pussy', 'sassy', 'sexy', 'scold', 'screech', 'shrew', 'shrill', 'slut', 'whine', 'whore'];
  
  // for loop that populates wordsInContext
  for (var wordBlob in jsonObj) {
    if (wordsInContext.indexOf(jsonObj[wordBlob].word)<0 && corpusOfBiasedWords.indexOf(jsonObj[wordBlob].word)<0){
        wordsInContext.push(jsonObj[wordBlob].word);
    }
  }

  //concatenate(corpusOfBiasedWords, wordsInContext)
  var allBiasedWords = corpusOfBiasedWords.concat(wordsInContext);
  
  var biasedWordsInText = [];
  var body = DocumentApp.getActiveDocument().getBody();
 
  for (var i = 0; i < allBiasedWords.length; i++) {
    var toFind = "(?i)" + allBiasedWords[i];
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
        //elem.asText().setLinkUrl(start, end, "google.com");
      }
      else {
        elem.setBackgroundColor("#FFB5B5");
      }
      found = body.findText(toFind, found);
    }
  }
  return biasedWordsInText;
}