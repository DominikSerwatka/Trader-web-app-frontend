import React from 'react';
import ProductDetails from '../components/ProductDetails';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('ProductDetails component', () => {
  test('renders product name, description, and price', () => {
    const productName = 'Test Product';
    const productDescription = 'This is a test product description.';
    const productPrice = 99;

    render(
      <ProductDetails
        productName={productName}
        productDescription={productDescription}
        productPrice={productPrice}
      />
    );

    expect(screen.getByText(productName)).toBeInTheDocument();
    expect(screen.getByText(productDescription)).toBeInTheDocument();
    expect(screen.getByText(productPrice + ' zł')).toBeInTheDocument();
  });
});
