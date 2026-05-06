/**
 * config.js — Babeldaob Island, Palau
 * ============================================================
 * THIS IS THE ONLY FILE YOU EDIT when adapting to the Palau geography.
 *
 * Data files go in the data/ subfolder:
 *   data/units.geojson     — catchment polygons with all attributes (see FIELDS below)
 *   data/roads.geojson     — road polylines with {id} property
 *   data/streams.geojson   — stream polylines with {id} property
 *   data/corals.geojson    — coral reef polygons with {id} property
 *
 * REQUIRED fields on units.geojson features:
 *   id             — integer catchment ID
 *   hydroUnit      — display label (matches id in Shiny app)
 *   propForest     — proportion forest cover (0–1)
 *   propSavanna    — proportion savanna cover (0–1)
 *   sedCurrent     — current sediment load (tons)
 *   sedForest      — sediment under full-forest scenario (tons)
 *   sedSavanna     — sediment under full-savanna scenario (tons)
 *   rchCurrent     — current groundwater recharge (MG)
 *   rchForest      — recharge under full-forest scenario (MG)
 *   rchSavanna     — recharge under full-savanna scenario (MG)
 *   logicRest      — combined restoration logic score (−1 to 1)
 *   logicProt      — combined protection logic score (−1 to 1)
 *   sedLogicRest   — sediment branch restoration logic score (−1 to 1)
 *   sedLogicProt   — sediment branch protection logic score (−1 to 1)
 *   rchLogicRest   — recharge branch restoration logic score (−1 to 1)
 *   rchLogicProt   — recharge branch protection logic score (−1 to 1)
 *   vegLogicRest   — vegetation branch restoration logic score (−1 to 1)
 *   vegLogicProt   — vegetation branch protection logic score (−1 to 1)
 *   decLogic       — decision model: logic score (0–1)
 *   decEffort      — decision model: effort score (0–1)
 *   decDiversity   — decision model: diversity score (0–1)
 *   decBuffer      — decision model: buffer score (0–1)
 *   decProtLogic   — decision model (protection): logic score (0–1)
 *   decProtEffort  — decision model (protection): effort score (0–1)
 *   decProtDiversity — decision model (protection): diversity score (0–1)
 *   decProtBuffer  — decision model (protection): buffer score (0–1)
 * ============================================================
 */

const CONFIG = {

  // ══════════════════════════════════════════════════════════
  // GENERAL
  // ══════════════════════════════════════════════════════════
  title:    'Palau DST',
  subtitle: 'Babeldaob Island, Palau',

  // Initial map view
  center: [7.52, 134.62],
  zoom:   12,
  mobileZoom: 11,   // zoom used when screen width < 600px

  // Default base layer on load
  defaultBaseLayer: 'Forest',

  // Map tile options: 'light' | 'satellite' | 'topo'  (used by shared/app.js)
  defaultBasemap: 'light',

  // ══════════════════════════════════════════════════════════
  // DATA FILES
  // ══════════════════════════════════════════════════════════
  dataFiles: {
    units:   'data/units.geojson',
    roads:   'data/roads.geojson',
    streams: 'data/streams.geojson',
    corals:  'data/corals.geojson',
  },

  // ══════════════════════════════════════════════════════════
  // BASE LAYERS (radio buttons)
  // Each entry defines how to color the units polygon layer.
  // ══════════════════════════════════════════════════════════
  baseLayers: [
    {
      id: 'None',
      label: 'None',
    },
    {
      id: 'Forest',
      label: 'Forest',
      field: 'propForest',
      scale: 100,               // multiply field value by this for display
      unit: '%',
      palette: ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
      bins: [0, 20, 40, 60, 80, 100],
      legendTitle: 'Forest cover (%)',
    },
    {
      id: 'Savanna',
      label: 'Savanna',
      field: 'propSavanna',
      scale: 100,
      unit: '%',
      palette: ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'],
      bins: [0, 20, 40, 60, 80, 100],
      legendTitle: 'Savanna cover (%)',
    },
    {
      id: 'Sediment',
      label: 'Sediment',
      field: 'sedCurrent',
      scale: 1,
      unit: ' tons',
      palette: ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026'],
      bins: null,               // null = compute from data quantiles (8 bins)
      legendTitle: 'Sediment load (tons)',
    },
    {
      id: 'Recharge',
      label: 'Recharge',
      field: 'rchCurrent',
      scale: 1,
      unit: ' MG',
      palette: ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84'],
      bins: null,               // null = compute from data quantiles (8 bins)
      legendTitle: 'Groundwater recharge (MG)',
    },
    {
      id: 'Logic model',
      label: 'Logic model',
      // Uses both logicRest (red) and logicProt (blue) — handled specially in app
      legendTitle: 'Logic model scores',
    },
    {
      id: 'Decision model',
      label: 'Decision model',
      // Colors computed dynamically from AHP decision model — handled specially
      legendTitle: 'Decision model scores',
    },
  ],

  // ══════════════════════════════════════════════════════════
  // OVERLAY LAYERS (checkboxes)
  // ══════════════════════════════════════════════════════════
  overlayLayers: [
    {
      id: 'roads',
      label: 'Roads',
      style: { color: '#8B4513', weight: 1.5, opacity: 0.8 },
    },
    {
      id: 'streams',
      label: 'Streams',
      style: { color: '#1f78b4', weight: 1.5, opacity: 0.8 },
    },
    {
      id: 'corals',
      label: 'Corals',
      style: { color: '#FF69B4', weight: 1, fillColor: '#FFB6C1', fillOpacity: 0.5, opacity: 0.8 },
    },
  ],

  // ══════════════════════════════════════════════════════════
  // POPUP GAUGE CHARTS
  // Defines which data field to read for each base layer's popup
  // ══════════════════════════════════════════════════════════
  popupConfig: {
    Forest:        { field: 'propForest',  scale: 100, unit: '%',    palette: ['#ffffcc','#c2e699','#78c679','#31a354','#006837'], nBins: 5 },
    Savanna:       { field: 'propSavanna', scale: 100, unit: '%',    palette: ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404'], nBins: 5 },
    Sediment:      { field: 'sedCurrent',  scale: 1,   unit: ' tons',palette: ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026'], nBins: 8 },
    Recharge:      { field: 'rchCurrent',  scale: 1,   unit: ' MG',  palette: ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84'], nBins: 8 },
    'Logic model': { dual: true,  // shows two gauges side-by-side
      restore: { field: 'logicRest', unit: '',     palette: ['#990000','#d7301f','#ef6548','#fc8d59','#fdbb84','#fdd49e','#fee8c8','#fff7ec'], nBins: 8, label: 'Restore' },
      protect: { field: 'logicProt', unit: '',     palette: ['#034e7b','#0570b0','#3690c0','#74a9cf','#a6bddb','#d0d1e6','#ece7f2','#fff7fb'], nBins: 8, label: 'Protect' },
    },
  },

  // ══════════════════════════════════════════════════════════
  // LOGIC MODEL PLOTS
  // Six scatter plots (3 restoration, 3 protection)
  // ══════════════════════════════════════════════════════════
  logicModelPlots: {
    restoration: [
      {
        id: 'restSed',
        title: 'Restoration: Sediment',
        xField: 'sedRestDiff',          // computed: sedCurrent − sedForest
        xCompute: (f) => f.sedCurrent - f.sedForest,
        yField: 'sedLogicRest',
        xLabel: 'Potential reduction in sediment',
        yLabel: 'Logic Score',
        palette: ['#990000','#d7301f','#ef6548','#fc8d59','#fdbb84','#fdd49e','#fee8c8','#fff7ec'],
        trendLine: { type: 'threshold_monotone', p10Field: 'sedFullDiff', p90: true },
      },
      {
        id: 'restRch',
        title: 'Restoration: Groundwater',
        xField: 'rchRestDiff',
        xCompute: (f) => f.rchForest - f.rchCurrent,
        yField: 'rchLogicRest',
        xLabel: 'Potential increase in groundwater production',
        yLabel: 'Logic Score',
        palette: ['#990000','#d7301f','#ef6548','#fc8d59','#fdbb84','#fdd49e','#fee8c8','#fff7ec'],
        trendLine: { type: 'inflection_at_0.33' },
      },
      {
        id: 'restVeg',
        title: 'Restoration: Vegetation',
        xField: 'propSavanna',
        xCompute: null,
        yField: 'vegLogicRest',
        xLabel: 'Current savanna cover',
        yLabel: 'Logic Score',
        xDomain: [0, 1],
        palette: ['#990000','#d7301f','#ef6548','#fc8d59','#fdbb84','#fdd49e','#fee8c8','#fff7ec'],
        trendLine: { type: 'trapezoid', x: [0, 0.2, 0.8, 1.0], y: [-1, 1, 1, -1] },
      },
    ],
    protection: [
      {
        id: 'protSed',
        title: 'Protection: Sediment',
        xField: 'sedProtDiff',
        xCompute: (f) => f.sedSavanna - f.sedCurrent,
        yField: 'sedLogicProt',
        xLabel: 'Potential increase in sediment',
        yLabel: 'Logic Score',
        palette: ['#034e7b','#0570b0','#3690c0','#74a9cf','#a6bddb','#d0d1e6','#ece7f2','#fff7fb'],
        trendLine: { type: 'threshold_monotone', p10: true, p90: true },
      },
      {
        id: 'protRch',
        title: 'Protection: Groundwater',
        xField: 'rchProtDiff',
        xCompute: (f) => f.rchCurrent - f.rchSavanna,
        yField: 'rchLogicProt',
        xLabel: 'Potential reduction in groundwater',
        yLabel: 'Logic Score',
        palette: ['#034e7b','#0570b0','#3690c0','#74a9cf','#a6bddb','#d0d1e6','#ece7f2','#fff7fb'],
        trendLine: { type: 'threshold_monotone', p10: true, p90: true, inverted: true },
      },
      {
        id: 'protVeg',
        title: 'Protection: Vegetation',
        xField: 'propForest',
        xCompute: null,
        yField: 'vegLogicProt',
        xLabel: 'Current forest cover',
        yLabel: 'Logic Score',
        xDomain: [0, 1],
        palette: ['#034e7b','#0570b0','#3690c0','#74a9cf','#a6bddb','#d0d1e6','#ece7f2','#fff7fb'],
        trendLine: { type: 'linear', x: [0, 1.0], y: [-1, 1] },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // DECISION MODEL
  // AHP (Saaty) with abbreviated pairwise comparisons
  // Criteria order matters — sliders compare adjacent pairs
  // ══════════════════════════════════════════════════════════
  decisionModel: {
    restoration: {
      heading: 'Savanna restoration',
      criteria: ['logic', 'effort', 'diversity', 'buffer'],
      dataFields: ['decLogic', 'decEffort', 'decDiversity', 'decBuffer'],
      sliders: [
        {
          id: 'rest_logicVsEffort',
          leftLabel: 'Logic score',
          rightLabel: 'Restoration effort',
          tooltip: 'Logic score is the result of the Logic Model. Restoration effort combines proximity to the nearest road and steepness of the hydrounit.',
          outputTemplate: 'Logic score is {dir} Restoration effort score.',
        },
        {
          id: 'rest_effortVsDiversity',
          leftLabel: 'Restoration effort',
          rightLabel: 'Biodiversity',
          tooltip: 'Restoration effort combines proximity to the nearest road and steepness. Biodiversity represents the number of species within the hydrounit.',
          outputTemplate: 'Restoration effort score is {dir} Biodiversity score.',
        },
        {
          id: 'rest_diversityVsBuffer',
          leftLabel: 'Biodiversity',
          rightLabel: 'Savanna encroachment',
          tooltip: 'Biodiversity represents the number of species within the hydrounit. Savanna encroachment is the amount of edge within savanna vegetation patches.',
          outputTemplate: 'Biodiversity score is {dir} Savanna encroachment score.',
        },
      ],
      palette: {
        bins: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0],
        colors: ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#990000'],
        legendTitle: 'Restore score',
      },
    },
    protection: {
      heading: 'Forest protection',
      criteria: ['logic', 'effort', 'diversity', 'buffer'],
      dataFields: ['decProtLogic', 'decProtEffort', 'decProtDiversity', 'decProtBuffer'],
      sliders: [
        {
          id: 'prot_logicVsEffort',
          leftLabel: 'Logic score',
          rightLabel: 'Protection effort',
          tooltip: 'Logic score is the result of the Logic Model. Protection effort combines proximity to the nearest road and steepness of the hydrounit.',
          outputTemplate: 'Logic score is {dir} Protection effort score.',
        },
        {
          id: 'prot_effortVsDiversity',
          leftLabel: 'Protection effort',
          rightLabel: 'Biodiversity',
          tooltip: 'Protection effort combines proximity to the nearest road and steepness. Biodiversity represents the number of species within the hydrounit.',
          outputTemplate: 'Protection effort is {dir} Biodiversity score.',
        },
        {
          id: 'prot_diversityVsBuffer',
          leftLabel: 'Biodiversity',
          rightLabel: 'Forest-savanna edge',
          tooltip: 'Biodiversity represents the number of species within the hydrounit. Forest-savanna edge is the amount of edge within forest patches that border savanna.',
          outputTemplate: 'Biodiversity score is {dir} Forest susceptibility score.',
        },
      ],
      palette: {
        bins: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0],
        colors: ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b'],
        legendTitle: 'Protect score',
      },
    },
  },

  // ══════════════════════════════════════════════════════════
  // DATA TABLE COLUMNS
  // Each entry: { field, label, digits }
  // ══════════════════════════════════════════════════════════
  tableColumns: [
    { field: 'hydroUnit',   label: 'Catchment ID', digits: 0 },
    { field: 'propForest',  label: 'Forest (%)',   digits: 1, scale: 100 },
    { field: 'propSavanna', label: 'Savanna (%)',  digits: 1, scale: 100 },
    { field: 'sedCurrent',  label: 'Sediment (tons)', digits: 2 },
    { field: 'rchCurrent',  label: 'Recharge (MG)',   digits: 2 },
    { field: 'logicRest',   label: 'Logic: Restore',  digits: 2 },
    { field: 'logicProt',   label: 'Logic: Protect',  digits: 2 },
  ],

  // ══════════════════════════════════════════════════════════
  // PAGE TEXT CONTENT
  // ══════════════════════════════════════════════════════════
  text: {
    background: [
      `Coral reef ecosystems represent some of the most diverse and ecologically
       important places on Earth, yet are also some of the most threatened by both
       climate change and human activities. Of the many human impacts on coastal
       environments, the removal of tropical forestland ranks among the most
       detrimental to coral reef communities.`,
      `Forest removal increases the amount of soil erosion into inland stream
       networks, and ultimately onto coral reefs up to 100 km from shore. Over
       time, this sediment contributes to declining coral populations, lower
       productivity, and overall diversity of plant and animal assemblages.
       Land management that promotes ridge-to-reef conservation by preserving
       and restoring tropical forestland is essential to the long-term viability
       of offshore environments.`,
      `Here we showcase a state-of-the-science modeling approach to assist
       forest restoration planning in The Republic of Palau, a Pacific Island
       nation 500 miles east of the Philippines. In Palau, extensive human-ignited
       fires, harvesting, agriculture, urban expansion, and road building have
       contributed to high sedimentation loads.`,
    ],
    modelInfo: [
      `The Environmental Management Decision Support (EMDS) model is a tool to
       aid in ecological analysis and strategic management planning. The model is
       composed of (1) a <em>logic model</em>, which assesses the ecological state
       of the system, and (2) a <em>decision model</em>, which states "given the
       state of the system, what can we do about it?".`,
      `For the Palau Decision Support Tool, we are concerned with managing the
       island's terrestrial resources to prevent increases in sediment deposition
       to nearshore environments. Such sediment is the result of human-ignited
       fires in tropical forest that cause their conversion to and maintenance
       of savanna vegetation types.`,
      `Individual catchments are evaluated for their opportunity for:
       (1) <strong>Restoring savanna</strong> by fostering tropical forest development
       to reduce sediment loads and increase groundwater recharge, and
       (2) <strong>Protecting forest</strong> to maintain currently low levels of
       sediment and high recharge. Each catchment receives a score for each
       objective, ranging from −1 (low potential) to +1 (high potential).`,
    ],
    howToUse: [
      `The three-bar icon in the upper right provides a selection of map layers
       depicting vegetation, groundwater recharge, sediment production, and logic
       and decision model scores. Note: the Decision model map will appear grey at
       first — scores are calculated from the <strong>Decision model</strong> tab.`,
      `Click on a catchment to see the value and percentile for the respective
       data layer. The <strong>Data</strong> tab provides a selection of model data
       for each catchment; clicking on one or more rows will highlight them on
       the map and on the Logic model plots.`,
      `The <strong>Logic model</strong> tab shows graphically how the scores are
       calculated and the distribution of individual catchments across each branch
       of the model. The <strong>Decision model</strong> tab lets managers weight
       individual criteria using sliders, then recalculate scores on the map.`,
    ],
  },

  // ══════════════════════════════════════════════════════════
  // CONTACTS
  // ══════════════════════════════════════════════════════════
  contacts: [
    { name: 'Nicholas Povak',    role: 'Post-doc Fellow',              email: 'napovak@gmail.com', affil: 1 },
    { name: 'Christian Giardina', role: 'Research Ecologist',          affil: 2 },
    { name: 'Paul Hessburg',      role: 'Research Landscape Ecologist', affil: 3 },
    { name: 'Keith Reynolds',     role: 'Research Forester',           affil: 4 },
    { name: 'Richard MacKenzie',  role: 'Research Ecologist',          affil: 2 },
  ],
  affiliations: [
    '',  // 0-indexed placeholder
    'Oak Ridge Institute for Science and Education',
    'USDA Forest Service, PSW Research, Institute of Pacific Islands Forestry',
    'USDA Forest Service, PNW Research, Wenatchee Forest Sciences Lab',
    'USDA Forest Service, PNW Research, Corvallis Forest Sciences Lab',
  ],
};
