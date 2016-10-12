<html>
	<head>
		<title>quizhome</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src='../js/play.js'></script>
		<link rel="stylesheet" href="../css/main.css">
	</head>
	<body>
		 {!!Form::token() !!}
		<div id='quizplace'>
		@for($i = 0;$i < count($quizzes);$i++)
		<p>{{$quizzes[$i]['name']}} <button class='play' id=" {{$quizzes[$i]['id']}}">Play</button></p>
		@endfor
		</div>
		
		<div class="back">
			<a href="../" class="home">Home</a>
		</div>
	</body>
</html>


