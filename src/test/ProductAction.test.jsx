import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import ProductAction from '../components/ProductAction';
import { FavoritesProvider } from '../context/FavoritesContext.jsx';

describe('ProductAction component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
  };
  test('calls addToCart with correct product when button is clicked', () => {
    const addToCartMock = vitest.fn();
    const favoriteClickMock = vitest.fn();

    render(
      <FavoritesProvider>
        <ProductAction
          addToCart={addToCartMock}
          product={mockProduct}
          favoriteClick={favoriteClickMock}
        />
      </FavoritesProvider>
    );

    const button = screen.getByRole('button', { name: /Dodaj do koszyka/i });
    button.click();

    expect(addToCartMock).toHaveBeenCalledWith(mockProduct);
  });
});
