var drivers;
// loading data from DB
$(document).ready(function () {

	$.ajax({
		//method: 'GET',
		url: "https://api.mongolab.com/api/1/databases/cars/collections/drivers?apiKey=_IUolN87EnEDzGqlWEQ6pA2fXkp-IZdA",

	}).done(function (data) {
		//console.log(data);
		if (data != null)
			drivers = data;
		else console.log("data is null");

	});


});

// adding a new driver from /addnewdriver page
$("#add-driver").on("submit", function (e) {
	e.preventDefault();
	var first_name = $('#first_name').val();
	var last_name = $('#last_name').val();
	var id = $('#id').val();
	var p_num = $('#p_num').val();
	if (first_name && last_name && id && p_num && id) {
		$.ajax({
			url: "https://api.mongolab.com/api/1/databases/cars/collections/drivers?apiKey=_IUolN87EnEDzGqlWEQ6pA2fXkp-IZdA",
			data: JSON.stringify({
				"first_name": first_name,
				"last_name": last_name,
				"id": id,
				"p_num": p_num,
				"permission_status": "allowed",
				"parking_status": "outside"
			}),
			type: "POST",
			contentType: "application/json",
			success: function (data) {
				location.reload(true);
			},
			error: function (xhr, status, err) {
				console.log(err);
			}
		})
	} else alert("Please fill the form correctly");
})

/*$("#add-driver").submit(function(){
	var wrongP_name=false;
	if(wrongP_name)return alert("submitted");
	else return alert("NOT submitted");
})
*/

//show all drivers from DB in the table
$("#btn_showAllDrivers").click(function () {
	if (drivers != null) {
		$("#User_len").text(" " + drivers.length);
		var result = (50 * drivers.length) / 100;
		$("#div_prgs").css({
			'width': result
		});
		$("#prgs_space").text("" + result + "%");
		$("#prgs_space").css({
			'color': 'black'
		});
	   fillTable(drivers);
	 
	}
});


$(document).ready(function () {
	
	var addDriver = $("#addDriver");

	$("#btn_addDriver").click(function () {
		addDriver.dialog('open');
	})
	addDriver.dialog({
		title: "Add a new driver",
		autoOpen: false,
		modal: true,
		buttons: {
			'Add driver': function () {
				{
					var first_name = $('#first_name').val();
					var last_name = $('#last_name').val();
					var id = $('#id').val();
					var p_num = $('#plate_number').val();
					if (first_name && last_name && id && p_num && id) {
						$.ajax({
							url: "https://api.mongolab.com/api/1/databases/cars/collections/drivers?apiKey=_IUolN87EnEDzGqlWEQ6pA2fXkp-IZdA",
							data: JSON.stringify({
								"first_name": first_name,
								"last_name": last_name,
								"id": id,
								"p_num": p_num,
								"permission_status": "allowed",
								"parking_status": "outside"
							}),
							type: "POST",
							contentType: "application/json",
							success: function (data) {
								location.reload(true);
							},
							error: function (xhr, status, err) {
								console.log(err);
							}
						})
					} else alert("Please fill the form correctly");
				}
			},
			'Cancel': function () {
				addDriver.dialog('close');
			}
		}
	})

})

/*--- fill the table with all drivers ---*/
function fillTable(myArr){
	var htmlCode = '';
	$.each(myArr,function(key,value){
		
		htmlCode += '<tr>';
		htmlCode += '<td>'+value.first_name+'</td>';
		htmlCode += '<td>'+value.last_name+'</td>';
		htmlCode += '<td>'+value.id+'</td>';
		htmlCode += '<td>'+value.p_num+'</td>';
		htmlCode += '</tr> ';	
	});
     $("#tbl_drivers tbody").append(htmlCode);
}

$('#tbl_drivers tbody').click(function(){
	var corrow = $(this).closest('tr');
	var col0 = corrow.find('td:eq(0)').text();
	var col1 = corrow.find('td:eq(1)').text();
	var col2 = corrow.find('td:eq(2)').text();
	var col3 = corrow.find('td:eq(3)').text();
	var result = col0+"\n" +col1+"\n"+col2+"\n"+col3+"\n";
	alert(result);
})

/*$(document).ready(function(){
	var driverSearch=$("#driverSearch");
	$("#btn_search").click(function(){
		driverSearch.dialog('open');
	})
	driverSearch.dialog({
		title: "Search for a driver",
		autoOpen: false,
		modal: true,
		buttons: {
			'Search': function(){},
			'Cancel': driverSearch.dialog('close')
		}
	})
})
*/


