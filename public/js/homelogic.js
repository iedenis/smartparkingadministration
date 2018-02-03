var drivers;
var editDriver = $('#editDriver');
var addDriver = $("#addDriver");
var f_name_before;
var l_name_before;
var p_num_before;
var id_before;

var db_url = "https://api.mongolab.com/api/1/databases/cars/collections/drivers";
var api_key = "?apiKey=_IUolN87EnEDzGqlWEQ6pA2fXkp-IZdA";
// loading data from DB
		$(document).ready(function () {
	$.ajax({
		//method: 'GET',
		url: db_url + api_key,
	}).done(function (data) {
		//console.log(data);
		if (data != null) {
			drivers = data;
			var result = (50 * drivers.length) / 100;
			$("#div_prgs").css({
				'width': result
			});
			$("#prgs_space").text("" + result + "%");
			$("#prgs_space").css({
				'color': 'black'
			});
			$("#User_len").text(" " + drivers.length);
			
			//console.log(drivers);
		} else error("there is a problem to connect to database");

	});
			
});


//show all drivers from DB in the table
$("#btn_showAllDrivers").click(function () {

	if (drivers != null) {
		fillTable(drivers);
	}
});


$(document).ready(function () {

	editDriver.dialog({
		title: "Edit Driver",
		autoOpen: false,
		modal: true,
		minHeight: 355,
		minWidth: 332,
		buttons: {
			"Edit driver": function () {
				var db_values = ["\"first_name:\" ", "\"last_name: \"", "id: ", "\"p_num: \""];
				var before = [f_name_before, l_name_before, p_num_before, id_before];
				var after = [$("#f_name").val(), $("#l_name").val(), $("#p_number").val(), $("#driver_id").val()];
				if ((before[0] == after[0]) && (before[1] == after[1]) &&
					(before[2] == after[2]) && (before[3] == after[3])) {
					editDriver.dialog('close');
				} else {
					var database_id = ($('#editDriver').data('id'));
					var changes = [];
					for (i = 0; i < 4; i++) {
						if (before[i] != after[i])
							changes[i] = "{\"$set\" :"+"{"+db_values[i]+after[i]+"}}";
					}
					//console.log(changes);
					changes = jQuery.grep(changes, function (n, i) {
						return (n !== "" && n != null);
					});
					console.log(changes);
					//console.log(changes);
					$.ajax({
						url: db_url + "/" + database_id + api_key,
						data: JSON.stringify({changes} ),
						type: "PUT",
						contentType: "application/json",
						success: function(){
							editDriver.dialog('close');
							//location.reload(true);
						},
						error: function (xhr, status, err) {
							console.log(err);
						}
					});
				}
			},

			"Delete driver": function () {
				var database_id = ($('#editDriver').data('id'));
				$.ajax({

					url: db_url + "/" + database_id + api_key,
					async: true,
					timeout: 300000,
					type: "DELETE",
					success: function (data) {
						editDriver.dialog('close');
						removeFromTable(database_id);
					},
					error: function (xhr, status, err) {
						console.log(err);
					}
				})
			},
			"Cancel": function () {
				editDriver.dialog('close');
			}
		}
	})



})

$("#btn_addDriver").click(function () {
	addDriver.dialog('open');
})


$(document).ready(function () {
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
							url: db_url + api_key,
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

								//$('#tbl_drivers tr:last').after('<tr>...</tr><tr>...</tr>');

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


function removeFromTable(database_id) {
	$("#tbl_drivers tr").each(function () {
		if (database_id == $(this).attr("data-id"))
			$(this).remove();
	})
}

/*--- fill the table with all drivers ---*/
function fillTable(myArr,status) {
if(status == "inside"){}
	else if(status == "inside"){}
	else{
	var htmlCode = '';
	$.each(myArr, function (key, value) {
		htmlCode += '<tr class="driver" data-id="' + value._id.$oid + '" onclick="showName(this)">';
		htmlCode += '<td>' + value.first_name + '</td>';
		htmlCode += '<td>' + value.last_name + '</td>';
		htmlCode += '<td>' + value.id + '</td>';
		htmlCode += '<td>' + value.p_num + '</td>';
		htmlCode += '</tr> ';
	});
	$("#tbl_drivers tbody").append(htmlCode);
	}
}

//the function will be called after clicking on a cell
function showName(tr) {
	var table = $('#tbl_drivers tbody tr td');
	var f_name = $(tr).find('td:eq(0)').html();
	var l_name = $(tr).find('td:eq(1)').html();
	var id = $(tr).find('td:eq(2)').html();
	var p_num = $(tr).find('td:eq(3)').html();
	var db_id = $(tr).attr("data-id");
	//console.log($(tr).attr("data-id")); works
	//var result = f_name + "\n" + l_name + "\n" + id + "\n" + p_num;

	showEditDialog(f_name, l_name, id, p_num, db_id);
}

function showEditDialog(f_name, l_name, id, p_num, db_id) {
	editDriver.dialog('open');

	var first_name = $("#f_name").val(f_name);
	var last_name = $("#l_name").val(l_name);
	var id = $("#driver_id").val(id);
	var plate_number = $("#p_number").val(p_num);
	$("#f_name").data('name', first_name);
	$("#l_name").data('lname', last_name);
	$("#driver_id").data('id', id);
	$("#p_number").data('pNumber', plate_number);
	f_name_before = $("#f_name").data("name").val();
	l_name_before = $("#l_name").data("lname").val();
	p_num_before = $("#p_number").data("pNumber").val();
	id_before = $("#driver_id").data("id").val();
	var database_id = $("#editDriver").data("id", db_id);
	//console.log($('#editDriver').data('id')); //works
	var db_id = db_id;
	//return [first_name, last_name, id, plate_number];
}

//Filterable Table with search paramethers.
$("#myInput").on("keyup", function () {
	var value = $(this).val().toLowerCase();
	$('#tbl_drivers tbody tr').filter(function () {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$('input[type=radio][name=isInside]').change(function(){
	if(this.value == 'inside'){
		alert("clicked"+this.value);
	}
	if(this.value == 'outside'){
		alert("clicked"+this.value);
	}
	
	if(this.value == 'all'){
          fillTable(drivers,this.value);
	}
});