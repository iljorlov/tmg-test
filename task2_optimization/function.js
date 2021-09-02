//================== TASK 2 =======================================
function compare(ruText, enTextWithComments) {
    let equalPairs = [];
    let nonLetters = [' ', ',', '.', ':', '-', ';', '\'']
    //==================================
    // the idea of this optimization is to avoid recounting data that had already been counted
    // this can be done using memoization
    // make these to store already counted data
    let enStringIndexes = {}
    let enCommentIndexes = {}
    let enEntries = []
    //==================================

    for (let i = 0; i < ruText.length; i++) {
        let ruStringIndex = 0;
        let ruLetterIndex = 0.5;
        for (let j = 0; j < ruText[i].length; j++) {
            if (!nonLetters.includes(ruText[i][j])) {
                ruStringIndex += ruLetterIndex + 1;
                ruLetterIndex += 1;
            }
        }
        for (let k = 0; k < enTextWithComments.length; k++) {
            // only do following loops if the text/comment is a new one
        	if (!enEntries.includes(enTextWithComments[k])){
                enEntries.push(enTextWithComments[k])
                let enStringIndex = 0;
                let enLetterIndex = 0.5;
                let enCommentIndex = 0;
                let commentLetterIndex = 0.5;
                let enText = enTextWithComments[k].split('|')[0];
                let comment = enTextWithComments[k].split('|')[1];
                
                // store current text with indexes is the "enStringIndexes" hash
                if (enStringIndexes[enText] === undefined) {
                    for (let n = 0; n < enText.length; n++) {
                        if (!nonLetters.includes(enText[n])) {
                            enStringIndex += enLetterIndex + 1;
                            enLetterIndex += 1;
                        }
                    }
                    enStringIndexes[enText] = {enStringIndex, enLetterIndex}
                }

                // store current comment with indexes is the "enStringIndexes" hash
                if (enCommentIndexes[comment] === undefined){
                    for (let m = 0; m < comment.length; m++) {
                        if (!nonLetters.includes(comment[m])) {
                            enCommentIndex += commentLetterIndex + 1;
                            commentLetterIndex += 1;
                        }
                    }
                    enCommentIndexes[comment] = {enCommentIndex, commentLetterIndex}
                }
            }

            // exctract enStringIndex and enCommentIndex from hashes
            let currentEnStringIndex = enStringIndexes[enTextWithComments[k].split('|')[0]].enStringIndex
            let currentEnCommentIndex = enCommentIndexes[enTextWithComments[k].split('|')[1]].enCommentIndex
            if (currentEnCommentIndex > 0.5) {
                if (
                    ruStringIndex === currentEnStringIndex + currentEnCommentIndex
                    ) {
                    equalPairs.push({
                        ruText: ruText[i],
                        enText: enTextWithComments[k]
                    });
                }
            }
        }
    }
    return equalPairs;
}

//=================================================================

console.log(compare(['анчоус1', 'анчоус2'], ['pizza1|kjk', 'pizza2|szp']))
