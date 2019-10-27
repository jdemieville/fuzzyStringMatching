// Jaro-Winkler Algorithm

// minimal number of transpositions needed for strings to match, giving more favorable rankings to strings with similar prefixes

export default function jaroWinklerDistance (str1, str2) {
    let matchingChar = 0;
    // map used to enforce unique key of characters
    let str1Map = new Map();
    let transpositions = 0;
    let confidence = 0;
    let jaroDistance = 0;
    let jaroWinkler = 0;
    let constantFactor = 0.1;
    let prefixLength = 0;

    // if both are empty, return confidence of 1 (match)
    if(str1.length === 0 && str2.length === 0){
        confidence = 1;
    // if one is empty, but not the other, return confidence of 0 (non-match)
    } else if(str1.length === 0 || str2.length === 0) {
        confidence = 0;
    // if strings match, return confidence of 1 (match)
    } else if(str1 === str2){
        confidence = 1;
    } else {
        for(let index1 = 0; index1 < str1.length; index1++){
            // fill map and calculate transpositions
            str1Map.set(str1.charAt(index1), 0);
            if(index1+1 <= str2.length-1){
                if(str1.charAt(index1) === str2.charAt(index1+1)){
                    transpositions++;
                }
            } else if(index1-1 >= 0){
                if(str1.charAt(index1) === str2.charAt(index1-1)){
                    transpositions++;
                }
            }
        }
        // count matches
        for(let index2 = 0; index2 < str2.length; index2++){
            if(str1Map.has(str2.charAt(index2))){
                str1Map.set(str2.charAt(index2), (str1Map.get(str2.charAt(index2))+1));
            }
        }

        // total all matches identified in map
        for(let value of str1Map.values()){
            matchingChar += value;
        }

        // get length of matching prefix (max of 4)
        for(let prefixIndex = 0; prefixIndex < 4; prefixIndex++){
            if(str1.charAt(prefixIndex) === str2.charAt(prefixIndex)){
                prefixLength++;
            } else {
                break;
            }
        }
        // 1/3((matches/s1length) + (matches/s2Length) + ((matches-transpositions)/matches))
        jaroDistance = (1/3)*((matchingChar/str1.length) + (matchingChar/str2.length) + ((matchingChar-transpositions)/matchingChar))

        // jaroDistance + ((prefixLength*constantFactor)*(1-jaroDistance))
        jaroWinkler = jaroDistance + ((prefixLength*constantFactor)*(1-jaroDistance));

        confidence = jaroWinkler;
    }

    return confidence;
}