import React , {Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {
  // agrego un state de citas

  const [citas,setCitas] = useState([]);

  //agrego cita nueva
  const crearCita = cita =>{
    setCitas ([
      ...citas, //copia del State
      cita
    ])

  }

  //eliminar cita

  const eliminarCita = id=>{
    
    const eCita = citas.filter(cita => cita.id !== id);
    setCitas (eCita);

  }

  //almaceno las citas en local storage con useEffect

  let citasIniciales =  JSON.parse (localStorage.getItem('citas'));

  
  if (!citasIniciales) {
    citasIniciales = [];
  }

  useEffect ( () => {

    if (citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    }else {
      localStorage.setItem ('citas',JSON.stringify([]));
    }
  }, [citas]);

const titulo = citas.length === 0 ? 'No hay citas': 'Administra tu cita'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className='container'>
        <div className='grid'>
          <div>
            <Formulario
            crearCita = {crearCita}
            
            />
          </div>
          <div>
            <h2>{titulo}</h2>
            {citas.map(cita=> (
              <Cita
                key = {cita.id}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
      
    </Fragment>
   
  );
}

export default App;
