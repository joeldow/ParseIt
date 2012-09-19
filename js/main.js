$(function(){
	$('#process').click(function(e){
		$('#result').empty();

		var $btn = $(this);
		$btn.data('default', $btn.val()).val('Processing....');

		$('.select-on-focus').live('click', function(){
			this.focus();
			this.select();	
		});

		var delimiter = $('#delimiter').val(),
			groupSize = parseInt($('#groupSize').val()),
			dataLines = $('#data').val().split('\n'),
			prefix = $('#prefix').val(),
			suffix = $('#suffix').val(),
			sets = (dataLines.length > groupSize) ? Math.round(Math.ceil(dataLines.length / groupSize)) : 1,
			part,
			sliceMin = 0,
			sliceMax = 0,
			buildResult = function(piece){
				var out = '';

				out += prefix;
				$.each(piece, function(i, obj){
					out = out + obj + ((i < piece.length-1) ? delimiter : '');
				});
				out += suffix;

				$('#result').append(sliceMin + ' - ' + sliceMax)
							.append($('<textarea />').attr({'style':'width:98%;height:50px;', 'class': 'select-on-focus'}).val(out))
							.append('<br />');
			};

		console.log(splitWith, dataLines);

		console.log('lines', dataLines.length);
		//console.log('sets', sets);
		for(var i=1;i<=sets;i++)
		{
			//sliceMin = (i == 1 ? 0 : (i * sets) + 1);


			sliceMax = (i > 1) ? (groupSize * i) : (sliceMin + groupSize);
			sliceMin = sliceMax - groupSize;
			console.log(i, sliceMin, sliceMax);

			part = dataLines.slice(sliceMin, sliceMax);
			//console.log(part);
			buildResult(part);
		}
		
		setTimeout(function(){
			$btn.val($btn.data('default'));
		}, 1000);
		sliceMin = 0;
		sliceMax = 0;

		e.preventDefault();
	});
});
