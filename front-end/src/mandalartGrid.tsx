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
}) => {
  return (
    <>
      {cells.map((cell, index) => {
        const CellComponent = isCenter && index === 4 ? CenterCell : Cell;
        return (
          <CellComponent
            key={"cell_" + index}
            value={cell}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
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
};
const Cell = styled.textarea<{ theme: any }>`
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  border: 1px solid #d1d1d1;
  font-size: calc(0.2rem + 1vw);
  text-align: center; /* 가로 중앙 정렬 */
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: hidden;
  padding: 10px;
  resize: none;
  line-height: 1.2;

  &:focus {
    border-color: #6a98b8;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
  padding-top: calc(50% - 0.6em); /* 텍스트 높이의 절반을 빼서 중앙 정렬 */
  padding-bottom: calc(50% - 0.6em); /* 텍스트 높이의 절반을 빼서 중앙 정렬 */
`;

const CenterCell = styled(Cell)`
  background-color: #e0e0e0; // 중심 셀 배경색
  font-weight: bold;
`;

export default MandalartGrid;
