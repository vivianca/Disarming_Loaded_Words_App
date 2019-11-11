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
	highlightBiasedWords();
}

function highlightBiasedWords() {
	var corpusOfBiasedWords = ['bimbo', 'bitch', 'bombshell', 'catty', 'childish', 'cleavage', 'feisty', 'frump', 'matron', 'nasty', 'petite', 'scold', 'shrew', 'shrill'];
	var body = DocumentApp.getActiveDocument().getBody();      
  for (var i = 0; i < corpusOfBiasedWords.length; i++) {
    var found = body.findText(corpusOfBiasedWords[i]);
    while (found) {
      var elem = found.getElement();
      if (found.isPartial()) {
        var start = found.getStartOffset();
        var end = found.getEndOffsetInclusive();
        elem.setBackgroundColor(start, end, "#FFB5B5");     
      }
      else {
        elem.setBackgroundColor("#FFB5B5");
      }
      found = body.findText(corpusOfBiasedWords[i], found);
    }
  }
}