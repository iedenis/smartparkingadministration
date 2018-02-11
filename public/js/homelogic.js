var drivers;
var editDriver = $('#editDriver');
var addDriver = $("#addDriver");
var f_name_before;
var l_name_before;
var p_num_before;
var id_before;
var permission_status_before;
var ins_key; //inserted key by user
var connection_status = false;

var db_url = "https://api.mongolab.com/api/1/databases/cars/collections/drivers";
var api_key = "?apiKey=";
//_IUolN87EnEDzGqlWEQ6pA2fXkp-IZdA";


// loading data from DB
function pullDrivers(value) {
	$.ajax({
		//method: 'GET',
		url: db_url + api_key + ins_key,
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

			if (value == 'inside' && connection_status) {
				fillTable(drivers, value);
			} else if (value == 'outside' && connection_status) {
				fillTable(drivers, value);
			} else if (connection_status) {
				fillTable(drivers, 'all');
			}

			//fillTable(drivers,status);
			//console.log(drivers);
		} else error("there is a problem to connect to database");
	});
}



$(document).ready(function () {

	editDriver.dialog({
		title: "Edit Driver",
		autoOpen: false,
		modal: true,
		minHeight: 355,
		minWidth: 332,
		buttons: {
			"Edit driver": function () {
				var db_values = ["first_name", "last_name", "id", "p_num: \""];
				var before = [f_name_before, l_name_before, p_num_before, id_before, permission_status_before];
				var after = [$("#f_name").val(), $("#l_name").val(), $("#p_number").val(), $("#driver_id").val(), $("select#permission_status").val()];
				if ((before[0] == after[0]) && (before[1] == after[1]) &&
					(before[2] == after[2]) && (before[3] == after[3]) && (before[4] == after[4])) {
					//console.log("equal? " + eval(before[4] == after[4]));
					editDriver.dialog('close');
				} else {
					var database_id = ($('#editDriver').data('id'));
					var changes = [];
					for (i = 0; i < 5; i++) {
						if (before[i] != after[i])
							before[i] = after[i];
					}

					$.ajax({
						url: db_url + "/" + database_id + api_key + ins_key,
						data: JSON.stringify({
							"first_name": before[0],
							"last_name": before[1],
							"id": before[2],
							"p_num": before[3],
							"permission_status": before[4],
							"parking_status": $("#editDriver").data('parkingstatus')
						}),
						type: "PUT",
						contentType: "application/json",
						success: function () {
							//console.log(before[4]); check the permission status
							editDriver.dialog('close');
							editTable(before, database_id);
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

					url: db_url + "/" + database_id + api_key + ins_key,
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

//function will be called after the driver editing
function editTable(arr, tr_id) {
	var table_row;
	$("#tbl_drivers tr").each(function (i) {
		if (tr_id == $(this).attr("data-id"))
			table_row = $(this);
	})
	$(table_row).find('td:eq(0)').html(arr[0]);
	$(table_row).find('td:eq(1)').html(arr[1]);
	$(table_row).find('td:eq(2)').html(arr[3]);
	$(table_row).find('td:eq(3)').html(arr[2]);
	$(table_row).attr(arr[4]);
}

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
					var first_name = $('#first_name').val();
					var last_name = $('#last_name').val();
					var id = $('#id').val();
					var p_num = $('#plate_number').val();
					if (first_name && last_name && id && p_num && id) {
						$.ajax({
							url: db_url + api_key + ins_key,
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
								//Have to work on it//								
								location.reload(true);
							},
							error: function (xhr, status, err) {
								console.log(err);
							}
						})
					} else $.alert({
						title: 'Error',
						content: 'Error',
					});
			},
			'Cancel': function () {
				addDriver.dialog('close');
			}
		}
	})
});

function removeFromTable(database_id) {
	$("#tbl_drivers tr").each(function () {
		if (database_id == $(this).attr("data-id"))
			$(this).remove();
	})
}

/*--- filling the table with all drivers ---*/
function fillTable(myArr, status) {
	var insideDrivers = [];
	var outsideDrivers = [];
	//filtering drivers by status: inside/outside
	for (i = 0; i < drivers.length; i++) {
		if (drivers[i].parking_status == 'inside')
			insideDrivers.push(drivers[i])
		else
			outsideDrivers.push(drivers[i]);
	}

	if (status == "outside") {
		fillHTMLTable(outsideDrivers);
	} else if (status == "inside") {
		fillHTMLTable(insideDrivers);
	} else {
		fillHTMLTable(drivers);
	}
}

function fillHTMLTable(arrayOfDrivers) {
	//	$("#tbl_drivers").Datatable.ajax.reload();
	$("#tbl_drivers tr").each(function () {
		$(this).remove();
	})
	var htmlCode = '';
	$.each(arrayOfDrivers, function (key, value) {
		htmlCode += '<tr class="driver"  data-id="' + value._id.$oid + '" data-permission="' + value.permission_status + '" data-parkingstatus="' + value.parking_status + '" onclick="showName(this)">';
		htmlCode += '<td>' + value.first_name + '</td>';
		htmlCode += '<td>' + value.last_name + '</td>';
		htmlCode += '<td>' + value.id + '</td>';
		htmlCode += '<td>' + value.p_num + '</td>';
		htmlCode += '</tr> ';
	});
	$("#tbl_drivers tbody").append(htmlCode);

}
//the function will be called after clicking on a cell
function showName(tr) {
	var table = $('#tbl_drivers tbody tr td');
	var f_name = $(tr).find('td:eq(0)').html();
	var l_name = $(tr).find('td:eq(1)').html();
	var id = $(tr).find('td:eq(2)').html();
	var p_num = $(tr).find('td:eq(3)').html();
	var db_id = $(tr).attr("data-id");
	var p_status = $(tr).attr("data-permission");
	var park_status = $(tr).attr("data-parkingstatus");
	showEditDialog(f_name, l_name, id, p_num, db_id, p_status, park_status);
}

function showEditDialog(f_name, l_name, id, p_num, db_id, p_status, park_status) {
	editDriver.dialog('open');

	var first_name = $("#f_name").val(f_name);
	var last_name = $("#l_name").val(l_name);
	var id = $("#driver_id").val(id);
	var plate_number = $("#p_number").val(p_num);
	var permission_status = $("select#permission_status").val();
	$("#f_name").data('name', first_name);
	$("#l_name").data('lname', last_name);
	$("#driver_id").data('id', id);
	$("#p_number").data('pNumber', plate_number);
	$("select#permission_status").val(p_status);
	f_name_before = $("#f_name").data("name").val();
	l_name_before = $("#l_name").data("lname").val();
	p_num_before = $("#p_number").data("pNumber").val();
	id_before = $("#driver_id").data("id").val();
	$("#editDriver").data('parkingstatus', park_status);
	permission_status_before = p_status;
	//console.log($("#editDriver").data('status'));//works
	var database_id = $("#editDriver").data("id", db_id);
	var permission_status = $("#editDriver").data("status", p_status);
	//console.log($('#editDriver').data('id')); //works
	var db_id = db_id;
}

//Filterable Table with search paramethers.
$("#myInput").on("keyup", function () {
	var value = $(this).val().toLowerCase();
	$('#tbl_drivers tbody tr').filter(function () {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$('input[type=radio][name=isInside]').change(function (e) {
	//value = this.value;
	if (!connection_status) {
		//ins_key = prompt("Please insert a secure key");
		confirmDialog(this.value);
	} else fillTable(drivers, this.value);
});

function reloadTable() {
	//fillTable(drivers, 'all');
	$("#tbl_drivers").load("/ #tbl_drivers");

}

function confirmDialog(value) {
	$.confirm({
		title: '',
		content: '' +
			'<form action="" class="formName">' +
			'<div class="form-group">' +
			'<label>Please provide a secure key</label>' +
			'<input type="text" placeholder="Insert a secure key" class="key form-control" required />' +
			'</div>' +
			'</form>',
		buttons: {
			formSubmit: {
				text: 'Submit',
				btnClass: 'btn-blue',
				action: function () {
					ins_key = this.$content.find('.key').val();
					$.ajax({
						url: db_url + api_key + ins_key,
						type: "GET",
						dataType: "html",
						statusCode: {
							404: function () {
								console.log("connection error");
							},
							200: function () {
								connection_status = true;
							}
						},
						success: function () {
							pullDrivers(value);
						},
						error: function (e) {
							$.alert({
								title: '',
								content: '<br> Please provide the valid key',
							});
						}
					});
				}
			},
			cancel: function () {},
		},
		onContentReady: function () {
			var jc = this;
			this.$content.find('form').on('submit', function (e) {
				e.preventDefault();
				jc.$$formSubmit.trigger('click');
			});
		}
	});
}