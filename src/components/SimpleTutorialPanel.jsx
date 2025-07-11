import React, { useState, useRef, useEffect } from "react";
import { Card, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';

const tutorialSteps = {
  de: [
    {
      title: "Einführung",
      content: `In diesem Tutorial lernst du, wie du die CO₂-Daten vom Vulkan Mauna Loa auf Hawaii analysieren und visualisieren kannst. Dort wird seit 1958 kontinuierlich die CO₂-Konzentration in der Atmosphäre gemessen. Diese Daten sind besonders wichtig, weil sie den langfristigen Anstieg von Treibhausgasen zeigen und damit zentrale Hinweise auf den Klimawandel geben. 

Mit Hilfe von Blockly-Blöcken wirst du lernen, wie man die Daten lädt, untersucht und visualisiert.`
    },
    {
      title: "1. CSV-Datei laden",
      content: `Öffne in der linken Toolbox die Kategorie **Load Data** und ziehe den Block **load CSV file** in den Editor.
Gehe anschließend zur Kategorie **Variables**, erstelle eine neue Variable mit dem Namen **co2** und verwende den Block **set VARIABLE to**. Setze den CSV-Block in diesen hinein.
Gib im CSV-Block den Dateinamen **co2.csv** an.`
    },
    {
      title: "2. Vorschau anzeigen",
      content: `Nutze den Block **summary of** aus der **Data Inspection** Kategorie und ziehe die Variable **co2** hinein, um dir die Struktur der Daten anzusehen.

Du erhältst eine statistische Übersicht für jede Spalte, die gekürzt so aussieht:

\`\`\`
decimal.date:
Min.   :1958  
1st Qu.:1974  
Median :1991  
Mean   :1991  
3rd Qu.:2008  
Max.   :2025  

average:
Min.   :312.4  
Mean   :360.1  
Max.   :430.5  
\`\`\`

Diese Werte zeigen dir den Bereich, die Verteilung und den Durchschnitt der Daten.

- **Min., Max.** = kleinster und größter Wert
- **Median** = mittlerer Wert
- **Mean** = Durchschnitt aller Werte

So erkennst du z. B., dass der durchschnittliche CO₂-Wert über alle Jahre bei **360.1 ppm** liegt – mit einem Maximum über **430.6 ppm**.

ℹ️ **ppm** bedeutet „parts per million“, also „Teile pro Million“. Ein Wert von 360 ppm bedeutet, dass auf eine Million Luftmoleküle etwa 360 CO₂-Moleküle kommen. Das klingt wenig, hat aber große Auswirkungen auf das Klima!`
    },
    {
      title: "3. Erste Ausgabe und Reflexion",
      content: `Jetzt erzeugen wir diese Ausgabe selbst:

Klicke nun auf **Generate R Code** im **Code-Tab** und wechsle dann zum **Output-Tab**. Führe den Code mit **Run R Code** aus.

Sieh dir die Ausgabe an. Was fällt dir auf?

- In welchen Jahren oder Zeiträumen steigt der CO₂-Wert besonders stark?
- Gibt es Ausreißer oder unerwartete Werte?`
    },
    {
      title: "4. Minimum und Maximum",
      content: `Jetzt berechnen wir den **kleinsten** und **größten** durschnittlichen CO₂-Wert in den Daten.

Nutze dazu die Blöcke **minimum of** und **maximum of** aus der Kategorie **Statistics** und verwende als Eingabe die Spalte **co2_avg**.

Diese Werte zeigen dir den niedrigsten und höchsten gemessenen Monatswert in der gesamten Zeitreihe, also wie **wenig** oder **wie viel CO₂** in der Atmosphäre war.

🔍 Reflektiere:
- Wie stark ist der Unterschied zwischen Minimum und Maximum?
- In welchem Zeitraum könnten diese Extremwerte jeweils aufgetreten sein?
- Warum ist es wichtig, beide Extreme zu kennen – nicht nur den Durchschnitt?`

    },
    {
      title: "5. Visualisieren",
      content: `Jetzt erstellen wir eine Visualisierung der CO₂-Daten.
Erstelle dafür zunächst noch einmal eine Variable **decimal_date** und weise ihr die Spalte **decimal.date** aus **co2** zu. Diese Variable enthält die Zeit in Dezimalform, was für die Visualisierung wichtig ist.

Ziehe dann den Block **Scatter Plot** aus der Kategorie **Visualization** in den Editor. Gib bei **x data** die Zeitvariable **decimal_date** und bei **y data** die CO₂-Werte **co2_avg** an.

Ein **Plot** ist eine grafische Darstellung von Daten – hier Punkte, die CO₂-Werte über der Zeit zeigen.

So kannst du den Verlauf der CO₂-Konzentration über Jahrzehnte auf einen Blick erkennen.

Generiere dann wieder Code und Output, um die Visualisierung zu sehen.

🔍 Reflektiere:
- Siehst du einen langfristigen Trend? Steigt der CO₂-Wert kontinuierlich?
- Gibt es regelmäßige Schwankungen oder Ausreißer?`
    },
    {
      title: "6. Schwankungen analysieren",
      content: `In diesem Schritt schauen wir uns nur die Daten **ab dem Jahr 2000** an, um kleinere Schwankungen im Jahresverlauf besser zu erkennen.

1. **Daten filtern**  
   - Gehe zur Kategorie **Transformations**.
   - Ziehe den Block **filter rows where** in den Editor.
   - Erstelle eine neue Variable mit dem Namen \`recent_co2\`.
   - Setze die Bedingung: \`decimal.date > 2000\`

2. **Zeit- und CO₂-Spalte auswählen**  
   - Gehe zur Kategorie **Data Inspection**.
   - Verwende zwei Blöcke **select column**:
     - \`decimal_date_filtered = select column decimal.date from recent_co2\`
     - \`co2_avg_filtered = select column average from recent_co2\`

3. **Diagramm erstellen**  
   - Öffne die Kategorie **Visualization**.
   - Ziehe einen Plot Block in den Editor und wähle **Line Chart** aus.
   - Wähle für **x data**: \`decimal_date_filtered\`  
     und für **y data**: \`co2_avg_filtered\`

4. **Code generieren und ausführen**

🔍 **Fragen zur Reflexion**:
- Wie stark schwankt der CO₂-Wert im Laufe eines Jahres?
- Gibt es jedes Jahr ein ähnliches Muster?
- Was könnte den regelmäßigen Anstieg und Abfall verursachen?`
    },
    {
      title: "7. Plot exportieren",
      content: `Wenn du den erstellten Plot abspeichern möchtest, kannst du den Block **export plot to file** aus der Kategorie **Export** verwenden.

Du kannst auswählen, ob du ihn als **Bild** (.png) oder **.pdf** abspeichern möchtest.

📌 So kannst du deine Ergebnisse teilen oder dokumentieren.`
    },
  ],
  en: [
    {
      title: "Introduction",
      content: `In this tutorial, you will learn how to analyze and visualize CO₂ data from the Mauna Loa volcano in Hawaii. Since 1958, the CO₂ concentration in the atmosphere has been continuously measured there. These data are particularly important because they show the long-term increase of greenhouse gases and thus provide key evidence for climate change.

Using Blockly blocks, you will learn how to load, inspect, and visualize the data.`
    },
    {
      title: "1. Load CSV file",
      content: `Open the **Load Data** category in the left toolbox and drag the **load CSV file** block into the editor.
Then go to the **Variables** category, create a new variable named **co2**, and use the **set VARIABLE to** block. Insert the CSV block into it.
In the CSV block, enter the filename **co2.csv**.`
    },
    {
      title: "2. Show preview",
      content: `Use the **summary of** block from the **Data Inspection** category and pass the **co2** variable to it to view the structure of the data.

You will receive a statistical overview for each column, which looks like this in abbreviated form:

\`\`\`
decimal.date:
Min.   :1958  
1st Qu.:1974  
Median :1991  
Mean   :1991  
3rd Qu.:2008  
Max.   :2025  

average:
Min.   :312.4  
Mean   :360.1  
Max.   :430.5  
\`\`\`

These values show you the range, distribution, and average of the data.

- **Min., Max.** = smallest and largest value
- **Median** = middle value
- **Mean** = average of all values

For example, you can see that the average CO₂ value over all years is **360.1 ppm** – with a maximum over **430.6 ppm**.

ℹ️ **ppm** means "parts per million". A value of 360 ppm means that out of one million air molecules, about 360 are CO₂ molecules. That sounds small, but it has a big impact on the climate!`
    },
    {
      title: "3. First output and reflection",
      content: `Now we generate this output ourselves:

Click **Generate R Code** in the **Code** tab and then switch to the **Output** tab. Run the code with **Run R Code**.

Look at the output. What do you notice?

- In which years or periods does the CO₂ value increase particularly strongly?
- Are there outliers or unexpected values?`
    },
    {
      title: "4. Minimum and maximum",
      content: `Now we calculate the **smallest** and **largest** average CO₂ value in the data.

Use the **minimum of** and **maximum of** blocks from the **Statistics** category and use the column **co2_avg** as input.

These values show you the lowest and highest measured monthly value in the entire time series, i.e., how **little** or **how much CO₂** was in the atmosphere.

🔍 Reflect:
- How large is the difference between minimum and maximum?
- In which period could these extreme values have occurred?
- Why is it important to know both extremes – not just the average?`

    },
    {
      title: "5. Visualize",
      content: `Now we create a visualization of the CO₂ data.
First, create a variable **decimal_date** and assign it the column **decimal.date** from **co2**. This variable contains the time in decimal form, which is important for visualization.

Then drag the **Scatter Plot** block from the **Visualization** category into the editor. Set **x data** to the time variable **decimal_date** and **y data** to the CO₂ values **co2_avg**.

A **plot** is a graphical representation of data – here points showing CO₂ values over time.

This way you can see the course of CO₂ concentration over decades at a glance.

Then generate code and output again to see the visualization.

🔍 Reflect:
- Do you see a long-term trend? Does the CO₂ value rise continuously?
- Are there regular fluctuations or outliers?`
    },
    {
      title: "6. Analyze fluctuations",
      content: `In this step, we only look at the data **from the year 2000** to better recognize smaller fluctuations in the annual cycle.

1. **Filter data**  
   - Go to the **Transformations** category.
   - Drag the **filter rows where** block into the editor.
   - Create a new variable named \`recent_co2\`.
   - Set the condition: \`decimal.date > 2000\`

2. **Select time and CO₂ columns**  
   - Go to the **Data Inspection** category.
   - Use two **select column** blocks:
     - \`decimal_date_filtered = select column decimal.date from recent_co2\`
     - \`co2_avg_filtered = select column average from recent_co2\`

3. **Create chart**  
   - Open the **Visualization** category.
   - Drag a plot block into the editor and select **Line Chart**.
   - Choose for **x data**: \`decimal_date_filtered\`  
     and for **y data**: \`co2_avg_filtered\`

4. **Generate and run code**

🔍 **Reflection questions**:
- How much does the CO₂ value fluctuate over the course of a year?
- Is there a similar pattern every year?
- What could cause the regular rise and fall?`
    },
    {
      title: "7. Export plot",
      content: `If you want to save the created plot, you can use the **export plot to file** block from the **Export** category.

You can choose whether to save it as an **image** (.png) or **.pdf**.

📌 This way you can share or document your results.`
    },
  ]
};

const useDraggable = () => {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let offsetX = 0;
    let offsetY = 0;
    let isDown = false;

    const onMouseDown = (e) => {
      isDown = true;
      offsetX = e.clientX - node.getBoundingClientRect().left;
      offsetY = e.clientY - node.getBoundingClientRect().top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      node.style.left = `${e.clientX - offsetX}px`;
      node.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDown = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    node.querySelector(".tutorial-header")?.addEventListener("mousedown", onMouseDown);
    return () => node.querySelector(".tutorial-header")?.removeEventListener("mousedown", onMouseDown);
  }, []);

  return ref;
};

const SimpleTutorialPanel = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [lang, setLang] = useState("de");
  const steps = tutorialSteps[lang];
  const step = steps[stepIndex];
  const dragRef = useDraggable();

  return (
    <Card
      ref={dragRef}
      sx={{
        p: 2,
        m: 2,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: 3,
        maxWidth: 400,
        position: "fixed",
        top: 100,
        right: 20,
        zIndex: 1000,
        cursor: "grab"
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} className="tutorial-header">
        <Typography variant="h6">{step.title}</Typography>
        <Box>
          <Button size="small" onClick={() => setLang(lang === "de" ? "en" : "de")}>{lang === "de" ? "EN" : "DE"}</Button>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <ReactMarkdown children={step.content} />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => setStepIndex(i => Math.max(0, i - 1))}
          disabled={stepIndex === 0}
        >
          {lang === "de" ? "Zurück" : "Back"}
        </Button>

        {stepIndex === steps.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={onClose}
          >
            {lang === "de" ? "Fertig" : "Finish"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))}
          >
            {lang === "de" ? "Weiter" : "Next"}
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SimpleTutorialPanel;
