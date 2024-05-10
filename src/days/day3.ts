export function main(level: string, input: string): string{
    switch(level){
        case "1":
            return level1(input);
        case "2":
            return level2(input);
        default:
            return `Code for level ${level} not found.`
    }
}

interface Location{
    row: number,
    col: number
}

interface PartNumber{
    // The x-y location of each digit
    locations: Array<Location>,
    value: number
}

/**
 * Check if a character at a given position is a symbol
 * @param input The input string from AOC
 * @param row The row to check
 * @param col The column to check
 * @param pattern The RegExp pattern to identify symbols
 * @returns True if the position is a symbol, false otherwise.
 */
function isCharSymbol(input: string, row: number, col: number, 
    pattern: RegExp = /[^.0-9]/) : boolean{
    const lines = input.split('\n');
    if (lines[row] && lines[row][col]){
        return lines[row][col].match(pattern) ? true: false;
    }
    return false;
}

/**
 * Check if a part at a given location is valid (has an adjacent symbol)
 * @param input The input string from AOC
 * @param location The location to check
 * @returns True if the part is valid, false otherwise.
 */
function isPartValid(input: string, location: Location): boolean{
    for (let row = location.row - 1; row <= location.row + 1; row++){
        for (let col = location.col - 1; col <= location.col + 1; col++){
            if (isCharSymbol(input, row, col)) return true;
        }
    }
    return false;
}

/**
 * Filter out any invalid parts from a list.
 * @param parts The list of parts to filter.
 * @param input The input string from AOC
 * @returns A new list with the filter applied.
 */
function filterOutInvalidParts(parts: Array<PartNumber>, input: string):
        Array<PartNumber> {
    let validParts = new Array<PartNumber>;
    for (const part of parts){
        for (const location of part.locations){
            if(isPartValid(input, location)){
                validParts.push(part);
                break;
            }
        }
    }
    return validParts;
}

/**
 * Parse every number and its location
 * @param input The input string from AOC
 * @param pattern The pattern to match to identify numbers
 * @returns An array of PartNumbers, where each has location and value information
 */
function findAllNumbers(input: string, pattern: RegExp) : Array<PartNumber>{
    const lines = input.split('\n');
    let partNumbers = new Array<PartNumber>;

    for (let row = 0; row < lines.length; row++){
        let digits = "";
        let locations = new Array<Location>;
        let nextPart: PartNumber | undefined = undefined;
        for (let col = 0; col < lines[row].length; col++){
            let nextChar = lines[row][col];
            [locations, digits, nextPart] = handleCharInInput(nextChar, 
                {row: row, col: col}, digits, locations, pattern);
            if (nextPart){
                partNumbers.push(nextPart);
            }
        }
        [locations, digits, nextPart] = handleCharInInput(".", 
            {row: row, col: lines[row].length}, digits, locations, pattern);
        if (nextPart){
            partNumbers.push(nextPart);
        }
    }

    return partNumbers
}

/**
 * Handle a single character from the input data
 * @param char The character
 * @param location An object with the row and col(umn) indicating the position
 * @param runningDigits The string of digits scanned before this iteration
 * @param runningLocations An array of locations already scanned
 * @param pattern The pattern to identify numbers with
 * @returns A tuple containing the running tallies and the identified part number, if any
 */
function handleCharInInput(char: string, location: Location, 
        runningDigits: string, runningLocations: Array<Location>, 
        pattern: RegExp){
    // If this digit isn't a number, save what we've stored
    // if anything, then clear the running variables.
    let output: [Array<Location>, string, PartNumber?] = [[...runningLocations], runningDigits, undefined];
    if (!char.match(pattern)){
        if (runningDigits){
            output[2] = {locations: runningLocations, 
                value: parseInt(runningDigits)};
        }
        output[1] = "";
        output[0] = [];
    } else {
        output[1] = runningDigits.concat(char);
        output[0].push(location);
    }
    return output;
}

/**
 * Run the level 1 code on the problem.
 * @param input The input string, as defined by AoC
 * @returns The return string value.
 */
// 1. Find every number character, save locations to 2d arr
// 2. Iterate over number locations, identify whether any symbols exist.
// 3. Save each good number to arr.
function level1(input: string): string{
    let sum = 0;
    let partNumbers = findAllNumbers(input, /[0-9]/g);
    partNumbers = filterOutInvalidParts(partNumbers, input);
    for (const part of partNumbers){
        sum += part.value;
    }
    return sum.toString();  
}

/**
 * Run the level 2 code on the problem, which is usually a more complex variant of the level 1 code.
 * @param input The input string, as defined by AoC
 * @returns The return string value.
 */
function level2(input: string): string{
    return "";
}