import React from 'react';
import ProductImage from '../components/ProductImage';
import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { test } from 'vitest';

describe('ProductImage component', () => {
  test('renders image with correct src and alt text', () => {
    const testImage = '../assets/images/szafa_przesuwna.webp';
    const altText = 'Szafa przesuwna';

    render(<ProductImage picture={testImage} altText={altText} />);

    const img = screen.getByAltText(altText);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', testImage);
  });
});
