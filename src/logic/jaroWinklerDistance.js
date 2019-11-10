// Jaro-Winkler Algorithm

// minimal number of transpositions needed for strings to match, giving more favorable rankings to strings with similar prefixes

export default function jaroWinklerDistance (str1, str2) {
    let cleanStr1 = str1.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let cleanStr2 = str2.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let matchingChar = 0;
    // map used to enforce unique key of characters
    let str1Map = new Map();
    let transpositions = 0;
    // confidence[0] = jaro; conficence[1] = jaroWinkler
    let confidence = [0,0];
    let jaroDistance = 0;
    let jaroWinkler = 0;
    let constantFactor = 0.1;
    let prefixLength = 0;

    // if both are empty, return confidence of 1 (match)
    if(cleanStr1.length === 0 && cleanStr2.length === 0){
        confidence = [1,1];
    // if one is empty, but not the other, return confidence of 0 (non-match)
    } else if(cleanStr1.length === 0 || cleanStr2.length === 0) {
        confidence = [0,0];
    // if strings match, return confidence of 1 (match)
    } else if(cleanStr1 === cleanStr2){
        confidence = [1,1];
    } else {
        for(let index1 = 0; index1 < cleanStr1.length; index1++){
            // fill map and calculate transpositions
            str1Map.set(cleanStr1.charAt(index1), 0);
            if(index1+1 <= cleanStr2.length-1){
                if(cleanStr1.charAt(index1) === cleanStr2.charAt(index1+1)){
                    transpositions++;
                }
            } else if(index1-1 >= 0){
                if(cleanStr1.charAt(index1) === cleanStr2.charAt(index1-1)){
                    transpositions++;
                }
            }
        }
        // count matches
        for(let index2 = 0; index2 < cleanStr2.length; index2++){
            if(str1Map.has(cleanStr2.charAt(index2))){
                str1Map.set(cleanStr2.charAt(index2), (str1Map.get(cleanStr2.charAt(index2))+1));
            }
        }

        // total all matches identified in map
        for(let value of str1Map.values()){
            matchingChar += value;
        }

        // get length of matching prefix (max of 4)
        for(let prefixIndex = 0; prefixIndex < 4; prefixIndex++){
            if(cleanStr1.charAt(prefixIndex) === cleanStr2.charAt(prefixIndex)){
                prefixLength++;
            } else {
                break;
            }
        }
        // 1/3((matches/s1length) + (matches/s2Length) + ((matches-transpositions)/matches))
        jaroDistance = (1/3)*((matchingChar/cleanStr1.length) + (matchingChar/cleanStr2.length) + ((matchingChar-transpositions)/matchingChar))

        // jaroDistance + ((prefixLength*constantFactor)*(1-jaroDistance))
        jaroWinkler = jaroDistance + ((prefixLength*constantFactor)*(1-jaroDistance));

        confidence = [jaroDistance, jaroWinkler];
    }

    return confidence;
}