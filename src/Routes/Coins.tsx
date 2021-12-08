import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from '../atom';

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 600px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  span {
    margin-top: 20px;
    padding: 7px;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 5px;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 64px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin: 10px 0px;
  border: 1px solid ${(props) => props.theme.textColor};
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  a {
    padding: 15px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;
  }
  border-radius: 7px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 8px;
`;

interface coinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<coinInterface[]>('allCoins', fetchCoins);
  const [isDark, setIsDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDark = () => setIsDarkAtom((current) => !current);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <span onClick={toggleDark}>
          {isDark ? 'Click to Light Mode 🌞' : 'Click to Dark Mode 🌜'}
        </span>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
