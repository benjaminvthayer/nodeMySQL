// 1) Using jquery -- create $(document).ready function

// 2) Within here put a listener on the search button -- it can be in a form or not

// 3) Get the username from the input box and put that into the gitHub api url ( https://api.github.com/users/{username} )

// 4) Use an ajax call to call to this url and get back the json data

// 5) Pull out and put the data that you need to put into the elements on your html page


$( document ).ready(function() {
	$("#search").click( function(){
		var username=$('input').val() ;
		var theURL = "https://api.github.com/users/"+username
		$('.result0').empty()
		$(".result1").text("Error: User Name Not Found")
		$(".result2").text("")
		$(".result3").text("")
		$.getJSON(theURL, function(data) {
			var imgTag='<img id="userImg" src="'+data.avatar_url+'" />';
			$('.result0').html(imgTag)
			$(".result1").text("UserName: "+data.login)
			$(".result2").text("Public Repos: "+data.public_repos)
			$(".result3").text("Followers: "+data.followers)
		});
	});
});
