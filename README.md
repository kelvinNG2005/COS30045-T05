# COS30045-Energy-Consumption-Website

An interactive website that visualises the energy consumption of televisions currently available on the Australian market.

Built for **COS30045 Data Visualisation** tutorial exercises.

---

# Visit the hosted version:



---

## Data Story

### Audience

The primary audience for this visualisation is **Australian consumers
who are shopping for a new television** and want to understand how
their choice affects their electricity bill.

### Their Interest

Televisions are one of the most common appliances in Australian homes,
yet energy use varies dramatically depending on screen size, display
technology, and brand. Consumers often base their decision on price,
brand reputation, or picture quality alone — without considering the
long-term running cost. With electricity prices rising across the
National Electricity Market (NEM), even a modest difference in power
consumption can add up to hundreds of dollars over the life of a TV.

### What the Visualisation Answers

The Televisions page is structured around seven questions that a
prospective buyer would naturally ask:

1. What screen technologies are available, and which are most common?
2. What screen sizes dominate the market?
3. Which brands offer the widest range of models?
4. Which technology uses the least power?
5. Does a bigger screen always mean more power?
6. Does a higher star rating mean a smaller or larger screen?
7. Do brands differ in power consumption?

By answering these questions with charts rather than tables of raw
numbers, the visualisation lets a non-technical audience spot patterns
at a glance and make an informed purchasing decision.

---

## About the Data

### Data Source

The dataset used in this project is the **Energy Rating Data for
Household Appliances — Labelled Products (Televisions)** dataset,
published by the **Australian Government, Department of Climate
Change, Energy, the Environment and Water**.

- **Accessed via:** [data.gov.au](https://data.gov.au)
- **Format:** CSV (comma-separated values), with a separate DOCX
  metadata file explaining the field structure.
- **Scope:** Televisions currently registered under the Australian
  Energy Rating Label scheme.

### Data Processing

The raw CSV file was downloaded directly from data.gov.au and processed
using **KNIME Analytics Platform**. The workflow consisted of the
following steps:

1. **Column Filter** — removed fields not relevant to the analysis,
   including *Family name*, *Grand date*, *Product website*,
   *Representative Brand URL*, and *What test standard was used*.

2. **Sorter** — sorted the data by *Model number* in ascending order to
   make it easier to review duplicates.

3. **Duplicate Row Filter** — applied on *Model number* to remove
   duplicate entries, ensuring each model appears only once.

4. **Row Filter** — retained only rows where *Availability Status*
   equals *Available*, excluding unavailable models.

5. **Column Filter** — kept only the columns required to answer the
   seven research questions (screen technology, screen size, brand,
   star rating, and power consumption).

6. **String Manipulation** — converted all brand names to uppercase to
   standardise casing (e.g., "Samsung" and "SAMSUNG" are treated as
   the same brand).

The cleaned dataset was then used to generate the charts shown on the
Televisions page. No raw data is served directly on the website.

### Privacy

The dataset contains **product-level information only** — model names,
brands, screen technologies, sizes, and energy ratings. It does **not**
contain any personal, customer, or household-level data. No privacy
concerns arise from its use, and no user data is collected by the
website itself.

### Accuracy and Limitations

- **Snapshot in time.** The dataset represents televisions registered
  at the time of download. It does not update automatically, and new
  models released after that date are not included.
- **Registered models only.** Only TVs officially registered under the
  Australian Energy Rating Label scheme appear. Some grey-import or
  unregistered models may be missing.
- **Reported values, not measured.** Power consumption figures are
  reported by manufacturers under standard test conditions, not
  measured in real homes. Actual power use will vary with brightness,
  content, and usage patterns.
- **Star rating context.** Star ratings depend on both power draw and
  screen area, so comparisons across very different sizes should be
  made with care.

### Ethics

- The dataset is published under an **open government licence** and is
  free to use, reuse, and redistribute.
- All visualisations present the data **as-is**, without selective
  filtering to favour a particular brand, technology, or price point.
- No claims are made that a specific brand or technology is
  universally "better" — the charts show patterns in the data and let
  the reader draw their own conclusions.
- The website is **non-commercial** and built for educational
  purposes.


---

# How AI was used

I used GitHub Copilot throughout the project as a coding assistant. Below is a summary of how I applied it.

## Writing the HTML/CSS/JS boilerplate
I asked for starter code for the navigation, the page-switching function, and the CSS layout. The AI produced a working skeleton, which i then customised to fit my project.

# Reflecting on the experience
The AI was most useful for:

- Generating boilerplate quickly so I could focus on content
- Explaining unfamiliar JavaScript concepts in plain English
- Suggesting structure and layout patterns I wouldn't have thought of

The AI was least useful when:

- It made assumptions I hadn't told it about
- Vague prompts produced vague suggestions

# What I learned

- Verify everything. I checked every line of code, every caption, and every colour before committing.
- AI is a tool, not a replacement. The design decisions, the topic, the data interpretation, and the final polish were all mine.
