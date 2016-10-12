<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anwser extends Model
{
         protected $table = 'anwsers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['anwser','question_id','correct'];
}
