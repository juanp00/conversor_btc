import { Col, Row } from 'react-bootstrap'
import style from './style.module.css'

export default function ResultConversion({conversionResult, imgCrypto}) {
    return(
        <>
        {/* Valor atual da moeda de conversão */}
        <Row style={{textAlign: "center", margin: "50px 0"}}>
            <Col>
                <span className={style.wrapperConversion}>
                <img className={style.imgCrypto} src={imgCrypto} alt="" />
                <h3 className={style.titleMobile}>{conversionResult}</h3>
                </span>
            </Col>
        </Row>
        </>
    )
}