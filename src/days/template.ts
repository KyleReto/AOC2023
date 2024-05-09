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

/**
 * Run the level 1 code on the problem.
 * @param input The input string, as defined by AoC
 * @returns The return string value.
 */
function level1(input: string): string{
    return "";
}

/**
 * Run the level 2 code on the problem, which is usually a more complex variant of the level 1 code.
 * @param input The input string, as defined by AoC
 * @returns The return string value.
 */
function level2(input: string): string{
    return "";
}