//clean data
//split into ngrams
//create tf-idf matrix
//calculate cosine similarity
export default function termFreqInvDocFreq(str1, str2){
    let cleanStr1 = str1.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let cleanStr2 = str2.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    let str1Tri = [''];
    let str2Tri = [''];
    let allTris = [];
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

    //create trigrams
    for(let str1Index = 0; str1Index < cleanStr1.length; str1Index++){
        //identify number of trigrams that can be created
        let triIndex = Math.trunc(str1Index/3);
        if(str1Tri[triIndex] == undefined){
            str1Tri[triIndex] = cleanStr1.charAt(str1Index);
        } else {
            str1Tri[triIndex] = (str1Tri[triIndex] + cleanStr1.charAt(str1Index));
        }
    }
    // to counteract the inherent bias towards strings which begin and end with same trigram, padding to start and end added
    str1Tri.push('_'+ cleanStr1.charAt(0) + cleanStr1.charAt(1));
    str1Tri.push(cleanStr1.charAt(cleanStr1.length-2) + cleanStr1.charAt(cleanStr1.length-1) + '_');
    for(let str2Index = 0; str2Index < cleanStr2.length; str2Index++){
        let triIndex = Math.trunc(str2Index/3);
        if(str2Tri[triIndex] == undefined){
            str2Tri[triIndex] = cleanStr2.charAt(str2Index);
        } else {
            str2Tri[triIndex] = (str2Tri[triIndex] + cleanStr2.charAt(str2Index));
        }
    }
    str2Tri.push('_'+ cleanStr2.charAt(0) + cleanStr2.charAt(1));
    str2Tri.push(cleanStr2.charAt(cleanStr2.length-2) + cleanStr2.charAt(cleanStr2.length-1) + '_');
    //combine all trigrams
    allTris = [...str1Tri, ...str2Tri];
    //remove duplicate trigrams
    let triSet = [...new Set(allTris)];

    for(let index = 0; index < triSet.length; index++){
        if(str1Tri.includes(triSet[index])){
            wordFreq1[index] !== undefined ? wordFreq1[index] += 1 : wordFreq1[index] = 1;
        } else {
            wordFreq1[index] = 0;
        }
        if(str2Tri.includes(triSet[index])){
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