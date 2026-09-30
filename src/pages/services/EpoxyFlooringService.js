import React, { useContext, useState, useEffect, useMemo } from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

/* ------------------------------------------------------------------
   {config.companyName} — Industrial Epoxy Flooring (Pakistan)
   Enhanced service page: full content system, responsive gallery,
   FAQ accordion, technical data + JSON-LD structured data.
   Local artwork lives in  public/images/services/  (see README notes).
------------------------------------------------------------------- */

const UPLOADS = 'https://knoveo.co/wp-content/uploads';

const IMG = {
    // --- New local artwork (drop into /public/images/services/) ---
    warehouseApp: '/images/services/warehouse-application.jpg',
    warehouseLarge: '/images/services/warehouse-large.jpg',
    warehouseSteel: '/images/services/warehouse-steel.jpg',
    showroomResin: '/images/services/showroom-resin.jpg',
    concretePrep: '/images/services/concrete-prep.png',
    rollerCloseup: '/images/services/roller-closeup.jpg',
    workerRoller: '/images/services/worker-roller.jpg',
    yellowCoat: '/images/services/yellow-coat.jpg',
    grayMatte: '/images/services/gray-matte.jpg',
    carShowroom: '/images/services/car-showroom.webp',
    metallic1: '/images/services/metallic-1.webp',
    metallic2: '/images/services/metallic-2.webp',
    foodMeat: '/images/services/food-meat.jpg',
    foodSoybean: '/images/services/food-soybean.jpg',
    pharma: '/images/services/pharma-cleanroom.jpg',
    garage1: '/images/services/garage-flake-1.jpg',
    garage2: '/images/services/garage-flake-2.jpg',
    garage3: '/images/services/garage-flake-3.jpg',
    // --- Existing media library (unchanged) ---
    legacy1: `${UPLOADS}/2024/09/0c22e0_b6d2d4414c574d02a104b5ebad950183mv2.webp`,
    legacy2: `${UPLOADS}/2024/09/0c22e0_75c7baad418a4f16a992e4d16fb8d862mv2.webp`,
    legacy3: `${UPLOADS}/2024/08/ef9.webp`,
    legacy4: `${UPLOADS}/2024/08/ef10.webp`,
    legacy5: `${UPLOADS}/2024/08/ef12.webp`,
    legacy6: `${UPLOADS}/2024/08/ef11.webp`,
    legacy7: `${UPLOADS}/2024/08/Food.webp`,
    legacy8: `${UPLOADS}/2024/08/ef8.webp`,
};

/* ---------------------------------- icons --------------------------------- */
const Icon = ({ name, className = '' }) => {
    const paths = {
        shield: 'M12 2l8 4v6c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V6l8-4zm-1 12.4l5.3-5.3-1.4-1.4L11 12l-2.3-2.3-1.4 1.4L11 14.4z',
        drop: 'M12 2.5S5.5 9.2 5.5 14a6.5 6.5 0 0013 0C18.5 9.2 12 2.5 12 2.5zm0 16.2a4.7 4.7 0 01-4.7-4.7c0-1.2.5-2.7 1.4-4.2h6.6c.9 1.5 1.4 3 1.4 4.2A4.7 4.7 0 0112 18.7z',
        flame: 'M12 2c1.6 3 .6 4.8-.7 6.4-1.2 1.5-2.6 3-2.6 5.4a4.3 4.3 0 008.6 0c0-1.6-.6-2.9-1.5-4.1.2 1.4-.3 2.4-1.2 2.9.6-2.2.1-4.6-1.4-6.6C13.9 4.4 13.4 3.2 12 2zm-3.6 13.4a3.6 3.6 0 007.2 0c0-1.4-.7-2.6-1.7-3.9.5 1.6.1 3-1.3 3.8.1-2.1-.5-3.8-1.7-5.4-1.5 1.9-2.5 3.6-2.5 5.5z',
        clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-5v-2h3V6h2v7z',
        leaf: 'M20 4C10 4 4 9 4 17c0 .6.1 1.1.2 1.6C6 14 10 11 15 10.5c-4 1.5-7.6 4.4-9.4 8.5h2.2c1.7-2.6 4.2-4.4 7.2-5-2.4 1.3-4.2 3.3-5.2 5.7h9.5c1.7 0 2.5-1.2 2.5-3V4z',
        sparkle: 'M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2zm6.5 10l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4zM6 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z',
        factory: 'M2 20V9l5 3V9l5 3V9l5 3V6h4v14H2zm3-8v5h3v-5H5zm5 0v5h3v-5h-3zm5 0v5h3v-5h-3zM4 4h5v3H4V4z',
        truck: 'M3 6h11v9H3V6zm12 2h3.5L21 11.5V15h-2a2.5 2.5 0 00-5 0h-1V8zM7 17a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
        tools: 'M21.7 18.3l-4.2-4.2 1.4-1.4 4.2 4.2-1.4 1.4zM3 21l7.5-7.5-2.1-2.1L3 16.9V21zM9.5 3a5.5 5.5 0 015.4 6.4l-2.1-2.1-2.8 2.8-2.8-2.8 2.1-2.1A5.5 5.5 0 009.5 3z',
        check: 'M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 18.6 6.8 9 16.2z',
        layers: 'M12 2L2 7.5 12 13l10-5.5L12 2zM2 12.5L12 18l10-5.5-2-1.1L12 15.4 4 11.4l-2 1.1zM2 17.5L12 23l10-5.5-2-1.1L12 20.4 4 16.4l-2 1.1z',
        lab: 'M9 2v6.5L3.5 18A3 3 0 006.2 22h11.6a3 3 0 002.7-4L15 8.5V2H9zm2 2h2v4.6l.3.6 4.9 8.4H6.8l4.9-8.4.3-.6V4z',
        users: 'M8 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-2.7 2.7-4.5 6-4.5s6 1.8 6 4.5v1H2v-1zm14.5-3.7c2.2.5 4.5 2 4.5 4.2V21h-5v-1c0-1.6-.6-3-1.5-4.1.6-.2 1.3-.4 2-.5z',
        home: 'M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z',
        warehouse: 'M2 21V9l10-6 10 6v12h-4v-7H6v7H2zm6-9h8v2H8v-2z',
        plus: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z',
        minus: 'M5 11h14v2H5z',
        star: 'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z',
    };
    return (
        <svg className={`svc-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d={paths[name] || paths.check} />
        </svg>
    );
};

/* --------------------------------- content -------------------------------- */

const HERO_STATS = [
    { num: '15+', label: 'Years of Flooring Experience' },
    { num: '2,400+', label: 'm² of Epoxy Installed Monthly' },
    { num: '100%', label: 'Seamless & Joint-Free Finish' },
    { num: '20 yr', label: 'Design Service Life' },
];

const SYSTEMS = [
    {
        icon: 'layers',
        title: 'Self-Leveling Epoxy',
        tag: 'Most Popular',
        text: 'A premium high-build, self-smoothing system poured at 1.5–3 mm and rolled to release trapped air. It levels itself into a perfectly flat, mirror-smooth, seamless surface — the first choice for showrooms, pharmaceutical suites, food plants and commercial interiors where appearance and hygiene both matter.',
        specs: ['1.5 – 3 mm DFT', 'Gloss / satin / matte', '7-day full cure'],
    },
    {
        icon: 'shield',
        title: 'Heavy-Duty Epoxy Screed',
        tag: 'Industrial',
        text: 'Epoxy mortar blended with selected aggregates and troweled to 3–6 mm. Built to survive forklift traffic, steel-wheeled trolleys, dropped tooling and point impact. The standard specification for production halls, engineering workshops and logistics bays in Lahore, Faisalabad and Karachi.',
        specs: ['3 – 6 mm DFT', 'High impact resistance', 'Anti-skid option'],
    },
    {
        icon: 'sparkle',
        title: 'Metallic Epoxy',
        tag: 'Decorative',
        text: 'Pigmented metallic epoxies swirled with solvent to create three-dimensional depth — marble, cloud, pearlescent or wave effects. Every floor is a one-off. Ideal for automotive showrooms, hotel lobbies, retail flagship stores and premium residential interiors.',
        specs: ['2 – 3 mm DFT', 'Marble / cloud / wave', 'Fully bespoke'],
    },
    {
        icon: 'drop',
        title: 'Quartz Sand / Flake Epoxy',
        tag: 'Heavy Traffic',
        text: 'Broadcast vinyl flakes or graded quartz sand into a wet epoxy base, then sealed with a clear or pigmented topcoat. Extremely tough, hides substrate imperfections, and provides a slip-resistant texture rated for wet and oily working environments.',
        specs: ['2 – 4 mm DFT', 'R10 – R12 slip rating', 'Hides imperfections'],
    },
    {
        icon: 'flame',
        title: 'Chemical-Resistant Novolac',
        tag: 'Aggressive Media',
        text: 'A novolac-modified epoxy with dramatically higher cross-link density than standard systems. Recommended wherever floors face concentrated acids, alkalis, solvents, battery acid, fertiliser, dye stuffs or petrochemical splash — for example battery rooms, galvanising plants and fertiliser warehouses.',
        specs: ['Up to 96% H₂SO₄', 'Solvent resistant', '2 – 3 mm DFT'],
    },
    {
        icon: 'lab',
        title: 'ESD / Conductive Epoxy',
        tag: 'Electronics',
        text: 'A carbon- or copper-loaded system that safely dissipates static to earth, protecting sensitive electronics, cleanrooms and munitions handling areas. Supplied and tested to EN 1081 / ASTM F150 resistance requirements with full as-built test records.',
        specs: ['10⁴ – 10⁹ Ω', 'EN 1081 tested', 'Cleanroom grade'],
    },
    {
        icon: 'home',
        title: 'Residential & Garage Epoxy',
        tag: 'Domestic',
        text: 'A lighter-build, decorative system for home garages, basements, gyms, rooftops and terraces. Available in solid colour, flake or metallic finishes with a UV-stable polyurethane topcoat so the colour stays true in Pakistani sunlight.',
        specs: ['1 – 2 mm DFT', 'UV-stable topcoat', 'Flake or solid'],
    },
];

const INDUSTRIES = [
    { icon: 'factory', title: 'Manufacturing & Engineering', text: 'Assembly lines, machine shops, textile mills and tool rooms where impact, oil and heavy trolleys are constant.' },
    { icon: 'warehouse', title: 'Warehousing & Logistics', text: 'Racking aisles, loading docks and pick faces that take relentless forklift and pallet-truck abrasion.' },
    { icon: 'truck', title: 'Automotive & Workshops', text: 'Showrooms, service bays, bus depots and paint shops needing a bright, clean, chemical-proof surface.' },
    { icon: 'check', title: 'Food & Beverage Plants', text: 'Hygienic, non-porous, wash-down floors that resist lactic acid, sugars, fats and daily steam cleaning.' },
    { icon: 'lab', title: 'Pharmaceutical & Labs', text: 'Seamless, dust-free, GMP-compliant floors with coved skirting and no crevices to harbour microbes.' },
    { icon: 'drop', title: 'Chemical & Fertiliser', text: 'Acid and alkali bunded areas, battery rooms, blending halls and bulk storage aprons.' },
    { icon: 'users', title: 'Retail & Commercial', text: 'Malls, banks, hospitals, schools and restaurants where a seamless, high-gloss look is the priority.' },
    { icon: 'home', title: 'Residential & Hospitality', text: 'Villa garages, rooftops, gyms, cafés and hotel back-of-house areas that need style and resilience.' },
];

const BENEFITS = [
    { icon: 'shield', title: 'Exceptional Durability', text: 'Chemically cured epoxy bonds to concrete at up to 2.5 MPa — stronger than the concrete itself. The result is a hard, monolithic surface that shrugs off impacts, abrasion and rolling loads that would destroy paint or tile.' },
    { icon: 'flame', title: 'Chemical & Stain Resistance', text: 'A seamless, non-porous film blocks oils, fuels, solvents, dilute acids and alkalis. Spills sit on the surface instead of soaking in, so they wipe away without staining or etching.' },
    { icon: 'drop', title: 'Waterproof & Hygienic', text: 'With no joints, grout lines or seams, there is nowhere for water, bacteria or mould to accumulate. This makes epoxy the default choice for food processing, dairies, hospitals and pharmaceutical facilities.' },
    { icon: 'clock', title: 'Low Lifetime Cost', text: 'Epoxy floors routinely deliver 15–20 years of service with only routine cleaning. That removes the recurring cost of re-tiling, re-grouting or re-sealing associated with conventional flooring.' },
    { icon: 'sparkle', title: 'Seamless & Joint-Free', text: 'Because the resin is poured and worked wet-on-wet, there are no joints at all. No cracked grout, no lifted tile edges, no trip hazards and no dirt traps — just one continuous surface.' },
    { icon: 'tools', title: 'Fast Installation', text: 'Most systems are walked on within 12–24 hours and returned to light service in 48–72 hours, so production downtime is measured in a weekend rather than weeks.' },
    { icon: 'leaf', title: 'Low-VOC & Sustainable', text: 'Modern 100%-solids and waterborne systems emit negligible VOCs, contain no solvents to evaporate, and their long service life dramatically reduces material consumption and landfill waste.' },
    { icon: 'star', title: 'Light Reflective Finish', text: 'A high-gloss epoxy film bounces light back into the room, brightening deep warehouse bays and cutting lighting loads — a measurable energy saving in large facilities.' },
    { icon: 'check', title: 'Slip & Skid Resistant', text: 'Aggregate, flake and matte-textured finishes can be engineered to R9 through R12 slip ratings, keeping staff safe in wet, oily or high-traffic zones.' },
];

const SPECS = [
    ['Base chemistry', 'Solvent-free / solvent-based epoxy, epoxy novolac, polyurethane topcoat'],
    ['Total dry film thickness', '1 mm (light duty) · 2 mm (standard) · 3–6 mm (heavy duty)' ],
    ['Compressive strength', '≥ 55 N/mm² (heavy-duty mortar systems)'],
    ['Flexural strength', '≥ 30 N/mm²'],
    ['Bond strength to concrete', '≥ 1.5 N/mm² (cohesive concrete failure)'],
    ['Abrasion resistance (Taber)', '≤ 60 mg loss, CS-10 wheel, 1 kg load'],
    ['Coefficient of friction', '0.6 – 0.8 dry (configurable to R9 – R12 anti-skid)'],
    ['Chemical resistance', 'Dilute acids & alkalis, oils, fuels, solvents, salt solutions'],
    ['Service temperature', '-20 °C to +80 °C continuous; brief excursions to +120 °C'],
    ['Impact resistance', 'Withstands dropped tooling and steel-wheeled trolleys (screed systems)'],
    ['Foot traffic', '12 – 24 hours after final coat'],
    ['Light vehicle / forklift traffic', '48 – 72 hours'],
    ['Full chemical cure', '7 days'],
    ['Expected service life', '15 – 20 years with routine maintenance'],
    ['Colour range', 'Unlimited RAL / NCS palette, including metallic and flake finishes'],
    ['Applicable substrates', 'Power-floated, sand-cement screed, and sound existing epoxy or tile'],
];

const COMPARISON = [
    ['Service life', '15 – 20 years', '3 – 5 years', '10 – 15 years (grout fails sooner)'],
    ['Seamless / joint-free', 'Yes — fully monolithic', 'No — saw-cut or shrink joints', 'No — grout lines throughout'],
    ['Chemical resistance', 'Excellent', 'Poor to moderate', 'Good (tile) / poor (grout)'],
    ['Impact resistance', 'Excellent (screed systems)', 'Fair — dusts and spalls', 'Fair — tiles can crack'],
    ['Water permeability', 'Impervious', 'Porous', 'Permeable at grout joints'],
    ['Hygiene / cleanability', 'Excellent', 'Dusts, hard to clean', 'Good, but grout harbours bacteria'],
    ['Installation speed', '2 – 5 days', '1 day (but short-lived)', '2 – 4 weeks'],
    ['Maintenance', 'Sweep & damp mop only', 'Re-seal periodically', 'Re-grout, replace cracked tiles'],
    ['20-year cost of ownership', 'Lowest', 'Highest', 'High'],
];

const PROCESS = [
    { title: 'Site Survey & Substrate Assessment', text: 'Our engineer visits your facility, measures the area, tests concrete compressive strength and moisture (RH / calcium carbide), maps cracks, checks falls and drainage, and confirms the correct system for the traffic and chemicals present.' },
    { title: 'Surface Preparation', text: 'This is the single most important step. We shot-blast or diamond-grind the slab to an open-texture CSP 3–4 profile, remove laitance, oil, grease, curing compounds and old coatings, then vacuum all dust. Cracks are chased and filled with epoxy mortar; spalls are repaired.' },
    { title: 'Priming', text: 'A solvent-free epoxy primer is roller- or squeegee-applied and back-rolled to work it into the open concrete pores. Where substrate moisture is high, a moisture-tolerant or vapour-barrier primer is used to prevent blistering and delamination.' },
    { title: 'Body Coat / Mortar Bed', text: 'The main epoxy or epoxy-screed layer is poured in ribbons, spread to gauge with a trowel or screed rake, and consolidated with a spiked roller to release entrained air and level the film to the specified thickness.' },
    { title: 'Topcoat & Finish', text: 'A colour-stable epoxy or aliphatic polyurethane topcoat is applied, with optional aggregate broadcast, flake, metallic effect, anti-skid texture, or full-chip coverage. Coving and skirting are formed to the specified radius.' },
    { title: 'Curing, QC & Handover', text: 'We verify wet film thickness against the specification, check gloss, adhesion and slip rating, and issue a written method statement, batch records, COC datasheets and a maintenance schedule before the floor is handed back to you.' },
];

const GALLERY = [
    { src: IMG.warehouseSteel, cat: 'Industrial', title: 'Logistics Warehouse — Grey Epoxy Screed', meta: '8,000 m² · Lahore' },
    { src: IMG.warehouseLarge, cat: 'Industrial', title: 'Distribution Centre — Seamless Resin Floor', meta: '3,400 m² · Karachi' },
    { src: IMG.warehouseApp, cat: 'Installation', title: 'Application of High-Build Epoxy', meta: 'Wet-on-wet pour & roll' },
    { src: IMG.workerRoller, cat: 'Installation', title: 'Roller Application in Industrial Hall', meta: 'Back-rolling to de-aerate' },
    { src: IMG.concretePrep, cat: 'Installation', title: 'Diamond Grinding & Surface Preparation', meta: 'CSP 3–4 profile' },
    { src: IMG.rollerCloseup, cat: 'Installation', title: 'Spiked Roller Consolidation', meta: 'Releases trapped air' },
    { src: IMG.yellowCoat, cat: 'Installation', title: 'Safety-Yellow Zone Marking Coat', meta: 'Traffic & hazard lanes' },
    { src: IMG.showroomResin, cat: 'Commercial', title: 'Retail Showroom — Gloss Resin Finish', meta: 'Decorative topcoat' },
    { src: IMG.carShowroom, cat: 'Commercial', title: 'Automotive Showroom — High-Gloss Epoxy', meta: 'Light-reflective finish' },
    { src: IMG.grayMatte, cat: 'Commercial', title: 'Commercial Interior — Matte Epoxy', meta: 'Low-sheen, hard-wearing' },
    { src: IMG.metallic1, cat: 'Decorative', title: 'Metallic Epoxy — Marble Effect', meta: 'Bespoke swirl pattern' },
    { src: IMG.metallic2, cat: 'Decorative', title: 'Metallic Epoxy — Pearlescent Wave', meta: 'Three-dimensional depth' },
    { src: IMG.pharma, cat: 'Food & Pharma', title: 'Pharmaceutical Cleanroom — GMP Floor', meta: 'Coved, dust-free' },
    { src: IMG.foodMeat, cat: 'Food & Pharma', title: 'Meat Processing Plant', meta: 'Wash-down resistant' },
    { src: IMG.foodSoybean, cat: 'Food & Pharma', title: 'Food Processing Hall', meta: 'Hygienic seamless film' },
    { src: IMG.garage1, cat: 'Residential', title: 'Residential Garage — Flake System', meta: 'Full-chip broadcast' },
    { src: IMG.garage2, cat: 'Residential', title: 'Home Garage — Textured Flake', meta: 'UV-stable topcoat' },
    { src: IMG.garage3, cat: 'Residential', title: 'Private Garage — Decorative Flake', meta: 'Oil & tyre-mark proof' },
    // --- Legacy media library ---
    { src: IMG.legacy1, cat: 'Industrial', title: 'Industrial Epoxy Flooring', meta: '{config.companyName}' },
    { src: IMG.legacy2, cat: 'Industrial', title: 'Heavy-Duty Floor Coating', meta: '{config.companyName}' },
    { src: IMG.legacy3, cat: 'Commercial', title: 'Seamless Epoxy Floor', meta: '{config.companyName}' },
    { src: IMG.legacy4, cat: 'Commercial', title: 'Self-Leveling Epoxy', meta: '{config.companyName}' },
    { src: IMG.legacy5, cat: 'Decorative', title: 'Decorative Epoxy Finish', meta: '{config.companyName}' },
    { src: IMG.legacy6, cat: 'Decorative', title: 'Colour-Stable Topcoat', meta: '{config.companyName}' },
    { src: IMG.legacy7, cat: 'Food & Pharma', title: 'Food-Grade Epoxy Flooring', meta: '{config.companyName}' },
    { src: IMG.legacy8, cat: 'Industrial', title: 'Workshop Epoxy Floor', meta: '{config.companyName}' },
];

const GALLERY_FILTERS = ['All', 'Industrial', 'Installation', 'Commercial', 'Decorative', 'Food & Pharma', 'Residential'];

const MAINTENANCE = [
    'Sweep or dust-mop daily to remove abrasive grit that acts like sandpaper underfoot.',
    'Damp mop weekly with a neutral-pH detergent (pH 6–8). Avoid acidic or solvent-based cleaners, which dull the topcoat.',
    'Wipe up chemical spills promptly. Although epoxy resists most media, prolonged contact with concentrated acids can etch the surface.',
    'Fit soft felt or polyurethane pads under furniture, benches and machine feet to prevent scratching and point loading.',
    'Lift — never drag — heavy equipment. Use rated floor protection when moving steel racking or plant.',
    'Re-apply a clear maintenance topcoat every 7–10 years in high-traffic areas to restore gloss and film thickness.',
];

const FAQS = [
    {
        q: 'How long does industrial epoxy flooring last in Pakistan?',
        a: 'A correctly specified and installed epoxy floor typically delivers 15 to 20 years of service in Pakistani industrial conditions. The variables that matter most are substrate quality, surface preparation, dry film thickness and traffic intensity. Our heavy-duty screed systems carry a design service life of 20 years, and we issue a written warranty against delamination, blistering and premature wear.',
    },
    {
        q: 'How much does epoxy flooring cost per square foot?',
        a: 'Pricing depends on system thickness, surface preparation required, access, and the area involved. As a rule of thumb: light-duty decorative coatings sit at the entry level, standard 2 mm self-leveling systems in the middle, and 4–6 mm heavy-duty epoxy screeds at the premium end. Because preparation is the largest cost driver, we always quote after a free site survey rather than giving a speculative per-square-foot figure.',
    },
    {
        q: 'Can epoxy be applied over an existing or old floor?',
        a: 'Yes, provided the existing coating is sound, well bonded and free of contamination. We test adhesion in a small trial area first. Loose, poorly bonded or unknown coatings are mechanically removed back to bare concrete, because any new system is only as good as the surface beneath it.',
    },
    {
        q: 'How long before we can walk and drive on a new epoxy floor?',
        a: 'Foot traffic is normally permitted after 12 to 24 hours, light vehicle and forklift traffic after 48 to 72 hours, and full chemical cure is reached at 7 days. We schedule installations over weekends or planned shutdowns so that your operations are interrupted for the shortest possible window.',
    },
    {
        q: 'Is epoxy flooring slippery when wet?',
        a: 'A high-gloss finish can be slippery when wet, which is why we specify anti-skid variants wherever water, oil or wash-down is present. By broadcasting fine aggregate or using a matte textured topcoat we can achieve slip ratings from R9 up to R12, and we test the finished floor before handover.',
    },
    {
        q: 'Will epoxy flooring crack?',
        a: 'Epoxy itself does not crack, but it will follow the substrate if the concrete moves. That is why we chase and fill all cracks with epoxy mortar before coating, install movement joints where the slab has them, and — where significant structural movement is expected — specify a flexible polyurethane system instead.',
    },
    {
        q: 'Is epoxy suitable for outdoor use in our climate?',
        a: 'Standard epoxies chalk and yellow under prolonged UV exposure, so for outdoor rooftops, terraces and aprons we specify an aliphatic polyurethane topcoat or a UV-stable polyaspartic system. These retain colour and gloss through Pakistan\u2019s intense summer sun and monsoon cycles.',
    },
    {
        q: 'How do I clean and maintain an epoxy floor?',
        a: 'Routine care is simple: daily sweeping to remove grit, weekly damp mopping with a neutral detergent, and prompt clean-up of spills. Avoid acidic cleaners, citrus products and solvent-based degreasers, which attack the binder film over time. Our handover pack includes a full maintenance schedule.',
    },
    {
        q: 'Is epoxy flooring hygienic enough for food and pharmaceutical plants?',
        a: 'Yes — it is the industry standard. Because the cured film is non-porous and completely seamless with no grout lines, it cannot harbour bacteria, mould or moisture. We form coved skirting at a 50–100 mm radius, use food-safe systems with the relevant compliance documentation, and can deliver GMP-compliant finishes for pharmaceutical suites.',
    },
    {
        q: 'Which areas of Pakistan do you serve?',
        a: 'We install nationwide from our base in Lahore, with completed projects across Punjab (Faisalabad, Sialkot, Gujranwala, Multan, Rawalpindi, Sheikhupura), Sindh (Karachi, Hyderabad), Khyber Pakhtunkhwa (Peshawar, Nowshera) and Islamabad Capital Territory. Our site teams travel with all preparation and application equipment, so quality is not dependent on local subcontractors.',
    },
];

const AREAS = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan',
    'Sialkot', 'Gujranwala', 'Peshawar', 'Quetta', 'Hyderabad', 'Sheikhupura',
    'Sargodha', 'Bahawalpur', 'Sukkur', 'Abbottabad',
];

/* ------------------------------- component -------------------------------- */

const EpoxyFlooringService = () => {
    const { config } = useContext(ConfigContext);
    const [openFaq, setOpenFaq] = useState(0);
    const [filter, setFilter] = useState('All');

    const visibleGallery = useMemo(
        () => (filter === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === filter)),
        [filter]
    );

    /* SEO: FAQ + Service structured data */
    useEffect(() => {
        const data = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Service',
                    name: 'Industrial Epoxy Flooring Pakistan',
                    serviceType: 'Epoxy & Resin Flooring Installation',
                    provider: { '@type': 'Organization', name: '{config.companyName}' },
                    areaServed: { '@type': 'Country', name: 'Pakistan' },
                    description:
                        '{config.companyName} designs and installs industrial, commercial and decorative epoxy flooring systems across Pakistan — self-leveling, heavy-duty screed, metallic, quartz, chemical-resistant and ESD systems.',
                },
                {
                    '@type': 'FAQPage',
                    mainEntity: FAQS.map((f) => ({
                        '@type': 'Question',
                        name: f.q,
                        acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                },
            ],
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-epoxy-ld', 'true');
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
        return () => {
            document.head.querySelectorAll('script[data-epoxy-ld]').forEach((n) => n.remove());
        };
    }, []);

    return (
        <div className="svc-page">

            {/* ============================== HERO ============================== */}
            <header className="svc-hero">
                <div className="svc-container">
                    <div className="hero-grid">
                        <div className="hero-copy">
                            <p className="hero-eyebrow">
                                <Icon name="star" /> Pakistan&rsquo;s Industrial Flooring Specialists
                            </p>
                            <h1>
                                Industrial Epoxy Flooring Pakistan |{' '}
                                <span className="hero-accent">{config.companyName}</span>
                            </h1>
                            <p className="hero-sub">
                                Non-porous, seamless and chemical-cured epoxy floors engineered for the
                                harshest industrial, commercial and hygienic environments — installed
                                nationwide with a 20-year design service life.
                            </p>
                            <div className="hero-actions">
                                <a href="#svc-contact" className="btn btn-primary">
                                    Get a Free Site Survey
                                </a>
                                <a href="#svc-systems" className="btn btn-ghost">
                                    Explore Flooring Systems
                                </a>
                            </div>
                            <ul className="hero-badges">
                                <li><Icon name="check" /> Solvent-free systems</li>
                                <li><Icon name="check" /> R9–R12 anti-skid options</li>
                                <li><Icon name="check" /> Nationwide installation</li>
                                <li><Icon name="check" /> Written warranty</li>
                            </ul>
                        </div>

                        <div className="hero-media">
                            <img
                                src={IMG.warehouseSteel}
                                alt="Large industrial warehouse with a seamless grey epoxy floor installed by {config.companyName}"
                                loading="eager"
                            />
                            <div className="hero-media-tag">
                                <strong>8,000 m²</strong>
                                <span>Logistics warehouse — Lahore</span>
                            </div>
                        </div>
                    </div>

                    <dl className="hero-stats">
                        {HERO_STATS.map((s) => (
                            <div className="hero-stat" key={s.label}>
                                <dt className="hero-stat-num">{s.num}</dt>
                                <dd className="hero-stat-label">{s.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </header>

            <div className="svc-body">
                <div className="svc-container">

                    {/* ============================ BREADCRUMB ========================= */}
                    <nav className="svc-breadcrumb" aria-label="Breadcrumb">
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href="/services">Services</a></li>
                            <li aria-current="page">
                                Industrial Epoxy Flooring Pakistan | {config.companyName}
                            </li>
                        </ol>
                    </nav>

                    {/* ============================== INTRO ============================ */}
                    <section className="svc-intro" id="svc-intro">
                        <p className="svc-lead">
                            {config.companyName} delivers world-class epoxy flooring systems that
                            are completely <strong>non-porous</strong>, exceptionally{' '}
                            <strong>durable</strong> and highly resistant to{' '}
                            <strong>impacts, chemicals and heavy traffic</strong>. Our flooring solutions
                            ensure a long-lasting, fully functional finish that maintains its integrity
                            over extended periods — even in the most demanding production environments
                            in Pakistan.
                        </p>
                        <p>
                            The {config.companyName} Epoxy Flooring System is a high-performance
                            liquid resin applied directly onto concrete surfaces, providing superior
                            protection. During installation, the epoxy seamlessly fills cracks and chips
                            in the concrete. Once chemically cured, it forms a robust, permanent bond,
                            creating a hard-wearing, joint-free and impervious barrier that protects the
                            underlying substrate from wear and damage.
                        </p>
                        <p>
                            Our <strong>Self-Leveling Epoxy Flooring</strong> is a premium high-build
                            system with self-smoothing properties, resulting in a perfectly smooth,
                            seamless and even surface ideal for both industrial and commercial
                            environments.
                        </p>
                        <p>
                            Epoxy flooring is highly abrasion and chemical-resistant, making it ideal for
                            heavy-duty applications. It withstands daily wear and tear from foot traffic,
                            vehicles and machinery. The added slip and skid resistance ensures safety in
                            various environments.
                        </p>

                        <aside className="callout">
                            <h4 className="callout-title">
                                <Icon name="tools" /> Why surface preparation decides everything
                            </h4>
                            <p>
                                Over 80% of epoxy floor failures trace back to inadequate surface
                                preparation rather than the material itself. Every Multilines installation
                                begins with mechanical preparation — shot-blasting or diamond grinding to
                                an open CSP 3–4 profile, oil and laitance removal, and crack repair — so
                                the resin bonds to sound concrete at <strong>1.5 N/mm² or better</strong>,
                                typically failing cohesively within the slab rather than at the interface.
                            </p>
                        </aside>
                    </section>

                    {/* ========================== WHAT IS EPOXY ======================= */}
                    <section className="svc-section-block split" id="svc-what">
                        <div className="split-body">
                            <p className="section-kicker">The Technology</p>
                            <h2 className="section-title">What Is Industrial Epoxy Flooring?</h2>
                            <p>
                                Epoxy flooring is a multi-layer resin system created by reacting an epoxy
                                resin with a polyamine hardener. That reaction — called{' '}
                                <em>curing</em> — is chemical rather than evaporative: the two components
                                cross-link into a rigid, thermoset plastic that becomes an integral part of
                                the concrete slab it sits on.
                            </p>
                            <p>
                                Because nothing has to evaporate for the film to harden, a fully-cured epoxy
                                floor releases virtually no volatile organic compounds into your workplace,
                                and it retains its full film thickness and mechanical strength permanently.
                                Solvent-based paints and lacquers, by contrast, lose volume as they dry and
                                remain comparatively soft and permeable.
                            </p>
                            <p>
                                A typical Multilines system is built in three functional layers: a{' '}
                                <strong>primer</strong> that penetrates and seals the concrete, a{' '}
                                <strong>body coat</strong> that provides thickness, strength and the bulk of
                                the wear resistance, and a <strong>topcoat</strong> that delivers colour,
                                gloss, chemical resistance and slip performance. Each layer is specified to
                                match the loads, chemicals and hygiene regime of your facility.
                            </p>
                            <ul className="tick-list">
                                <li><Icon name="check" /> Monolithic — no joints, seams or grout lines</li>
                                <li><Icon name="check" /> Impervious to water, oils and most chemicals</li>
                                <li><Icon name="check" /> Bonded to the slab, not laid on top of it</li>
                                <li><Icon name="check" /> Configurable thickness from 1 mm to 6 mm+</li>
                                <li><Icon name="check" /> Unlimited RAL colours, gloss levels and effects</li>
                            </ul>
                        </div>
                        <figure className="split-media">
                            <img
                                src={IMG.warehouseApp}
                                alt="Applicator rolling a wet high-build epoxy floor coating across a large concrete warehouse slab"
                                loading="lazy"
                            />
                            <figcaption>Wet-on-wet application of a high-build epoxy system</figcaption>
                        </figure>
                    </section>

                    {/* ============================= SYSTEMS ========================== */}
                    <section className="svc-section-block" id="svc-systems">
                        <div className="section-head">
                            <p className="section-kicker">Our Range</p>
                            <h2 className="section-title">Types of Epoxy Flooring Systems We Install</h2>
                            <p className="section-desc">
                                Every facility has a different duty cycle. We match the chemistry,
                                thickness and finish to your actual traffic, chemical exposure and hygiene
                                requirements — never a one-size-fits-all specification.
                            </p>
                        </div>

                        <div className="sys-grid">
                            {SYSTEMS.map((s) => (
                                <article className="sys-card" key={s.title}>
                                    <div className="sys-card-head">
                                        <span className="sys-card-icon"><Icon name={s.icon} /></span>
                                        <span className="sys-card-tag">{s.tag}</span>
                                    </div>
                                    <h3 className="sys-card-title">{s.title}</h3>
                                    <p className="sys-card-text">{s.text}</p>
                                    <ul className="sys-card-specs">
                                        {s.specs.map((sp) => (
                                            <li key={sp}>{sp}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* =========================== APPLICATIONS ======================= */}
                    <section className="svc-section-block band-soft" id="svc-applications">
                        <div className="section-head">
                            <p className="section-kicker">Where It Works</p>
                            <h2 className="section-title">Industries &amp; Applications We Serve</h2>
                            <p className="section-desc">
                                From heavy engineering to sterile pharmaceutical suites, our systems are
                                specified for the real conditions of each environment.
                            </p>
                        </div>

                        <div className="ind-grid">
                            {INDUSTRIES.map((i) => (
                                <article className="ind-card" key={i.title}>
                                    <span className="ind-card-icon"><Icon name={i.icon} /></span>
                                    <h3>{i.title}</h3>
                                    <p>{i.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* ============================= BENEFITS ========================= */}
                    <section className="svc-section-block" id="svc-benefits">
                        <div className="section-head">
                            <p className="section-kicker">Advantages</p>
                            <h2 className="section-title">Why Choose Epoxy Flooring?</h2>
                            <p className="section-desc">
                                Epoxy is chosen by engineers, architects and facility managers because it
                                solves several problems at once — protection, hygiene, safety, appearance
                                and lifecycle cost.
                            </p>
                        </div>

                        <div className="feat-grid">
                            {BENEFITS.map((b) => (
                                <article className="feat-card" key={b.title}>
                                    <span className="feat-icon"><Icon name={b.icon} /></span>
                                    <h3>{b.title}</h3>
                                    <p>{b.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* ============================ KEY SECTIONS ====================== */}
                    <div className="svc-sections">
                        <section className="svc-section">
                            <h3>BEST &amp; MOST RELIABLE EPOXY FLOORING IN PAKISTAN</h3>
                            <p>
                                {config.companyName} has earned its reputation as one of Pakistan&rsquo;s
                                most dependable industrial flooring contractors. We combine European-grade
                                resin chemistry with locally-experienced site crews, calibrated application
                                equipment and a documented quality-control regime on every project — from a
                                300 m² workshop in Sialkot to an 8,000 m² distribution centre in Lahore.
                            </p>
                            <p>
                                Every installation is delivered against a written method statement and
                                specification: substrate testing, mechanical preparation to a defined
                                concrete surface profile, batch-controlled material application, wet-film
                                thickness checks, and a full handover pack including material datasheets,
                                batch records, warranty and a maintenance schedule.
                            </p>
                        </section>

                        <section className="svc-section">
                            <h3>Why Choose Epoxy Flooring?</h3>
                            <p>
                                Epoxy is the only common flooring technology that simultaneously delivers
                                mechanical strength, chemical resistance, impermeability, hygiene,
                                customisable slip performance and an attractive seamless finish — at a
                                lifecycle cost lower than tile, screed or bare sealed concrete. It converts
                                a porous, dusting slab into a clean, safe, light-reflective working surface
                                that supports both productivity and compliance.
                            </p>
                        </section>

                        <section className="svc-section">
                            <h3>DURABILITY &amp; STRENGTH</h3>
                            <p>
                                Epoxy flooring is highly abrasion and chemical-resistant, making it ideal for
                                heavy-duty applications. It withstands daily wear and tear from foot traffic,
                                vehicles and machinery. The added slip and skid resistance ensures safety in
                                various environments. Heavy-duty epoxy mortar systems achieve compressive
                                strengths above 55 N/mm² and bond to concrete more strongly than the concrete
                                holds together itself.
                            </p>
                        </section>

                        <section className="svc-section">
                            <h3>COST-EFFECTIVENESS</h3>
                            <p>
                                Epoxy flooring is a long-lasting solution that reduces the need for frequent
                                repairs or replacements. Its durability makes it a cost-effective choice for
                                both residential and commercial settings — typically the lowest 20-year cost
                                of ownership of any industrial flooring option once downtime and maintenance
                                are accounted for.
                            </p>
                        </section>

                        <section className="svc-section">
                            <h3>EASY MAINTENANCE</h3>
                            <p>
                                Epoxy floors are non-porous and seamless, making them easy to clean and
                                maintain. Dust, dirt and spills can be wiped away effortlessly, keeping the
                                surface hygienic and looking new for years. There is no grout to scrub, no
                                wax to strip and no sealing cycle to repeat.
                            </p>
                        </section>

                        <section className="svc-section">
                            <h3>ENVIRONMENTALLY FRIENDLY</h3>
                            <p>
                                Epoxy coatings are sustainable and eco-friendly, as they require fewer
                                resources for maintenance and last significantly longer than traditional
                                flooring options. Our standard systems are 100%-solids or waterborne with
                                negligible VOC emissions, and their extended service life substantially
                                reduces material consumption and construction waste.
                            </p>
                        </section>
                    </div>

                    {/* ============================= SPEC TABLE ======================= */}
                    <section className="svc-section-block" id="svc-specs">
                        <div className="section-head">
                            <p className="section-kicker">Technical Data</p>
                            <h2 className="section-title">Performance &amp; Technical Specifications</h2>
                            <p className="section-desc">
                                Indicative properties for a standard Multilines epoxy flooring system. Exact
                                values are confirmed against the selected product datasheet and the
                                conditions found at your site.
                            </p>
                        </div>

                        <div className="table-wrap">
                            <table className="spec-table">
                                <caption className="visually-hidden">
                                    Technical specification of the Multilines epoxy flooring system
                                </caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Property</th>
                                        <th scope="col">Typical Value / Requirement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SPECS.map(([k, v]) => (
                                        <tr key={k}>
                                            <th scope="row">{k}</th>
                                            <td>{v}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* =========================== COMPARISON ========================= */}
                    <section className="svc-section-block band-soft" id="svc-compare">
                        <div className="section-head">
                            <p className="section-kicker">Comparison</p>
                            <h2 className="section-title">Epoxy vs. Conventional Flooring</h2>
                            <p className="section-desc">
                                A side-by-side view of how a seamless epoxy system compares with sealed
                                concrete and tile across the criteria facility managers care about most.
                            </p>
                        </div>

                        <div className="table-wrap">
                            <table className="cmp-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Criteria</th>
                                        <th scope="col" className="is-best">Epoxy Flooring</th>
                                        <th scope="col">Sealed Concrete</th>
                                        <th scope="col">Tile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map(([c, e, s, t]) => (
                                        <tr key={c}>
                                            <th scope="row">{c}</th>
                                            <td className="is-best">{e}</td>
                                            <td>{s}</td>
                                            <td>{t}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ============================ PROCESS =========================== */}
                    <section className="svc-section-block" id="svc-process">
                        <div className="section-head">
                            <p className="section-kicker">How We Work</p>
                            <h2 className="section-title">Our 6-Step Installation Process</h2>
                            <p className="section-desc">
                                A disciplined, documented sequence that removes the guesswork and guarantees
                                a floor that performs for its full design life.
                            </p>
                        </div>

                        <ol className="steps">
                            {PROCESS.map((p, idx) => (
                                <li className="step" key={p.title}>
                                    <span className="step-num">{String(idx + 1).padStart(2, '0')}</span>
                                    <div className="step-body">
                                        <h3>{p.title}</h3>
                                        <p>{p.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* ============================= GALLERY ========================== */}
                    <section className="svc-section-block" id="svc-gallery">
                        <div className="section-head">
                            <p className="section-kicker">Our Work</p>
                            <h2 className="section-title">Epoxy Flooring Project Gallery</h2>
                            <p className="section-desc">
                                Completed installations across Pakistan — industrial halls, commercial
                                interiors, hygienic facilities and decorative residential floors.
                            </p>
                        </div>

                        <div className="gal-filters" role="tablist" aria-label="Gallery filters">
                            {GALLERY_FILTERS.map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === f}
                                    className={`gal-filter${filter === f ? ' is-active' : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="svc-gallery gal-grid">
                            {visibleGallery.map((g, i) => (
                                <figure className="svc-img-card gal-item" key={`${g.src}-${i}`}>
                                    <img src={g.src} alt={`${g.title} — ${g.meta}`} loading="lazy" />
                                    <figcaption className="gal-cap">
                                        <strong>{g.title}</strong>
                                        <span>{g.meta}</span>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>

                    {/* ========================= WHY MULTILINES ======================= */}
                    <section className="svc-section-block band-dark" id="svc-why-us">
                        <div className="section-head">
                            <p className="section-kicker">The Multilines Difference</p>
                            <h2 className="section-title">Why Clients Choose {config.companyName}</h2>
                            <p className="section-desc">
                                We are a specialist contractor, not a reseller. Materials, equipment,
                                supervision and warranty all sit with one accountable team.
                            </p>
                        </div>

                        <div className="diff-grid">
                            {[
                                { icon: 'lab', title: 'Material Quality Control', text: 'Batch-tested resins from approved manufacturers, stored and conditioned on site, with certificates of conformity supplied for every pour.' },
                                { icon: 'tools', title: 'Own Equipment Fleet', text: 'Shot-blasters, diamond grinders, dust-free vacuums, spiked rollers and power trowels — we never rely on borrowed or improvised plant.' },
                                { icon: 'users', title: 'Trained Site Crews', text: 'Permanently employed applicators who work to our method statements, supervised by a resident engineer for the duration of the project.' },
                                { icon: 'shield', title: 'Written Warranty', text: 'Up to 10 years against delamination, blistering and premature wear, backed by a documented maintenance programme and aftercare support.' },
                                { icon: 'clock', title: 'On-Time Delivery', text: 'Weekend and shutdown scheduling as standard, so production stops for hours rather than weeks and handover dates are met.' },
                                { icon: 'star', title: 'Nationwide Reach', text: 'One specification, one standard of finish, from Lahore to Karachi to Peshawar — with our own teams and equipment on site.' },
                            ].map((d) => (
                                <article className="diff-card" key={d.title}>
                                    <span className="diff-icon"><Icon name={d.icon} /></span>
                                    <h3>{d.title}</h3>
                                    <p>{d.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* ========================== MAINTENANCE ========================= */}
                    <section className="svc-section-block split" id="svc-maintenance">
                        <figure className="split-media">
                            <img
                                src={IMG.grayMatte}
                                alt="Clean, well-maintained matte epoxy floor in a commercial interior"
                                loading="lazy"
                            />
                            <figcaption>A well-maintained epoxy floor keeps its finish for decades</figcaption>
                        </figure>
                        <div className="split-body">
                            <p className="section-kicker">Aftercare</p>
                            <h2 className="section-title">Keeping Your Epoxy Floor in Peak Condition</h2>
                            <p>
                                Epoxy is among the lowest-maintenance flooring materials available, but a
                                few simple habits protect the film and preserve the appearance you paid for.
                            </p>
                            <ul className="tick-list tick-list-lg">
                                {MAINTENANCE.map((m) => (
                                    <li key={m}><Icon name="check" /> {m}</li>
                                ))}
                            </ul>
                            <p className="maint-note">
                                <strong>Note:</strong> never use acidic descalers, citrus-based cleaners or
                                strong solvent degreasers on an epoxy surface. They will etch the topcoat and
                                permanently dull the gloss.
                            </p>
                        </div>
                    </section>

                    {/* ============================== FAQ ============================= */}
                    <section className="svc-section-block" id="svc-faq">
                        <div className="section-head">
                            <p className="section-kicker">Questions</p>
                            <h2 className="section-title">Frequently Asked Questions</h2>
                            <p className="section-desc">
                                Straight answers to the questions our clients ask most often about epoxy
                                flooring in Pakistan.
                            </p>
                        </div>

                        <div className="faq">
                            {FAQS.map((f, idx) => {
                                const open = openFaq === idx;
                                return (
                                    <div className={`faq-item${open ? ' is-open' : ''}`} key={f.q}>
                                        <h3 className="faq-q">
                                            <button
                                                type="button"
                                                className="faq-trigger"
                                                aria-expanded={open}
                                                aria-controls={`faq-panel-${idx}`}
                                                id={`faq-btn-${idx}`}
                                                onClick={() => setOpenFaq(open ? -1 : idx)}
                                            >
                                                <span>{f.q}</span>
                                                <span className="faq-sign" aria-hidden="true">
                                                    <Icon name={open ? 'minus' : 'plus'} />
                                                </span>
                                            </button>
                                        </h3>
                                        <div
                                            className="faq-a"
                                            id={`faq-panel-${idx}`}
                                            role="region"
                                            aria-labelledby={`faq-btn-${idx}`}
                                            hidden={!open}
                                        >
                                            <p>{f.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* =========================== COVERAGE =========================== */}
                    <section className="svc-section-block band-soft" id="svc-areas">
                        <div className="section-head">
                            <p className="section-kicker">Coverage</p>
                            <h2 className="section-title">Service Areas Across Pakistan</h2>
                            <p className="section-desc">
                                Headquartered in Lahore, our crews travel with full preparation and
                                application equipment to projects anywhere in the country.
                            </p>
                        </div>
                        <ul className="areas">
                            {AREAS.map((a) => (
                                <li className="area-chip" key={a}>
                                    <Icon name="check" /> {a}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* ============================== CTA ============================= */}
                    <section className="cta-band" id="svc-contact">
                        <div className="cta-inner">
                            <div>
                                <h2 className="cta-title">Ready to Specify Your Epoxy Floor?</h2>
                                <p className="cta-text">
                                    Send us your drawings, area sizes and traffic requirements. Our engineer
                                    will visit your site, assess the substrate, and return a detailed
                                    specification and quotation — free of charge and without obligation.
                                </p>
                            </div>
                            <div className="cta-actions">
                                <a href="/contact" className="btn btn-primary btn-lg">
                                    Request a Free Site Survey
                                </a>
                                <a href="tel:+920000000000" className="btn btn-outline btn-lg">
                                    Call Our Flooring Team
                                </a>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default EpoxyFlooringService;
