Vue.component('v-select-inscripciones', VueSelect.VueSelect);
Vue.component('component-inscripciones',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            materias: [],
            inscripciones : [],
            inscripcion:{
                idInscripcion   : '',
                mate : {
                materiaUno      : '',
                materiaDos      : '',
                materiaTres     : '',
                materiaCuatro   : '',
                materiaCinco    : ''
                },
            }
        }
    },
    methods:{
        guardarInscripcion(){
            this.listar();
            if(this.accion==='nuevo'){
                this.inscripcion.idInscripcion = new Date().getTime().toString(16);
                this.inscripciones.push( JSON.parse( JSON.stringify(this.inscripcion) ) );
            }else if(this.accion==='modificar'){
                let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripciones[index] = JSON.parse( JSON.stringify(this.inscripcion) );
            }else if(this.accion==='eliminar'){
                let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripciones.splice(index,1);
            }
            localStorage.setItem("inscripciones", JSON.stringify(this.inscripciones) );
            fetch(`private/modulos/tablas/inscripciones.php?accion=${this.accion}&inscripciones=${JSON.stringify(this.inscripcion)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevaInscripcion();
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar a ${inscripcion.materiaUno}?`) ){
                this.accion='eliminar';
                this.inscripcion=inscripcion;
                this.guardarInscripcion();
            }
        },
        nuevaInscripcion(){
            this.accion = 'nuevo';
            this.inscripcion.idInscripcion   = '';
            this.inscripcion.materiaUno      = '';
            this.inscripcion.materiaDos      = '';
            this.inscripcion.materiaTres     = '';
            this.inscripcion.materiaCuatro   = '';
            this.inscripcion.materiaCinco    = '';
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
            this.inscripcion = inscripcion;
        },
        listar(){
            this.inscripciones = JSON.parse( localStorage.getItem('inscripciones') || "[]" )
                .filter(inscripcion=>inscripcion.materia.mate.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                    inscripcion.mate.indexOf(this.buscar)>-1);      
            this.materias = JSON.parse( localStorage.getItem('materias') || "[]" ).map(materia=>{
                return { 
                    id: materia.idMateria,
                    label : materia.nombre
                }
            });
            if( this.inscripciones.length<=0 && this.buscar.trim().length<=0 ){
                fetch('private/modulos/inscripciones/inscripciones.php?accion=consultar')
                .then(resp=>resp.json())
                .then(resp=>{
                    this.inscripciones = resp;
                    localStorage.setItem("inscripciones", JSON.stringify(this.inscripciones) );
                });
            }
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE INSCRIPCION</div>
                    <div class="card-body">
                        <form id="frmInscripcion" @reset.prevent="nuevaInscripcion" v-on:submit.prevent="guardarInscripcion">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtMateriaUno">MATERIA 1:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiaUno" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtMateriaDos">MATERIA 2:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiaDos" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtMateriaTres">MATERIA 3:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiaTres" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtMateriaCuatro">MATERIA 4:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiaCuatro" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtMateriCinco">MATERIA 5:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiaCinco" :options="materias" ></v-select-materias>
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
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE INSCRIPCIONES</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="5"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>MATERIA 1</th>
                                    <th>MATERIA 2</th>
                                    <th>MATERIA 3</th>
                                    <th>MATERIA 4</th>
                                    <th colspan="2">MATERIA 5</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)" >
                                    <td>{{ inscripcion.materiaUno.label }}</td>
                                    <td>{{ inscripcion.materiaDos.label }}</td>
                                    <td>{{ inscripcion.materiaTres.label }}</td>
                                    <td>{{ inscripcion.materiaCuatro.label }}</td>
                                    <td>{{ inscripcion.materiaCinco.label }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});
