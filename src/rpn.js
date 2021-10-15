#!/usr/bin/env node
"use strict";
exports.__esModule = true;
/*
      console.log(`
    Reverse Polish Notation Calculator
*/
var RPNC = function () {
    function help() {
        console.log("\nReverse Polish Notation Calculator \nHeath Shults, Online Resources, Friend\nrpncalc [--options] [operands operators]\noptions\n\t--help \n\t--debug \n\t--fullstack  return full stack \noperands\n\tany number f.ex. 9.99\n\tor in hexadecimal 0x99\n\tor in scientific notation 9e99\ntwo-operand math operators\n\t'+' '-' '*' '/': arithmetic add, sub, mul, div\n\t'%': modulo\n\t'^' 'p': power\n\t'v': root \n\t\nsingle-operand math operators \n\t'f': floor\n\t'r': round\n\t'n': negative, chs, -x\n\t'i': inverse, 1/x\n\t'a': abs\n\t'l': ln\n\t'e': exp\n\t's': sin \n\t'c': cos   \n\t't': arcTan\nno-operand operators\n\t'P': pi, \u03C0 \n\t'E': e\n\t'A': aleatory, random\nstack manipulation  \n\t'x': exchange x<->y\n\t'=': duplicate x, enter\n\t'S': store y in x \n\t'R': recall from x \n\t\t");
    }
    var rpnc = rcNS;
    /**
        parse the arguments list (like the obtained with process.argv)
        into an options object (that begin with --) and a parameters array.
    */
    function commandLine(argv) {
        if (argv === void 0) { argv = null; }
        var ao = argv || process.argv.slice(2);
        var parms = ao.filter(function (a) { return !a.startsWith('--'); });
        var opts = ao
            .filter(function (a) { return a.startsWith('--'); })
            .map(function (a) { return a.replace(/^-+/, '').split(/[:=]/); })
            .reduce(function (a, e, i) {
            a[e[0]] = e[1] || true;
            return a;
        }, {});
        var cli = { parms: parms, opts: opts };
        return cli;
    }
    // https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    /* simple display functions */
    function showValue(v, i) {
        console.log(i, v || '0');
    }
    function showStack(stack) {
        stack.map(showValue);
    }
    /**
     *
     * the reverse polish notation calculator function primitive
     * @param {object} calc represents the calculator
     * @param {array of strings} opers operands and operators
     * @param {object} options
     * @returns {object} the calculator
     *
     */
    function rpnprim(calc, opers, options) {
        /* primitive function for two-operand operations  */
        var cnt = 0; //aux counter
        function op2(op, a, b) {
            switch (op) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    return a / b;
                case '%':
                    return a % b;
                case 'p':
                case '^':
                    return Math.pow(a, b);
                case 'v':
                    return Math.pow(a, 1 / b);
                case 'S':
                    calc.store[b] = a;
                    return a;
                default:
                    throw ('internal error, operator ' + op);
            }
        }
        /* primitive function for one-operand operations  */
        function op1(op, a) {
            switch (op) {
                case 'f':
                    return Math.floor(a);
                case 'r':
                    return Math.round(a);
                case 'n':
                    return -a;
                case 'i':
                    return 1 / a;
                case 'a':
                    return Math.abs(a);
                case 'l':
                    return Math.log(a);
                case 'e':
                    return Math.exp(a);
                case 's':
                    return Math.sin(a);
                case 'c':
                    return Math.cos(a);
                case 't':
                    return Math.atan(a);
                case 'R':
                    if (!calc.store[a])
                        throw ('inexistent storage ' + a);
                    return calc.store[a];
                default:
                    throw ('internal error, operator ' + op);
            }
        }
        if (options.debug)
            console.log(0, JSON.stringify(opers));
        /* operators and operands loop */
        while (opers && opers.length) {
            var op = opers.shift();
            cnt++;
            /* if it's numeric, is an operand, push it into the stack */
            if (isNumeric(op)) {
                calc.stack.push(Number(op));
                /* if it's a two-operand operator */
            }
            else if (['+', '-', '*', '/', '%', '^', 'v', 'p', 'S'].includes(op)) {
                if (calc.stack.length < 2)
                    throw (op + " requires 2 operands");
                var b = calc.stack.pop();
                var a = calc.stack.pop();
                calc.stack.push(op2(op, a, b));
                /* if it's a one-operand operator */
            }
            else if (['f', 'r', 'n', 'i', 'a', 'l', 'e', 's', 'c', 't', 'R'].includes(op)) {
                if (calc.stack.length < 1)
                    throw (op + " requires 1 operand");
                var a = calc.stack.pop();
                calc.stack.push(op1(op, a));
                /* if it's a non-operand operator */
            }
            else if (['P', 'E', 'A'].includes(op)) {
                if (op == 'P') {
                    calc.stack.push(Math.PI);
                }
                else if (op == 'E') {
                    calc.stack.push(Math.E);
                }
                else if (op == 'A') {
                    calc.stack.push(Math.random());
                }
                /* if it's an special operator: stack manipulation */
            }
            else if (op == 'x') {
                if (calc.stack.length < 2)
                    throw (op + " requires 2 operands");
                var b = calc.stack.pop();
                var a = calc.stack.pop();
                calc.stack.push(b);
                calc.stack.push(a);
            }
            else if (op == '=') {
                if (calc.stack.length < 1)
                    throw (op + " requires 1 operand");
                var a = calc.stack.pop();
                calc.stack.push(a);
                calc.stack.push(a);
            }
            else {
                throw ('unknown operator ' + op);
            }
            if (options.debug)
                console.log(cnt, op, calc.stack, calc.store);
        }
        return calc;
    }
    /**
    *
    * the rpn calculator
    *
    * @param {object} options { debug, help, fullStack }
    * @returns {object} the calculator object
    *
    */
    function rpnCalculator(options) {
        if (options === void 0) { options = {}; }
        var calc = {
            stack: [],
            store: {},
            calculate: calculate /* the calculate function */
        };
        function calculate(opers) {
            /* opers should be an array of strings, if not and is an string, split it first */
            if (typeof opers === 'string')
                opers = opers.split(' ');
            rpnprim(calc, opers, options);
            if (options.fullStack) {
                return calc.stack.slice().reverse(); // return a reversed copy of the stack
            }
            else {
                var l = calc.stack.length;
                return l == 0 ? Number.NaN : calc.stack[l - 1]; // return the last element of the stack
            }
        }
        return calc;
    }
    /**
     *
     * the one-shot calculator function, the most usual way to use the previous functions
     *
     * @param {string or array of strings} opers operands and operators, if is an string, it is split first.
     * @param {object} options { debug, help, fullStack }
     * @returns {number or array of numbers} the result or the results stack
     *
     */
    function rpn(opers, options) {
        if (options === void 0) { options = {}; }
        var calc = rpnCalculator(options);
        return calc.calculate(opers);
    }
    /**
    *
    * the calculator module
    *
    * @param {string or array of strings} opers operands and operators, if is an string, it is split first.
    * @param {object} options
    * @returns {object or numbers } either the calculator object or the result or the results stack
    *
    */
    function rpnCalculatorFactory(opers, options) {
        if (opers && opers.length)
            return rpn(opers, options);
        else
            return rpnCalculator(options);
    }
    if (module.parent) {
        module.exports = rpnCalculatorFactory;
    }
    else {
        (function main() {
            // process the command line arguments
            var cli = commandLine();
            if ((cli.parms.length == 0) || (cli.opts.help))
                return help();
            // invoke the calculator
            var result = rpn(cli.parms, cli.opts);
            // and print the result
            if (cli.opts.debug)
                console.log('=====================');
            //if (cli.opts.fullStack) showStack(result) else 
            console.log(result);
        })();
    }
};
var cmd = rcNS;
exports.rcNS = cmd;
