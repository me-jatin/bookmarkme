//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){

	//get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
  if(!validateForm(siteName,siteUrl)){
    return false;
  }

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	
	/*
	//local storage test : local storage only stores string
	//local storage is a part of html5 standard
	localStorage.setItem('test','Hello World');
	localStorage.getItem('test');
	localStorage.removeItem('test');
	*/

	//test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//init array
		var bookmarks = []; //Json array 
		//add to array
		bookmarks.push(bookmark);
		//set to localstorage
		//convert to string before storing
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	else{
		//get bookmarks from local storage
		//json.parse will turn the string back into json format
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);		
		//reset to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
	//clear form
	document.getElementById('myForm').reset();

	//re - fetch bookmarks
	fetchBookmarks();

	//prevent form from submitting
	//e.prevenDefault();

}

//delete bookmarks

function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

//fetch bookmarks

function fetchBookmarks(){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output
	bookmarksResults.innerHTML='';		

	for(var i=0;i<bookmarks.length;i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class="well">'+
									  '<h3>'+name+
									  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
									  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
									  '</h3>'+
									  '</div>';
	}
}
// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  //create regular expression
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}