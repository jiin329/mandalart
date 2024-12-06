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
    <div>
      <h1>test</h1>
      <MainGrid>
        {grids.map((cells, gridIndex) => {
          return (
            <Grid key={"grid_" + gridIndex}>
              <MandalartGrid
                cells={cells}
                onCellChange={(cellIndex: number, value: string) =>
                  handleCellChange(gridIndex, cellIndex, value)
                }
              />
            </Grid>
          );
        })}
      </MainGrid>
    </div>
  );
};

const MainGrid = styled.div`
  display: grid;
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
  width: 100%; // 부모의 너비에 맞춤
  height: 100%; // 부모의 높이에 맞춤
  box-sizing: border-box;
`;

export default MandalartPage;
