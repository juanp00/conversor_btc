import { Col } from 'react-bootstrap'
import style from './style.module.css'

export default function FormCurrencyTo({moedaConversao, fiatList, setMoedaConversao, amountTo, setAmountTo}) {
    return (
      <>
        {/* Valor atual da moeda de conversão */}
        <Col className='col-sm-12 col-md-6'>
          <label htmlFor="quantia">Converter para</label>
          <div className={style.wrapperForm}>
            <input
              disabled
              className={style.input}
              value={amountTo}
              type="number"
              name="quantiaConversion"
              id="quantiaConversion"
              onChange={(e) => setAmountTo(e.target.value)}
            />
            <div className={style.wrapperSelect }>
              <select
                className={style.select}
                name="moedaTo"
                id="moedaTo"
                value={moedaConversao}
                onChange={(e) => setMoedaConversao(e.target.value)}
              >
                {fiatList.map((fiat) => (
                    <option key={fiat} value={fiat}>
                      {fiat}
                    </option>
                ))}
              </select>
            </div>
          </div>
        </Col>
      </>
    );
  }
  