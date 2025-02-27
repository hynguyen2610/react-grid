import { render, screen } from '@testing-library/react';
import SimpleGrid from './SimpleGrid';

test('renders learn react link', () => {
  render(<SimpleGrid />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
