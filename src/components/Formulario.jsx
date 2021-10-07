import React , {Fragment,useState}from "react";
import shortid from "shortid";



function Formulario ({crearCita}) {
    const [cita,actualizarCita]= useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''



    });
    const [error,setError] = useState(false);
    //Leo y actualizo el state del formulario

    const actualizarState = e =>{

       actualizarCita({
           ...cita, // creo una copia del state para que no se sobreescriba lo anterior
           [e.target.name] : e.target.value
       })

    }

    //extraigo los valores

    const {mascota,propietario,fecha,hora,sintomas} = cita;


    const submitCita = e =>{

        e.preventDefault(); // evito que los datos se envien por el metodo Get en el url

        //validando datos
        if (mascota.trim() === '' || propietario.trim() === '' 
        || fecha.trim() === '' || hora.trim() ==='' || sintomas.trim() ==='' ){ 
            setError (true);
            return;

        }

        setError(false); 

        //creo un id unico con shortid
        cita.id = shortid();
        
        //creo una nueva cita

        crearCita(cita);

        //reinicio el form

        actualizarCita ({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas:''
        })


    }

    




    return (
        <Fragment>
            <h2> Crear Citas</h2>
            {error ? 
            <p className="alert">*Todos los campos son obligatorios</p>
            : null} 

            <form
                onSubmit={submitCita}
            >
                <input 
                    type="text"
                    name="mascota"
                    className="inputform"
                    placeholder='*Nombre Mascota'
                    onChange = {actualizarState}
                    value={mascota}
                 />

                <input 
                    type="text"
                    name="propietario"
                    className="inputform"
                    placeholder='*Nombre Propietario'
                    onChange = {actualizarState}
                    value={propietario}
                 />
                <label>Fecha del alta </label>
                
                <input 
                    type="date"
                    name="fecha"
                    className="inputform"
                    onChange = {actualizarState}
                    value={fecha}
                 />

                <label>Hora del alta </label>
                <input 
                    type="time"
                    name="hora"
                    className="inputform"
                    placeholder='Hora'
                    onChange = {actualizarState}
                    value={hora}
                />
                <textarea
                    name="sintomas"
                    placeholder='*Sintomas'
                    onChange = {actualizarState}
                    value={sintomas}
                >

                </textarea>
                <button
                    name='submit'
                    type='submit'
                    className="btnAgregar"
                
                >Agregar Cita</button>

                
            </form>
        </Fragment>
    )
}


export default Formulario;