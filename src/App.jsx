import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from './components/Header'
import FormCurrency from './components/FormCurrency'
import FormCurrencyTo from './components/FormCurrencyTo'
import style from './styleApp.module.css'
import useCryptoList from './hooks/useCryptoList'
import useCurrencyConversion from './hooks/useCurrencyConversion'
import useImgCrypto from './hooks/useImgCrypto'
import ResultConversion from './components/ResultConversion'
import imgBtc from '/bitcoin.png'
import PriceChart from './components/GraficoPrecos'
import Footer from './components/Footer'

export default function App() {
  const cryptoList = useCryptoList()
  const [fiatList, setFiatList] = useState(["usd", "brl", "eur"]);
  const [moeda, setMoeda] = useState("bitcoin")
  const imgCrypto = useImgCrypto(moeda, cryptoList)
  const [moedaConversao, setMoedaConversao] = useState("usd")
  const [amount, setAmount] = useState(1)
  const [amountTo, setAmountTo] = useState(1)
  const conversionResult = useCurrencyConversion(moeda, moedaConversao, amount, setAmountTo)

  return (
    <>
      <Header />
    
      <Container id='converter'>
        <Row className='text-center pt-5 pb-5'>
            <Col className='d-flex gap-2 justify-content-center'>
              <img className={style.imgTitle} src={imgBtc} alt="" />
              <h1>Converta Criptmoedas</h1>
            </Col>
            
        </Row>

        <Row className={style.formCurrency}>
          {/* Quantia */}
          <FormCurrency moeda={moeda} setMoeda={setMoeda} cryptoList={cryptoList} amount={amount} setAmount={setAmount}/>

          {/* Converter para */}
          <FormCurrencyTo moedato={moedaConversao} fiatList={fiatList} setMoedaConversao={setMoedaConversao} amountTo={amountTo} setAmountTo={setAmountTo}/>

          <ResultConversion conversionResult={conversionResult} imgCrypto={imgCrypto}/>
        </Row>

        <PriceChart moeda={moeda}/>
      </Container>

      <Footer />
    </>
  )
}

