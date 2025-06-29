import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
function VehiculeForm({ maj }) {
  const [datas, setDatas] = useState({
    marque: '',
    modele: '',
    immatriculation: '',
    carburant: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newDatas = { ...datas, [name]: value };
    setDatas(newDatas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    maj('params', datas);
  };
  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Nouveau véhicule
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout nouveau véhicule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Marque du véhicule"
                name="marque"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Modèle du véhicule"
                name="modele"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Immatriculation"
                name="immatriculation"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Select
              className="mb-2"
              name="carburant"
              onChange={handleChange}
            >
              <option>Type de carburant</option>
              <option value="essence">Essence</option>
              <option value="gasoil">Gasoil</option>
              <option value="hybride">Hybride</option>
              required
            </Form.Select>
            <Button type="submit">Valider</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default VehiculeForm;
