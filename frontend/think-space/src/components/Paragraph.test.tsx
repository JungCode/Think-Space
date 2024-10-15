import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Paragraph from './Paragraph'
import '@testing-library/jest-dom/vitest'
describe('group', () => {
	it('should have a children content', () => {
		render(<Paragraph>Hello</Paragraph>);
		const text = screen.getByText("Hello");
		expect(text).toBeInTheDocument();
	})
})