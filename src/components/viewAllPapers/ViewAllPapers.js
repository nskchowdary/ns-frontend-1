import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { MdOutlineOpenInFull } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/scss/ViewAllPapers/ViewAllPapers.scss';
import * as types from '../../redux/actionsTypes/actionTypes';

const ViewAllPapers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: types.FETCH_PAPER_START });
  }, []);

  const papersAll = useSelector((state) => state.paper.papers);
  return (
    <Row className='allPaper-mainDiv'>
      {papersAll &&
        papersAll.map((item) => (
          <Col key={item.name} className='mt-3' sm={1} md={3} xl={3}>
            <Card>
              <Card.Img variant='top' height='250px' src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Link to={`/paper/${item._id}`}>
                  <Button>
                    <MdOutlineOpenInFull />
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default ViewAllPapers;
