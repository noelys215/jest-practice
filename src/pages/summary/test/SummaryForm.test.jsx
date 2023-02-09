import { render, screen } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	expect(checkbox).not.toBeChecked();

	const confirmButton = screen.getByRole('button', { name: /confirm order/i });
	expect(confirmButton).toBeDisabled();
});

test('Checkbox enables on first click, disables on second', async () => {
	const user = userEvent.setup();

	render(<SummaryForm />);

	const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
	const confirmButton = screen.getByRole('button', { name: /confirm order/i });

	await user.click(checkbox);
	expect(confirmButton).toBeEnabled();

	await user.click(checkbox);
	expect(confirmButton).toBeDisabled();
});

test('popover on hover', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);
	// Popover initially hidden
	const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
	expect(nullPopover).not.toBeInTheDocument();
	// Popover appears on mouseover
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	await user.hover(termsAndConditions);
	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();
	// Popover disappears on mouseout
	await user.unhover(termsAndConditions);
	expect(popover).not.toBeInTheDocument();
});
