import React from 'react';
import styled from 'styled-components';
import { Coin } from '@/types/coin';
import { StoreState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarActions } from '@/services/sidebar/slice';

const SidebarLi = styled.li<{ isSelected: boolean }>`
  display: flex;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-right: 12px;
  text-align: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  border-bottom: 1px solid #eee;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => (props.isSelected ? props.theme.baseBackgroundColor : 'white')};
  position: ${(props) => (props.isSelected ? 'relative' : 'inherit')};
  cursor: pointer;
  &::before {
    display: ${(props) => (props.isSelected ? 'block' : 'none')};
    content: '';
    position: absolute;
    margin-right: 12px;
    background-color: ${(props) => props.theme.themeColor};
    width: 2px;
    height: 100%;
  }
  &:hover {
    background-color: #f8f8f8;
  }
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
  color: ${(props) => (props.isRising ? props.theme.risingColor : props.theme.fallingColor)};
`;

interface SidebarItemProps {
  coinData: Coin;
}

function SidebarItem({ coinData }: SidebarItemProps) {
  const isRisingNow = coinData.currentPrice > coinData.prevPrice;
  const isRising = coinData.fluctate24H > 0;
  const sidebarState = useSelector((state: StoreState) => state.sidebar);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(sideBarActions.select({ coinId: coinData.id }));
  };

  return (
    <SidebarLi role="button" onClick={() => handleClick()} isSelected={sidebarState.selectedCoin === coinData.id}>
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
