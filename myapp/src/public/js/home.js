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
			$.get('http://localhost:8080/profile/addPosition', function(html){
				console.log("Html", html);
				addPositionHtml = html;
				addPosition();
			});

		}	
	});

	//On Save Position Clicked
	$('#history').on('click', '.savePosition', function(){
		var values = $(this).closest('.addPosition').find('[name]');
		//console.log(values);
		var map = {};
		$.each(values, function(key,value){
			//console.log($(value).attr('name'), $(value).val());
			//console.log('Value', key,value);
			map[$(value).attr('name')] = $(value).val();
		});
		//console.log('map', map);
		/*
		$.post("http://localhost:8080/profile/deuvarney15/addPosition", 
			JSON.stringify(map),
			function(data){
				console.log('Data', data);
			},
			'json'
			);
		*/
		
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
			}
		});

	});
	//On Cancel  clicked
	$('#history').on('click', '.cancelPosition', function(){
		//console.log('cancelCLicked');
		//window.x =  $(this);
		$(this).closest('.addPosition').remove();
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

})();