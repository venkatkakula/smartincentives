
import React, { useState, useMemo } from 'react';

// --- ICONS (from manifest) ---
const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    planLibrary: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    newPlan: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

// --- TYPES ---
interface Goal {
    tierId: string;
    min: number;
    max: number;
}

interface Award {
    tierId: string;
    amount: number;
    isPerMetric?: boolean;
}

interface Metric {
    metricId: string;
    source: string;
    secondaryMetricId?: string;
    secondarySource?: string;
    goals: Goal[];
    secondaryGoals?: Goal[];
    awards?: Award[];
}

interface Component {
    id: number;
    type: string;
    payPeriod?: string;
    measurementPeriod?: string;
    metrics?: Metric[];
    awards?: Award[];
}

interface Kicker {
    kickerMetricId: string;
    coreMetricId: string;
}

interface EligibilityRule {
    market: string;
    segment: string;
    businessCode: string;
}

interface SpecialProject {
    methodology: string;
    excludeMaxPayout: boolean;
    projectPayAmount: number;
    gatekeeper: {
        metricId: string;
        operator: string;
        value: number;
    };
}

interface Plan {
    planCodeId: string;
    name: string;
    programId: string;
    planGroupId: string;
    roleGroupId: string;
    status: string;
    eligibility: EligibilityRule[];
    components: Component[];
    kickers?: Kicker[];
    specialProject?: SpecialProject;
}

interface FoundationalData {
    metrics: { [key: string]: { name: string; category: string } };
    programs: { [key: string]: { name: string } };
    planGroups: { [key: string]: { name: string; programId: string } };
    roleGroups: { [key: string]: { name: string; planGroupId: string } };
    components: { [key: string]: { name: string } };
    dataSources: { [key: string]: { name: string } };
}

// --- DUMMY DATA (based on dummy-data-instructions.txt) ---
const foundationalData: FoundationalData = {
    metrics: {
        "M0000001": { name: "Quality Score", category: "Quality" },
        "M0000002": { name: "VOC UES Score", category: "Satisfaction" },
        "M0000003": { name: "Team Call Volume", category: "Productivity" },
        "M0000092": { name: "Release Rate", category: "Efficiency" },
    },
    programs: { "PRG-001": { name: "All Savers" } },
    planGroups: {
        "PLG-001": { name: "Billing & Enrollment", programId: "PRG-001" },
        "PLG-002": { name: "PPO Outreach", programId: "PRG-001" },
    },
    roleGroups: {
        "ROL-001": { name: "Agent", planGroupId: "PLG-001" },
        "ROL-002": { name: "SME", planGroupId: "PLG-002" },
    },
    components: {
        "MMA": { name: "Multi-Metric Achievement" },
        "KIK": { name: "Kicker" },
        "SPA-PROJECT": { name: "Special Project Pay" },
    },
    dataSources: { "MM": { name: "MyMetrics" } },
};

const dummyPlans: Plan[] = [
    {
        planCodeId: "PLC-0000001",
        name: "Agent Core Performance Plan",
        programId: "PRG-001",
        planGroupId: "PLG-001",
        roleGroupId: "ROL-001",
        status: "Draft",
        eligibility: [{ market: "300", segment: "370", businessCode: "827" }],
        components: [
            {
                id: 1, type: "MMA", payPeriod: "QTR", measurementPeriod: "MTH",
                metrics: [
                    { metricId: "M0000001", source: "MM", goals: [{ tierId: "TIER 01", min: 98.00, max: 9999 }] },
                    { metricId: "M0000002", source: "MM", goals: [{ tierId: "TIER 01", min: 95.00, max: 9999 }] },
                ],
                awards: [{ tierId: "TIER 01", amount: 400.00 }]
            }
        ],
    },
    {
        planCodeId: "PLC-0000002",
        name: "SME Outreach Plan",
        programId: "PRG-001",
        planGroupId: "PLG-002",
        roleGroupId: "ROL-002",
        status: "Draft",
        eligibility: [],
        components: [
            {
                id: 1, type: "MMA", payPeriod: "QTR", measurementPeriod: "MTH",
                metrics: [{ metricId: "M0000001", source: "MM", goals: [{ tierId: "TIER 01", min: 99.00, max: 9999 }] }],
                awards: [{ tierId: "TIER 01", amount: 300.00 }]
            },
            {
                id: 2, type: "KIK", payPeriod: "QTR", measurementPeriod: "MTH",
                metrics: [{ 
                    metricId: "M0000003", 
                    source: "MM", 
                    goals: [{ tierId: "TIER 01", min: 350, max: 9999 }],
                    awards: [{ tierId: "TIER 01", amount: 100.00 }]
                }]
            }
        ],
        kickers: [{ kickerMetricId: "M0000003", coreMetricId: "M0000001" }]
    },
    {
        planCodeId: "PLC-0000003",
        name: "USP Team Project Plan",
        programId: "PRG-001",
        planGroupId: "PLG-001",
        roleGroupId: "ROL-001",
        status: "Pending Review",
        eligibility: [],
        components: [
            {
                id: 1, type: "MMA", payPeriod: "QTR", measurementPeriod: "MTH",
                metrics: [{ 
                    metricId: "M0000002", source: "MM", secondaryMetricId: "M0000092", secondarySource: "MM",
                    goals: [{ tierId: "TIER 01", min: 96.00, max: 9999 }],
                    secondaryGoals: [{ tierId: "TIER 01", min: 80.00, max: 9999 }]
                }],
                awards: [{ tierId: "TIER 01", amount: 400.00 }]
            },
            { id: 2, type: "SPA-PROJECT" }
        ],
        specialProject: {
            methodology: "SPA-PROJECT",
            excludeMaxPayout: false,
            projectPayAmount: 250.00,
            gatekeeper: { metricId: "M0000003", operator: "<", value: 200 }
        }
    }
];


// --- STYLES (condensed for brevity) ---
const styles: { [key: string]: React.CSSProperties } = {
    page: { display: 'flex', height: '100vh', fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#F8F9FA' },
    sidebar: { width: '260px', backgroundColor: '#002677', color: 'white', padding: '20px', flexShrink: 0 },
    mainContent: { flexGrow: 1, padding: '24px 32px', overflowY: 'auto' },
    sidebarTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' },
    sidebarNav: { listStyle: 'none', padding: 0 },
    sidebarNavItem: { display: 'flex', alignItems: 'center', padding: '12px 10px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', opacity: 0.8, transition: 'all 0.2s' },
    sidebarNavItemActive: { backgroundColor: 'rgba(255, 255, 255, 0.1)', opacity: 1, fontWeight: '600' },
    sidebarNavIcon: { marginRight: '16px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    headerTitle: { color: '#1A202C', fontSize: '28px', fontWeight: 'bold' },
    headerStatus: { display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600' },
    headerActions: { display: 'flex', gap: '12px' },
    button: { padding: '10px 20px', fontSize: '14px', fontWeight: '600', borderRadius: '8px', border: 'none', cursor: 'pointer' },
    buttonPrimary: { backgroundColor: '#002677', color: 'white' },
    buttonSecondary: { backgroundColor: 'white', color: '#4338CA', border: '1px solid #D1D5DB' },
    editorLayout: { display: 'flex', gap: '32px' },
    editorNav: { display: 'flex', flexDirection: 'column', gap: '8px', width: '220px', flexShrink: 0 },
    editorNavLink: { padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', color: '#6A7280', transition: 'all 0.2s' },
    editorNavLinkActive: { backgroundColor: 'white', color: '#0073E6', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '24px' },
    cardTitle: { fontSize: '20px', fontWeight: 'bold', color: '#1A202C', marginBottom: '8px' },
    cardSubtitle: { fontSize: '14px', color: '#6A7280', marginBottom: '24px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
    th: { borderBottom: '2px solid #E5E7EB', padding: '12px 16px', textAlign: 'left', color: '#6A7280', fontWeight: '600', textTransform: 'uppercase' },
    td: { borderBottom: '1px solid #E5E7EB', padding: '12px 16px', color: '#1A202C' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    formLabel: { fontWeight: '500', fontSize: '14px', color: '#374151' },
    formInput: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px' },
    dropdown: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: 'white', fontSize: '14px' },
};
const statusColors: { [key: string]: { bg: string; text: string } } = {
    Draft: { bg: '#E0E7FF', text: '#4338CA' },
    'Pending Review': { bg: '#FEF3C7', text: '#D97706' }
};

// --- UI COMPONENTS ---

const Sidebar = ({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) => (
    <aside style={styles.sidebar}>
        <div style={styles.sidebarTitle}>QVC Plan Mgmt</div>
        <nav>
            <ul style={styles.sidebarNav}>
                <li style={{ ...styles.sidebarNavItem, ...styles.sidebarNavItemActive }}>
                    <span style={styles.sidebarNavIcon}>{icons.planLibrary}</span> Plan Library
                </li>
                {/* Expandable list of plans for demo */}
                <div style={{ paddingLeft: '20px', borderLeft: '1px solid rgba(255,255,255,0.2)', margin: '10px 0' }}>
                    {dummyPlans.map(p => (
                        <div key={p.planCodeId} onClick={() => onSelectPlan(p.planCodeId)} style={{...styles.sidebarNavItem, fontSize: '14px', padding: '8px 10px'}}>
                            {p.name}
                        </div>
                    ))}
                </div>
                <li style={styles.sidebarNavItem}><span style={styles.sidebarNavIcon}>{icons.newPlan}</span> New Plan</li>
                <li style={styles.sidebarNavItem}><span style={styles.sidebarNavIcon}>{icons.settings}</span> Configuration</li>
            </ul>
        </nav>
    </aside>
);

const GeneralInfoSection = ({ plan }: { plan: Plan }) => (
    <div style={styles.card}>
        <h3 style={styles.cardTitle}>General Info & Eligibility</h3>
        <p style={styles.cardSubtitle}>Core identifying information for the plan.</p>
        <div style={styles.formGrid}>
            <div style={styles.formGroup}><label style={styles.formLabel}>Plan Name</label><input style={styles.formInput} type="text" value={plan.name} readOnly /></div>
            <div style={styles.formGroup}><label style={styles.formLabel}>Plan Code ID</label><input style={styles.formInput} type="text" value={plan.planCodeId} readOnly /></div>
            <div style={styles.formGroup}><label style={styles.formLabel}>Program</label><input style={styles.formInput} type="text" value={foundationalData.programs[plan.programId]?.name ?? 'N/A'} readOnly /></div>
            <div style={styles.formGroup}><label style={styles.formLabel}>Plan Group</label><input style={styles.formInput} type="text" value={foundationalData.planGroups[plan.planGroupId]?.name ?? 'N/A'} readOnly /></div>
        </div>
        <h4 style={{...styles.cardTitle, fontSize: '16px', marginTop: '32px'}}>Eligibility Rules</h4>
        <table style={styles.table}>
            <thead><tr><th style={styles.th}>Market</th><th style={styles.th}>Segment</th><th style={styles.th}>Business Code</th></tr></thead>
            <tbody>
                {plan.eligibility.length > 0 ? plan.eligibility.map((rule, i) => (
                    <tr key={i}>
                        <td style={styles.td}>{rule.market}</td>
                        <td style={styles.td}>{rule.segment}</td>
                        <td style={styles.td}>{rule.businessCode}</td>
                    </tr>
                )) : <tr><td colSpan={3} style={styles.td}>No eligibility rules defined.</td></tr>}
            </tbody>
        </table>
    </div>
);

const AwardsDefinitionSection = ({ plan }: { plan: Plan }) => {
    const componentAwards = plan.components.flatMap(c => c.awards?.filter(a => !a.isPerMetric).map(a => ({...a, componentType: c.type, componentId: c.id})) || []);
    const metricAwards = plan.components.flatMap(c => c.metrics?.flatMap(m => m.awards?.map(a => ({...a, metricId: m.metricId, componentType: c.type})) || []) || []);

    return (
        <>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Pay Per Component</h3>
                <p style={styles.cardSubtitle}>For MMA or other component-level achievements.</p>
                <table style={styles.table}>
                     <thead><tr><th style={styles.th}>Component</th><th style={styles.th}>Tier ID</th><th style={styles.th}>Award Amount</th></tr></thead>
                     <tbody>
                        {componentAwards.length > 0 ? componentAwards.map((award, i) => (
                            <tr key={i}>
                                <td style={styles.td}>{foundationalData.components[award.componentType].name}</td>
                                <td style={styles.td}>{award.tierId}</td>
                                <td style={styles.td}>${award.amount.toFixed(2)}</td>
                            </tr>
                        )) : <tr><td colSpan={3} style={styles.td}>No component awards defined.</td></tr>}
                     </tbody>
                </table>
            </div>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Pay Per Metric</h3>
                <p style={styles.cardSubtitle}>For PPM, Kickers, or other metric-specific payouts.</p>
                <table style={styles.table}>
                     <thead><tr><th style={styles.th}>Component</th><th style={styles.th}>Metric</th><th style={styles.th}>Tier ID</th><th style={styles.th}>Award Amount</th></tr></thead>
                     <tbody>
                        {metricAwards.length > 0 ? metricAwards.map((award, i) => (
                             <tr key={i}>
                                <td style={styles.td}>{award.componentType}</td>
                                <td style={styles.td}>{foundationalData.metrics[award.metricId].name}</td>
                                <td style={styles.td}>{award.tierId}</td>
                                <td style={styles.td}>${award.amount.toFixed(2)}</td>
                             </tr>
                        )) : <tr><td colSpan={4} style={styles.td}>No per-metric awards defined.</td></tr>}
                     </tbody>
                </table>
            </div>
        </>
    );
};

const KickersSection = ({ plan }: { plan: Plan }) => (
    <div style={styles.card}>
        <h3 style={styles.cardTitle}>Kickers & Dependencies</h3>
        <p style={styles.cardSubtitle}>Define core metrics that must be met before a Kicker is paid.</p>
        <table style={styles.table}>
            <thead><tr><th style={styles.th}>Kicker Metric</th><th style={styles.th}>Dependent on Core Metric</th></tr></thead>
            <tbody>
                {plan.kickers && plan.kickers.length > 0 ? plan.kickers.map((dep, i) => (
                    <tr key={i}>
                        <td style={styles.td}>{foundationalData.metrics[dep.kickerMetricId].name}</td>
                        <td style={styles.td}>{foundationalData.metrics[dep.coreMetricId].name}</td>
                    </tr>
                )) : <tr><td colSpan={2} style={styles.td}>No kicker dependencies defined.</td></tr>}
            </tbody>
        </table>
    </div>
);

const SpecialProjectsSection = ({ plan }: { plan: Plan }) => (
    !plan.specialProject ? (
        <div style={styles.card}><h3 style={styles.cardTitle}>Special Projects</h3><p style={styles.cardSubtitle}>No special project configured for this plan.</p></div>
    ) : (
        <div style={styles.card}>
            <h3 style={styles.cardTitle}>Special Project Configuration</h3>
            <p style={styles.cardSubtitle}>Configuration for special project payments and conditions.</p>
            <div style={styles.formGrid}>
                 <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Methodology</label>
                    <input style={styles.formInput} readOnly value={foundationalData.components[plan.specialProject.methodology].name} />
                </div>
                 <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Project Pay Amount</label>
                    <input style={styles.formInput} readOnly value={`$${plan.specialProject.projectPayAmount.toFixed(2)}`} />
                </div>
            </div>
            <h4 style={{...styles.cardTitle, fontSize: '16px', marginTop: '32px'}}>Gatekeeper Rule</h4>
             <p style={styles.cardSubtitle}>A metric condition that must be met for the project to apply.</p>
            {plan.specialProject.gatekeeper ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <input style={styles.formInput} readOnly value={foundationalData.metrics[plan.specialProject.gatekeeper.metricId].name} />
                    <input style={{...styles.formInput, width: '80px'}} readOnly value={plan.specialProject.gatekeeper.operator} />
                    <input style={styles.formInput} readOnly value={plan.specialProject.gatekeeper.value} />
                </div>
            ) : <p>No gatekeeper rule defined.</p>}
        </div>
    )
);

// --- MAIN PAGE COMPONENT ---
const PlanManagementPage = () => {
    const [activePlanId, setActivePlanId] = useState(dummyPlans[0].planCodeId);
    const [activeSection, setActiveSection] = useState('general');

    const activePlan = useMemo(() => dummyPlans.find(p => p.planCodeId === activePlanId), [activePlanId]);

    const sections = [
        { id: 'general', label: 'General Info & Eligibility' },
        { id: 'components', label: 'Components Setup' },
        { id: 'metrics', label: 'Metrics Assignment' },
        { id: 'goals', label: 'Goal Tiers' },
        { id: 'awards', label: 'Awards Definition' },
        { id: 'kickers', label: 'Kickers & Dependencies' },
        { id: 'special', label: 'Special Projects' },
    ];
    
    const renderActiveSection = () => {
        if (!activePlan) return <div style={styles.card}><p>Please select a plan.</p></div>;

        switch(activeSection) {
            case 'general': return <GeneralInfoSection plan={activePlan} />;
            case 'awards': return <AwardsDefinitionSection plan={activePlan} />;
            case 'kickers': return <KickersSection plan={activePlan} />;
            case 'special': return <SpecialProjectsSection plan={activePlan} />;
            default:
                const activeLabel = sections.find(s => s.id === activeSection)?.label || 'Section';
                return <div style={styles.card}><h3 style={styles.cardTitle}>{activeLabel}</h3><p style={styles.cardSubtitle}>Configuration for this section will appear here. Component not built yet.</p></div>;
        }
    };

    if (!activePlan) return <div>Loading...</div>; // Or some other loading state

    const statusStyle = statusColors[activePlan.status] || {bg: '#D1D5DB', text: '#1F2937'};

    return (
        <div style={styles.page}>
            <Sidebar onSelectPlan={setActivePlanId} />
            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.headerTitle}>{activePlan.name}</h1>
                        <span style={{...styles.headerStatus, backgroundColor: statusStyle.bg, color: statusStyle.text}}>{activePlan.status}</span>
                    </div>
                    <div style={styles.headerActions}>
                        <button style={{...styles.button, ...styles.buttonSecondary}}>Save Draft</button>
                        <button style={{...styles.button, ...styles.buttonPrimary}}>Submit for Approval</button>
                    </div>
                </header>

                <div style={styles.editorLayout}>
                    <nav style={styles.editorNav}>
                        {sections.map(section => (
                            <a key={section.id} onClick={() => setActiveSection(section.id)}
                               style={section.id === activeSection ? {...styles.editorNavLink, ...styles.editorNavLinkActive} : styles.editorNavLink}>
                                {section.label}
                            </a>
                        ))}
                    </nav>
                    <div style={{flexGrow: 1}}>
                        {renderActiveSection()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlanManagementPage;
