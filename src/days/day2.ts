export function main(level: string, input: string): string {
    switch (level) {
        case "1":
            return level1(input);
        case "2":
            return level2(input);
        default:
            return `Code for level ${level} not found.`
    }
}

// There are an arbitrary number of games, indexed by a (sequential?) ID.
// For each game, a number of sets of cubes are pulled, where each set is separated by a `;`.
//      Sets are taken with replacement (each set is returned before drawing a new one)
// Within each set, a number of cubes of varying colors are drawn, separated by `,`s
//      Cubes within sets are taken without replacement (cubes are drawn simultaneously).
// For level 1, the goal is to determine which sets 

/**
 * Each Game object has an array of sets,
 * where each set has an arbitrary number of drawn cubes matching arbitrary colors as strings.
 */
interface Game {
    id: number,
    sets: Array<
        Map<string, number>
    >;
}

/**
 * Parse the input string into an object.
 * @param input The input string from AoC.
 * @returns An array of Game objects, see the Game interface.
 */
function parseInput(input: string): Array<Game> {
    let result = new Array<Game>();
    // Input looks like `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`
    for (const line of input.trim().split('\n')) {
        let [gameString, allSetsInfo] = line.split(': ');

        let setContents = new Array<Map<string, number>>();
        for (const setString of allSetsInfo.split('; ')) {
            let drawsInSet = new Map<string, number>();
            for (const drawString of setString.split(', ')) {
                let [numString, colorString] = drawString.split(' ');
                drawsInSet.set(colorString, parseInt(numString));
            }
            setContents.push(drawsInSet);
        }

        let gameId = parseInt(gameString.substring(gameString.indexOf(" ")));
        result.push({ id: gameId, sets: setContents });
    }

    return result;
}

/**
 * Run the level 1 code on the problem.
 * @param input The input string, as defined by AoC
 * @returns The return string value.
 */
function level1(input: string): string {
    const CUBE_LIMITS = new Map([["red", 12], ["green", 13], ["blue", 14]]);
    let parsedInput = parseInput(input);
    let possibleIds = new Array<number>;

    for (const game of parsedInput) {
        let isGamePossible = true;
        for (const set of game.sets) {
            for (const color of CUBE_LIMITS.keys()) {
                if ((set.get(color) ?? 0) > (CUBE_LIMITS.get(color) ?? 0)){
                    isGamePossible = false;
                    break;
                }
            }
            if (!isGamePossible) break;
        }
        if (isGamePossible){
            possibleIds.push(game.id);
        }
    }

    let output = possibleIds.reduce((a, b) => a + b, 0);
    return output.toString();
}

/**
 * Run the level 2 code on the problem, which is usually a more complex variant of the level 1 code.
 * @param input The input string, as defined by AoC
 * @returns The return string value.
 */
function level2(input: string): string {
    let parsedInput = parseInput(input);
    let possibleIds = new Array<number>;
    let result = 0;

    for (const game of parsedInput) {
        let maxCubesPerColor = new Map<string, number>();
        for (const set of game.sets) {
            for (const color of set.keys()) {
                let cubesOfThisColorInSet = set.get(color) ?? 0;
                if (cubesOfThisColorInSet > (maxCubesPerColor.get(color) ?? 0)) {
                    maxCubesPerColor.set(color, cubesOfThisColorInSet);
                }
            }
        }
        let power = 1;
        for (const [color, count] of maxCubesPerColor){
            power *= count;
        }
        result += power;
    }

    return result.toString();
}