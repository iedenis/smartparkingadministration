var drivers;
var editDriver = $('#editDriver');
var beforeEdit;
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

	editDriver.dialog({
		title: "Edit Driver",
		autoOpen: false,
		modal: true,
		buttons: {
			"Edit driver": function () {
				console.log(beforeEdit.val);
				if($("#first_name").val()==beforeEdit.val())console.log("not edited");
				else console.log("edited");
			},
			"Cancel": function () {
				editDriver.dialog('close');
			}
		}
	})

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
function fillTable(myArr) {
	var htmlCode = '';
	$.each(myArr, function (key, value) {

		htmlCode += '<tr onclick="showName(this)">';
		htmlCode += '<td>' + value.first_name + '</td>';
		htmlCode += '<td>' + value.last_name + '</td>';
		htmlCode += '<td>' + value.id + '</td>';
		htmlCode += '<td>' + value.p_num + '</td>';
		htmlCode += '</tr> ';
	});
	$("#tbl_drivers tbody").append(htmlCode);
}

//the function will ba called after clicking on a cell
function showName(tr) {
	var table = $('#tbl_drivers tbody tr td');
	var f_name = $(tr).find('td:eq(0)').html();
	var l_name = $(tr).find('td:eq(1)').html();
	var id = $(tr).find('td:eq(2)').html();
	var p_num = $(tr).find('td:eq(3)').html();
	var result = f_name + "\n" + l_name + "\n" + id + "\n" + p_num;
	beforeEdit= $("#first_name").val(f_name);
	showEditDialog(f_name, l_name, id, p_num);
	
}

function showEditDialog(f_name, l_name, id, p_num) {
	editDriver.dialog('open');
	var first_name=$("#first_name").val(f_name);
	var last_name=$("#last_name").val(l_name);
	var id=$("#id").val(id);
	var plate_number= $("#plate_number").val(p_num);
	//return [first_name, last_name, id, plate_number];
}
/*$('#tbl_drivers tbody').click(function(){
	var corrow = $(this).closest('tr');
	var col0 = corrow.find('td:eq(0)').text();
	var col1 = corrow.find('td:eq(1)').text();
	var col2 = corrow.find('td:eq(2)').text();
	var col3 = corrow.find('td:eq(3)').text();
	var result = col0+"\n" +col1+"\n"+col2+"\n"+col3+"\n";
	alert(result);
})
*/
//not in use
$("#tbl_drivers td").click(function () {
	console.log("clicked");
	var table = $('#tbl_drivers').find('tbody').find('tr');
	//console.log(cell);
	var f_name = $(this).find('td:eq(0)').html();
	var l_name = $(this).find('td:eq(1)').html();
	var id = $(this).find('td:eq(2)').html();
	var p_num = $(this).find('td:eq(3)').html();
	var result = f_name + "\n" + l_name + "\n" + id + "\n" + p_num;
	//console.log(result);
	//console.log(table);
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