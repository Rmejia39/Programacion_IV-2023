import './bootstrap';

import { createApp } from 'vue';
import alumno from './components/AlumnoComponent.vue';
import docente from './components/DocenteComponent.vue';
import materia from './components/MateriaComponent.vue';
import matricula from './components/MatriculaComponent.vue';
import inscripcion from './components/InscripcionComponent.vue';


window.db = '';

const app = createApp({
    components:{
        alumno,
        docente,
        materia,
        matricula,
        inscripcion,
    },
    data(){
        return {
            forms:{
                docente:{ mostrar:false, },
                materia:{ mostrar:false, },
                alumno:{ mostrar:false, },
                matricula:{ mostrar:false, },
                inscripcion:{ mostrar:false, },
            }
        }
    },
    methods: {
        abrirCerrarFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            //this.$refs[form].listar();
        },
        abrirBD() {
            let indexDB = indexedDB.open('db_sistema_academico', 1);
            indexDB.onupgradeneeded = e => {
                let req = e.target.result,
                    tbldocentes = req.createObjectStore('tbldocentes', {
                        keyPath: 'idDocente'
                    }),
                    tblalumnos = req.createObjectStore('tblalumnos', {
                        keyPath: 'idAlumno'
                    }),
                    tblmaterias = req.createObjectStore('tblmaterias', {
                        keyPath: 'idMateria'
                    }),
                    tblmatriculas = req.createObjectStore('tblmatriculas', {
                        keyPath: 'idMateria'
                    }),
                    tblinscripcions = req.createObjectStore('tblinscripcions', {
                        keyPath: 'idInscripcion'
                    });
    
                tbldocentes.createIndex('idDocente', 'idDocente', {
                    unique: true
                });
                tbldocentes.createIndex('codigo', 'codigo', {
                    unique: true
                });
                tblalumnos.createIndex('idAlumno', 'idAlumno', {
                    unique: true
                });
                tblalumnos.createIndex('codigo', 'codigo', {
                    unique: true
                });
                tblmaterias.createIndex('idMateria', 'idMateria', {
                    unique: true
                });
                tblmaterias.createIndex('codigo', 'codigo', {
                    unique: true
                });
                tblmatriculas.createIndex('idMatricula', 'idMatricula', {
                    unique: true
                });
                tblinscripcions.createIndex('idInscripcion', 'idInscripcion', {
                    unique: true
                });
                tblinscripcions.createIndex('codigo', 'codigo', {
                    unique: true
                });



              
            }
                
            
            indexDB.onsuccess = e => {
                db = e.target.result;
            };
            indexDB.onerror = e => {
                console.error('ERROR al crear, abrir la BD', e);
            };
        }
    },
    created() {
        this.abrirBD();
    }
});
app.mount("#app");

async function seleccionarImagen(image){
    let archivo = image.files[0];
    if(archivo){
        let blob = await img(archivo, 1),
            reader = new FileReader();
        reader.onload = e=>{
            app.$refs.matricula.matricula.comprobante = e.target.result;
            console.log(e.target.result);
        };
        reader.readAsDataURL(blob);
    }else {
        console.log("Poir favor seleccione una imagen validad...")
    }
}