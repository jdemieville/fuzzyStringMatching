// Levenshtein Algorithm

// Determine distance between strings based on necessary edits of one to equal the other
const levenshteinDistance = (str1, str2) => {
    let altsNeeded;
    let matrix = [];
    // if both strings are empty, return 1, as the strings match
    if (str1.length === 0 && str2.length === 0){
        altsNeeded = 0;
    } else if (str1.length === 0 || str2.length === 0){
        // else if one string is empty; altsNeeded match length of string with value
        str1.length === 0 ? altsNeeded = str2.length : altsNeeded = str1.length;
    } else {
        let str1Index;
        let str2Index;

        // fill matrix with 'starting numbers'
        for(str1Index = 0; str1Index <= str1.length; str1Index++){
            matrix[str1Index] = [str1Index];
        }

        for(str2Index = 0; str2Index <= str2.length; str2Index++){
            matrix[0][str2Index] = str2Index;
        }

        // determining values to fill remainder of matrix
        for(str1Index = 1; str1Index <= str1.length; str1Index++){
            for(str2Index = 1; str2Index <= str2.length; str2Index++){
                // if characters at this position match, fill matrix with most recent low number
                if(str1.charAt(str1Index-1) == str2.charAt(str2Index-1)){
                    matrix[str1Index][str2Index] = matrix[str1Index-1][str2Index-1];
                } else {
                    // substitution 'cost'
                    let substitution = matrix[str1Index-1][str2Index-1] + 1;
                    // insertion 'cost'
                    let insertion = matrix[str1Index][str2Index-1] + 1;
                    // deletion 'cost'
                    let deletion = matrix[str1Index-1][str2Index] + 1;
                    // fill matrix with lowest number from these results
                    matrix[str1Index][str2Index] = Math.min(substitution, insertion, deletion);
                }
            }
        }
        // number of alterations needed from last entry in matrix
        altsNeeded = matrix[str1.length][str2.length];
    }
    return altsNeeded;
}