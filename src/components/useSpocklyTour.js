// Shepherd Tour Setup in SPOCKLY (React)
// This hook creates a guided tour using Shepherd.js to introduce the UI components to the user

import React, { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const useSpocklyTour = () => {
  useEffect(() => {
    // Prevent the tour from being redefined more than once
    if (window.__spocklyTourInstance) return;

    // Initialize the tour with default style and overlay
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shadow-md bg-white rounded-xl p-4 text-gray-900',
        scrollTo: false, // avoid layout shifts
        cancelIcon: { enabled: true }
      },
      useModalOverlay: true
    });

    // Store tour instance on window for external triggering
    window.__startSpocklyTour = () => tour.start();
    window.__spocklyTourInstance = tour;

    // Blockly workspace container
    tour.addStep({
      id: 'workspace',
      title: 'Workspace',
      text: 'This is your workspace. Use blocks here to build your data analysis workflow.',
      attachTo: { element: '#blocklyWorkspaceContainer', on: 'bottom' },
      buttons: [{ text: 'Next', action: tour.next }]
    });

    // Block category sidebar
    tour.addStep({
      id: 'category',
      title: 'Block Categories',
      text: 'Choose a category to start your SPOCKLY workflow. Each category contains blocks related to specific tasks such as data loading and -manipulation.',
      attachTo: { element: '.blocklyToolbox', on: 'right' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Upload data button
    tour.addStep({
      id: 'upload-data',
      title: 'Upload Data',
      text: 'Click here to upload your data files such as CSV, GeoJSON, or TIF.',
      attachTo: { element: '#uploadDataButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Create data button
    tour.addStep({
      id: 'create-data',
      title: 'Create Data',
      text: 'Click here to create your own datasets.',
      attachTo: { element: '#createDataButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Beginner/Advanced mode toggle
    tour.addStep({
      id: 'switch-levels',
      title: 'Switch Levels',
      text: 'Use this button to switch between beginner and advanced level. Advanced level contains more categories and more complex blocks and is made for students who have a broader knowledge of spatial data. Beginner level is for students with little to no knowledge of spatial data and programming.',
      attachTo: { element: '#switchLevelsButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Co2 usecase tour
    tour.addStep({
      id: 'co2-usecase',
      title: 'CO2 Analysis Use Case Tutorial',
      text: 'This is a specific use case for analyzing CO2 emissions. Click here to learn more about this example. It will guide you through a predefined workflow.',
      attachTo: { element: '#showTutorialButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Help tab view
    tour.addStep({
      id: 'helpTab',
      title: 'Help Tab',
      text: 'This tab provides help and documentation for every block.',
      attachTo: { element: '#helpTab', on: 'top' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // R code tab view
    tour.addStep({
      id: 'code-output',
      title: 'R Code View',
      text: 'This tab shows the R code generated from your blocks after clicking "Generate R Code". You can also download, copy, or reset the code from here.',
      attachTo: { element: '#codeTab', on: 'top' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

/*     // Generate code button
    tour.addStep({
      id: 'generate-r-code',
      title: 'Generate R Code',
      text: 'Click this button to generate the R code based on your blocks.',
      attachTo: { element: '#generateCodeButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Download code button
    tour.addStep({
      id: 'download-r-code',
      title: 'Download R Code',
      text: 'Click here to download the generated R code as R file.',
      attachTo: { element: '#downloadCodeButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Copy code button
    tour.addStep({
      id: 'copy-code',
      title: 'Copy R Code',
      text: 'Click here to copy the generated R code to your clipboard.',
      attachTo: { element: '#copyCodeButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Reset code button
    tour.addStep({
      id: 'reset-code',
      title: 'Reset R Code',
      text: 'Click here to reset the generated R code.',
      attachTo: { element: '#resetCodeButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    });

    // Full code view button
    tour.addStep({
      id: 'full-code-view',
      title: 'Full Code View',
      text: 'Click here to view the full R code in a separate window.',
      attachTo: { element: '#fullSizeButton', on: 'left' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Next', action: tour.next }
      ]
    }); */

    // Output tab view
    tour.addStep({
      id: 'output-tab',
      title: 'Output View',
      text: 'In this tab, you will see the output of your code, for example plots. Click on "Run R Code" to execute the code and see the results.',
      attachTo: { element: '#outputTab', on: 'top' },
      buttons: [
        { text: 'Back', action: tour.back },
        { text: 'Finish', action: tour.complete }
      ]
    });
  }, []);
};

export default useSpocklyTour;
