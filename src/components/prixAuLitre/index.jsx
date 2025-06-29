import { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
} from 'recharts';
import imgPrixAuLitre from '../../assets/prixAuLitre.png';

function PrixAuLitre({ vehicule }) {
  const [showGraph, setShowGraph] = useState(false);
  const [prixAuLitre, setPrixAuLitre] = useState([]);
  const pleins = vehicule?.pleins || [];

  useEffect(() => {
    const tableau = [];
    if (pleins.length > 0) {
      pleins.forEach((plein, index) => {
        if (index > 0) {
          const date = plein.date;
          const prix = plein.prix / plein.volume;
          const prixMoyen = () => {
            if (index === 0)
              return Number((plein.volume / plein.prix).toFixed(2));
            const total = pleins
              .slice(0, index + 1)
              .reduce((acc, p) => acc + p.prix / p.volume, 0);
            return Number((total / (index + 1)).toFixed(2));
          };
          tableau.push({ date, prix, prixMoyen: prixMoyen() });
        }
      });
    }
    setPrixAuLitre(tableau);
  }, []);

  const dateFormat = (date) => {
    const [aaaa, mm, dd] = date.split('-');
    return `${dd}/${mm}/${aaaa}`;
  };

  return (
    <div className="">
      {showGraph ? '' : ''}
      <Card className="bg-light ">
        <Row>
          <Col xs={3} className="d-flex align-items-center">
            {' '}
            <Card.Img
              className=" object-fit-contain"
              style={{ width: '100px' }}
              variant="start"
              src={imgPrixAuLitre}
            />
          </Col>
          <Col>
            <Card.Title className="flex-grow-1 p-2">
              <div className="">
                <p>
                  Prix au litre:{' '}
                  <span
                    className={
                      prixAuLitre.length > 1 &&
                      prixAuLitre[prixAuLitre.length - 1].prix <
                        prixAuLitre[prixAuLitre.length - 2].prix
                        ? 'bg-success text-light rounded px-2'
                        : 'bg-danger text-light rounded px-2'
                    }
                  >
                    {prixAuLitre.length > 1 &&
                      prixAuLitre[prixAuLitre.length - 1].prix.toFixed(2)}
                  </span>
                  €/litre
                </p>
                <p>
                  Prix Moyen depuis le{' '}
                  {prixAuLitre.length > 0
                    ? dateFormat(prixAuLitre[0].date)
                    : '...'}
                  :
                  {prixAuLitre.length > 0
                    ? prixAuLitre[prixAuLitre.length - 1].prixMoyen
                    : '...'}
                  €/litre
                </p>
                <div>
                  {prixAuLitre.length > 1 &&
                  prixAuLitre[prixAuLitre.length - 1].prixMoyen <
                    prixAuLitre[prixAuLitre.length - 2].prixMoyen ? (
                    <p className="text-success text-center fw-bold">
                      En dessous de la moyenne !
                    </p>
                  ) : prixAuLitre.length > 1 ? (
                    <p className="text-danger text-center fw-bold">
                      Au dessus de la moyenne...
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="text-end mx-2">
                <Button
                  variant="outline-primary"
                  onClick={() => setShowGraph(!showGraph)}
                >
                  {showGraph ? 'Masquer Graph' : 'Afficher Graph'}
                </Button>
              </div>
            </Card.Title>
          </Col>
        </Row>

        {showGraph ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prixAuLitre}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} unit="€" />
              <Legend />
              <Line
                dataKey="prix"
                stroke="#6D98A5"
                name={`Prix à date`}
                dot={false}
              />
              <Line
                dataKey="prixMoyen"
                stroke="#DCA183"
                name={`Prix moyen depuis le ${prixAuLitre.length > 0 ? dateFormat(prixAuLitre[0].date) : ''}`}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
}
export default PrixAuLitre;
