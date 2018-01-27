
var drivers;
var table =	document.getElementById("tbl_drivers");
var resp = "";



$(document).ready(function(){
	
 $.ajax({
     method: 'GET',
	 url : "https://alpradministration.000webhostapp.com",
	 
    }).done(function(data){
	    //drivers = JSON.parse(data.responseText);
	 console.log(data);
     });
	  

});



$("#btn_findDriver").click(function(){
	if(drivers != null){	
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

	
	for(var i = 1; i < drivers.length; i++ ){
	
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




