import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function PleinForm({ vehicule, maj }) {
  const [showModal, setShowModal] = useState(false);

  const [datas, setDatas] = useState({
    date: '',
    kilometrage: '',
    volume: '',
    prix: '',
  });
  const pleins = vehicule?.pleins || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDatas = [...pleins, datas];
    newDatas.sort((a, b) => {
      if (a.date != b.date) return new Date(a.date) - new Date(b.date);
      return a.kilometrage - b.kilometrage;
    });

    maj('pleins', newDatas);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  return (
    <>
      <Button
        type="button"
        className="h-100 w-100"
        onClick={() => setShowModal(true)}
      >
        Ajouter plein de carburant
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Plein</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                value={datas.date}
                name="date"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Kilométrage lors du plein"
                type="number"
                step="1"
                name="kilometrage"
                value={datas.kilometrage}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Volume en litres"
                type="number"
                step="0.01"
                name="volume"
                value={datas.volume}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Prix"
                type="number"
                step="0.01"
                name="prix"
                value={datas.prix}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                placeholder="Commentaire"
                type="string"
                name="commentaire"
                value={datas.commentaire}
                onChange={handleChange}
                required
                rows={3}
              />
            </Form.Group>
            <Button type="submit">Valider</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PleinForm;
