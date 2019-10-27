// Trigram Algorithm

// determines similarity by evaulating number of unique sequences of 3 exist between the 2 strings
export default function trigramIndex (str1, str2) {
    let str1Tri = [''];
    let str2Tri = [''];

    for(let str1Index = 0; str1Index < str1.length; str1Index++){
        //identify number of trigrams that can be created
        let triIndex = Math.trunc(str1Index/3);
        if(str1Tri[triIndex] == undefined){
            str1Tri[triIndex] = str1.charAt(str1Index);
        } else {
            str1Tri[triIndex] = (str1Tri[triIndex] + str1.charAt(str1Index));
        }
    }
    // to counteract the inherent bias towards strings which begin and end with same trigram, padding to start and end added
    str1Tri.push('_'+ str1.charAt(0) + str1.charAt(1));
    str1Tri.push(str1.charAt(str1.length-2) + str1.charAt(str1.length-1) + '_');
    for(let str2Index = 0; str2Index < str2.length; str2Index++){
        let triIndex = Math.trunc(str2Index/3);
        if(str2Tri[triIndex] == undefined){
            str2Tri[triIndex] = str2.charAt(str2Index);
        } else {
            str2Tri[triIndex] = (str2Tri[triIndex] + str2.charAt(str2Index));
        }
    }
    str2Tri.push('_'+ str2.charAt(0) + str2.charAt(1));
    str2Tri.push(str2.charAt(str2.length-2) + str2.charAt(str1.length-1) + '_');
    let str1Set = new Set(str1Tri);
    let str2Set = new Set(str2Tri);
    const intersection = new Set(
      [...str1Set].filter(tri => str2Set.has(tri)));

    // returns percentage of confidence; matching trigrams found over total trigrams from string with most trigrams
    const total = str1Set.size > str2Set.size ? str1Set.size : str2Set.size;
    return(intersection.size/total);
}