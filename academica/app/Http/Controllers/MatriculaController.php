<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{

    public function index()//GET
    {
        
        return Matricula::get();
    }

   
    public function create()
    {
        //
    }

   
    public function store(Request $request)//POST
    {

        Matricula::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    
    public function show(Request $request, Matricula $matricula)//GET
    {
       
        $matricula = Matricula::find($request['idMatricula']);

        // Mostrar los valores actuales de los campos
        $nombreAlumno = $matricula->nombreAlumno;
        $fecha = $matricula->fecha;
        $pago = $matricula->pago;

    // Retornar una respuesta JSON con los valores actuales de los campos
        return response()->json([
            'nombre_actual'=>$nombreAlumno,
            'fecha_actual'=>$fecha,
            'pago_actual'=>$pago,
            'msg'=>'ok'
        ], 200);
    }

    
    public function edit(Matricula $matricula)
    {
        //
    }

    
    public function update(Request $request, Matricula $matricula)//PUT
    {
       
        $matricula::where('idMatricula', $request['idMatricula'])->update([
            'nombreAlumno'=>$request['nombreAlumno'],
            'fecha'=>$request['fecha'],
            'pago'=>$request['pago'],
        
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

  
    public function destroy(Request $request, Matricula $matricula)//DELETE
    {
       
        $matricula::where('idMatricula', $request['idMatricula'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}