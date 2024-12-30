// src/pages/MandaratPage.tsx
import React, { useState } from "react";
import styled from "styled-components";
import MandalartGrid from "./mandalartGrid";

const MandalartPage: React.FC = () => {
  const [grids, setGrids] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );

  const handleCellChange = (
    gridIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const updatedGrids = [...grids];
    updatedGrids[gridIndex][cellIndex] = value;

    if (gridIndex === 4 && cellIndex !== 4) {
      updatedGrids[cellIndex][4] = value;
    } else if (gridIndex !== 4 && cellIndex === 4) {
      updatedGrids[4][gridIndex] = value;
    }
    setGrids(updatedGrids);
  };

  return (
    <MainContent>
      <div>
        <h1>test</h1>
        <MainGrid>
          {grids.map((cells, gridIndex) => {
            return (
              <Grid key={"grid_" + gridIndex}>
                <MandalartGrid
                  cells={cells}
                  isCenter={gridIndex === 4 || false}
                  onCellChange={(cellIndex: number, value: string) =>
                    handleCellChange(gridIndex, cellIndex, value)
                  }
                />
              </Grid>
            );
          })}
        </MainGrid>
      </div>
    </MainContent>
  );
};

const MainContent = styled.div`
  margin: 20px; /* 원하는 공백 크기로 조정 */
  padding: 10px; /* 필요 시 내부 여백 추가 */
  box-sizing: border-box; /* 패딩과 테두리를 포함 */
  justify-items: center;
`;

const MainGrid = styled.div`
  display: grid;
  max-width: 1000px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const Grid = styled.div<{ isCenter?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default MandalartPage;
