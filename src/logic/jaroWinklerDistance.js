// Jaro-Winkler Algorithm

// minimal number of transpositions needed for strings to match, giving more favorable rankings to strings with similar prefixes

const jaroWinklerDistance = (str1, str2) => {
    let matchingChar = 0;
    let transpositions;
    let confidence;

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
        let str1Matches = new Array(str1.length);
        let str2Matches = new Array(str2.length);
        let range = (Math.floor(Math.max(str1.length, str2.length)/2)) -1;

        for(let index = 0; index < str1.length; index++){
            let low = (index >= range) ? index - range : 0;
            let high = (index + range <= str2.length) ? (index + range) : (str2.length -1);

            for (index2 = low; index2 <= high; index2++){
                if(str1Matches[index] !== true && str2Matches[index2] !== true && str1[index] === str2[index2]){
                    ++matchingChar;
                    str1Matches[index] = true;
                    str2Matches[index2] = true;
                    break;
                }
            }
        }
        // if no matches found
        if(matchingChar === 0){
            return 0;
        }

        let numTrans = 0;
        let matchIndex = 0;

        for(let index = 0; index < str1.length; index++){
            if(str1Matches[index] === true){
                for(let index2 = matchIndex; index2 < str2.length; index2++){
                    if(str2Matches[index2] === true){
                        matchIndex = index2 + 1;
                        break;
                    }
                }
                if(str1[index] !== str2[index2]){
                    ++numTrans;
                }
            }
        }
        let weight = ((matchingChar/str1.length) + (matchingChar/str2.length) + (matchingChar - (numTrans/2)) / matchingChar) / 3;
        let prefixLength = 0;
        let pConstant = 0.1;

        if (weight > 0.7){
            while (str1[prefixLength] === str2[prefixLength] && prefixLength < 4){
                ++prefixLength;
            }

            weight = weight + prefixLength * pConstant * (1 - weight);
        }
        confidence = weight;
    }

    return confidence;
}