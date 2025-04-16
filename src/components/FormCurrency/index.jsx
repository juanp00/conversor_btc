import { Col } from 'react-bootstrap'
import style from './style.module.css'

export default function FormCurrency({moeda, setMoeda, cryptoList, amount, setAmount}) {
    return(
        <>
            <Col className='col-sm-12 col-md-6'>
                <label htmlFor="quantia">Quantia</label>
                <div className={style.wrapperForm}>
                    <input
                        className={style.input} 
                        value={amount}
                        type="number" 
                        name="quantia" 
                        id="quantia" 
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className={style.wrapperSelect }>
                        <select 
                            className={style.select}
                            value={moeda}
                            name="moeda" 
                            id="moeda"
                            onChange={(e) => setMoeda(e.target.value)}
                        >
                        {cryptoList.map((crypto) => (
                            <option key={crypto.id} value={crypto.id}>
                                {crypto.name} ({crypto.symbol.toUpperCase()})
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
            </Col>
        </>
    )
}