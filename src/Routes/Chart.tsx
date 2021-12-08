import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        'Coin price is loading...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_open),
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            xaxis: {
              type: 'datetime',
              categories: data?.map((price) => price.time_open),
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
