// src/components/MandaratGrid.tsx
import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface MandalartGridProps {
  cells: string[];
  onCellChange: (index: number, value: string) => void;
  isCenter?: boolean;
}

const MandalartGrid: React.FC<MandalartGridProps> = ({
  cells,
  onCellChange,
  isCenter = false,
}) => (
  <>
    {cells.map((cell, index) => {
      const CellComponent = isCenter && index === 4 ? CenterCell : Cell;
      return (
        <CellComponent
          key={"cell_" + index}
          value={cell}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onCellChange(index, e.target.value)
          }
          placeholder={
            isCenter && index === 4 ? "중심 목표" : `목표 ${index + 1}`
          }
          theme={undefined}
        />
      );
    })}
  </>
);

const Cell = styled.input<{ theme: any }>`
  display: flex;
  border: 1px solid #d1d1d1;
  font-size: calc(0.3rem + 1vw);
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  aspect-ratio: 1;
  width: 100%; /* input이 grid에 맞게 늘어나도록 설정 */
  height: 100%; /* input이 grid에 맞게 늘어나도록 설정 */
  box-sizing: border-box; /* 패딩과 보더가 포함된 너비 및 높이 계산 */
  overflow: hidden;
  word-wrap: ellipsis;
  white-space: nowrap;
  padding: 10px;

  &:focus {
    border-color: #6a98b8;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const CenterCell = styled(Cell)`
  background-color: #e0e0e0; // 중심 셀 배경색
  font-weight: bold;
`;

export default MandalartGrid;
