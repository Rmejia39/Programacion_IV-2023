<template>
    <div class="row">
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">REGISTRO DE INSCRIPCION</div>
                    <div class="card-body">
                        <form id="frmInscripcion" @reset.prevent="nuevoInscripcion" v-on:submit.prevent="guardarInscripcion">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>Inscripcion Codigo:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de Inscripcion de 3 digitos"
                                            v-model="inscripcion.codigo" type="text" class="form-control" name="txtCodigoInscripcion" id="txtCodigoInscripcion">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Alumno:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú1-9 ]{3,75}"
                                        v-model="inscripcion.alumno" type="text" class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 1:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú1-9 ]{3,75}"
                                        v-model="inscripcion.materiaUno" type="text" class="form-control" name="txtMateriaUno" id="txtMateriaUno">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 2:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú1-9 ]{3,75}"
                                        v-model="inscripcion.materiaDos" type="text" class="form-control" name="txtMateriaDos" id="txtMateriaDos">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 3:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú1-9 ]{3,75}"
                                        v-model="inscripcion.materiaTres" type="text" class="form-control" name="txtMateriaTres" id="txtMateriaTres">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 4:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú1-9 ]{3,75}"
                                        v-model="inscripcion.materiaCuatro" type="text" class="form-control" name="txtMateriaCuatro" id="txtMateriaCuatro">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 5:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú1-9 ]{3,75}"
                                        v-model="inscripcion.materiaCinco" type="text" class="form-control" name="txtMateriaCinco" id="txtMateriaCinco">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>Fecha:</label>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input required v-model="inscripcion.fecha" type="date" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">LISTADO DE INSCRIPCION</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="8"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre Alumno</th>
                                    <th>Materia 1</th>
                                    <th>Materia 2</th>
                                    <th>Materia 3</th>
                                    <th>Materia 4</th>
                                    <th>Materia 5</th>
                                    <th colspan="2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)" >
                                    <td>{{ inscripcion.codigo }}</td> 
                                    <td>{{ inscripcion.alumno }}</td>
                                    <td>{{ inscripcion.materiaUno }}</td>
                                    <td>{{ inscripcion.materiaDos }}</td>
                                    <td>{{ inscripcion.materiaTres }}</td>
                                    <td>{{ inscripcion.materiaCuatro }}</td>
                                    <td>{{ inscripcion.materiaCinco }}</td>
                                    <td>{{ inscripcion.fecha }}</td> 
                                    <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>

import axios from 'axios';

export default{
    props:['form'],
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            inscripciones: [],
            inscripcion:{
                idInscripcion  :'',
                codigo         :'',
                alumno         :'',
                materiaUno     :'',
                materiaDos     :'',
                materiaTres    :'',
                materiaCuatro  :'',
                materiaCinco   :'',
                fecha          :'',
            }
        }
    },
    methods:{
        async guardarInscripcion(){
            this.listar();
            let method = 'POST';
            if(this.accion==='nuevo'){
                this.inscripcion.idInscripcion = new Date().getTime().toString(16);
                this.inscripciones.push( JSON.parse( JSON.stringify(this.inscripcion) ) );
                method = 'POST';
            }else if(this.accion==='modificar'){
                let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripciones[index] = JSON.parse( JSON.stringify(this.inscripcion) );
                method = 'PUT';
            }else if(this.accion==='eliminar'){
                let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripciones.splice(index,1);
                method = 'DELETE';
            }
            localStorage.setItem("inscripciones", JSON.stringify(this.inscripciones) );
            await axios ({
            url: '/inscripciones',
            method,
            data: this.inscripcion
        }).then(resp=>{
            if( resp.data.msg=='ok' ){
                let msg = method=='DELETE' ? 'Inscripcion eliminada con exito' : 'Inscripcion registrada con exito';
                alertifyjs.success(msg);
            }else{
                alertifyjs.error('El registro de la inscripcion fallo, por favor revise');
            }
            console.log('exito', resp);
        }).catch(err=>{
            console.log('error',err);
        });
           this.nuevoInscripcion();
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar a ${inscripcion.codigo}?`) ){
                this.accion='eliminar';
                this.inscripcion=inscripcion;
                this.guardarInscripcion();
            }
        },
        nuevoInscripcion(){
            this.accion = 'nuevo';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.codigo= '';
            this.inscripcion.alumno = '';
            this.inscripcion.materiaUno='';
            this.inscripcion.materiaDos = '';
            this.inscripcion.materiaTres = '';
            this.inscripcion.materiaCuatro = '';
            this.inscripcion.materiaCinco = '';
            this.inscripcion.fecha='';
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
            this.inscripcion = inscripcion;
        },
        listar(){
            this.inscripciones = JSON.parse( localStorage.getItem('inscripciones') || "[]" )
                .filter(inscripcion=>inscripcion.codigo.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    mounted() {
            axios.get('/inscripciones')
            .then(response => {
                this.inscripciones = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        },
}
</script>