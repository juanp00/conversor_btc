// src/components/GraficoPrecos/index.jsx
import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format } from 'date-fns'; // Para formatar as datas

// Registre as escalas e os elementos necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoPrecos = ({ moeda = 'bitcoin' }) => {
  const [dataChart, setDataChart] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month' ou 'year'
  const [loading, setLoading] = useState(true);

  // Função que obtém os dados do gráfico da API CoinGecko
  const fetchChartData = async (range) => {
    setLoading(true);

    // Mapeamento para os intervalos de tempo em dias
    const daysMap = {
      week: 7,
      month: 30,
      year: 365
    };

    const url = `https://api.coingecko.com/api/v3/coins/${moeda}/market_chart?vs_currency=usd&days=${daysMap[range]}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Se os dados forem obtidos com sucesso, prepara os dados para o gráfico
      const labels = data.prices.map(price => {
        const date = new Date(price[0]);
        return format(date, range === 'year' ? 'dd/MM/yyyy' : 'dd/MM');
      });

      const prices = data.prices.map(price => price[1]);

      setDataChart({
        labels,
        datasets: [
          {
            label: `${moeda.charAt(0).toUpperCase() + moeda.slice(1)} - Preço`,
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            fill: false
          }
        ]
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Inicializa o gráfico com o intervalo de tempo "week"
    fetchChartData(timeRange);
  }, [timeRange, moeda]);

  // Configuração do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: timeRange === 'week' ? 'Dias da Semana' : timeRange === 'month' ? 'Dias do Mês' : 'Datas do Ano'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        title: {
          display: true,
          text: 'Preço (USD)'
        }
      }
    }
  };

  // Função para mudar o intervalo de tempo
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (loading) return <div>Carregando gráfico...</div>;

  return (
    <Row className='pt-5 pb-5' id='grafico'>
        <Col>
            <h3>{moeda.charAt(0).toUpperCase() + moeda.slice(1)} - Preço no Mercado</h3>
            <div className='d-flex gap-2 flex-column flex-sm-row'>
                <Button onClick={() => handleTimeRangeChange('week')} variant="outline-dark">Última Semana</Button>
                <Button onClick={() => handleTimeRangeChange('month')} variant="outline-dark">Último Mês</Button>
                <Button onClick={() => handleTimeRangeChange('year')} variant="outline-dark">Último Ano</Button>
            </div>
            {dataChart ? (
                <Line data={dataChart} options={options} />
            ) : (
                <div>Erro ao carregar dados do gráfico.</div>
            )}
        </Col>
    </Row>
  );
};

export default GraficoPrecos;
