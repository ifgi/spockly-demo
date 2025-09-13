const co2TutorialPython = {
  de: [
    {
      title: "Willkommen im SPOCKLY-Tutorial",
      content: `📚 Dieses Tutorial hilft dir, SPOCKLY Schritt für Schritt zu verstehen.

📊 Am Beispiel eines CO₂-Datensatzes lernst du alle wichtigen Funktionen Schritt für Schritt kennen.

➡️ Klicke unten auf **Weiter**, um die Tour zu starten.

⌨️ Du kannst auch mit den **Pfeiltasten** auf deiner Tastatur vor- und zurückblättern.

🖱 Du kannst dieses Fenster **verschieben**, indem du den oberen Bereich anklickst und ziehst.

📏 Du kannst es außerdem in der Ecke unten rechts größer oder kleiner ziehen – am besten platzierst du es so, dass du daneben mitarbeiten kannst.

Viel Spaß beim Ausprobieren!`,
    },
    {
      title: "So funktioniert SPOCKLY",
      content: `**Willkommen bei SPOCKLY!**

Mit SPOCKLY kannst du Daten analysieren und visualisieren – ganz ohne Programmieren. Du verbindest einfach bunte Blöcke – wie Puzzleteile – um deine Analyse zu bauen.

---

**Was du hier machen kannst:**
- Daten laden und anschauen
- Selbst Datensätze erstellen
- Statistiken berechnen
- Diagramme oder Karten anzeigen
- Python-Code anzeigen und ausführen

---

**So ist SPOCKLY aufgebaut:**
- Links oben: Daten hochladen oder erstellen
- Links: **Toolbox** mit allen verfügbaren Blöcken
- Mitte: **Block-Editor** – hier baust du dein Programm
- Rechts oben: Tabs für **Code** und **Output**

---

**So benutzt du die Blöcke:**
- Blöcke aus der Toolbox in den Editor ziehen
- Blöcke *ineinander* stecken, wenn sie zusammengehören (z. B. eine Spalte in eine Funktion)
- Blöcke *untereinander* legen, wenn sie nacheinander ausgeführt werden sollen
- Block herausziehen, um ihn zu lösen
- Block in den Papierkorb unten rechts ziehen, um ihn zu löschen

---

🧠 **Was ist Python-Code?**  
Python ist eine Programmiersprache für Statistik und Datenanalyse.  
SPOCKLY erzeugt automatisch Python-Code aus deinen Blöcken – du brauchst ihn nicht selbst schreiben, aber kannst ihn dir anschauen, verändern und ausführen.

---

ℹ️ SPOCKLY basiert auf [**Blockly**](https://developers.google.com/blockly), einer Baustein-Technik von Google.`,
    },
    {
      title: "Einführung",
      content: `In diesem Tutorial lernst du, wie du CO₂-Daten vom Vulkan Mauna Loa 🌋 analysierst und visualisierst.

📅 Die Messungen reichen **bis ins Jahr 1958** zurück – aber wir arbeiten hier **nur mit den Daten ab dem Jahr 2000**.

---

📁 **Was sind Daten – und warum?**

Daten helfen uns, Fragen zu beantworten: z. B. „Wie stark ist das CO₂ gestiegen?“  
Sie können in verschiedenen Formaten gespeichert sein – z. B.:
- **CSV** = einfache Tabelle mit Texten und Zahlen
- **GeoJSON** = geografische Daten (z. B. Standorte)
- **TIFF** = Bild mit Messwerten (z. B. Temperaturverteilung)

SPOCKLY kann mit vielen Formaten umgehen – du brauchst sie nur hochladen oder auswählen.

---

Mit unseren CO₂-Daten kannst du herausfinden:
- wie viel CO₂ in der Atmosphäre war (in ppm = „parts per million“),
- wie sich der Wert über die Jahre verändert hat,
- und ob es regelmäßige Schwankungen gibt.

Mit Hilfe von Spockly-Blöcken wirst du lernen:

✅ wie man die Daten lädt,  
✅ wie man sie anschaut und versteht,  
✅ und wie man sie grafisch darstellt.
`,
    },
    {
      title: "1. Daten ansehen",
      content: `Gehe links auf **Check Uploads** und sieh dir die Vorschau des CO₂-Datensatzes an.

📄 Die Datei heißt **co2.csv**. Das ist eine sogenannte **CSV-Datei** – das steht für *Comma-Separated Values* (kommagetrennte Werte).

Eine CSV-Datei ist wie eine **Tabelle**:
- Jede **Zeile** ist ein Datensatz (z. B. ein Monat).
- Jede **Spalte** enthält eine bestimmte Information (z. B. Jahr, CO₂-Wert).

🔍 **Fragen zur Reflexion**:
- Welche Spalten siehst du?
- Was bedeuten die Spaltennamen?
- Welche Informationen kannst du direkt erkennen?`,
    },
    {
      title: "2. CSV-Datei laden",
      content: `📥 In diesem Schritt lädst du die CO₂-Daten in SPOCKLY und speicherst sie in einer sogenannten **Variable**.

---

🔹 **Was ist eine Variable?**

Eine Variable ist ein **Behälter mit einem Namen**, in dem du Daten speicherst. So musst du die Daten nicht immer neu laden, sondern kannst sie einfach über den Namen abrufen.
In unserem Fall nennen wir die Variable **co2**.

---

🛠 **So geht’s – Schritt für Schritt:**

1. 👉 Öffne links die Kategorie **Daten** > **Daten herunterladen**  
   und ziehe den Block **Read CSV file** in die große, türkisfarbene Editor-Fläche.

2. 👉 Öffne jetzt die Kategorie **Variablen**  
   und klicke ganz oben auf **Create variable...**

3. ✏️ Gib als Namen der Variable ein: \`co2\`

4. ⚠️ Jetzt schließt sich das Fenster.  
   Öffne die Kategorie **Variablen** *noch einmal* – dort findest du nun neue Blöcke.

5. 👉 Ziehe den Block mit der Aufschrift:  
   **set co2 to ...** in den Editor.  

6. 👉 Jetzt nimm den Block **Read CSV file *file*.csv** und  
   setze ihn **in das rechte Feld** von „set co2 to ...“

7. ✍️ Im **Read CSV file *file*.csv**-Block steht ein Feld für den Dateinamen.  
   Schreibe dort hinein: \`co2.csv\`

---

✅ Damit hast du die CO₂-Daten aus der Datei in deine Variable **co2** geladen.

🧩 **Was macht welcher Block?**
- **Read CSV file** liest die Datei ein
- **set co2 to ...** speichert das Ergebnis in einer Variable, damit du später darauf zugreifen kannst

📦 Ab jetzt kannst du mit dieser Variable weiterarbeiten, um dir die Daten anzusehen oder zu analysieren.

💡 **Was du daraus lernst:**
- Wie du Daten lädst und in Variablen speicherst  
- Wie du Blöcke miteinander kombinierst  
- Warum Variablen praktisch sind, um immer wieder auf Daten zuzugreifen
`,
    },
    {
      title: "3. Vorschau anzeigen",
      content: `📊 Jetzt schauen wir uns die Struktur der Daten an – also welche Spalten es gibt und welche Werte darin vorkommen.

---

🛠 **So geht’s – Schritt für Schritt:**

1. 👉 Öffne links die Kategorie **Grundfunktionen**  
und ziehe den Block **print** in den Editor.

2. 👉 Öffne jetzt die Kategorie **Data** > **Dateninspektion**
und ziehe den Block **Describe DataFrame** in den Editor.

3. 👉 Wähle **co2** in der Liste der Variablen rechts des **Describe DataFrame**-Blocks.
Weisst du noch, wie du deiner Variable den Namen \`co2\` gegeben hast? Jetzt kannst du sie hier verwenden.

4. 👉 Hänge den **Describe DataFrame** Block unten an den **print**-Block.

5. Dann:
- Wechsle vom Help-Tab zum **Code-Tab** oben rechts.
- 🟢 Klicke auf den grünen Knopf **Generate Python Code** im **Code-Tab** rechts. Jetzt kannst du den Python-Code sehen, der aus deinen Blöcken generiert wurde.
- Wechsle vom Code-Tab zum **Output-Tab** rechts daneben.
- 🔵 Dann auf den blauen Knopf **Run Python Code** im Output-Tab, um das Ergebnis deines generierten Codes zu sehen.
---

🧩 **Was macht welcher Block?**
- **Describe** zeigt dir eine Übersicht über alle Spalten und deren Werte – das hilft dir, die Struktur der Daten zu verstehen
---

📄 **Das kommt dabei heraus (gekürzt):**

\`\`\`
        year        month     ...    sdev        unc
count   305.0000    305.0000  ...    305.0000    305.0000
mean    2012.213    6.442623  ...    0.556459    0.208459
std     7.351859    3.462794  ...    0.222595    0.088748
min     2000.000    1.000000  ...    0.150000    0.060000
25%     2006.000    3.000000  ...    0.400000    0.150000
50%     2012.000    6.000000  ...    0.520000    0.200000
75%     2019.000    9.000000  ...    0.650000    0.240000
max     2025.000    12.00000  ...    1.310000    0.580000

[8 rows x 8 columns] 
\`\`\`

---

🔍 **Was bedeutet das?**

- Jede **Spalte** enthält Infos zu einem Merkmal (z. B. Monat, CO₂-Wert, Unsicherheit).
- Jede Zeile im Ergebnis zeigt eine statistische Kennzahl:
  - **count** = Anzahl der Werte
  - **mean** = Durchschnitt
  - **std** = Standardabweichung
  - **min** = kleinster Wert
  - **25%** = unteres Viertel der Daten
  - **50%** = Median (mittlerer Wert)
  - **75%** = oberes Viertel der Daten
  - **max** = größter Wert

---

🔍 **Fragen zur Reflexion**:
- Welche Spalten enthalten Zahlen, die sich besonders stark unterscheiden?
- Was sagt dir der Unterschied zwischen Minimum und Maximum über die Entwicklung des CO₂-Gehalts?
- Gibt es Spalten, deren Bedeutung du dir erst erschließen musst?

💡 **Was du daraus lernst:**  
- Wie du dir schnell einen Überblick über einen Datensatz verschaffst  
- Was typische statistische Kennzahlen bedeuten  
- Wie du Variablen und Blöcke kombinierst, um Daten zu untersuchen
`,
    },
    {
      title: "4. Visualisieren",
      content: `📈 Jetzt erstellen wir eine **Visualisierung** der CO₂-Daten.

---

🎯 Ziel: Ein Liniendiagramm, das zeigt, wie sich der CO₂-Wert über die Zeit verändert.

---

🛠 **Schritt-für-Schritt-Anleitung:**

1. 👉 Öffne links die Kategorie **Datenmanipulation**  
   und ziehe den Block **Get column** in den Editor.

2. ✏️ Trage im Block die richtigen Werte ein:  
   - Klicke auf das weiße Textfeld und \`decimal date\` hinein, um die Spalte für die Zeit auszuwählen. 
   - Wähle in der Liste dahinter die Variable \`co2\`, um den Datensatz auszuwählen.

3. 🟣 Öffne die Kategorie **Variablen**  
   und erstelle eine neue Variable namens \`decimal_date\`, so wie wir vorhin die Variable \`co2\` erstellt haben. 
   Ziehe den **set decimal_date to**-Block in den Editor.
   Setze dann den **Get column**-Block in das Feld des **set decimal_date to**-Blocks.

   ✅ Jetzt sind die Zeitangaben in einer eigenen Variable gespeichert.

---

4. 👉 Wiederhole das Ganze für die Spalte \`average\`:
   - Ziehe einen weiteren **Get column**-Block in den Editor.
   - Klicke auf das Textfeld und schreibe: \`average\`, um die Spalte für den durchschnittlichen CO₂-Wert auszuwählen.
   - Wähle wieder deine Variable \`co2\` in der Liste, um den Datensatz auszuwählen.
   - Erstelle eine neue Variable namens \`co2_avg\`
   - Setze den **Get column**-Block neben den **set co2_avg to**-Block

---

5. 📊 Öffne die Kategorie **Visualisierung**  
   und ziehe den Block in den Editor, mit dem man X- und Y-Daten festlegen kann.

6. 🖱 Stelle den Block so ein:
   - **X values**: \`decimal_date\`  (Zeitachse)
   - **Y values**: \`co2_avg\`       (CO₂-Werte)
   - Wähle eine schöne Farbe für die Linie :)
   - Du kannst die Größe des Plots anpassen (z. B. 10 x 10)
   - Du kannst auch den Titel und mehrere Beschriftungen für den Plot festlegen!

✏️ Um X und Y-Achse festzulegen, ziehst du die entsprechenden Variablen (z. B. \`decimal_date\`) in die passenden Felder im Visualisierungs-Block.

---
🧩 **Was macht welcher Block?**
- **Get column** wählt gezielt eine Spalte aus einer Tabelle aus
- **set ... to** speichert das Ergebnis in einer neuen Variable, damit du sie für die Visualisierung nutzen kannst
- Der Visualisierungs-Block erstellt ein Diagramm aus den gewählten Daten

🧩 Verbinde die Blöcke miteinander (auch mit den Blöcken aus den vorherigen Schritten, sodass alle Blöcke miteinander verknüpft sind)

🟢 Klicke auf **Generate Python Code** im Code-Tab    
🔵 Dann auf **Run Python Code** im Output-Tab

---

🔍 **Fragen zur Reflexion**:
- Steigt der CO₂-Wert insgesamt an?
- Ist der Anstieg eher langsam oder schnell?
- Wie gleichmäßig ist der Verlauf?
- Wie stark schwankt der CO₂-Wert im Laufe eines Jahres?
- Gibt es jedes Jahr ein ähnliches Muster?
- Was könnte den regelmäßigen Anstieg und Abfall verursachen?

💡 **Was du daraus lernst:**  
- Wie du gezielt Spalten aus Datensätzen auswählst  
- Wie du Variablen erstellst, um Daten weiterzuverwenden  
- Wie du einfache Diagramme erstellst, um Trends sichtbar zu machen
`,
    },
    {
      title: "5. Plot exportieren",
      content: `🖼️ Du kannst auswählen, ob du dein Plot* als **Bild**:
 - Rechtsklick auf den Plot > Bild speichern unter..., um den Plot als JPEG-Datei zu speichern.
 
📑 Oder **.pdf** abspeichern möchtest:
 - Clicke auf **Open plot in new tab** oben rechts im Output-Fenster, dann öffnet sich der Plot in einem neuen Tab. Da kannst du Ctrl+P (Windows) oder Cmd+P (Mac) drücken, um den Plot als PDF zu speichern.

📌 So kannst du deine Ergebnisse teilen oder dokumentieren.

--- 
*Plot ist der Begriff, der für eine grafische Darstellung von Daten steht – also z. B. ein Liniendiagramm, Balkendiagramm oder Punktdiagramm. `,
    },
    {
      title: "Los geht's!",
      content: `✅ Du hast das Tutorial abgeschlossen.

Jetzt kannst du SPOCKLY selbstständig ausprobieren!

Lade eigene Daten, erstelle Diagramme oder Karten, oder klicke auf frühere Schritte, um sie noch einmal anzusehen.

Viel Spaß beim Entdecken!`
    },
  ],
  en: [
    {
      title: "Welcome to the SPOCKLY Tutorial",
      content: `📚 This tutorial guides you step by step through SPOCKLY.

➡️ Click **Next** below to begin the tour.

⌨️ You can also use the **arrow keys** on your keyboard to move forward and backward.

🖱 You can **drag this window** by clicking and holding the top bar.

📏 You can also resize it in the bottom right corner – ideally place it so you can work alongside it.

Have fun exploring!`,
    },
    {
      title: "How SPOCKLY works",
      content: `**Welcome to SPOCKLY!**

With SPOCKLY you can analyze and visualize data – no programming required. Just connect colorful blocks – like puzzle pieces – to build your analysis.

---

**What you can do here:**
- Load and view data
- Create your own datasets
- Calculate statistics
- Show diagrams or maps
- View and run Python code

---

**How SPOCKLY is structured:**
- Top left: upload or create data
- Left: **Toolbox** with all available blocks
- Center: **Block editor** – here you build your program
- Top right: tabs for **Code** and **Output**

---

**How to use the blocks:**
- Drag blocks from the toolbox into the editor
- Nest blocks *inside each other* when they belong together (e.g. a column inside a function)
- Stack blocks *on top of each other* to run them in sequence
- Pull a block out to detach it
- Drag a block into the trash at the bottom right to delete it

---

🧠 **What is Python code?**  
Python is a programming language for statistics and data analysis.  
SPOCKLY automatically generates Python code from your blocks – you don’t need to write it yourself, but you can view, edit, and run it.

---

ℹ️ SPOCKLY is based on [**Blockly**](https://developers.google.com/blockly), a block-based technique from Google.`,
    },
    {
      title: "Introduction",
      content: `In this tutorial you’ll learn how to analyze and visualize CO₂ data from the volcano Mauna Loa 🌋.

📅 The measurements go **all the way back to 1958** – but here we’ll work **only with the data from the year 2000 onwards**.

---

📁 **What is data – and why?**

Data helps us answer questions: for example, “How much has CO₂ increased?”  
It can be stored in different formats – for example:
- **CSV** = simple table with text and numbers
- **GeoJSON** = geographic data (e.g. locations)
- **TIFF** = image with measurement values (e.g. temperature distribution)

SPOCKLY can handle many formats – you just need to upload or select them.

---

With our CO₂ data you can find out:
- how much CO₂ was in the atmosphere (in ppm = “parts per million”),
- how the value has changed over the years,
- and whether there are regular fluctuations.

With the help of Spockly blocks you will learn:

✅ how to load the data,  
✅ how to view and understand it,  
✅ and how to visualize it.
`,
    },
    {
      title: "1. View the data",
      content: `Go to **Check Uploads** on the left and look at the preview of the CO₂ dataset.

📄 The file is called **co2.csv**. This is a so-called **CSV file** – which stands for *Comma-Separated Values*.

A CSV file is like a **table**:
- Each **row** is a data entry (e.g. a month).
- Each **column** contains a specific piece of information (e.g. year, CO₂ value).

🔍 **Reflection questions:**
- Which columns do you see?
- What do the column names mean?
- What information can you recognize directly?`,
    },
    {
      title: "2. Load CSV file",
      content: `📥 In this step you’ll load the CO₂ data into SPOCKLY and store it in a so-called **variable**.

---

🔹 **What is a variable?**

A variable is a **container with a name** in which you store data. This way you don’t have to load the data again and again, but can simply access it by name.  
In our case, we’ll call the variable **co2**.

---

🛠 **How to do it – step by step:**

1. 👉 Open the **Data** > **Download Data** category on the left  
   and drag the **Read CSV file** block into the large turquoise editor area.

2. 👉 Now open the **Variables** category  
   and click at the very top on **Create variable...**

3. ✏️ Enter the name: \`co2\`

4. ⚠️ The window closes.  
   Open the **Variables** category *again* – now you’ll find new blocks there.

5. 👉 Drag the block:  
   **set co2 to ...** into the editor.  

6. 👉 Now take the **Read file *file.csv*** block and  
   place it **in the right field** of “set co2 to ...”

7. ✍️ In the **Read CSV file *file*.csv** block, there’s a field for the filename.  
   Write: \`co2\`

---

✅ This way you have loaded the CO₂ data from the file into your variable **co2**.

🧩 **What does each block do?**
- **Read CSV file** reads the file
- **set co2 to ...** stores the result in a variable so you can access it later

📦 From now on you can continue working with this variable to view or analyze the data.

💡 **What you’ll learn:**  
- How to load data and store it in variables  
- How to combine blocks  
- Why variables are practical for accessing data repeatedly
`,
    },
    {
      title: "3. Show preview",
      content: `📊 Now we’ll look at the structure of the data – that is, which columns there are and what values they contain.

---

🛠 **How to do it – step by step:**

1. 👉 Open the **Basic functions** category on the left, drag the **print** block into the editor, and attach it below the **set co2 to ...** block.

2. 👉 Open the **Data** > **Data Inspection** category on the left  
   and drag the **Describe DataFrame** block into the editor.

3. 👉 Select **co2** in the dropdown list on the right of the **Describe DataFrame** block. Remember: **co2** is the name of your variable that stores the DataFrame!

4. 👉 Attach the **Describe DataFrame** block to the **print** block.

5. Then:
- switch from the Help tab to the **Code** tab at the top right.
- 🟢 click the green button **Generate Python Code** in the **Code** tab on the right. Now you can see the Python code generated from your blocks.
- switch from the Code tab to the **Output** tab next to it.
- 🔵 then click the blue button **Run Python Code** in the Output tab to see the result of your generated code.
---

🧩 **What does each block do?**
- The **describe** block shows you an overview of all columns and their values – this helps you understand the structure of the data
---

📄 **Here’s what you’ll see (shortened):**

\`\`\`
        year        month     ...    sdev        unc
count   305.0000    305.0000  ...    305.0000    305.0000
mean    2012.213    6.442623  ...    0.556459    0.208459
std     7.351859    3.462794  ...    0.222595    0.088748
min     2000.000    1.000000  ...    0.150000    0.060000
25%     2006.000    3.000000  ...    0.400000    0.150000
50%     2012.000    6.000000  ...    0.520000    0.200000
75%     2019.000    9.000000  ...    0.650000    0.240000
max     2025.000    12.00000  ...    1.310000    0.580000

[8 rows x 8 columns]
\`\`\`

This is a shortened version of the output. You can see the full output by dragging the **Display all rows and columns** block from the **Data** > **Data Inspection** category into the turquoise editor area and attaching it below the **print** block.

---

🔍 **What does this mean?**

- Each **column** contains info about a feature (e.g. month, CO₂ value, uncertainty).
- Each row in the result shows a statistical measure:
  - **count** = number of values
  - **mean** = average
  - **std** = standard deviation (how much the values vary)
  - **min** = smallest value
  - **25%** = lower quarter of the data
  - **50%** = median (middle value)
  - **75%** = upper quarter of the data
  - **max** = largest value

---

🔍 **Reflection questions:**
- Which columns contain numbers that differ especially strongly?
- What does the difference between minimum and maximum tell you about the development of the CO₂ content?
- Are there columns whose meaning you first have to figure out?

💡 **What you’ll learn:**  
- How to quickly get an overview of a dataset  
- What typical statistical measures mean  
- How to combine variables and blocks to explore data
`,
    },
    {
      title: "4. Visualise",
      content: `📈 Now we’ll create a **visualisation** of the CO₂ data.

---

🎯 Goal: A line chart showing how the CO₂ value changes over time.

---

🛠 **Step-by-step instructions:**

1. 👉 Open the **Data Manipulation** category on the left  
   and drag the **Get column** block into the editor.

2. ✏️ In the block, enter the correct values:  
   - Click on the white text field and write: \`decimal date\` to select the column for time. 
   - Select your variable \`co2\` in the dropdown list behind it to select the dataset.

3. 🟣 Open the **Variables** category  
   and create a new variable called \`decimal_date\`, just as you created the variable \`co2\` before. 
   Drag the **set decimal_date to** block into the editor.
   Then place the **Get column** block to the right of the **set decimal_date to** block.

   ✅ Now the time values are stored in their own variable.

---

4. 👉 Repeat the same for the column \`average\`:
   - Drag another **Get column** block into the editor.
   - Click on the text field and write: \`average\` to select the column for the average CO₂ value.
   - Select your variable \`co2\` in the dropdown list behind it to select the dataset.
   - Create a new variable called \`co2_avg\`
   - Place the **Get column** block next to the **set co2_avg to** block

---

5. 📊 Open the **Visualisation** category  
   and drag the **Line plot** block into the editor.

6. 🖱 Set up the block like this:
   - **X values**: \`decimal_date\`  (time axis)
   - **Y values**: \`co2_avg\`       (CO₂ values)
   - Choose a nice color for the line :)
   - You can choose the sizes you prefer, but why don't we start with 10 for width and 10 for height?
   - Don't hesitate to add labels and a title to your plot!

✏️ To set the X and Y axes, drag the corresponding variables (e.g. \`decimal_date\`) into the appropriate fields in the visualisation block.

---
🧩 **What does each block do?**
- **Get column** selects a specific column from a table.
- **set ... to** stores the result in a new variable so you can use it for visualisation.
- The visualisation block creates a chart from the selected data.

🧩 Connect the blocks together (also with the blocks from previous steps, so that all blocks are linked together)

🟢 Click **Generate Python Code** in the Code tab    
🔵 Then **Run Python Code** in the Output tab

---

🔍 **Reflection questions:**
- Is the CO₂ value rising overall?
- Is the increase rather slow or fast?
- How even is the trend?
- How much does the CO₂ value fluctuate during a year?
- Is there a similar pattern every year?
- What could cause the regular rise and fall?

💡 **What you’ll learn:**
- How to select columns from datasets  
- How to create variables to reuse data  
- How to create simple charts to make trends visible
`,
    },
    {
      title: "5. Export plot",
      content: `🖼️ You can choose to save your plot* as an **image**:
 - Right-click the image, then select "Save image as..." to download it as a .jpeg file.

📑 Or as a **.pdf** file:
 - Click on the **Open plot in new tab** button, click Ctrl + P (or Cmd + P on Mac), and select "Save as PDF" as the destination.

📌 This way you can share or document your results.

--- 
*Plot is the term for a graphical representation of data – e.g. a line chart, bar chart, or scatter plot. `,
    },
    {
      title: "You're ready!",
      content: `✅ You've completed the tutorial.

Now you're ready to explore SPOCKLY on your own!

Load your own data, create charts or maps – or revisit earlier steps anytime.

Have fun exploring!`
    },
  ],
};
export default co2TutorialPython;
