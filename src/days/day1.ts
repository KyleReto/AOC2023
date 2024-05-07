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

function level1(input: string): string{
    let calibrationValues: Array<number> = [];
    const pattern = new RegExp(/\d/g);
    for (const line of input.split("\n")){
        let matches = line.match(pattern);
        let firstMatch = matches?.[0] ?? "0";
        let lastMatch = matches?.[matches.length-1] ?? "0";
        calibrationValues.push(parseInt(firstMatch.concat(lastMatch)));
    }
    let output = 0;
    calibrationValues.forEach((value: number)=> {
        output += value;
    });
    return output.toString();
}

/*
For level 2, numbers as words should also be interpreted as number, eg. "one" = 1.
My approach here is to first find-replace all number-words with their digits (since we'll have to parse them later anyways)
*/
function level2(input: string): string{
    let calibrationValues: Array<number> = [];
    const digitPattern = new RegExp(/\d/g);
    // Note the absence of zero.
    const wordPattern = new RegExp(/one|two|three|four|five|six|seven|eight|nine/);
    const wordsToDigits = new Map([
        ["one", "1"], ["two", "2"], ["three", "3"],
        ["four", "4"], ["five", "5"], ["six", "6"],
        ["seven", "7"], ["eight", "8"], ["nine", "9"]
    ])

    for (let line of input.split("\n")){
        // Convert the first and last word-numbers to digits
        line = line.replace(wordPattern, match => {
            return (wordsToDigits.get(match) ?? "") + match;
        });
        let reverseMatchFound = false;
        // Reverse search the string with regex.
        for (let i = line.length-1; i > 0; i--){
            let substring = line.substring(i, line.length);
            substring = substring.replace(wordPattern, match => {
                reverseMatchFound = true;
                return match + (wordsToDigits.get(match) ?? "");
            });
            if (reverseMatchFound){
                line = line.substring(0, i) + substring;
                break;
            }
        }

        // Find and handle digits
        let digitMatches = line.match(digitPattern);
        let firstMatch = digitMatches?.[0] ?? "0";
        let lastMatch = digitMatches?.[digitMatches.length-1] ?? "0";
        calibrationValues.push(parseInt(firstMatch.concat(lastMatch)));
    }
    let output = 0;
    calibrationValues.forEach((value: number)=> {
        output += value;
    });
    return output.toString();
}