new Promise (function(resolve){
		window.onload = resolve
})
.then(function(){
	return new Promise (function(resolve, reject){
		VK.init({
			apiId : 6067884
		})
		VK.Auth.login(function(response){
			if (response.session){
				
				resolve(response);
			}
			else {
				reject (new Error ('Не удалось авторизоваться'));
			}
		}, 2)
	})
})
.then(function(){
	return new Promise (function(resolve, reject){
		console.log(VK.api);
		VK.api('friends.get', {v : '5.64', fields : 'photo_100'}, function(response){

			if (response.error){
				reject (new Error (response.error.error_msg));

			}
			else{

			resolve(response);

			}
		})
	})
})