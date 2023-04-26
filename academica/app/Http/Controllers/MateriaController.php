<?php

namespace App\Http\Controllers;

use App\Models\Materia;
use Illuminate\Http\Request;

class MateriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //select * from materias
        return Materia::get();
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
        //insert into materias values...
        Materia::create($request->all());
        return response()->json(['msg'=>'ok']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Materia $materia)
    {
        //select * from materias where idMateria=?
        return $materia;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Materia $materia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Materia $materia)
    {
        //update materias set ... where id=?
        //update materias set ... where idMateria=?
        $materia::where('idMateria', $request['idMateria'])->update([
            'codigo' =>$request['codigo'],
            'nombre' =>$request['nombre'],
            'docente' =>$request['docente'],

        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Materia $materia)
    {
        $materia::where('idMateria', $request['idMateria'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
