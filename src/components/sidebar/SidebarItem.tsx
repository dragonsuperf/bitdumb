import React from 'react';
import styled from 'styled-components';
import { Coin } from '@/types/coin';
import { fallingColor, risingColor } from '@/styles/colors';

const SidebarLi = styled.li`
  display: flex;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 12px;
  padding-right: 12px;
  text-align: center;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  & > div {
    width: 80px;
  }
  & > span {
    width: 80px;
  }
`;

const FluctateDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceText = styled.span<{ isRising: boolean; isRisingNow?: boolean }>`
  color: ${(props) => (props.isRising ? risingColor : fallingColor)};
`;

interface SidebarItemProps {
  coinData: Coin;
}

function SidebarItem({ coinData }: SidebarItemProps) {
  const isRisingNow = coinData.currentPrice > coinData.prevPrice;
  const isRising = coinData.fluctate24H > 0;

  return (
    <SidebarLi>
      <div>{coinData.id}/KRW</div>
      <PriceText isRising={isRising} isRisingNow={isRisingNow}>
        {coinData.currentPrice}
      </PriceText>
      <FluctateDiv>
        <PriceText isRising={isRising}>
          {isRising ? '+' : ''}
          {coinData.fluctate24H}
        </PriceText>
        <PriceText isRising={isRising}>
          {isRising ? '+' : ''}
          {coinData.fluctateRate24H}%
        </PriceText>
      </FluctateDiv>
      <div>{coinData.accTradeValue} 백만</div>
    </SidebarLi>
  );
}

export default SidebarItem;
