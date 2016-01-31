(function(){

	var addPositionHtml;

	//Add Position 
	$('.addPosition').on('click', function(){

		var addPosition = function(html){
			$("#history").prepend(addPositionHtml);
		};

		if(addPositionHtml){
			addPosition();
		}else{
			$.get('/addEditPositionHtml', function(html){
				console.log("Html", html);
				addPositionHtml = html;
				addPosition();
			});
		}	
	});

	//On Save Position Clicked
	$('#history').on('click', '.savePosition', function(){
		var addPositionElement = $(this).closest('.addPosition');
		var values = addPositionElement.find('[name]');
		var map = {};
		$.each(values, function(key,value){
			map[$(value).attr('name')] = $(value).val();
		});
		
		$.ajax({
			url : 'http://localhost:8080/profile/deuvarney15/position',
			type : 'POST', 
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
   			},
   			data : JSON.stringify(map),
   			dataType : 'json',
   			success : function(data2){
				console.log('Data', data2);

				$.get('/positionHtml', data2,function(html){
					console.log("Html", html);
					$("#history").prepend(html);
					addPositionElement.remove();
				});
			}
		});
	});

	//On (Add Position) Cancel  clicked
	$('#history').on('click', '.addPosition .cancelPosition', function(){
		$(this).closest('.addPosition').remove();
	});

	//On (Edit Position) Cancel  clicked
	$('#history').on('click', '.editPosition .cancelPosition', function(){
		console.log( "we are here");
		window.x = $(this);
		var editPosition = $(this).closest('.editPosition');

		editPosition.next().slideDown();
		editPosition.remove();
	});

	//On Removed Clicked
	$('#history').on('click', '.deletePosition', function(){
		var position = $(this).closest('.position');
		var positionId = position.data('positionid');
		$.ajax({
			url : 'http://localhost:8080/profile/deuvarney15/position',
			type : 'DELETE', 
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
   			},
   			data : positionId,
   			dataType : 'json',
   			success : function(data2){
				console.log('Delete Data', data2);
				position.remove();
			}
		});
	});

	// On Position -> Edit position clicked
	$('#history').on('click', '.position .editPositionOpener', function(){

		//Get Reference of the position element
		var position = $(this).closest('.position');
		//Copy positionId
		var positionId = position.data('positionid');

		$.ajax({
			url : 'http://localhost:8080/profile/deuvarney15/position',
			type : 'GET', 
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
   			},
   			data : {"positionId" : positionId},
   			dataType : 'json',
   			success : function(data2){
				console.log('Get Position Data', data2);
				$.get('/addEditPositionHtml', 
					data2,
					function(html){
					//Add Add/Edit Position html to the page with values from position element
					$(position).before(html);

					//Hide Position element
					position.slideUp(function(){
						console.log("is hidden", $(position).is(':hidden'));
					});

				});
			}
		});

		//On (Edit Position) update  clicked
	$('#history').on('click', '.editPosition .updatePosition', function(){
		console.log( "we are here");
		window.x = $(this);
		var editPosition = $(this).closest('.editPosition');
		var positionId = $(editPosition).data('id');
		var values = editPosition.find('[name]');
		var map = {};
		//$.extend(map, {'id' : positionId});
		map.id = positionId;
		$.each(values, function(key,value){
			map[$(value).attr('name')] = $(value).val();
		});

		$.ajax({
			url : 'http://localhost:8080/profile/deuvarney15/position',
			type : 'PUT', 
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
   			},
   			data : JSON.stringify(map),
   			dataType : 'json',
   			success : function(data2){
				console.log('Put Update Existing Data', data2);
				//position.remove();
				$.get('/positionHtml', data2, function(positionHtml){
					console.log('Updated positionHtml:', positionHtml);
					editPosition.next().remove();
					editPosition.after(positionHtml);
					editPosition.slideUp(function(){
						editPosition.remove();
					});
				});
			}
		});
	});	
		

	});

})();