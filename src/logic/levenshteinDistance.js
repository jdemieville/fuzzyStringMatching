// Levenshtein Algorithm

// Determine distance between strings based on necessary edits of one to equal the other
export default function levenshteinDistance (str1, str2) {
    let cleanStr1 = str1.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let cleanStr2 = str2.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let altsNeeded;
    let matrix = [];
    // if both strings are empty, return 1, as the strings match
    if (cleanStr1.length === 0 && cleanStr2.length === 0){
        altsNeeded = 0;
    } else if (cleanStr1.length === 0 || cleanStr2.length === 0){
        // else if one string is empty; altsNeeded match length of string with value
        cleanStr1.length === 0 ? altsNeeded = cleanStr2.length : altsNeeded = cleanStr1.length;
    } else {
        let str1Index;
        let str2Index;

        // fill matrix with 'starting numbers'
        for(str1Index = 0; str1Index <= cleanStr1.length; str1Index++){
            matrix[str1Index] = [str1Index];
        }

        for(str2Index = 0; str2Index <= cleanStr2.length; str2Index++){
            matrix[0][str2Index] = str2Index;
        }

        // determining values to fill remainder of matrix
        for(str1Index = 1; str1Index <= cleanStr1.length; str1Index++){
            for(str2Index = 1; str2Index <= cleanStr2.length; str2Index++){
                // if characters at this position match, fill matrix with most recent low number
                if(cleanStr1.charAt(str1Index-1) == cleanStr2.charAt(str2Index-1)){
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
        altsNeeded = matrix[cleanStr1.length][cleanStr2.length];
    }
    let total;
    cleanStr1.length > cleanStr2.length ? total = cleanStr1.length : total = cleanStr2.length;
    // percentage of confidence
    return (total-altsNeeded)/total;
}