QVC Plan Management System: UI/UX Design
Overall Philosophy:
The design prioritizes a clear, step-by-step approach for creating and managing plans, while offering robust tools for detailed configuration. It leverages intuitive visual hierarchies and efficient input methods to handle the system's inherent complexity. The primary goal is to empower users to define the multifaceted logic of QVC Plans without getting lost in the technical jargon of interconnected tables.
1. Global Navigation & Entry Points
The application will feature a persistent Left Sidebar Navigation providing access to high-level modules, and a clear Header Bar for contextual actions.
Left Sidebar Navigation:
Dashboard: (Home Screen) Overview of active plans, pending approvals, notifications, and quick stats.
Plan Library: (Browse & Search) Central hub to view, search, and filter all existing QVC Plans.
:star: NEW PLAN: A prominent, clearly labeled button/link to initiate the plan creation wizard.
Configuration Hub: (Dropdown/Expandable Section) Access to foundational data setup:
    - Programs, Plan Groups, & Roles (for plProgram, plPlanGroup, plRoleGroup)
    - Metric Definitions (for plMetrics, plMetricCategory, plMetricSubCategory, spMetricDEF)
    - Component Types (for sysComponent)
    - Data Sources (for plDataSource)
    - Special Project Rules (for spSpecialAssignments, spSpecialAssignMAPRatingAward)
Reporting: Access to various performance and payout reports.
Admin: User management, system settings, audit logs.
Header Bar:
[Company Logo] [System Name: QVC Plan Management]
[User Profile/Settings Icon] [Notifications Bell Icon]
[Help/Support Icon]
2. "New Plan" Wizard (for Plan Creation)
When a user clicks ":star: NEW PLAN", a multi-step wizard will appear, guiding them through the initial setup, which then transitions into the comprehensive Plan Editor.
Wizard Steps:
Plan Naming & Basic Info:
    - Plan Name (Text Input)
    - Description (Text Area)
    - Program (Dropdown with Type-ahead Search, from plProgram)
    - Plan Group (Dropdown with Type-ahead Search, contextually filtered by Program, from plPlanGroup)
    - Role Group (Dropdown with Type-ahead Search, contextually filtered by Plan Group, from plRoleGroup)
    - Effective Start Date (Date Picker)
    - Effective End Date (Date Picker)
Initial Eligibility (Optional/Template-Based):
    - Option to apply a pre-defined eligibility template or start clean.
    - Allows quick selection of common Market, Segment, Business Code, etc. (populates plPlanCodeGSSMap).
Review & Create:
    - Summary of inputs from previous steps.
    - [Button: Create Plan & Configure] (Once clicked, user is taken to the "QVC Plan Editor" for detailed configuration).
3. QVC Plan Editor (for Detailed Configuration & Management)
This is the core workspace for configuring all aspects of a specific QVC Plan Code.
Structure of the QVC Plan Editor:
Top Header (within Editor):
Selected Plan: [Display of Current Plan's Name] [Dropdown Icon]
Plan Code ID: [Read-only display of auto-generated Plan Code (e.g., PLC-0000001)]
Status Tag: [Dynamic Tag: Draft / Pending Review / Approved / Active / Archived]
Last Saved: [Timestamp]
Action Buttons (Right-aligned):
    - [Button: Save Draft]
    - [Button: Submit for Approval]
    - [Button: Publish]
    - [Button: Print Schedule A (PDF)]
Left-Hand Plan Section Navigation (Vertical Tabs):
    1. General Info & Eligibility (plPlanCode and plPlanCodeGSSMap)
    2. Components Setup (spPlanComponentMap and sysComponent associations)
    3. Metrics Assignment (spPlanComponentMetricsMap relations)
    4. Goal Tiers (spPlanMetricTieredGoal values)
    5. Awards Definition (spPlanTieredAward and spPlanMetricTieredAward)
    6. Kickers & Dependencies (spKickersDependantMetrics logic)
    7. Special Projects (All SPA related configs: spPlanCodeSpecialAssignmentMap, spSpecialAssignPlanCodeProjectPay, spSpecialAssignmentGateKeeper)
    8. Revisions & History
Main Content Area (Detail View for Selected Section):
This area dynamically changes based on the selected section.
Detailed Section Mockups (Key Examples):
A. "Awards Definition" Section
   Title: Awards Definition
   Instructions: "Define the payout amounts for this plan. Awards can be set per component (for multi-metric achievements) or per individual metric."
   Layout: Two distinct sub-sections or tabs within this view.
   - Tab 1: Pay Per Component (spPlanTieredAward)
     - Context Dropdown: [Component: MMA ▼] (Filter for a specific component).
     - Table to map PlanCode+Component+TierID to an AwardAmount.
     - Use Case: For Multi-Metric Achievement (MMA) or Minimum Metric Met (MMM) where the award is based on the lowest tier achieved across several metrics. The award is tied to the component, not the individual metrics.
   - Tab 2: Pay Per Metric (spPlanMetricTieredAward)
     - Context Dropdown: [Component: KIK ▼] (Filter for a specific component).
     - Table to map PlanCode+Component+MetricID+TierID to an AwardAmount.
     - Use Case: For simple components like Pay Per Metric (PPM) or Kickers (KIK) where achieving a goal on that single metric results in a direct payout.
B. "Kickers & Dependencies" Section
   Title: Kickers & Dependencies
   Instructions: "Define the core metrics that must be achieved before a Kicker metric can be paid out."
   - Step 1: Select the Kicker
     - Dropdown 1: Kicker Component (e.g., KIK, KIK1). Populated from the 'Components Setup' for this plan.
     - Dropdown 2: Kicker Metric (e.g., Team Call Volume). Populated from the 'Metrics Assignment' for the selected Kicker Component.
   - Step 2: Select the Core Metrics it Depends On
     - A multi-select checklist or "Add" button to choose one or more Core Metrics from other components (e.g., MMA component's 'Quality' and 'Efficiency' metrics).
   - Result: A table displaying the established dependencies (spKickersDependantMetrics).
C. "Special Projects" Section
   Title: Special Project Configuration
   Instructions: "Configure the Special Project methodology, payment, and any gatekeeper conditions for this plan."
   - Sub-Section 1: Methodology Assignment (spPlanCodeSpecialAssignmentMap)
     - Dropdown: Special Project Component [SPA-MAP / SPA-PROJECT]
     - Checkbox: [ ] Exclude Max Payout (If checked, award the Special Project amount regardless of performance metric payout).
   - Sub-Section 2: Project Pay (spSpecialAssignPlanCodeProjectPay) - (Only visible if SPA-PROJECT is selected)
     - Input: Project Pay Amount ($) [ e.g., 250.00 ]
   - Sub-Section 3: Gatekeeper (spSpecialAssignmentGateKeeper)
     - Instructions: "Optionally, define a metric condition that must be met for the Special Project to apply."
     - Dropdown: Gatekeeper Metric (e.g., Call Volume)
     - Dropdown: Operator [<, <=, >, >=]
     - Input: Value (e.g., 200)