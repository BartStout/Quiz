$(document).ready(function () {
	var token = $("[name = '_token']").val();
	$('#submit').click(function () {
		var token = $("[name = '_token']").val();
		var quizname = $('#quizname');
		var name = "";
		$.ajax({
			url: '/bart/public/quizadmin',
			headers: {'X-CSRF-TOKEN': token},
			type: 'POST',
			dataType: 'json',
			data: {name: quizname.val()},
		})
		.done(function(obj) {
			quizname.val('');
			getQuiz();
		})
		.fail(function() {
		})
		.always(function() {
		});
	})
	function getQuiz () {
		var token = $("[name = '_token']").val();
		$.ajax({
			url: '/bart/public/quizadmin/create',
			headers: {'X-CSRF-TOKEN': token},
			type: 'GET',
			dataType: 'json',
			data: {},
		})
		.done(function(obj) {
			showQuiz(obj);
		})
		.fail(function() {
		})
		.always(function() {			
		});

	}
	function showQuiz (obj) {
		var showdiv = $('#showQuiz');
		showdiv.html(' ');
		var indiv = ' ';
		for (var i = 0; i < obj.length; i++) {
			indiv += "<h2>" + obj[i].name + " <button id="+"'"+ obj[i].id+ "' " +"class='editquiz'>Edit</button>" + " <button id="+"'"+ obj[i].id+ "' + " +"class='delquiz'>Delete</button>" + "</h2>"
		};
		showdiv.html(indiv);
		$('.editquiz').click(function() {
		getFullQuiz($(this).attr('id'));	
		});

		$('.delquiz').click(function() {
			delQuiz($(this).attr('id'));
		});
	}

	function delQuiz (id) {
		$.ajax({
		url: '/bart/public/quizadmin/delete/quiz/'+id,
		headers: {'X-CSRF-TOKEN': token},
		type: 'POST',
		dataType: 'json',
		data: {id:id}
		})
		.done(function(obj) {
			getQuiz();
		})
		.fail(function() {

		})
		.always(function() {

		});
	}

	function getFullQuiz (idquiz) {
		var token = $("[name = '_token']").val();
		$.ajax({
			url: '/bart/public/quizadmin/'+ idquiz +'/edit',
			headers: {'X-CSRF-TOKEN': token},
			type: 'GET',
			dataType: 'json',
			data: {},
		})
		.done(function(obj) {	
			showFullQuiz(obj);
		})
		.fail(function() {
			
		})
		.always(function() {
			
		});
	}
	function showFullQuiz (obj) {
		if (obj[0] != undefined) {
			var displaydiv = $('#showQuiz');
			var todisplay = '';
			todisplay += "<h2>"+obj['quiz']['name']+"<button id="+"'"+ obj['quiz']['id'] +"'"+ "class='quizTitle'>edit</button></h2>";


			for (var i = 0; i < obj['count']; i++) {
				
				todisplay += "<p id="+obj[i][0]['id']+" class='questionedit'>"+ obj[i][0]['question']+" <- Click to Edit <input type='button' class='deletequestion' id="+obj[i][0]['id']+" value='delete'></p>"
				todisplay += "<ul>"
				for (var h = 0; h < obj[i][1].length; h++) {
				todisplay +="<li>"+obj[i][1][h]['anwser']+"</li>"
				};
				todisplay += "</ul>"
				
			};
			todisplay += "<button id='addquestion'>ADD</button></br><button id='back'>back</button><div id='questiondiv'></div>"
			displaydiv.html(todisplay);

			$('.deletequestion').click(function() {
				deletethequestion($(this).attr('id'))
			});
			$('.questionedit').click(function () {
				editQuestions($(this).attr('id'))

			
			})
			$('#back').click(function() {
				location.reload();
			});
			$('#addquestion').click(function () {
				$("html, body").animate({ scrollTop: $(document).height() }, 1000);
				var questiondiv = $('#questiondiv');
				makeQuestion(obj['quiz']['id'], questiondiv);
			})
		}else{
			var displaydiv = $('#showQuiz');
			var todisplay = '';
			console.log(obj);
			todisplay += "<h2>"+obj['quiz']['name']+"<button id="+"'"+ obj['quiz']['id'] +"'"+ "class='quizTitle'>edit</button></h2>";
			todisplay += "<button id='addquestion'>ADD</button></br><button id='back'>back</button><div id='questiondiv'></div>"
			displaydiv.html(todisplay);
			$('#back').click(function() {
				location.reload();
			});
			$('#addquestion').click(function () {
				$("html, body").animate({ scrollTop: $(document).height() }, 1000);
				var questiondiv = $('#questiondiv');
				makeQuestion(obj['quiz']['id'], questiondiv);
			})
		}
	}
	function makeQuestion (idquiz,div) {
		var questionmake = "<label>question </label><input type='text' id='"+ idquiz + "' class='question'><br><br>";
		for (var i = 0; i < 2; i++) {
			questionmake += "<li class='liant'><label>awnser </label> <input type='text' class='anwsers'><input type='checkbox' class='correct'></li>"
		};
		
		div.html(questionmake);
		$('#showQuiz').append( "<div id='adddel'></div>")
		$('#adddel').html("<button id='addawnser'>add anwser</button><button id='delawnser'>del anwser</button><button id='subquest'>submit question</button> ");

		$('#addawnser').click(function () {
			$('#questiondiv').append("<li class='liant'><label class='anwser'>awnser </label> <input type='text' class='anwsers'><input type='checkbox' class='correct'></li>")
		});
		$('#delawnser').click(function () {
			if (checkAnwsers()) {

			}else{
				var anwsers = $('.liant')
				var lengtha = anwsers.length;
				anwsers[lengtha-1].remove();
			}
		});
		$('#subquest').click(function () {

			if ($('.question').val() != '') {

				var counter = 0;
				for (var i = 0; i < document.getElementsByClassName('anwsers').length; i++) {
					if (document.getElementsByClassName('anwsers')[i].value != '') {
						counter++;
					};
				};
				if (document.getElementsByClassName('anwsers').length == counter) {
					var json = [];
					for (var i = 0; i < document.getElementsByClassName('anwsers').length; i++) {
						json.push(document.getElementsByClassName('anwsers')[i].value);
					};
					var correct = [];
					for (var i = 0; i < document.getElementsByClassName('correct').length; i++) {
						if(document.getElementsByClassName('correct')[i].checked){
							correct.push(1)
						}else{
							correct.push(0)
						}
					};
						
					
					
					$.ajax({
					url: '/bart/public/quizadmin/question/'+$('.question').attr('id'),
					headers: {'X-CSRF-TOKEN': token},
					type: 'POST',
					dataType: 'json',
					data: {question:$('.question').val(),anwser:json,good:correct},
					})
					.done(function(obj) {
						getFullQuiz( $('.question').attr('id'))
					})
					.fail(function() {

					})
					.always(function() {

					});

					
				};
			};
		})
			}
	function checkAnwsers () {
		

		if ($('.anwsers').length == 2) {
			return true;
		}else{
			return false
		}
	}
	function editQuestions (id) {
			
			
			$.ajax({
				url: '/bart/public/quizadmin/question/update/'+id,
				headers: {'X-CSRF-TOKEN': token},
				type: 'POST',
				dataType: 'json',
				data: {place:'holder'},
			})
			.done(function(obj) {

				editformedit(obj);
			})
			.fail(function() {

			})
			.always(function() {

			});


			
	}
	function editformedit (obj) {
		var questionmake = "<label>question </label><input type='text' id='"+obj['question']['id']+"' class='question' value="+obj['question']['question']+"><br><br>";
			for (var i = 0; i < obj['question']['anwsers'].length; i++) {
				questionmake += "<li class='liant'><label>awnser </label> <input type='text' value="+obj['question']['anwsers'][i]['anwser']+" class='anwsers'>"
				if (obj['question']['anwsers'][i]['correct'] == 1) {
					questionmake += "<input type='checkbox' class='correct' checked></li>"
				} else {
					questionmake += "<input type='checkbox' class='correct'></li>"
				}
			};
			$('#questiondiv').html(questionmake);
			$('#showQuiz').append( "<div id='adddel'></div>")
			$('#adddel').html("<button id='addawnser'>add anwser</button><button id='delawnser'>del anwser</button><button id='subquest'>submit question</button>  ");
			$('#addawnser').click(function () {
				$('#questiondiv').append("<li class='liant'><label class='anwser'>awnser </label> <input type='text' class='anwsers'><input type='checkbox' class='correct'></li>")
			});
			$('#delawnser').click(function () {
				if (checkAnwsers()) {

				} else {
					var anwsers = $('.liant')
					var lengtha = anwsers.length;
					anwsers[lengtha-1].remove();
				}
			});
			$('#subquest').click(function() {
				if ($('.question').val() != '') {
					var counter = 0;
					for (var i = 0; i < document.getElementsByClassName('anwsers').length; i++) {
						if (document.getElementsByClassName('anwsers')[i].value != '') {
							counter++;
						};
					};
					if (document.getElementsByClassName('anwsers').length == counter) {
						var json = [];
						for (var i = 0; i < document.getElementsByClassName('anwsers').length; i++) {
							json.push(document.getElementsByClassName('anwsers')[i].value);
						};
						var correct = [];
						for (var i = 0; i < document.getElementsByClassName('correct').length; i++) {
							if(document.getElementsByClassName('correct')[i].checked){
								correct.push(1)
							}else{
								correct.push(0)
							}
						};
						$.ajax({
						url: '/bart/public/quizadmin/question/editedit/'+$('.question').attr('id'),
						headers: {'X-CSRF-TOKEN': token},
						type: 'POST',
						dataType: 'json',
						data: {question:$('.question').val(),anwser:json,good:correct},
						})
						.done(function(obj) {
							
							getFullQuiz(obj['return']);
						})
						.fail(function() {

						})
						.always(function() {

						});
					};
				};
			});
	}
	function deletethequestion (id) {
		$.ajax({
		url: '/bart/public/quizadmin/question/fulldelete/'+id,
		headers: {'X-CSRF-TOKEN': token},
		type: 'POST',
		dataType: 'json',
		data: {question:'test',}
		})
		.done(function(obj) {
			getFullQuiz(obj['quiz']);
		})
		.fail(function() {

		})
		.always(function() {

		});		
	}
	getQuiz();
})