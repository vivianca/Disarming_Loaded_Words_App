function onInstall() {
  onOpen();
}

function onOpen() {
  DocumentApp.getUi()
  .createAddonMenu()
  .addItem("Disarming Loaded Words", "showSidebar")
  .addToUi();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile("sidebar")
    .evaluate()
    .setTitle("Disarming Loaded Words");
  DocumentApp.getUi().showSidebar(html);
}

function highlightBiasedWords() {
  var corpusOfBiasedWords = ['bimbo', 'bitch', 'bombshell', 'catty', 'childish', 'cleavage', 'feisty', 'frump', 'matron', 'nasty', 'neckline', 'petite', 'scold', 'screech', 'shrew', 'shrill'];
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