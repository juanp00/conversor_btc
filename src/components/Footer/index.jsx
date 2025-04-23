import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Importando componentes do React-Bootstrap
import styles from './styles.module.css'; // Importando o arquivo de estilo CSS Module

export default function Footer () {
  return (
    <>
        <Container fluid className={styles.footer}>
            <Container className={styles.wrapperFooter }>
                <Row className="justify-content-between align-items-center ">
                    <Col xs={12} md={6} className='d-flex justify-content-start align-items-center wrapperFooter' id={styles.wrapperFooter}>
                        <p>Conversor de criptomoedas</p>
                    </Col>
                    <Col xs={12} md={6} className='text-right d-flex justify-content-end align-items-center' id={styles.wrapperFooterCreated}>
                    <p>
                        Criado por{' '}
                        <a href="https://juandev.com.br" target="_blank" rel="noopener noreferrer">
                        Juandev
                        </a>
                    </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    </>
  );
};
