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
Programs, Plan Groups, & Roles (for plProgram, plPlanGroup, plRoleGroup)
Metric Definitions (for plMetrics, plMetricCategory, plMetricSubCategory, spMetricDEF)
Component Types (for sysComponent)
Data Sources (for plDataSource)
Reporting: Access to various performance and payout reports.
Admin: User management, system settings, audit logs.
Header Bar:
[Company Logo] [System Name: QVC Plan Management]
[User Profile/Settings Icon] [Notifications Bell Icon]
[Help/Support Icon]
2. "New Plan" Wizard (for Plan Creation)
When a user clicks ":star: NEW PLAN", a multi-step wizard will appear, guiding them through the initial setup, which then transitions into the comprehensive Plan Editor. Each step will involve minimal, guided input.
Wizard Steps:
Plan Naming & Basic Info:
Plan Name (Text Input)
Description (Text Area)
Program (Dropdown with Type-ahead Search)
Plan Group (Dropdown with Type-ahead Search, contextually filtered by Program)
Role Group (Dropdown with Type-ahead Search, contextually filtered by Plan Group)
Effective Start Date (Date Picker)
Effective End Date (Date Picker)
Initial Eligibility (Optional/Template-Based):
Option to apply a pre-defined eligibility template or start clean.
Allows quick selection of common Market, Segment, Business Code, etc.
Review & Create:
Summary of inputs from previous steps.
[Button: Create Plan & Configure] (Once clicked, user is taken to the "QVC Plan Editor" for detailed configuration).
3. QVC Plan Editor (for Detailed Configuration & Management)
This is the core workspace for configuring all aspects of a specific QVC Plan Code. It adopts a multi-panel layout to enhance navigation, visual hierarchy, and efficiency.
Structure of the QVC Plan Editor:
Top Header (within Editor):
Selected Plan: [Display of Current Plan's Name (e.g., "All Savers - Billing & Enrollment - Agent")] [Dropdown Icon] (Clicking this allows switching to another plan using a search/select modal.)
Plan Code ID: [Read-only display of auto-generated Plan Code (e.g., PLC-0000001)]
Status Tag: [Dynamic Tag: Draft / Pending Review / Approved / Active / Archived]
Last Saved: [Timestamp]
Action Buttons (Right-aligned):
[Button: Save Draft]
[Button: Submit for Approval] (Changes depending on workflow state).
[Button: Publish] (Only if approved and ready to go live).
[Button: Print Schedule A (PDF)] (Generates a human-readable summary).
Left-Hand Plan Section Navigation (Vertical Tabs):
This navigation precisely maps to the logical steps of configuring a plan and directly corresponds to sections in the source document. Active section will be highlighted.
General Info & Eligibility (Combines plPlanCode and plPlanCodeGSSMap details)
Components Setup (spPlanComponentMap and sysComponent associations)
Metrics Assignment (spPlanComponentMetricsMap relations)
Goal Tiers (spPlanMetricTieredGoal values)
Awards Definition (spPlanTieredAward and spPlanMetricTieredAward)
Kickers & Dependencies (spKickersDependantMetrics logic)
Special Projects (Comprehensive section for all SPA related configs)
Revisions & History (Version control and audit trail)
Main Content Area (Detail View for Selected Section):
This area dynamically changes based on the selected section in the left navigation.
Detailed Section Mockups (Example: "Metrics Assignment")
Title: Metrics Assignment
Context: [Sub-title/Contextual dropdown: Component: "MMA" ▼] (This dropdown allows the user to focus on metrics for a specific component (e.g., MMA, KIK, PPM) or view all at once if not already filtered from the "Components Setup" page).
Instructions: "List all metrics associated with this Plan Code's selected (or all) component(s). Specify the data source and any secondary metrics for 'either/or' logic."
Data Table: "Metrics for [Selected Component]"
This table (spPlanComponentMetricsMap) provides an efficient way to manage metric assignments.
Column Header   Type    Notes
Metric #    Read-only   Auto-incrementing number for visual ordering.
Metric Name Dropdown    Searchable dropdown (plMetrics.MetricID/Name). User selects from a pre-defined list.
Source  Dropdown    Selects the data source (plDataSource.DataSource). Contextual tooltip: "e.g., MyMetrics (MM), IDASH (ID)".
Secondary Metric    Dropdown    Optional. Searchable dropdown for the "either/or" metric (plMetrics.MetricID/Name). Tooltip: "Use if achievement of either this or the primary metric counts."
Secondary Source    Dropdown    Optional. Source for the secondary metric.
Effective Start Date Picker Select the start date for this metric configuration.
Effective End   Date Picker Select the end date. Defaults to "9998-12-31" for indefinite.
Actions Icons (Delete)  [Delete Row Icon]
Example Table Rows (User Interaction):
Metric #    Metric Name Source  Secondary Metric    Secondary Source    Effective Start Effective End   Actions
1   Quality (M0000001)  MM  (leave blank)   (leave blank)   01/01/2024  12/31/9998  :wastebasket:
2   Rate per Hour (M0000002)    MM  (leave blank)   (leave blank)   01/01/2024  12/31/9998  :wastebasket:
3   VOC UES Score (M0000173)    MM  Release Rate (M0000092) MM  01/01/2024  12/31/9998  :wastebasket:
[Button: + Add New Metric to Component] (Adds a new editable row to the table)
Key UI Elements & How They Contribute:
Ease of Navigation:
Global Left Sidebar: Provides clear high-level modularity.
Left-Hand Plan Section Navigation: Acts as an "internal table of contents" for the currently active plan, allowing quick jumps between configuration areas without losing context of the overall plan being managed.
Contextual Dropdowns: (e.g., "Component" dropdown in Metrics/Goals) helps filter and focus the displayed data, reducing cognitive overload.
"Breadcrumbs" or "Location Indicator": (Implicit in header/section titles) e.g., "Plan Editor > All Savers Plan A > Metrics Assignment" to clarify user's position.
Clear Visual Hierarchy:
Strong, Contrasting Colors: For primary action buttons (e.g., "NEW PLAN").
Consistent Layout: All sections within the Plan Editor will follow a similar "Title > Context > Instructions > Data Table > Action Buttons" pattern.
Cards/Sections: Logical groupings of information (e.g., eligibility criteria as a distinct sub-section under 'General Info').
Bold Headers & Clear Labels: To highlight important information and guide the user's eye.
Status Tags: Visually indicates the lifecycle stage of a plan.
Intuitive Controls:
Standard UI Widgets: Relies heavily on familiar elements like dropdowns, date pickers, text inputs, checkboxes, and clear buttons.
Type-ahead Search in Dropdowns: For fields with many options (Plan Codes, Metric IDs, Programs), minimizing manual typing and errors (Efficiency).
Inline Editing in Tables: Reduces clicks and screen changes for data entry, directly enhancing Efficiency.
Tooltips (Hover-over Help): Crucial for explaining complex concepts from the document (e.g., TierMin/Max logic, Secondary Metric purpose, ExcludeMaxPayOut). Directly addresses complex Intuitive Controls.
Real-time Validation: Instant feedback on input errors (e.g., "End Date cannot be before Start Date," "Metric value outside valid range").
Efficiency:
Centralized Plan Editor: All related configurations for a single PlanCode are accessible in one place, minimizing context switching.
Effective Dating Management: Integrated Effective Start/End date pickers in all relevant tables allow users to manage future changes and historical records seamlessly.
Templates/Copy Functionality (Implied): For recurring components or metrics, the system could allow copying configurations from existing plans or templates, speeding up creation. (This is a future enhancement but informed by document's reuse of configurations).
Clear Save/Submit Flow: Explicit buttons for saving drafts and submitting for approval manage the plan's lifecycle efficiently.
Print Schedule A: Immediate access to a formatted output helps users quickly review and validate their configurations externally.
Accessibility:
Semantic HTML Structure: The underlying code would use appropriate HTML5 elements (headings, lists, tables, forms) to ensure compatibility with assistive technologies.
Keyboard Navigation & Focus Indicators: All interactive elements would be reachable and operable via keyboard, with clear visual focus states.
ARIA Attributes: Implement ARIA roles, states, and properties where needed to provide additional context for screen readers.
Color Contrast: Adhere to WCAG guidelines for text and interactive element color contrast ratios.
Form Labels & Instructions: All input fields would have clearly associated labels.
Scalable Text: Ensure the UI scales gracefully when users adjust text size.