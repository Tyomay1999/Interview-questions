import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


export const getData = (setData,isLoading,loading,questionType) => {
    firebase.database().ref(`${questionType}`).on("value", question => {
        let questionlist = [];
        question.forEach(item => {
            questionlist.push(item.val());
        });
        if(questionlist){
            for(let i = 1; i < questionlist.length; i++ ){
                let num = 0;
                questionlist[0].questions.forEach(item => {
                    if(item.question === questionlist[i].question){
                        num += 1
                    }
                })
                if(!num){
                    questionlist[0].questions.push(questionlist[i])
                }
            }
            questionlist[0].totalQuestion = questionlist[0].questions.length
        }
        setData(questionlist)
        isLoading(!loading)
    })
}

const getResult = (trueAnswers,answers,getViewResult) => {
    let trueAnswersOnQuestions = 0;
    trueAnswers.forEach((item,index) => {
        if(item === answers[index]){
            trueAnswersOnQuestions += 1
        }
    });
    getViewResult(trueAnswersOnQuestions)
}

export const nextQuestion = (data,setRadioValue,radioValue,answers,setAnswers,trueAnswers,setTrueAnswers,questionNum,setQuestionNum,result,setResult,getViewResult,totalQuestion) => {
    answers.push(radioValue);
    trueAnswers.push(data[0].questions[questionNum].trueAnsver)
    setAnswers(answers)
    setTrueAnswers(trueAnswers)
    setRadioValue('')
    if (questionNum + 1 < totalQuestion) {
        setQuestionNum((questionNum + 1))
    } else {
         setResult(!result);
         getResult(trueAnswers,answers,getViewResult)
    }
}

