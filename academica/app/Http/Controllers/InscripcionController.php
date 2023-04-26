<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //select * from inscripciones
        return Inscripcion::get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //insert into inscripciones values...
        Inscripcion::create($request->all());
        return response()->json(['msg'=>'ok']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inscripcion $inscripcion)
    {
        $inscripcion = Inscripcion::find($request['idInscripcion']);

        // Mostrar los valores actuales de los campos
        $codigo = $inscripcion->codigo;
        $alumno = $inscripcion->alumno;
        $materiaUno = $inscripcion->materiaUno;
        $materiaDos = $inscripcion->materiaDos;
        $materiaTres = $inscripcion->materiaTres;
        $materiaCuatro = $inscripcion->materiaCuatro;
        $materiaCinco = $inscripcion->materiaCinco;
        $fecha = $inscripcion->fecha;
            
        // Retornar una respuesta JSON con los valores actuales de los campos
        return response()->json([
            'codigo_actual'=>$codigo,
            'alumno_actual'=>$alumno,
            'materiauno_actual'=>$materiaUno,
            'materiados_actual'=>$materiaDos,
            'materiatres_actual'=>$materiaTres,
            'materiacuatro_actual'=>$materiaCuatro,
            'materiacinco_actual'=>$materiaCinco,
            'fecha_actual'=>$fecha,
            'msg'=>'ok'
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inscripcion $inscripcion)
    {
        //update inscripciones set ... where id=?
        //update inscripciones set ... where idInscripcion=?
        $inscripcion::where('idInscripcion', $request['idInscripcion'])->update([
            'codigo' =>$request['codigo'],
            'alumno' =>$request['alumno'],
            'materiaUno' =>$request['materiaUno'],
            'materiaDos' =>$request['materiaDos'],
            'materiaTres' =>$request['materiaTres'],
            'materiaCuatro' =>$request['materiaCuatro'],
            'materiaCinco' =>$request['materiaCinco'],
            'fecha' =>$request['fecha'],

        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Inscripcion $inscripcion)
    {
        $inscripcion::where('idInscripcion', $request['idInscripcion'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}