<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">
    <!-- The CSS package above applies Google styling to buttons and other elements. --> 
    <!-- Load the jQuery library from the Google CDN -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js">
    </script>
    <style type="text/css" media="screen">
      p {
        margin-top: 5%;
        margin-bottom: 5%;
        margin-right: 5%;
        margin-left: 5%;
      }
    </style>
  </head>
  <body>
    <p><b> Welcome to Disarming Loaded Words! </b><p>
    <p>We are an application built by Stanford students to help you detect gender bias in political reporting.</p>
    <p>Here are some words we found in the document that you might want check out for bias:</p>
    <p id="biasedWords" style="padding: 5%; text-align:left;"></p>
    <script>
    
      //hardcoded list of explanations
      var explanations = {"cleavage":"This word inappropriately uses a woman's physical features.", "neckline":"This word inappropriately uses a woman's physical features."};
    
      function getBiasedWords(){
         google.script.run
         .withSuccessHandler(doBias)
         .withFailureHandler(function(msg,element){window.alert("failed");})
         .highlightBiasedWords();
      }
      getBiasedWords();
      function doBias(words) { 
         for(i = 0; i < words.length; ++i){
            var biasedWordDiv = document.createElement('div');
            var word = words[i].substr(4); //4 gets rid of the regex
            biasedWordDiv.innerHTML = "<b>"+ word + "<\/b>";
            document.getElementById("biasedWords").appendChild(biasedWordDiv);
            
            //Append an explanation, if needed
            var explanation = explanations[word];
            if(explanation){
                var explanationDiv = document.createElement('div');
                explanationDiv.innerHTML = explanation;
                document.getElementById("biasedWords").appendChild(explanationDiv);
            }
            
            //Append blank div for beautification
            var blankDiv = document.createElement('div');
            blankDiv.innerHTML = "<p><\/p>";
            document.getElementById("biasedWords").appendChild(blankDiv);
            
         }
         console.log(words);
      }
    </script>
  </body>
</html>