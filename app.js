import { SUPABASE_CONFIG } from './supabase-config.js';

// --- Built-in Answer Key and Explanations for the Microprocessor Midterm ---
const DEFAULT_ANSWERS = {
    // 0-indexed questions (which correspond to lines 2-61 of the CSV)
    0: { correct: 0, explanation: "An embedded system is a dedicated computer system designed to perform specific control functions within a larger mechanical or electrical system, combining hardware and software." },
    1: { correct: 2, explanation: "A 7-segment display consists of seven LEDs arranged in a figure-eight pattern. By turning individual segments on or off, it can display numerals from 0 to 9 and some letters." },
    2: { correct: 0, explanation: "In a common anode display, all the positive terminals (anodes) of the LEDs are tied together to VCC (logic 1 or 5V). To turn a segment on, the cathode must be pulled to logic 0 (ground)." },
    3: { correct: 0, explanation: "In a common cathode display, all the negative terminals (cathodes) of the LEDs are tied together to ground (logic 0). To turn a segment on, the anode must be pulled to logic 1 (high)." },
    4: { correct: 1, explanation: "The Arduino Uno has 14 digital input/output pins, numbered from 0 to 13." },
    5: { correct: 1, explanation: "The Arduino Uno has 6 analog input pins, labeled A0 through A5." },
    6: { correct: 3, explanation: "ROM (Read-Only Memory) is programmed at the factory during fabrication. PROMs and EPROMs are programmed by the developer, and BIOS is stored in rewritable Flash/EEPROM, so ROM is 'None of the above'." },
    7: { correct: 3, explanation: "All of these are key advantages of SPI (Serial Peripheral Interface): simple hardware interfacing, full-duplex communication (MISO/MOSI), and low power consumption." },
    8: { correct: 3, explanation: "All of these make TWI (Two-Wire Interface / I2C) highly valuable: fewer IC pins than SPI, formal standards, and software-based slave addressing." },
    9: { correct: 1, explanation: "SPI typically operates at much higher speeds, frequently greater than 10 MHz (and up to 50 MHz+), whereas TWI/I2C is generally slower (100kHz, 400kHz, or up to 3.4MHz)." },
    10: { correct: 1, explanation: "A locator is a development tool that assigns physical memory addresses to the object code, positioning it in the system memory map." },
    11: { correct: 3, explanation: "An assembler list file contains the translated binary code (machine code), assembly language statements, and offsets/addresses of the instructions." },
    12: { correct: 1, explanation: "A cross assembler runs on one platform (like a PC) but generates machine code for a different target architecture (like a specific microcontroller), making it independent of the target machine." },
    13: { correct: 2, explanation: "A linker typically assigns relative addresses starting from zero, which are later resolved to absolute addresses by the loader or locator." },
    14: { correct: 2, explanation: "A compiler generates application programs and translates high-level code to machine-level code." },
    15: { correct: 0, explanation: "An editor is the tool used to write and modify source files in assembly or high-level languages." },
    16: { correct: 3, explanation: "EPROMs are erasable with UV light and reprogrammable, making them vital during the development cycle for debugging hardware/software prototypes and loading programs." },
    17: { correct: 1, explanation: "GPIO stands for General Purpose Input Output Pins, which can be dynamically configured as inputs or outputs via software." },
    18: { correct: 3, explanation: "Shields are pre-built circuit boards that plug on top of an Arduino to expand its capabilities (e.g., Ethernet shield, motor shield)." },
    19: { correct: 3, explanation: "Arduino hardware designs are open-source (CC-BY-SA), while its IDE software and core libraries are distributed under LGPL or GPL licenses." },
    20: { correct: 1, explanation: "IDE stands for Integrated Development Environment, which combines a text editor, compiler, and uploader in a single interface." },
    21: { correct: 3, explanation: "The Arduino Leonardo was the first development board to feature a microcontroller (ATmega32u4) with built-in USB communication, eliminating the need for a secondary USB-to-serial chip." },
    22: { correct: 1, explanation: "A program written for Arduino in its IDE is called a Sketch." },
    23: { correct: 2, explanation: "The LilyPad Arduino is designed for e-textiles and wearable projects. Its circular shape and large sew tabs allow it to be sewn directly into clothing with conductive thread." },
    24: { correct: 1, explanation: "The setup() function is called once when the Arduino board starts or resets. It is used to initialize pin modes, start serial communication, or configure peripherals." },
    25: { correct: 1, explanation: "In C++ and Arduino, /* starts a multi-line comment, and */ ends it. Comments are ignored by the compiler." },
    26: { correct: 3, explanation: "The Arduino Board is the physical development board containing the microcontroller chip, inputs/outputs, voltage regulator, and support circuitry." },
    27: { correct: 2, explanation: "An in-circuit emulator (ICE) replaces the actual microcontroller chip on the development board to allow real-time debugging, tracing, and register inspection." },
    28: { correct: 2, explanation: "An ICE allows developers to halt execution (breakpoints) to examine the exact state of internal CPU registers and memory." },
    29: { correct: 1, explanation: "Simulators model the CPU execution inside a software environment. Real-time I/O operations are difficult to simulate accurately because they depend on physical external hardware response times." },
    30: { correct: 3, explanation: "A logic analyzer can display data in logic states (binary/hex tables), state maps, or timing diagrams (waveforms)." },
    31: { correct: 3, explanation: "In active-low driving, the LED anode is connected to VCC and the cathode to the GPIO pin. Setting the pin to LOW (ground) completes the circuit, sinking the current and lighting the LED." },
    32: { correct: 3, explanation: "A resistor of 220 to 330 ohms is standard for limiting LED current to safe levels (10-20mA) when powered by 5V or 3.3V GPIO pins." },
    33: { correct: 2, explanation: "For an LED controlled by a push button via software, the LED's state depends on whether the button is closed (button press) and if the microcontroller drives the output pin low/high." },
    34: { correct: 3, explanation: "In C++/Arduino, a variable is declared by specifying its type (e.g., int) followed by the variable name and a semicolon." },
    35: { correct: 1, explanation: "The setup() function is the standard initialization block in an Arduino sketch." },
    36: { correct: 0, explanation: "The delay(ms) function pauses sketch execution for the specified number of milliseconds." },
    37: { correct: 2, explanation: "The analogRead(pin) function reads the voltage on an analog input pin." },
    38: { correct: 1, explanation: "The Arduino Uno's ADC (Analog-to-Digital Converter) has 10-bit resolution, which maps input voltages between 0V and 5V to integer values from 0 to 1023." },
    39: { correct: 0, explanation: "The digitalWrite(pin, value) function writes a HIGH (5V/3.3V) or LOW (0V) level to a digital pin." },
    40: { correct: 0, explanation: "The pinMode(pin, mode) function configures a specific digital pin to behave either as an INPUT, OUTPUT, or INPUT_PULLUP." },
    41: { correct: 0, explanation: "Serial.begin(baud) initializes serial communication with the host computer, setting the transmission rate in bits per second (baud rate, e.g., 9600)." },
    42: { correct: 2, explanation: "The map(value, fromLow, fromHigh, toLow, toHigh) function scales an integer value from one range to another." },
    43: { correct: 2, explanation: "After calling setup(), the Arduino IDE executes the loop() function continuously in an infinite loop, driving the microcontroller's main program logic." },
    44: { correct: 0, explanation: "The ampersand & is the bitwise AND operator in C/C++." },
    45: { correct: 0, explanation: "Bitwise AND comparison: 1010 & 1100 = 1000. Bits are set to 1 only where both input bits are 1." },
    46: { correct: 1, explanation: "The vertical bar | is the bitwise OR operator in C/C++." },
    47: { correct: 1, explanation: "Bitwise OR comparison: 1010 | 1100 = 1110. Bits are set to 1 where at least one input bit is 1." },
    48: { correct: 2, explanation: "The caret ^ is the bitwise XOR (exclusive OR) operator in C/C++." },
    49: { correct: 1, explanation: "The pre-increment operator ++x increments x first (from 5 to 6) and then evaluates the expression. Thus, x becomes 6." },
    50: { correct: 2, explanation: "The post-increment operator y++ evaluates the expression first (evaluates to 10) and then increments y (from 10 to 11). Since the question asks for the value of y after execution, it is 11." },
    51: { correct: 1, explanation: "The variable a is incremented twice: once by a++ and once by ++a. Starting at 3, its final value is 3 + 1 + 1 = 5." },
    52: { correct: 1, explanation: "The variable b is incremented twice: once by ++b and once by b++. Starting at 2, its final value is 2 + 1 + 1 = 4." },
    53: { correct: 1, explanation: "The variable c is decremented twice: once by c-- and once by --c. Starting at 7, its final value is 7 - 1 - 1 = 5." },
    54: { correct: 0, explanation: "The variable d is decremented once (d--) and incremented once (d++). Starting at 8, it ends up at 8 (8 - 1 + 1 = 8)." },
    55: { correct: 1, explanation: "The logical AND operator && returns true only if both operands are true. true && false evaluates to false." },
    56: { correct: 2, explanation: "The logical expression sets condition to true, but does not modify x. Thus, x remains 5." },
    57: { correct: 2, explanation: "The logical expression sets condition to true, but does not modify y. Thus, y remains 10." },
    58: { correct: 2, explanation: "The logical expression sets condition to true, but does not modify w. Thus, w remains 4." },
    59: { correct: 2, explanation: "The logical expression sets condition to true, but does not modify v. Thus, v remains 12." }
};

// --- Application State ---
let appState = {
    currentTopic: 'micro',   // 'micro' or 'ccna2'
    fileName: '',
    questions: [],          // Parsed questions array: { question, options: [], correctAnswers: [], answerIdx, isMultiSelect, explanation }
    currentQuizIdx: 0,
    currentFlashIdx: 0,
    userAnswers: [],        // Tracks user choices: { selectedIndices: [], isCorrect, submitted }
    bookmarks: new Set(),   // Set of bookmarked question indices
    stats: {
        attempts: 0,
        avgScoreSum: 0,
        quizzesTaken: 0,
        correctCount: 0,
        incorrectCount: 0
    },
    timerInterval: null,
    timerSeconds: 0,
    activeTab: 'quiz',
    studyGuideAnswersVisible: false,
    theme: 'dark'
};

// --- DOM References ---
const themeToggle = document.getElementById('theme-toggle');
const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const fileDetails = document.getElementById('file-details');
const activeFilename = document.getElementById('active-filename');
const activeQcount = document.getElementById('active-qcount');
const resetStatsBtn = document.getElementById('reset-stats-btn');
const clearDataBtn = document.getElementById('clear-data-btn');

const statAttempts = document.getElementById('stat-attempts');
const statAvgScore = document.getElementById('stat-avg-score');
const statFlagged = document.getElementById('stat-flagged');

const welcomeView = document.getElementById('welcome-view');
const reviewerInterface = document.getElementById('reviewer-interface');
const tabButtons = document.querySelectorAll('.tab-btn');
const modeViews = document.querySelectorAll('.mode-view');

// Quiz View DOM Elements
const quizCurrentIdx = document.getElementById('quiz-current-idx');
const quizTotalIdx = document.getElementById('quiz-total-idx');
const quizCorrectCount = document.getElementById('quiz-correct-count');
const quizIncorrectCount = document.getElementById('quiz-incorrect-count');
const quizTime = document.getElementById('quiz-time');
const quizProgressBar = document.getElementById('quiz-progress-bar');
const quizQuestionText = document.getElementById('quiz-question-text');
const quizOptionsContainer = document.getElementById('quiz-options-container');
const explanationPanel = document.getElementById('explanation-panel');
const explanationText = document.getElementById('explanation-text');
const quizPrevBtn = document.getElementById('quiz-prev-btn');
const quizShowAnsBtn = document.getElementById('quiz-show-ans-btn');
const quizNextBtn = document.getElementById('quiz-next-btn');
const quizBookmarkBtn = document.getElementById('quiz-bookmark-btn');

// Flashcards View DOM Elements
const flashCurrentIdx = document.getElementById('flash-current-idx');
const flashTotalIdx = document.getElementById('flash-total-idx');
const flashFilterBookmarked = document.getElementById('flash-filter-bookmarked');
const flashcard = document.getElementById('flashcard');
const flashQuestionText = document.getElementById('flash-question-text');
const flashAnswerLetter = document.getElementById('flash-answer-letter');
const flashAnswerText = document.getElementById('flash-answer-text');
const flashPrevBtn = document.getElementById('flash-prev-btn');
const flashNextBtn = document.getElementById('flash-next-btn');
const flashWrongBtn = document.getElementById('flash-wrong-btn');
const flashRightBtn = document.getElementById('flash-right-btn');

// Study Guide View DOM Elements
const studySearch = document.getElementById('study-search');
const studyFilterBookmarked = document.getElementById('study-filter-bookmarked');
const studyToggleAnswers = document.getElementById('study-toggle-answers');
const studyList = document.getElementById('study-list');

const toastContainer = document.getElementById('toast-container');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Determine current topic (default: 'micro')
    appState.currentTopic = localStorage.getItem('antigravity_reviewer_last_topic') || 'micro';
    
    setupEventListeners();
    setupThemeUI();
    
    // Select the topic
    selectTopic(appState.currentTopic);
});

// --- Theme Setup ---
function setupThemeUI() {
    // Apply saved theme
    if (appState.theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    if (document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = `
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        `;
    } else {
        themeToggle.innerHTML = `
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        `;
    }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            appState.theme = 'light';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            appState.theme = 'dark';
        }
        updateThemeToggleIcon();
        saveSavedData();
        showToast("Theme toggled!", "info");
    });

    // Reset Statistics
    resetStatsBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset your statistics?")) {
            appState.stats = {
                attempts: 0,
                avgScoreSum: 0,
                quizzesTaken: 0,
                correctCount: 0,
                incorrectCount: 0
            };
            saveSavedData();
            updateStatsUI();
            showToast("Statistics reset successfully!", "success");
        }
    });

    // Clear Saved Data
    clearDataBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("This will clear all bookmarks, score histories, and custom settings. Proceed?")) {
            localStorage.clear();
            location.reload();
        }
    });

    // Mode tab navigation
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetMode = btn.dataset.mode;
            switchMode(targetMode);
        });
    });

    // Quiz Controls
    quizPrevBtn.addEventListener('click', navigateQuizPrev);
    quizNextBtn.addEventListener('click', navigateQuizNext);
    quizShowAnsBtn.addEventListener('click', handleQuizRevealOrSubmit);
    quizBookmarkBtn.addEventListener('click', toggleQuizBookmark);

    // Topic Selector Buttons
    const topicMicroBtn = document.getElementById('topic-micro-btn');
    const topicCcnaBtn = document.getElementById('topic-ccna2-btn');
    if (topicMicroBtn) topicMicroBtn.addEventListener('click', () => selectTopic('micro'));
    if (topicCcnaBtn) topicCcnaBtn.addEventListener('click', () => selectTopic('ccna2'));

    // Flashcard interaction
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    flashPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateFlashcard(-1);
    });

    flashNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateFlashcard(1);
    });

    flashWrongBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        flashcardFeedback(false);
    });

    flashRightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        flashcardFeedback(true);
    });

    flashFilterBookmarked.addEventListener('change', () => {
        appState.currentFlashIdx = 0;
        renderFlashcard();
    });

    // Study Guide Filter & Search
    studySearch.addEventListener('input', renderStudyList);
    
    studyFilterBookmarked.addEventListener('click', () => {
        studyFilterBookmarked.classList.toggle('active');
        renderStudyList();
    });

    studyToggleAnswers.addEventListener('click', () => {
        appState.studyGuideAnswersVisible = !appState.studyGuideAnswersVisible;
        if (appState.studyGuideAnswersVisible) {
            studyToggleAnswers.textContent = "Hide All Answers";
        } else {
            studyToggleAnswers.textContent = "Show All Answers";
        }
        renderStudyList();
    });
}

// --- CSV Parsing Engine ---
function parseCSV(text) {
    let lines = [];
    let row = [""];
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        let next = text[i+1];
        
        if (c === '"') {
            if (inQuotes && next === '"') {
                row[row.length - 1] += '"';
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (c === ',') {
            if (inQuotes) {
                row[row.length - 1] += c;
            } else {
                row.push("");
            }
        } else if (c === '\r' || c === '\n') {
            if (inQuotes) {
                row[row.length - 1] += c;
            } else {
                if (c === '\r' && next === '\n') {
                    i++;
                }
                lines.push(row);
                row = [""];
            }
        } else {
            row[row.length - 1] += c;
        }
    }
    if (row.length > 1 || row[0] !== "") {
        lines.push(row);
    }
    return lines;
}

// --- File Handling Logic ---
async function loadMicroprocessorCSV() {
    try {
        const microBtn = document.getElementById('topic-micro-btn');
        if (microBtn) {
            microBtn.disabled = true;
            microBtn.querySelector('span').textContent = "Loading Midterm...";
        }
        
        const response = await fetch('microprocessor_midterm.csv');
        if (!response.ok) {
            throw new Error(`Failed to fetch local file. HTTP ${response.status}`);
        }
        const text = await response.text();
        processCSVText("microprocessor_midterm.csv", text);
        showToast("Microprocessor Finals loaded successfully!", "success");
    } catch (err) {
        console.error(err);
        showToast("Could not find the local CSV file.", "error");
    } finally {
        const microBtn = document.getElementById('topic-micro-btn');
        if (microBtn) {
            microBtn.disabled = false;
            microBtn.querySelector('span').textContent = "Microprocessor Finals";
        }
    }
}

async function loadCCNA2CSV() {
    try {
        const ccnaBtn = document.getElementById('topic-ccna2-btn');
        if (ccnaBtn) {
            ccnaBtn.disabled = true;
            ccnaBtn.querySelector('span').textContent = "Loading CCNA2...";
        }
        
        const response = await fetch('CCNA2_SRWE_Reviewer.csv');
        if (!response.ok) {
            throw new Error(`Failed to fetch CCNA2 CSV. HTTP ${response.status}`);
        }
        const text = await response.text();
        processCSVText("CCNA2_SRWE_Reviewer.csv", text);
        showToast("CCNA2 SRWE Reviewer loaded successfully!", "success");
    } catch (err) {
        console.error(err);
        showToast("Could not find the CCNA2 CSV file.", "error");
    } finally {
        const ccnaBtn = document.getElementById('topic-ccna2-btn');
        if (ccnaBtn) {
            ccnaBtn.disabled = false;
            ccnaBtn.querySelector('span').textContent = "CCNA2 SRWE Reviewer";
        }
    }
}

function handleCSVFile(file) {
    if (!file.name.endsWith('.csv')) {
        showToast("Invalid file type. Please upload a .csv file.", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        processCSVText(file.name, text);
        showToast(`Loaded: ${file.name}`, "success");
    };
    reader.onerror = () => {
        showToast("Error reading file.", "error");
    };
    reader.readAsText(file);
}

function processCSVText(fileName, csvText) {
    const parsedData = parseCSV(csvText);
    if (parsedData.length < 2) {
        showToast("CSV file appears to be empty or misformatted.", "error");
        return;
    }

    const header = parsedData[0].map(h => h.trim().toLowerCase());
    const qIndex = header.indexOf('question');
    const aIndex = header.indexOf('a');
    const bIndex = header.indexOf('b');
    const cIndex = header.indexOf('c');
    const dIndex = header.indexOf('d');
    const answerColIndex = header.findIndex(h => h.includes('answer') || h.includes('correct') || h === 'key');

    if (qIndex === -1 || aIndex === -1 || bIndex === -1 || cIndex === -1 || dIndex === -1) {
        showToast("CSV must contain columns: 'Question', 'A', 'B', 'C', 'D'.", "error");
        return;
    }

    const isDefaultFile = fileName.toLowerCase().includes("microprocessor");

    const processedQuestions = [];
    for (let i = 1; i < parsedData.length; i++) {
        const row = parsedData[i];
        if (row.length < 5 || !row[qIndex]) continue; // Skip incomplete lines

        const questionText = row[qIndex].trim();
        
        // Generic option extraction
        let options = [];
        let rawAnswer = '';
        
        if (answerColIndex !== -1 && row.length > answerColIndex) {
            // Options are all columns between index 1 and the last column (which is the answer)
            for (let colIdx = 1; colIdx < row.length - 1; colIdx++) {
                options.push(row[colIdx] ? row[colIdx].trim() : '');
            }
            rawAnswer = row[row.length - 1] ? row[row.length - 1].trim() : '';
        } else {
            // Microprocessor local file has no answer column, options are up to the end
            for (let colIdx = 1; colIdx < row.length; colIdx++) {
                options.push(row[colIdx] ? row[colIdx].trim() : '');
            }
        }

        // Determine correct answer(s)
        let correctAnswers = [];
        let explanation = '';

        if (isDefaultFile && DEFAULT_ANSWERS[i - 1] !== undefined) {
            correctAnswers = [DEFAULT_ANSWERS[i - 1].correct];
            explanation = DEFAULT_ANSWERS[i - 1].explanation;
        } else if (rawAnswer) {
            // Find letters A to H as isolated words/letters
            const matches = rawAnswer.match(/\b[A-H]\b/g);
            if (matches) {
                const uniqueLetters = [...new Set(matches)];
                correctAnswers = uniqueLetters.map(letter => letter.charCodeAt(0) - 65); // 'A' -> 0
            } else {
                // Digits fallback
                const digits = rawAnswer.match(/[0-7]/g);
                if (digits) {
                    correctAnswers = [...new Set(digits.map(d => parseInt(d)))];
                }
            }
        }

        const isMultiSelect = correctAnswers.length > 1;

        processedQuestions.push({
            question: questionText,
            options: options,
            correctAnswers: correctAnswers,
            answerIdx: correctAnswers.length > 0 ? correctAnswers[0] : -1, // compatibility
            isMultiSelect: isMultiSelect,
            explanation: explanation || (correctAnswers.length > 0 
                ? `Correct option(s): ${correctAnswers.map(idx => String.fromCharCode(65 + idx)).join(', ')}.` 
                : "No explanation available.")
        });
    }

    if (processedQuestions.length === 0) {
        showToast("No valid questions parsed from the CSV file.", "error");
        return;
    }

    // Update state
    appState.fileName = fileName;
    appState.questions = processedQuestions;
    appState.currentQuizIdx = 0;
    appState.currentFlashIdx = 0;
    appState.userAnswers = new Array(processedQuestions.length).fill(null);

    // Save statistics increment
    appState.stats.attempts++;
    saveSavedData();

    // UI Updates
    if (activeFilename) activeFilename.textContent = fileName;
    if (activeQcount) activeQcount.textContent = processedQuestions.length;
    if (fileDetails) fileDetails.classList.remove('hidden');
    
    if (welcomeView) welcomeView.classList.add('hidden');
    if (reviewerInterface) reviewerInterface.classList.remove('hidden');

    updateStatsUI();
    startQuizTimer();
    
    // Switch to active tab and render
    switchMode(appState.activeTab);
}

// --- Timer Logic ---
function startQuizTimer() {
    if (appState.timerInterval) clearInterval(appState.timerInterval);
    appState.timerSeconds = 0;
    quizTime.textContent = "00:00";
    
    appState.timerInterval = setInterval(() => {
        appState.timerSeconds++;
        const mins = Math.floor(appState.timerSeconds / 60).toString().padStart(2, '0');
        const secs = (appState.timerSeconds % 60).toString().padStart(2, '0');
        quizTime.textContent = `${mins}:${secs}`;
    }, 1000);
}

// --- Mode Switching Tab Control ---
function switchMode(mode) {
    appState.activeTab = mode;
    tabButtons.forEach(btn => {
        if (btn.dataset.mode === mode) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    modeViews.forEach(view => {
        if (view.id === `${mode}-view`) view.classList.remove('hidden');
        else view.classList.add('hidden');
    });

    if (mode === 'quiz') {
        renderQuizQuestion();
    } else if (mode === 'flashcards') {
        flashcard.classList.remove('flipped');
        renderFlashcard();
    } else if (mode === 'study') {
        renderStudyList();
    }
}

// --- Quiz Rendering & Navigation ---
function renderQuizQuestion() {
    if (appState.questions.length === 0) return;

    const q = appState.questions[appState.currentQuizIdx];
    quizCurrentIdx.textContent = appState.currentQuizIdx + 1;
    quizTotalIdx.textContent = appState.questions.length;

    // Progress bar
    const progressPct = ((appState.currentQuizIdx + 1) / appState.questions.length) * 100;
    quizProgressBar.style.width = `${progressPct}%`;

    // Counters
    const correctCount = appState.userAnswers.filter(ans => ans && ans.submitted && ans.isCorrect).length;
    const incorrectCount = appState.userAnswers.filter(ans => ans && ans.submitted && !ans.isCorrect).length;
    quizCorrectCount.textContent = correctCount;
    quizIncorrectCount.textContent = incorrectCount;

    // Text
    quizQuestionText.textContent = q.question;

    // Bookmark status
    if (appState.bookmarks.has(appState.currentQuizIdx)) {
        quizBookmarkBtn.classList.add('active');
    } else {
        quizBookmarkBtn.classList.remove('active');
    }

    // Options grid
    quizOptionsContainer.innerHTML = '';
    const userAnswer = appState.userAnswers[appState.currentQuizIdx];

    q.options.forEach((opt, idx) => {
        if (!opt) return; // Skip empty option text

        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        const optLetter = String.fromCharCode(65 + idx);
        btn.innerHTML = `
            <span class="option-badge">${optLetter}</span>
            <span>${escapeHTML(opt)}</span>
        `;

        if (userAnswer !== null && userAnswer.submitted) {
            btn.classList.add('disabled');
            const isCorrect = q.correctAnswers.includes(idx);
            const isSelected = userAnswer.selectedIndices && userAnswer.selectedIndices.includes(idx);
            
            if (isCorrect) {
                if (isSelected || !q.isMultiSelect) {
                    btn.classList.add('selected-correct');
                } else {
                    btn.classList.add('should-have-selected');
                }
            } else if (isSelected) {
                btn.classList.add('selected-incorrect');
            }
        } else {
            // Not yet submitted
            const isSelected = userAnswer !== null && userAnswer.selectedIndices && userAnswer.selectedIndices.includes(idx);
            if (isSelected) {
                btn.classList.add('active-selected');
            }

            btn.addEventListener('click', () => {
                if (q.isMultiSelect) {
                    toggleMultiSelectOption(idx);
                } else {
                    submitSingleSelectOption(idx);
                }
            });
        }

        quizOptionsContainer.appendChild(btn);
    });

    // Explanation panel
    if (userAnswer !== null && userAnswer.submitted && q.correctAnswers.length > 0) {
        explanationText.textContent = q.explanation;
        explanationPanel.classList.remove('hidden');
    } else {
        explanationPanel.classList.add('hidden');
    }

    // Reveal/Submit Button
    if (userAnswer !== null && userAnswer.submitted) {
        quizShowAnsBtn.style.display = 'none';
    } else {
        quizShowAnsBtn.style.display = 'block';
        if (q.isMultiSelect && userAnswer !== null && userAnswer.selectedIndices && userAnswer.selectedIndices.length > 0) {
            quizShowAnsBtn.textContent = "Submit Answer";
            quizShowAnsBtn.className = "btn btn-primary";
        } else {
            quizShowAnsBtn.textContent = "Reveal Answer";
            quizShowAnsBtn.className = "btn btn-secondary";
        }
    }

    // Toggle button disable states
    quizPrevBtn.disabled = appState.currentQuizIdx === 0;
    
    if (appState.currentQuizIdx === appState.questions.length - 1) {
        quizNextBtn.innerHTML = `
            Finish Review
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 5-5-5-5 5"/><path d="M17 19H7"/></svg>
        `;
    } else {
        quizNextBtn.innerHTML = `
            Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        `;
    }
}

function submitSingleSelectOption(idx) {
    if (appState.questions.length === 0) return;
    const q = appState.questions[appState.currentQuizIdx];
    const isCorrect = q.correctAnswers.length === 0 ? true : q.correctAnswers.includes(idx);

    // Record answer
    appState.userAnswers[appState.currentQuizIdx] = {
        selectedIndices: [idx],
        isCorrect: isCorrect,
        submitted: true
    };

    // Increment statistics
    if (q.correctAnswers.length > 0) {
        if (isCorrect) {
            appState.stats.correctCount++;
        } else {
            appState.stats.incorrectCount++;
        }
        updateStatsRatio();
    }

    saveSavedData();
    updateStatsUI();
    renderQuizQuestion();

    if (isCorrect) {
        showToast("Correct!", "success");
    } else {
        showToast("Incorrect answer. Check the explanation.", "error");
    }
}

function toggleMultiSelectOption(idx) {
    if (appState.questions.length === 0) return;
    const q = appState.questions[appState.currentQuizIdx];
    
    let userAnswer = appState.userAnswers[appState.currentQuizIdx];
    if (userAnswer === null) {
        userAnswer = {
            selectedIndices: [],
            isCorrect: false,
            submitted: false
        };
        appState.userAnswers[appState.currentQuizIdx] = userAnswer;
    }
    
    const indexInSelection = userAnswer.selectedIndices.indexOf(idx);
    if (indexInSelection > -1) {
        userAnswer.selectedIndices.splice(indexInSelection, 1);
    } else {
        userAnswer.selectedIndices.push(idx);
    }
    
    renderQuizQuestion();
}

function updateStatsRatio() {
    const total = appState.stats.correctCount + appState.stats.incorrectCount;
    if (total > 0) {
        const score = Math.round((appState.stats.correctCount / total) * 100);
        appState.stats.avgScoreSum = score;
        appState.stats.quizzesTaken = 1; // Basic normalization for user metrics
    }
}

function navigateQuizPrev() {
    if (appState.currentQuizIdx > 0) {
        appState.currentQuizIdx--;
        renderQuizQuestion();
    }
}

function navigateQuizNext() {
    if (appState.currentQuizIdx < appState.questions.length - 1) {
        appState.currentQuizIdx++;
        renderQuizQuestion();
    } else {
        // Finished Quiz Screen / Stats Dialog
        const totalAnswers = appState.userAnswers.filter(ans => ans !== null && ans.submitted).length;
        const correctAnswers = appState.userAnswers.filter(ans => ans && ans.submitted && ans.isCorrect).length;
        const pct = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
        
        // Show result summary
        alert(`Review Completed!\nScore: ${correctAnswers}/${totalAnswers} (${pct}%)`);
        
        // Reset and run again
        if (confirm("Would you like to restart the quiz practice?")) {
            appState.userAnswers = new Array(appState.questions.length).fill(null);
            appState.currentQuizIdx = 0;
            startQuizTimer();
            renderQuizQuestion();
        }
    }
}

function handleQuizRevealOrSubmit() {
    if (appState.questions.length === 0) return;
    const q = appState.questions[appState.currentQuizIdx];
    const userAnswer = appState.userAnswers[appState.currentQuizIdx];

    if (userAnswer !== null && userAnswer.submitted) {
        showToast("You have already answered this question.", "info");
        return;
    }

    if (q.correctAnswers.length === 0) {
        showToast("No answer key was provided in the CSV for this question.", "info");
        return;
    }

    if (q.isMultiSelect) {
        const hasSelection = userAnswer !== null && userAnswer.selectedIndices && userAnswer.selectedIndices.length > 0;
        if (hasSelection) {
            const correctAnswers = q.correctAnswers;
            const selectedIndices = userAnswer.selectedIndices;
            
            // Exact match validation
            const isCorrect = selectedIndices.length === correctAnswers.length && 
                              selectedIndices.every(idx => correctAnswers.includes(idx));
            
            userAnswer.isCorrect = isCorrect;
            userAnswer.submitted = true;
            
            if (isCorrect) {
                appState.stats.correctCount++;
                showToast("Correct!", "success");
            } else {
                appState.stats.incorrectCount++;
                showToast("Incorrect.", "error");
            }
        } else {
            // Empty reveal
            appState.userAnswers[appState.currentQuizIdx] = {
                selectedIndices: [],
                isCorrect: false,
                submitted: true
            };
            appState.stats.incorrectCount++;
            showToast("Answer revealed.", "info");
        }
        updateStatsRatio();
    } else {
        // Single-select reveal
        appState.userAnswers[appState.currentQuizIdx] = {
            selectedIndices: [],
            isCorrect: false,
            submitted: true
        };
        appState.stats.incorrectCount++;
        updateStatsRatio();
        showToast("Answer revealed.", "info");
    }

    saveSavedData();
    updateStatsUI();
    renderQuizQuestion();
}

function toggleQuizBookmark() {
    const idx = appState.currentQuizIdx;
    if (appState.bookmarks.has(idx)) {
        appState.bookmarks.delete(idx);
        quizBookmarkBtn.classList.remove('active');
        showToast("Bookmark removed.", "info");
    } else {
        appState.bookmarks.add(idx);
        quizBookmarkBtn.classList.add('active');
        showToast("Bookmark added!", "success");
    }
    saveSavedData();
    updateStatsUI();
}

// --- Flashcard Operations ---
function getActiveFlashcards() {
    const list = [];
    appState.questions.forEach((q, idx) => {
        if (!flashFilterBookmarked.checked || appState.bookmarks.has(idx)) {
            list.push({ q: q, originalIdx: idx });
        }
    });
    return list;
}

function renderFlashcard() {
    const cards = getActiveFlashcards();
    flashTotalIdx.textContent = cards.length;

    if (cards.length === 0) {
        flashCurrentIdx.textContent = 0;
        flashQuestionText.textContent = "No flashcards found. Try unchecking 'Bookmarked Only' or flag some questions in the quiz first!";
        flashAnswerLetter.textContent = "";
        flashAnswerText.textContent = "";
        flashWrongBtn.disabled = true;
        flashRightBtn.disabled = true;
        return;
    }

    flashWrongBtn.disabled = false;
    flashRightBtn.disabled = false;

    // Check bounds
    if (appState.currentFlashIdx >= cards.length) {
        appState.currentFlashIdx = cards.length - 1;
    }
    if (appState.currentFlashIdx < 0) {
        appState.currentFlashIdx = 0;
    }

    flashCurrentIdx.textContent = appState.currentFlashIdx + 1;
    const cardData = cards[appState.currentFlashIdx];
    
    flashQuestionText.textContent = cardData.q.question;
    
    if (cardData.q.correctAnswers && cardData.q.correctAnswers.length > 0) {
        if (cardData.q.isMultiSelect) {
            flashAnswerLetter.textContent = `Options: ${cardData.q.correctAnswers.map(idx => String.fromCharCode(65 + idx)).join(', ')}`;
            flashAnswerText.innerHTML = cardData.q.correctAnswers
                .map(idx => `<div style="margin-bottom: 4px;">• <strong>${String.fromCharCode(65 + idx)}:</strong> ${escapeHTML(cardData.q.options[idx])}</div>`)
                .join('');
        } else {
            const correctIdx = cardData.q.correctAnswers[0];
            flashAnswerLetter.textContent = `Option ${String.fromCharCode(65 + correctIdx)}`;
            flashAnswerText.textContent = cardData.q.options[correctIdx];
        }
    } else {
        flashAnswerLetter.textContent = "Study Note";
        flashAnswerText.textContent = "No correct answer is stored in this CSV.";
    }
}

function navigateFlashcard(dir) {
    const cards = getActiveFlashcards();
    if (cards.length === 0) return;

    appState.currentFlashIdx = (appState.currentFlashIdx + dir + cards.length) % cards.length;
    flashcard.classList.remove('flipped');
    
    // Smooth transition delay to reset flipping visual
    setTimeout(() => {
        renderFlashcard();
    }, 150);
}

function flashcardFeedback(known) {
    const cards = getActiveFlashcards();
    if (cards.length === 0) return;

    if (known) {
        showToast("Great! Marked as mastered.", "success");
    } else {
        showToast("Added back to study pile.", "info");
    }
    
    navigateFlashcard(1);
}

// --- Study Guide Operations ---
function renderStudyList() {
    if (appState.questions.length === 0) {
        studyList.innerHTML = '<div class="card glass-card study-item"><p>Load a CSV file to generate study guide sheet.</p></div>';
        return;
    }

    studyList.innerHTML = '';
    const searchQuery = studySearch.value.trim().toLowerCase();
    const showBookmarkedOnly = studyFilterBookmarked.classList.contains('active');

    let renderedCount = 0;

    appState.questions.forEach((q, idx) => {
        const isBookmarked = appState.bookmarks.has(idx);
        
        // Filter criteria
        if (showBookmarkedOnly && !isBookmarked) return;

        if (searchQuery) {
            const matchesQuestion = q.question.toLowerCase().includes(searchQuery);
            const matchesOptions = q.options.some(opt => opt && opt.toLowerCase().includes(searchQuery));
            if (!matchesQuestion && !matchesOptions) return;
        }

        renderedCount++;

        const item = document.createElement('div');
        item.className = 'card glass-card study-item animate-slide-in';
        
        const isCorrectOptionHidden = !appState.studyGuideAnswersVisible;

        // Render options list markup
        let optionsHTML = '';
        q.options.forEach((opt, oIdx) => {
            if (!opt) return;
            const isCorrect = q.correctAnswers && q.correctAnswers.includes(oIdx);
            const optClass = isCorrect && !isCorrectOptionHidden ? 'study-item-opt correct-option' : 'study-item-opt';
            const optLetter = String.fromCharCode(65 + oIdx);
            optionsHTML += `
                <div class="${optClass}">
                    <span class="study-item-opt-badge">${optLetter}:</span>
                    <span>${escapeHTML(opt)}</span>
                </div>
            `;
        });

        item.innerHTML = `
            <div class="study-item-header">
                <div class="study-item-qnum">Question ${idx + 1}</div>
                <div class="study-item-title">${escapeHTML(q.question)}</div>
                <div class="study-item-actions">
                    <button class="btn-bookmark ${isBookmarked ? 'active' : ''}" title="Bookmark Question">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                    </button>
                </div>
            </div>
            <div class="study-item-options ${isCorrectOptionHidden ? 'answers-hidden' : ''}">
                ${optionsHTML}
            </div>
            ${q.correctAnswers && q.correctAnswers.length > 0 && !isCorrectOptionHidden ? `
                <div class="study-item-explanation">
                    <strong>Explanation:</strong> ${escapeHTML(q.explanation)}
                </div>
            ` : ''}
        `;

        // Event listener for bookmarked button
        const bookBtn = item.querySelector('.btn-bookmark');
        bookBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (appState.bookmarks.has(idx)) {
                appState.bookmarks.delete(idx);
                bookBtn.classList.remove('active');
                showToast("Bookmark removed.", "info");
            } else {
                appState.bookmarks.add(idx);
                bookBtn.classList.add('active');
                showToast("Bookmark added!", "success");
            }
            saveSavedData();
            updateStatsUI();
        });

        studyList.appendChild(item);
    });

    if (renderedCount === 0) {
        studyList.innerHTML = `
            <div class="card glass-card study-item" style="text-align: center; padding: 40px;">
                <p style="color: var(--text-secondary);">No questions match your filter criteria.</p>
            </div>
        `;
    }
}

// --- Toast Notifications Systems ---
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    if (type === 'success') {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--success); width: 18px; height: 18px;"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--error); width: 18px; height: 18px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary); width: 18px; height: 18px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Fade out and remove
    setTimeout(() => {
        toast.style.animation = 'fadeIn 0.3s reverse forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// --- Local Storage Management ---
function saveSavedData() {
    const data = {
        bookmarks: Array.from(appState.bookmarks),
        stats: appState.stats
    };
    localStorage.setItem(`antigravity_reviewer_data_${appState.currentTopic}`, JSON.stringify(data));
    localStorage.setItem('antigravity_reviewer_theme', appState.theme);
}

function loadSavedData() {
    const savedTheme = localStorage.getItem('antigravity_reviewer_theme');
    if (savedTheme) {
        appState.theme = savedTheme;
    }

    const raw = localStorage.getItem(`antigravity_reviewer_data_${appState.currentTopic}`);
    if (raw) {
        try {
            const data = JSON.parse(raw);
            appState.bookmarks = data.bookmarks ? new Set(data.bookmarks) : new Set();
            appState.stats = data.stats || {
                attempts: 0,
                avgScoreSum: 0,
                quizzesTaken: 0,
                correctCount: 0,
                incorrectCount: 0
            };
        } catch (e) {
            console.error("Error loading localStorage data for " + appState.currentTopic, e);
            resetTopicState();
        }
    } else {
        resetTopicState();
    }
    updateStatsUI();
}

function resetTopicState() {
    appState.bookmarks = new Set();
    appState.stats = {
        attempts: 0,
        avgScoreSum: 0,
        quizzesTaken: 0,
        correctCount: 0,
        incorrectCount: 0
    };
}

function updateStatsUI() {
    statAttempts.textContent = appState.stats.attempts;
    statFlagged.textContent = appState.bookmarks.size;

    // Calculate score
    const total = appState.stats.correctCount + appState.stats.incorrectCount;
    if (total > 0) {
        const ratio = Math.round((appState.stats.correctCount / total) * 100);
        statAvgScore.textContent = `${ratio}%`;
    } else {
        statAvgScore.textContent = '0%';
    }
}

// --- Utility Functions ---
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// --- Supabase Connection & Fetching Logic ---
async function checkSupabaseConnection() {
    if (appState.currentTopic !== 'micro') return;

    const { supabaseUrl, supabaseKey } = SUPABASE_CONFIG;
    if (!supabaseUrl || !supabaseKey) {
        updateSupabaseUI(false);
        loadMicroprocessorCSV();
        return;
    }

    try {
        updateSupabaseUI(true, "Connecting...");
        await loadQuestionsFromSupabase();
        updateSupabaseUI(true, "Connected");
    } catch (err) {
        console.error("Supabase connection error:", err);
        updateSupabaseUI(false, "Connection Failed");
        loadMicroprocessorCSV();
    }
}

function updateSupabaseUI(connected, text = "") {
    const statusEl = document.getElementById('supabase-status');
    const statusTextEl = document.getElementById('supabase-status-text');
    const dbIndicatorEl = document.getElementById('db-indicator');

    if (!statusEl || !statusTextEl) return;

    if (connected) {
        statusEl.className = 'supabase-status online';
        statusTextEl.textContent = text || "Connected";
        
        if (dbIndicatorEl) {
            dbIndicatorEl.className = 'db-status-banner db-online';
            dbIndicatorEl.textContent = `Connected (${text || "Online Mode"})`;
        }
    } else {
        statusEl.className = 'supabase-status offline';
        statusTextEl.textContent = text || "Offline Mode";
        
        if (dbIndicatorEl) {
            dbIndicatorEl.className = 'db-status-banner db-offline';
            dbIndicatorEl.textContent = text ? `Error: ${text}` : "Disconnected (Offline Mode)";
        }
    }
}

async function loadQuestionsFromSupabase() {
    const { supabaseUrl, supabaseKey } = SUPABASE_CONFIG;
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/questions?select=*&order=id.asc`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            showToast("Supabase table is empty. Please run migrate.py to upload questions.", "warning");
            return;
        }

        const processedQuestions = data.map(item => {
            const correctOpt = parseInt(item.correct_option);
            return {
                question: item.question,
                options: [item.option_a, item.option_b, item.option_c, item.option_d],
                correctAnswers: [correctOpt],
                answerIdx: correctOpt,
                isMultiSelect: false,
                explanation: item.explanation || `Correct option: ${['A', 'B', 'C', 'D'][correctOpt]}.`
            };
        });

        appState.fileName = "Supabase DB";
        appState.questions = processedQuestions;
        appState.currentQuizIdx = 0;
        appState.currentFlashIdx = 0;
        appState.userAnswers = new Array(processedQuestions.length).fill(null);

        // UI Updates
        if (activeFilename) activeFilename.textContent = "Supabase DB";
        if (activeQcount) activeQcount.textContent = processedQuestions.length;
        if (fileDetails) fileDetails.classList.remove('hidden');
        
        if (welcomeView) welcomeView.classList.add('hidden');
        if (reviewerInterface) reviewerInterface.classList.remove('hidden');

        updateStatsUI();
        startQuizTimer();
        switchMode(appState.activeTab);
        
        showToast(`Successfully loaded ${processedQuestions.length} questions from Supabase!`, "success");
    } catch (err) {
        console.error("Error loading questions from Supabase:", err);
        showToast("Failed to load questions from Supabase. Falling back to local mode.", "error");
    }
}

// --- Topic Selector Core Logic ---
async function selectTopic(topic) {
    if (appState.currentTopic === topic && appState.questions.length > 0) return;
    
    appState.currentTopic = topic;
    localStorage.setItem('antigravity_reviewer_last_topic', topic);

    const microBtn = document.getElementById('topic-micro-btn');
    const ccnaBtn = document.getElementById('topic-ccna2-btn');
    
    if (topic === 'micro') {
        if (microBtn) {
            microBtn.className = 'btn btn-primary btn-full topic-selector-btn active';
        }
        if (ccnaBtn) {
            ccnaBtn.className = 'btn btn-secondary btn-full topic-selector-btn';
        }
        
        const mainTitle = document.getElementById('app-main-title');
        if (mainTitle) mainTitle.textContent = "Microprocessor Finals Reviewer";
        
        const greetDesc = document.getElementById('greeting-desc');
        if (greetDesc) greetDesc.textContent = "Study hard, master the microprocessor finals, and ace your exam! You've got this.";
        
        loadSavedData();
        await checkSupabaseConnection();
    } else {
        if (microBtn) {
            microBtn.className = 'btn btn-secondary btn-full topic-selector-btn';
        }
        if (ccnaBtn) {
            ccnaBtn.className = 'btn btn-primary btn-full topic-selector-btn active';
        }
        
        const mainTitle = document.getElementById('app-main-title');
        if (mainTitle) mainTitle.textContent = "CCNA2 SRWE Reviewer";
        
        const greetDesc = document.getElementById('greeting-desc');
        if (greetDesc) greetDesc.textContent = "Study hard, master the CCNA2 SRWE, and ace your exam! You've got this.";
        
        loadSavedData();
        await loadCCNA2CSV();
    }
}
