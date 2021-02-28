import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteBrand from './DeleteBrand';
import RenderSneakers from './RenderSneakers';
import EditBrand from './EditBrand';

/**
 * This component renders the brands in the table
 */
export default function BrandRenderer({ brands, refreshFunction }) {
  if (brands.length === 0) {
    return (
      <TableRow>
        <h2 style={{marginLeft: 10}}>There are no brands yet but you can add one with the button below ⬇️</h2>
      </TableRow>
    )
  } else {
    return (
      brands.map((brand, index) =>
      <TableRow style={{backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0"}} key={brand.id}>
        <TableCell>
          <h3 style={{fontFamily: "Noto Sans KR"}}>{brand.name}</h3>
        </TableCell>
        <TableCell>
          <p style={{fontFamily: "Noto Sans KR"}}>
            {brand.country}
          </p>
        </TableCell>
        <TableCell>
          <p style={{fontFamily: "Noto Sans KR"}}>
            {brand.description === "" ? "No description provided" : brand.description}
          </p>
        </TableCell>
        <TableCell>
          <p style={{fontFamily: "Noto Sans KR"}}>
            {new Date(brand.createdAt).toLocaleDateString()}
          </p>
        </TableCell>
        <TableCell>
          <RenderSneakers brand={brand} />
        </TableCell>
        <TableCell>
          <EditBrand brand={brand} refreshFunction={refreshFunction} />
        </TableCell>
        <TableCell>
          <DeleteBrand id={brand.id} refreshFunction={refreshFunction} />
        </TableCell>
      </TableRow>
      )
    )
  }
}