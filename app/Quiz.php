<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
     protected $table = 'quizs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    public function Questions()
    {
    	return $this->hasMany('App\Question');
    }
}
