import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expense', () => {
	const res = selectExpensesTotal([]);
	expect(res).toBe(0);
});

test('Should correctly add up a single expense', () => {
	const res = selectExpensesTotal([expenses[0]]);
	expect(res).toBe(195);
});

test('Should correctly add up multiple expense', () => {
	const res = selectExpensesTotal(expenses);
	expect(res).toBe(195);
});