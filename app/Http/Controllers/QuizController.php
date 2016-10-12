<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;
use App\Question;
use App\Anwser;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return view('quiz.main');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $quiz = Quiz::all();

        return json_encode($quiz);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $in = $request->all();
        
        $makeQuiz = Quiz::create([
          'name'=>$in['name']
            ]);

        return $in;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit(Request $request, $id)
    {
        $fullquiz = Quiz::find($id);
        $questions = Question::where('quiz_id','=',$id)->get()->toArray();
        $quizarray = []; 
        $count = 0;
        for ($i=0; $i < count($questions); $i++) { 
            $anwsers = Anwser::where('question_id','=',$questions[$i]['id'])->get()->toArray();
            $quizarray[$i] = [];
            array_push($quizarray[$i],$questions[$i],$anwsers);
            $count++;
        }
        $quizarray['count'] = $count;
        $quizarray['quiz'] = $fullquiz;
        return json_encode($quizarray);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $quiz = $id;
        $question = $request->question;
        $in = Question::create([
            'question'=> $request->question,
            'quiz_id'=>$id
            ]);
        for ($i=0; $i < count($request->anwser); $i++) { 
            $awnser = Anwser::create([
                    'anwser'=>$request->anwser[$i],
                    'correct'=>$request->good[$i],
                    'question_id'=>$in->id
                ]);
        }

        return json_encode(['good'=>'good']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
    public function editform($id)
    {
        $question = Question::find($id);
        $awnsers = $question->Anwsers->toArray();
        $question = $question->toArray();
        return json_encode(['question'=>$question]);
    }
    public function editpost(Request $request, $id)
    {
        $question = Question::find($id);

        $question->question = $request->question;
        $question->save();
        $awnsers = $question->Anwsers;
       
        if (count($question->Anwsers) == count($request->anwser)) {
            for ($i=0; $i < count($awnsers); $i++) { 
                $awnsers[$i]->anwser = $request->anwser[$i];
                $awnsers[$i]->correct =  $request->good[$i];
                $awnsers[$i]->save();
            }
        }elseif (count($question->Anwsers) < count($request->anwser)) {
            $last = 0;
            for ($i=0; $i < count($awnsers); $i++) { 
                $awnsers[$i]->anwser = $request->anwser[$i];
                $awnsers[$i]->correct =  $request->good[$i];
                $awnsers[$i]->save();
                $last++;
            }
            for ($i=$last; $i<count($request->anwser) ; $i++) { 
                $awnser = Anwser::create([
                    'anwser'=>$request->anwser[$i],
                    'correct'=>$request->good[$i],
                    'question_id'=>$id
                ]);
            }
        }else{
            $last = 0;
             for ($i=0; $i < count($request->anwser); $i++) { 
                $awnsers[$i]->anwser = $request->anwser[$i];
                $awnsers[$i]->correct =  $request->good[$i];
                $awnsers[$i]->save();
                $last++;
            }
            
                for ($i=$last; $i < count($awnsers); $i++) { 
                    $awnsers[$i]->delete();
                }
            
                
               
           
        }

        return json_encode(['return'=> $question->quiz_id]);
    }
    public function updateform(Request $request, $id)
    {
        return json_encode(['return'=>'return']);
    }
    public function deleteQuestion($id)
    {
        $question = Question::find($id);
        $idquiz = $question->quiz_id;
        $question->Anwsers;
        $question->delete();
        return json_encode(['quiz'=>$idquiz]);
    }
    public function deleteFull($id) 
    {
        $quiz = Quiz::find($id);
        $quiz->delete();
        //$idquiz = $quiz->id;
        // $quiz->questions;
        // $quiz->questions->anwsers;
        // $idquiz->delete();
        
        return json_encode(['return'=>'return']);
    }
}
