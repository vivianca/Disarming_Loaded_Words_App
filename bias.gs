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
	var doc = DocumentApp.getActiveDocument();
	for (var i = 0; i < corpusOfBiasedWords.length; i++) {
		var textToHighlight = corpusOfBiasedWords[i];
		var textLength = textToHighlight.length;
		var paras = doc.getParagraphs();
		var paraText = '';
		var start;
		for (var j = 0; j < paras.length; ++j) {
			paraText = paras[j].getText(); // first word of paragraph
			start = paraText.indexOf(textToHighlight);
			if (start >= 0) {
				var preText = paraText.substr(0, start);
				var text = paraText.substr(start, textLength);
				var postText = paraText.substr(start + textLength, paraText.length);
				doc.removeChild(paras[j]);
				var newPara = doc.insertParagraph(j, preText);
				newPara.appendText(text).setForegroundColor('#FF0000'); // red
				if (postText != "") {
					newPara.appendText(postText).setForegroundColor('#000000');
				}
			}
		}
	}
}
