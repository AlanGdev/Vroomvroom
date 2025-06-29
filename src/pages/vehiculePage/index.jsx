import { Card, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Vehicule from '../../components/vehicule';
import VidangeForm from '../../components/vidangeForm';
import ControlTechForm from '../../components/controlTechForm';
import NiveauHuileForm from '../../components/niveauHuileForm';
import HistoPleins from '../../components/histoPleins';
function VehiculePage() {
  const [vehicule, setVehicule] = useState(null);

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem('vehicule'));
    setVehicule(datas);
  }, []);

  const maj = (key, datas) => {
    const newDatas = { ...vehicule, [key]: datas };
    setVehicule(newDatas);
    localStorage.setItem('vehicule', JSON.stringify(newDatas));
  };

  return (
    <Container className="flex-grow-1">
      <Vehicule vehicule={vehicule} />
      {/*<HistoPleins vehicule={vehicule} />*/}
      <NiveauHuileForm vehicule={vehicule} maj={maj} />
      <VidangeForm vehicule={vehicule} maj={maj} />
      <ControlTechForm vehicule={vehicule} maj={maj} />
    </Container>
  );
}
export default VehiculePage;
