
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanManagementPage from '../pages/plan-management';
import { fireEvent } from '@testing-library/react';


describe('QVC Plan Management System', () => {

    beforeEach(() => {
        render(<PlanManagementPage />);
    });

    test('renders the initial view with the first plan loaded', () => {
        // More specific query for the header
        const header = screen.getByRole('banner');
        expect(within(header).getByRole('heading', { name: 'Agent Core Performance Plan' })).toBeInTheDocument();
        expect(screen.getByText('Draft')).toBeInTheDocument();
        expect(screen.getByText('Core identifying information for the plan.')).toBeInTheDocument();
    });

    test('allows switching between different plans', () => {
        // Click on the second plan in the sidebar
        fireEvent.click(screen.getByText('SME Outreach Plan'));

        // Verify the header and content have updated to the second plan
        const header = screen.getByRole('banner');
        expect(within(header).getByRole('heading', { name: 'SME Outreach Plan' })).toBeInTheDocument();
        expect(screen.getByText('Core identifying information for the plan.')).toBeInTheDocument();
        expect(screen.getByDisplayValue('PLC-0000002')).toBeInTheDocument();
    });

    test('displays correct data in the "Awards Definition" section for a simple plan', () => {
        fireEvent.click(screen.getByText('Awards Definition'));

        const perComponentCard = screen.getByText('Pay Per Component').closest('div');
        expect(perComponentCard).toBeInTheDocument();

        // Check for the component award within its specific card
        const componentAwardRows = within(perComponentCard).getAllByRole('row');
        expect(componentAwardRows).toHaveLength(2); // Header + 1 data row
        expect(within(perComponentCard).getByText('Multi-Metric Achievement')).toBeInTheDocument();
        expect(within(perComponentCard).getByText('$400.00')).toBeInTheDocument();

        // Check that the "Pay Per Metric" table is empty
        const perMetricCard = screen.getByText('Pay Per Metric').closest('div');
        expect(within(perMetricCard).getByText('No per-metric awards defined.')).toBeInTheDocument();
    });

    test('displays correct data in "Awards" and "Kickers" sections for a plan with kickers', () => {
        fireEvent.click(screen.getByText('SME Outreach Plan'));
        fireEvent.click(screen.getByText('Awards Definition'));
        
        // Verify component award
        const perComponentCard = screen.getByText('Pay Per Component').closest('div');
        expect(within(perComponentCard).getByText('$300.00')).toBeInTheDocument();

        // Verify per-metric award for the Kicker
        const perMetricCard = screen.getByText('Pay Per Metric').closest('div');
        expect(within(perMetricCard).getByText('Team Call Volume')).toBeInTheDocument();
        expect(within(perMetricCard).getByText('$100.00')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Kickers & Dependencies'));
        expect(screen.getByText('Define core metrics that must be met before a Kicker is paid.')).toBeInTheDocument();
        expect(screen.getByText('Team Call Volume')).toBeInTheDocument(); // Kicker metric
        expect(screen.getByText('Quality Score')).toBeInTheDocument(); // Dependent metric
    });

    test('displays correct data in the "Special Projects" section', () => {
        fireEvent.click(screen.getByText('USP Team Project Plan'));
        fireEvent.click(screen.getByText('Special Projects'));

        expect(screen.getByText('Configuration for special project payments and conditions.')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Special Project Pay')).toBeInTheDocument();
        expect(screen.getByDisplayValue('$250.00')).toBeInTheDocument();

        expect(screen.getByText('A metric condition that must be met for the project to apply.')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Team Call Volume')).toBeInTheDocument();
        expect(screen.getByDisplayValue('<')).toBeInTheDocument();
        expect(screen.getByDisplayValue('200')).toBeInTheDocument();
    });
    
    test('shows pending review status correctly', () => {
        fireEvent.click(screen.getByText('USP Team Project Plan'));

        const statusBadge = screen.getByText('Pending Review');
        expect(statusBadge).toBeInTheDocument();
    });

});
