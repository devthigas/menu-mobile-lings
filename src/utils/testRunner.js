/**
 * DOMlings Test Runner Engine
 * Sandboxes user code inside a controlled DOM container, catches errors,
 * captures console output, and executes test assertions.
 */

export function runExerciseTest(exercise, userCode, containerRef) {
  const logs = [];
  const errors = [];

  // Reset container DOM with initialHtml
  containerRef.innerHTML = exercise.initialHtml;

  // Create mock console to capture console.log / console.error
  const customConsole = {
    log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
    error: (...args) => errors.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
    warn: (...args) => logs.push(`[WARN] ` + args.join(' ')),
    info: (...args) => logs.push(`[INFO] ` + args.join(' '))
  };

  try {
    // We bind custom document scope so querySelector / getElementById searches inside containerRef
    const scopedDoc = {
      getElementById: (id) => containerRef.querySelector(`#${id}`),
      querySelector: (selector) => containerRef.querySelector(selector),
      querySelectorAll: (selector) => containerRef.querySelectorAll(selector),
      getElementsByClassName: (className) => containerRef.getElementsByClassName(className),
      getElementsByTagName: (tagName) => containerRef.getElementsByTagName(tagName),
      createElement: (tagName) => document.createElement(tagName),
      body: containerRef,
      defaultView: window,
      // Pass-throughs for standard document methods
      addEventListener: (...args) => containerRef.addEventListener(...args),
      removeEventListener: (...args) => containerRef.removeEventListener(...args)
    };

    // Execute user code
    const runCode = new Function('document', 'console', 'window', `
      try {
        ${userCode}
      } catch (err) {
        throw err;
      }
    `);

    runCode(scopedDoc, customConsole, window);

    // Run exercise verification test
    const testResult = exercise.test(scopedDoc);

    if (!testResult.pass) {
      return {
        passed: false,
        type: 'ASSERTION_ERROR',
        logs,
        error: testResult.error,
        formattedTerminalOutput: generateRustlingsFailOutput(exercise.id, testResult.error, logs, exercise.hint)
      };
    }

    return {
      passed: true,
      logs,
      message: testResult.message,
      formattedTerminalOutput: generateRustlingsSuccessOutput(exercise.id, testResult.message, logs)
    };

  } catch (err) {
    return {
      passed: false,
      type: 'RUNTIME_ERROR',
      logs,
      error: `${err.name}: ${err.message}`,
      stack: err.stack,
      formattedTerminalOutput: generateRustlingsFailOutput(exercise.id, `${err.name}: ${err.message}`, logs, exercise.hint)
    };
  }
}

function generateRustlingsFailOutput(exerciseId, errorMsg, logs, hint) {
  let output = `\x1b[31m[❌ EXER-FAIL]\x1b[0m Checking \x1b[33m${exerciseId}\x1b[0m ...\n\n`;
  output += `\x1b[31merror\x1b[0m: ${errorMsg}\n`;
  output += `  --> exercise/${exerciseId}.js\n`;
  output += `   |\n`;
  
  if (logs.length > 0) {
    output += `   = \x1b[36mConsole output captured:\x1b[0m\n`;
    logs.forEach(l => {
      output += `     > ${l}\n`;
    });
    output += `   |\n`;
  }

  output += `   = \x1b[33mdica (hint):\x1b[0m ${hint}\n\n`;
  output += `\x1b[31mProgress: ❌ Não foi possível compilar/passar nos testes de ${exerciseId}\x1b[0m\n`;
  output += `Revise seu código e tente novamente!`;

  return output;
}

function generateRustlingsSuccessOutput(exerciseId, message, logs) {
  let output = `\x1b[32m[✅ PASSED]\x1b[0m Exercise \x1b[33m${exerciseId}\x1b[0m is complete!\n\n`;
  output += `\x1b[32m🎉 ${message}\x1b[0m\n`;
  
  if (logs.length > 0) {
    output += `\n\x1b[36mConsole output:\x1b[0m\n`;
    logs.forEach(l => {
      output += `  > ${l}\n`;
    });
  }

  output += `\n\x1b[32mProgress: 🚀 Você passou neste exercício!\x1b[0m\n`;
  output += `Você pode prosseguir para o próximo exercício ou continuar experimentando.`;

  return output;
}
