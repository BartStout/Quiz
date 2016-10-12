<html>
	<head>
		<title>Play Quiz</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src='js/mainscript.js'></script>
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		 {!!Form::token() !!}
		<div id='fullquizcreate'>
					<form action="#">
			
	<label for="quizname">Quiz name</label>
	<input type="text" id='quizname'>
	
	<input type="button" id='submit' name='submit'value='send'> 
	     {!! Form::close() !!}
		</div>
		<div id='showQuiz'>
			
		</div>
		<div class="back">
			<a href="../public" class="home">Home</a>
		</div>
	</body>
</html>


