var result = document.getElementById("result");
var list = document.getElementById("list");
var title = document.getElementById("title");
var speech = document.getElementById("partOfSpeech");
var noRes = document.getElementsByClassName("noRes")[0];

function dispNode(node, setting) {
    node.style.display = setting;
}
function setTextNode(node, text) {
    node.innerHTML = text;
}
window.onload = function() {
    dispNode(result,"none");
};
async function getData() {
  
    dispNode(result,"none");

    
    setTextNode(list, "");
    setTextNode(title, "");
    setTextNode(speech, "");
    setTextNode(noRes, "");

   
    var word = document.getElementById("searchBox").value;

    
    if (word == "" || word == null) {
        setTextNode(
            document.getElementsByClassName("errorMsg")[0],
            "Please enter any word."
        );
    } else {
        
        var baseUrl = "https://dictionaryapi.com/api/v3/references/learners/json/";
        var apikey = "6b5f2059-92e7-4761-b787-d7ff3514ae73";
        var query = word;
        var url = baseUrl + query + "?key=" + apikey;

        
        const def = await fetch(url);

        
        const jsonObj = await def.json();

        
        console.log(jsonObj[0]);

       
        if (typeof jsonObj[0] == "string") {
            
            var sugg = jsonObj[0];

            
            for (var i = 1; i < jsonObj.length; i++) {
                sugg = sugg + ", " + jsonObj[i];
            }

            console.log(sugg);

			
			setTextNode( noRes, "Sorry! No results found. Did you mean any of " + sugg + "?");
			
        } else {
            
            var partOfSpeech = jsonObj[0].fl;
            console.log(typeof jsonObj[0]);
            var defs = [];
            defs = jsonObj[0].shortdef;

			
            var output = "";
            for (var i = 0; i < defs.length; i++) {
                output = output + '<li class="define">' + defs[i] + "</li>";
			}
			
			
			setTextNode(speech,partOfSpeech);
			setTextNode(list,output);
        }

		setTextNode(title,word);
		dispNode(result,"flex");
    }
}

window.addEventListener("load",(e) => {
    console.log("called");
	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('./serviceworker.js');
			console.log('SW registered');
		} catch (error) {
			console.log('SW failed');

		}
	}
});
