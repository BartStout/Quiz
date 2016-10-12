<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
         protected $table = 'questions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['question','quiz_id'];

    public function Anwsers()
    {
    	return $this->hasMany('App\Anwser');
    }
    public function PlayAwnsers()
    {
        return $this->hasMany('App\Anwser')->select(['id','anwser']);
    }
}
