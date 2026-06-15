import csv
import json
import urllib.request
import urllib.error
import ssl

# Pre-compiled answers and explanations to match the microprocessor midterm CSV rows
ANSWERS_MAP = {
    0: {"correct": 0, "explanation": "An embedded system is a dedicated computer system designed to perform specific control functions within a larger mechanical or electrical system, combining hardware and software."},
    1: {"correct": 2, "explanation": "A 7-segment display consists of seven LEDs arranged in a figure-eight pattern. By turning individual segments on or off, it can display numerals from 0 to 9 and some letters."},
    2: {"correct": 0, "explanation": "In a common anode display, all the positive terminals (anodes) of the LEDs are tied together to VCC (logic 1 or 5V). To turn a segment on, the cathode must be pulled to logic 0 (ground)."},
    3: {"correct": 0, "explanation": "In a common cathode display, all the negative terminals (cathodes) of the LEDs are tied together to ground (logic 0). To turn a segment on, the anode must be pulled to logic 1 (high)."},
    4: {"correct": 1, "explanation": "The Arduino Uno has 14 digital input/output pins, numbered from 0 to 13."},
    5: {"correct": 1, "explanation": "The Arduino Uno has 6 analog input pins, labeled A0 through A5."},
    6: {"correct": 3, "explanation": "ROM (Read-Only Memory) is programmed at the factory during fabrication. PROMs and EPROMs are programmed by the developer, and BIOS is stored in rewritable Flash/EEPROM, so ROM is 'None of the above'."},
    7: {"correct": 3, "explanation": "All of these are key advantages of SPI (Serial Peripheral Interface): simple hardware interfacing, full-duplex communication (MISO/MOSI), and low power consumption."},
    8: {"correct": 3, "explanation": "All of these make TWI (Two-Wire Interface / I2C) highly valuable: fewer IC pins than SPI, formal standards, and software-based slave addressing."},
    9: {"correct": 1, "explanation": "SPI typically operates at much higher speeds, frequently greater than 10 MHz (and up to 50 MHz+), whereas TWI/I2C is generally slower (100kHz, 400kHz, or up to 3.4MHz)."},
    10: {"correct": 1, "explanation": "A locator is a development tool that assigns physical memory addresses to the object code, positioning it in the system memory map."},
    11: {"correct": 3, "explanation": "An assembler list file contains the translated binary code (machine code), assembly language statements, and offsets/addresses of the instructions."},
    12: {"correct": 1, "explanation": "A cross assembler runs on one platform (like a PC) but generates machine code for a different target architecture (like a specific microcontroller), making it independent of the target machine."},
    13: {"correct": 2, "explanation": "A linker typically assigns relative addresses starting from zero, which are later resolved to absolute addresses by the loader or locator."},
    14: {"correct": 2, "explanation": "A compiler generates application programs and translates high-level code to machine-level code."},
    15: {"correct": 0, "explanation": "An editor is the tool used to write and modify source files in assembly or high-level languages."},
    16: {"correct": 3, "explanation": "EPROMs are erasable with UV light and reprogrammable, making them vital during the development cycle for debugging hardware/software prototypes and loading programs."},
    17: {"correct": 1, "explanation": "GPIO stands for General Purpose Input Output Pins, which can be dynamically configured as inputs or outputs via software."},
    18: {"correct": 3, "explanation": "Shields are pre-built circuit boards that plug on top of an Arduino to expand its capabilities (e.g., Ethernet shield, motor shield)."},
    19: {"correct": 3, "explanation": "Arduino hardware designs are open-source (CC-BY-SA), while its IDE software and core libraries are distributed under LGPL or GPL licenses."},
    20: {"correct": 1, "explanation": "IDE stands for Integrated Development Environment, which combines a text editor, compiler, and uploader in a single interface."},
    21: {"correct": 3, "explanation": "The Arduino Leonardo was the first development board to feature a microcontroller (ATmega32u4) with built-in USB communication, eliminating the need for a secondary USB-to-serial chip."},
    22: {"correct": 1, "explanation": "A program written for Arduino in its IDE is called a Sketch."},
    23: {"correct": 2, "explanation": "The LilyPad Arduino is designed for e-textiles and wearable projects. Its circular shape and large sew tabs allow it to be sewn directly into clothing with conductive thread."},
    24: {"correct": 1, "explanation": "The setup() function is called once when the Arduino board starts or resets. It is used to initialize pin modes, start serial communication, or configure peripherals."},
    25: {"correct": 1, "explanation": "In C++ and Arduino, /* starts a multi-line comment, and */ ends it. Comments are ignored by the compiler."},
    26: {"correct": 3, "explanation": "The Arduino Board is the physical development board containing the microcontroller chip, inputs/outputs, voltage regulator, and support circuitry."},
    27: {"correct": 2, "explanation": "An in-circuit emulator (ICE) replaces the actual microcontroller chip on the development board to allow real-time debugging, tracing, and register inspection."},
    28: {"correct": 2, "explanation": "An ICE allows developers to halt execution (breakpoints) to examine the exact state of internal CPU registers and memory."},
    29: {"correct": 1, "explanation": "Simulators model the CPU execution inside a software environment. Real-time I/O operations are difficult to simulate accurately because they depend on physical external hardware response times."},
    30: {"correct": 3, "explanation": "A logic analyzer can display data in logic states (binary/hex tables), state maps, or timing diagrams (waveforms)."},
    31: {"correct": 3, "explanation": "In active-low driving, the LED anode is connected to VCC and the cathode to the GPIO pin. Setting the pin to LOW (ground) completes the circuit, sinking the current and lighting the LED."},
    32: {"correct": 3, "explanation": "A resistor of 220 to 330 ohms is standard for limiting LED current to safe levels (10-20mA) when powered by 5V or 3.3V GPIO pins."},
    33: {"correct": 2, "explanation": "For an LED controlled by a push button via software, the LED's state depends on whether the button is closed (button press) and if the microcontroller drives the output pin low/high."},
    34: {"correct": 3, "explanation": "In C++/Arduino, a variable is declared by specifying its type (e.g., int) followed by the variable name and a semicolon."},
    35: {"correct": 1, "explanation": "The setup() function is the standard initialization block in an Arduino sketch."},
    36: {"correct": 0, "explanation": "The delay(ms) function pauses sketch execution for the specified number of milliseconds."},
    37: {"correct": 2, "explanation": "The analogRead(pin) function reads the voltage on an analog input pin."},
    38: {"correct": 1, "explanation": "The Arduino Uno's ADC (Analog-to-Digital Converter) has 10-bit resolution, which maps input voltages between 0V and 5V to integer values from 0 to 1023."},
    39: {"correct": 0, "explanation": "The digitalWrite(pin, value) function writes a HIGH (5V/3.3V) or LOW (0V) level to a digital pin."},
    40: {"correct": 0, "explanation": "The pinMode(pin, mode) function configures a specific digital pin to behave either as an INPUT, OUTPUT, or INPUT_PULLUP."},
    41: {"correct": 0, "explanation": "Serial.begin(baud) initializes serial communication with the host computer, setting the transmission rate in bits per second (baud rate, e.g., 9600)."},
    42: {"correct": 2, "explanation": "The map(value, fromLow, fromHigh, toLow, toHigh) function scales an integer value from one range to another."},
    43: {"correct": 2, "explanation": "After calling setup(), the Arduino IDE executes the loop() function continuously in an infinite loop, driving the microcontroller's main program logic."},
    44: {"correct": 0, "explanation": "The ampersand & is the bitwise AND operator in C/C++."},
    45: {"correct": 0, "explanation": "Bitwise AND comparison: 1010 & 1100 = 1000. Bits are set to 1 only where both input bits are 1."},
    46: {"correct": 1, "explanation": "The vertical bar | is the bitwise OR operator in C/C++."},
    47: {"correct": 1, "explanation": "Bitwise OR comparison: 1010 | 1100 = 1110. Bits are set to 1 where at least one input bit is 1."},
    48: {"correct": 2, "explanation": "The caret ^ is the bitwise XOR (exclusive OR) operator in C/C++."},
    49: {"correct": 1, "explanation": "The pre-increment operator ++x increments x first (from 5 to 6) and then evaluates the expression. Thus, x becomes 6."},
    50: {"correct": 2, "explanation": "The post-increment operator y++ evaluates the expression first (evaluates to 10) and then increments y (from 10 to 11). Since the question asks for the value of y after execution, it is 11."},
    51: {"correct": 1, "explanation": "The variable a is incremented twice: once by a++ and once by ++a. Starting at 3, its final value is 3 + 1 + 1 = 5."},
    52: {"correct": 1, "explanation": "The variable b is incremented twice: once by ++b and once by b++. Starting at 2, its final value is 2 + 1 + 1 = 4."},
    53: {"correct": 1, "explanation": "The variable c is decremented twice: once by c-- and once by --c. Starting at 7, its final value is 7 - 1 - 1 = 5."},
    54: {"correct": 0, "explanation": "The variable d is decremented once (d--) and incremented once (d++). Starting at 8, it ends up at 8 (8 - 1 + 1 = 8)."},
    55: {"correct": 1, "explanation": "The logical AND operator && returns true only if both operands are true. true && false evaluates to false."},
    56: {"correct": 2, "explanation": "The logical expression sets condition to true, but does not modify x. Thus, x remains 5."},
    57: {"correct": 2, "explanation": "The logical expression sets condition to true, but does not modify y. Thus, y remains 10."},
    58: {"correct": 2, "explanation": "The logical expression sets condition to true, but does not modify w. Thus, w remains 4."},
    59: {"correct": 2, "explanation": "The logical expression sets condition to true, but does not modify v. Thus, v remains 12."}
}

def migrate():
    print("=====================================================")
    print("  Supabase Database Migrator for Antigravity Reviewer ")
    print("=====================================================")
    
    url_input = input("Enter your Supabase Project URL [default: https://your-project.supabase.co]: ").strip()
    url = url_input if url_input else "https://your-project.supabase.co"
    if not url.startswith("http"):
        url = "https://" + url
        
    key_input = input("Enter your Supabase API Key [default: YOUR_SUPABASE_ANON_KEY]: ").strip()
    key = key_input if key_input else "YOUR_SUPABASE_ANON_KEY"

    csv_path = "microprocessor_midterm.csv"
    questions = []
    
    print(f"\nReading '{csv_path}'...")
    try:
        with open(csv_path, mode='r', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader)
            # Find column indexes
            h_lower = [h.strip().lower() for h in header]
            q_idx = h_lower.index('question')
            a_idx = h_lower.index('a')
            b_idx = h_lower.index('b')
            c_idx = h_lower.index('c')
            d_idx = h_lower.index('d')
            
            for idx, row in enumerate(reader):
                if len(row) < 5 or not row[q_idx]:
                    continue
                
                # Match answer
                correct_option = -1
                explanation = ""
                if idx in ANSWERS_MAP:
                    correct_option = ANSWERS_MAP[idx]["correct"]
                    explanation = ANSWERS_MAP[idx]["explanation"]
                
                questions.append({
                    "question": row[q_idx].strip(),
                    "option_a": row[a_idx].strip(),
                    "option_b": row[b_idx].strip(),
                    "option_c": row[c_idx].strip(),
                    "option_d": row[d_idx].strip(),
                    "correct_option": correct_option,
                    "explanation": explanation
                })
    except FileNotFoundError:
        print(f"Error: Could not find '{csv_path}' in the current directory.")
        return
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    print(f"Successfully loaded {len(questions)} questions from CSV.")
    print(f"Uploading to Supabase PostgREST endpoint at {url}/rest/v1/questions...")

    # Set up HTTP Request
    rest_url = f"{url.rstrip('/')}/rest/v1/questions"
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    # We will upload in bulk
    data_payload = json.dumps(questions).encode('utf-8')
    req = urllib.request.Request(rest_url, data=data_payload, headers=headers, method='POST')
    
    # Bypassing SSL check if local development certs have issues
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            status = response.status
            print(f"\nMigration successful! HTTP Status: {status}")
            print(f"All {len(questions)} questions have been uploaded to your Supabase questions table.")
            print("\nNext Steps:")
            print("1. Set your supabaseUrl and supabaseKey in 'supabase-config.js'.")
            print("2. Open the web app and enjoy studying directly from the cloud!")
    except urllib.error.HTTPError as e:
        print(f"\nHTTP Error occurred: {e.code} - {e.reason}")
        try:
            print(f"Details: {e.read().decode('utf-8')}")
        except:
            pass
        print("\nPossible solutions:")
        print("- Verify your Supabase URL and Service Role Key.")
        print("- Make sure you created the 'questions' table in your Supabase database using the SQL Editor.")
    except Exception as e:
        print(f"\nConnection failed: {e}")

if __name__ == "__main__":
    migrate()
