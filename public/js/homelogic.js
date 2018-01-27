
var drivers;
var table =	document.getElementById("tbl_drivers");
var resp = "";



$(document).ready(function(){
	
 $.ajax({
     //method: 'GET',
	 url : "https://api.mongolab.com/api/1/databases/cars/collections/drivers?apiKey=_IUolN87EnEDzGqlWEQ6pA2fXkp-IZdA",
	 
    }).done(function(data){
		//console.log(data);
		if(data!=null)
		drivers = data;
		else console.log("data is null");
		
     });
	  

});



$("#btn_findDriver").click(function(){
	if(drivers != null){
		console.log(drivers);	
		$("#User_len").text(" "+drivers.length);
		var result = (50*drivers.length)/100;
		$("#div_prgs").css({'width': result});
		$("#prgs_space").text(""+result+"%");
		$("#prgs_space").css({'color' : 'black'});
		genarateTable();
	}
});




 function format(str){
	 var i = 0;
	 var res = "";
	 while(str[i] != ']'){
	    res += str[i];
	     i++;
	 }
	  res += ']'
	 return JSON.parse(res);
 }



function genarateTable(){

	
	for(var i = 0; i < drivers.length; i++ ){
	
	var row = table.insertRow();
	var col = row.insertCell(0);
	var col1 = row.insertCell(1);
	var col2 = row.insertCell(2);
	var col3 = row.insertCell(3);
	var d = drivers[i];
	
	col.innerHTML = d["first_name"];
	col1.innerHTML =d["last_name"];
	col2.innerHTML = d["id"];
	col3.innerHTML = d["p_num"];
	}
}




