import { all } from "q";

export default function cosineSimilarity(str1, str2){
    let cleanStr1 = str1.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let cleanStr2 = str2.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let allWords = [];
    let words1 = cleanStr1.split(' ');
    let words2 = cleanStr2.split(' ');
    let wordFreq1 = [];
    let wordFreq2 = [];
    let dotProduct = 0;
    let eucNorm1 = 0;
    let eucNormFinal1;
    let eucNorm2 = 0;
    let eucNormFinal2;
    let cosSim;
    // count number of times all words appear in both texts
    // fill array with words from strings
    words1.forEach(word => {
        if(!allWords.includes(word)){
            allWords.push(word)
        }
    });
    words2.forEach(word => {
        if(!allWords.includes(word)){
            allWords.push(word)
        }
    });
    for(let index = 0; index < allWords.length; index++){
        if(words1.includes(allWords[index])){
            wordFreq1[index] !== undefined ? wordFreq1[index] += 1 : wordFreq1[index] = 1;
        } else {
            wordFreq1[index] = 0;
        }
        if(words2.includes(allWords[index])){
            wordFreq2[index] !== undefined ? wordFreq2[index] += 1 : wordFreq2[index] = 1;
        } else {
            wordFreq2[index] = 0;
        }
    }
    // calculate the dot product between the 2 frequency vectors as well as the Euclidean norm of the 2 vectors
    for(let vectorIndex = 0; vectorIndex < wordFreq1.length; vectorIndex++){
        dotProduct += wordFreq1[vectorIndex]*wordFreq2[vectorIndex];
        eucNorm1 += Math.pow(wordFreq1[vectorIndex],2);
        eucNorm2 += Math.pow(wordFreq2[vectorIndex],2);
    }
    // square products of vector squares for final Euclidean norm
    eucNormFinal1 = Math.sqrt(eucNorm1, 2);
    eucNormFinal2 = Math.sqrt(eucNorm2, 2);

    // calculate cosine between the vectors
    cosSim = dotProduct/(eucNormFinal1*eucNormFinal2);

    return cosSim;
}
