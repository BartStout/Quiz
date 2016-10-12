<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

//Actual Quiz
Route::resource('quizadmin','QuizController');
Route::post('quizadmin/question/update/{id}','QuizController@editform');
Route::post('quizadmin/question/{id}','QuizController@update');
Route::post('quizadmin/delete/quiz/{id}', 'QuizController@deleteFull');
Route::post('quizadmin/question/editedit/{id}','QuizController@editpost');
Route::post('quizadmin/question/fulldelete/{id}','QuizController@deleteQuestion');
Route::get('quiz/play','PlayController@fulllist');
Route::post('quiz/play/score','PlayController@score');
Route::post('quiz/play/{id}','PlayController@play');
