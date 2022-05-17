// npm i bootstrap reactstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball Z" },
  { id: 3, personaje: "kenshin", anime: "Samuray X" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh" },
];

function App() {
  const [data, setData] = useState(Data);
  const [form, setForm] = useState({ id: "", personaje: "", anime: "" });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const OcualtarModalInsertar = () => {
    setModalInsertar(false);
    //console.log("estado de modal insertar " + modalInsertar);
  };

  const insertar = () => {
    const valorNuevo = { ...form };
    valorNuevo.id = data.length + 1;
    let lista = data;
    lista.push(valorNuevo);
    setData(lista);
    setModalInsertar(false);
  };
  
  const mostrarModalEditar=(registro) => {
    setModalEditar(true);
    setForm(registro)
  };
  
  const OcualtarModalEditar=()=>{
    setModalEditar(false);
  }


  const editar=(dato) =>{
    let contador =0;
    let lista= data;
    lista.map((registro)=>{
      if(dato.id===registro.id){
        lista[contador].personaje=dato.personaje;
        lista[contador].anime=dato.anime;
      }
      contador++;
    });
    setData(lista);
    setModalEditar(false);
  }

  /*
  const eliminar=(dato)=>{
    let opcion=window.confirm("Realmente desde eliminar"+dato.id);
    if(opcion){
      let contador=0;
      let lista= [...data];
      lista.map((registro)=>{
        if(registro.id===dato.id){
          lista.splice(contador,1);
        }
        contador++;
      });
      setData(lista);
    }
  }
  */
 
 const eliminar=(datoAEliminar) =>{
  let opcion=window.confirm("Realmente desde eliminar "+datoAEliminar.id);
  if(opcion){
    const filtredData = data.filter(item => item.id !== datoAEliminar.id);
    setData(filtredData);
  }
  
 }
 
  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={mostrarModalInsertar}>
          Ingrese Nuevo Character
        </Button>
        <br />
        <br />

        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>personaje</th>
              <th>Anime</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.id}</td>
                <td>{elemento.personaje}</td>
                <td>{elemento.anime}</td>
                <td>
                  <Button color="primary" 
                  onClick={()=>mostrarModalEditar(elemento)}>
                    Editar
                  </Button>
                  {"      "}
                  <Button color="danger" onClick={()=>eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Inserte Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={data.length + 1}
            />
          </FormGroup>

          <FormGroup>
            <label>Personaje:</label>
            <input
              className="form-control"
              name="personaje"
              type="text"
              placeholder="Personaje"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Anime:</label>
            <input
              className="form-control"
              name="anime"
              type="text"
              placeholder="Anime"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={insertar}>
            Insertar
          </Button>
          <Button color="danger" onClick={OcualtarModalInsertar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>Personaje:</label>
            <input
              className="form-control"
              name="personaje"
              type="text"
              onChange={handleChange}
              value={form.personaje}
            />
          </FormGroup>

          <FormGroup>
            <label>Anime:</label>
            <input
              className="form-control"
              name="anime"
              type="text"
              onChange={handleChange}
              value={form.anime}
            />
          </FormGroup>

          <ModalFooter>
            <Button color="primary" onClick={()=>editar(form)} >
              Editar
            </Button>
            <Button color="danger" onClick={OcualtarModalEditar}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}
export default App;
