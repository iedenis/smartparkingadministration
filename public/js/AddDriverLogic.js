var btnAdd = document.getElementById("btn_add");
var textBoxs = document.querySelectorAll("input");
var driver;
var isEmpty = true;
//var url = "https://alpradministration.000webhostapp.com/"
btnAdd.addEventListener("click", function(){
			
	isEmpty = checkFields();
	
	 if(isEmpty == false){
	    buildDriver(textBoxs[0].value, textBoxs[1].value, textBoxs[2].value, textBoxs[3].value)
		 Request(url, driver);
	 }
	
 	
						
});


	
	function checkFields(){
		
		for(var i=0; i < textBoxs.length; i++){
		   
			if(textBoxs[i].value == ""){
			    return true;
		      } 
	        }
		
	    return false;
    }


function buildDriver(firstName, LastName, id, plateNumber)
{
	driver={
		f_Name: firstName,
		l_Name: LastName,
		id: id,
		p_Num: plateNumber,
		ex_data: "2018/08/21"
	}
}


   function Request(url, driver)
    {
	  var xhttp = new XMLHttpRequest();
		
	  xhttp.onreadystatechange = function(){
		  
		  if(this.readyState == 4 && this.status == 200 )
			  {
				  alert("success");
			  }
	  }
	  xhttp.open("post", url, true);
      xhttp.send();
  }