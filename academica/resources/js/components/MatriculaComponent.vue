<template>
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="card border">
                <div class="card-header">REGISTRO DE MATRICULAS</div>
                <div class="card-body">
                    <form id="frmMatricula" @submit.prevent="guardarMatricula" @reset.prevent="nuevoMatricula">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">ALUMNO:</div>
                            <div class="col-9 col-md-5">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="matricula.nombreAlumno" type="text" class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
                                </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">FECHA:</div>
                            <div class="col-9 col-md-5">
                                <input required class="form-control" type="date" v-model="matricula.fecha">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">PAGO:</div>
                            <div class="col-9 col-md-5">
                                <select v-model="matricula.pago" type="text" class="form-control" name="txtPago" id="txtPago">
                                    <option value="CANCELADO">CANCELADO</option>
                                     <option value="PENDIENTE" selected>PENDIENTE</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-6">
                                <input class="btn btn-primary" type="submit" value="Guardar">
                            </div>
                            <div class="col col-md-6">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE MATRICULAS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="3"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>ALUMNO</th>
                                    <th>FECHA</th>
                                    <th colspan="2">PAGO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                    <td>{{ matricula.nombreAlumno }}</td>
                                    <td>{{ matricula.fecha }}</td>
                                    <td>{{ matricula.pago }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarMatricula(matricula)">ELIMINAR</button></td>
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
                matriculas: [],
                matricula:{
                    idMatricula  : '',
                    nombreAlumno    : '',
                    fecha     : '',
                    pago      : '',
                }
            }
        },
        methods:{
            async guardarMatricula(){
                this.listar();
                let method = 'POST';
                if(this.accion==='nuevo'){
                    this.matricula.idMatricula = new Date().getTime().toString(16);
                    this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
                    method = 'POST';
                }else if(this.accion==='modificar'){
                    let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                    this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
                    method = 'PUT';
                }else if(this.accion==='eliminar'){
                    let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                    this.matriculas.splice(index,1);
                    method = 'DELETE';
                }
                localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
                    await axios({
                        url:'matriculas',
                        method,
                        data: this.matricula
                    }).then(resp=>{
                        if( resp.data.msg=='ok' ){
                            let msg = method=='DELETE' ? 'Matricula eliminada con exito' : 'Matricula registrada con exito.';
                            alertifyjs.success(msg);
                        }else{
                            alertifyjs.error('El registro del matricula fallo, por favor revise');
                        }
                        console.log('exito', resp);
                    }).catch(err=>{
                        console.log('error', err);
                    });
                    this.nuevoMatricula();
                
            },
            eliminarMatricula(matricula){
                if( confirm(`Esta seguro de eliminar a ${matricula.nombreAlumno}?`) ){
                    this.accion='eliminar';
                    this.matricula=matricula;
                    this.guardarMatricula();
                    }
                },
            nuevoMatricula(){
                this.accion = 'nuevo';
                this.matricula.idMatricula = '';
                this.matricula.fecha = '';
                this.matricula.pago = '';
                this.matricula.nombreAlumno = '';
            },
            modificarMatricula(matricula){
                this.accion = 'modificar';
                this.matricula = matricula;
            },
            listar(){
                this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                    .filter(matricula=>matricula.nombreAlumno.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        matricula.fecha.indexOf(this.buscar)>-1);
            }
        },
        mounted() {
            axios.get('/matriculas')
            .then(response => {
                this.matriculas = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        },
    }
    </script>