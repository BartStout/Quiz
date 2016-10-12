$(document).ready(function () {
	var token = $("[name = '_token']").val();
	var quiz;
	var questioncounter = 0;
	var totalcounter = 0;
	var anwsers = [];
	$('.play').click(function() {
		
		playquiz($(this).attr('id'))
	});
	function playquiz (id) {
		$.ajax({
			url: '/bart/public/quiz/play/'+id,
			headers: {'X-CSRF-TOKEN': token},
			type: 'POST',
			dataType: 'json',
			data: {name: 'token'},
		})
		.done(function(obj) {
			console.log(obj);
			quiz = obj;
			play();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}
	function play () {
		
		var divs = '<div class="title">'+quiz['name']+'</div><div class="playground"></div>'
		$('#quizplace').html(divs);
		//console.log(obj['questions'][questioncounter]['question'])
		var question = '<ul>';
		question += '<li>Question: '+quiz['questions'][questioncounter]['question']+'</li>';
		for (var i = quiz['questions'][questioncounter]['play_awnsers'].length - 1; i >= 0; i--) {
			question += '<li class="clickbait" id='+quiz['questions'][questioncounter]['play_awnsers'][i]['id']+'>Anwser: '+'<button>'+quiz['questions'][questioncounter]['play_awnsers'][i]['anwser']+'</button>'+'</li>';
		};
		question += '</ul>'
		$('.playground').html(question);
		$('.clickbait').click(function() {
			anwsers.push($(this).attr('id'))
			questioncounter++;
			totalcounter++;
			console.log(questioncounter)
			if (questioncounter == quiz['questions'].length) {
				sendforsubmit();
			}else{
				play();
			}
			
		});
	}
	function sendforsubmit () {
		$.ajax({
			url: '/bart/public/quiz/play/score',
			headers: {'X-CSRF-TOKEN': token},
			type: 'POST',
			dataType: 'json',
			data: {awn:anwsers},
		})
		.done(function(obj) {
			displayscore(obj)
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}
	function displayscore (obj) {
		var score = '<p> Your score is : '+obj['score']+'/'+totalcounter+' <button id="back">Back</button> </p>';
		$('.playground').html(score);
		$('#back').click(function() {
			location.reload();
		});
	}

});