import { PriceData, Overview, OverviewItem } from './Coin';

interface PriceProps {
  tickerData?: PriceData;
}

function Price({ tickerData }: PriceProps) {
  return (
    <>
      <Overview>
        <OverviewItem>
          <span> All-time High price: </span>
          <span> {tickerData?.quotes.USD.ath_price.toFixed(2)}</span>
        </OverviewItem>
        <OverviewItem>
          <span> Percent from all-time-high price: </span>
          <span> {tickerData?.quotes.USD.percent_from_price_ath}%</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span> Market Cap: </span>
          <span> {tickerData?.quotes.USD.market_cap.toFixed(2)}</span>
        </OverviewItem>
        <OverviewItem>
          <span> Market Cap Change 24h: </span>
          <span> {tickerData?.quotes.USD.market_cap_change_24h}%</span>
        </OverviewItem>
      </Overview>
    </>
  );
}

export default Price;
