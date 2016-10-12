<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;
use App\Question;
use App\Anwser;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class PlayController extends Controller
{
    public function fulllist()
    {
    	$quiz = Quiz::all()->toArray();
    	return view('quiz.play',['quizzes'=>$quiz]);
    }
    public function play($id)
    {
    	$quiz = Quiz::find(intval($id));
    	 
    	for ($i=0; $i < count($quiz->Questions); $i++) { 
    		$quiz->Questions[$i]->PlayAwnsers;
    	}
    	
    	return json_encode($quiz);
    }
    public function score(Request $request)
    {
    	$counter = 0;
    	$awnsers = $request->awn;

    	for ($i=0; $i < count($awnsers); $i++) { 
    		$awnser = Anwser::find($awnsers[$i]);
    		if ($awnser->correct == 1) {
    			$counter++;
    		}
    	}
    	return json_encode(['score'=>$counter]);
    }
}
