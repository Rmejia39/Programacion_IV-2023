<?php
include '../../Config/Config.php';
extract($_REQUEST);

$matriculas = isset($matriculas) ? $matriculas : '[]';
$accion = isset($accion) ? $accion : '';
$class_matricula = new Matricula($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_matricula->consultar('')));
}else{
    print_r($class_matricula->recibir_datos($matriculas));
}
class Matricula{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($matricula){
        $this->datos = json_decode($matricula, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idMatricula'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['fecha'])){
            $this->respuesta['msg'] = 'Por favor ingrese la fecha';
        }
        if(empty($this->datos['pago'])){
            $this->respuesta['msg'] = 'Por favor confirme pago';
        }
        if(empty($this->datos['comprobante'])){
            $this->respuesta['msg'] = 'Por favor suba su comprobante';
        }
        if(empty($this->datos['alumno'])){
            $this->respuesta['msg'] = 'Por favor seleccione un estudiante';
        }
        return $this->administrar_matricula();
    }
    private function administrar_matricula(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                return $this->db->consultas(
                    'INSERT INTO matriculas VALUES(?,?,?,?,?)',
                    $this->datos['idMatricula'], $this->datos['fecha'], $this->datos['pago'],
                    $this->datos['comprobante'],$this->datos['alumno']
                );
            }else if($accion=='modificar'){
                return $this->db->consultas(
                    'UPDATE matriculas SET fecha=?, pago=?, comprobante=?, alumno=? WHERE idMatricula=?',
                    $this->datos['fecha'], $this->datos['alumno'], $this->datos['pago'],$this->datos['comprobante'],
                    $this->datos['idMatricula']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE matriculas FROM matriculas WHERE idMatricula=?',
                    $this->datos['idMatricula']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM matriculas');
        return $this->db->obtener_datos();
    }
}
?>