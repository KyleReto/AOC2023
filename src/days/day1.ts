export function main(level : string, input : string) : string{
    switch(level){
        case "1":
            return level1(input);
        case "2":
            return level2(input);
        default:
            return `Code for level ${level} not found.`
    }
}

function level1(input : string) : string{
    return input;
}

function level2(input : string) : string{
    return input
}