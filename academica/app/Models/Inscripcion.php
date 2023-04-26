<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory;

    protected $fillable = [
        'idInscripcion',
        'codigo',
        'alumno',
        'materiaUno',
        'materiaDos',
        'materiaTres',
        'materiaCuatro',
        'materiaCinco',
        'fecha',
    ];
}