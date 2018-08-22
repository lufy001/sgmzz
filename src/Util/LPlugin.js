var LPlugin = window.LPlugin || {};
LPlugin.SetData = function(key,data){
	if(LPlugin.writeToFileInDomain){
		LPlugin.writeToFileInDomain(key, JSON.stringify(data));
	}else{
		try{
			window.localStorage.setItem(key, JSON.stringify(data));
		}catch(e){
			console.error("not supported window.localStorage", data);
		}
	}
};
LPlugin.GetData = function(key, defaultData){
	var data;
	if(LPlugin.readFileInDomain){
		data = LPlugin.readFileInDomain(key);
	}else{
		try{
			data = window.localStorage.getItem(key);
		}catch(e){
			console.error("not supported window.localStorage");
		}
    }
	if(!data){
		return (typeof defaultData !== UNDEFINED) ? defaultData : {};
	}
	var result;
	try{
		result = JSON.parse(data);
	}catch(e){
		result = {};
		console.error("not json error", data);
	}
	return result;
};
LPlugin.DeleteData = function(key){
	if(LPlugin.deleteFileInDomain){
		LPlugin.deleteFileInDomain(key);
	}else{
		window.localStorage.setItem(key, undefined);
	}
};