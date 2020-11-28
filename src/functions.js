import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const createAcaunte = (loginAndPassword,setLoading,changeActive,setRegisterErrorMessage,isActive) => {
    const { email, password } = loginAndPassword;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => {
            let isSineIn = resp.operationType
            if (isSineIn === 'signIn') {
                setLoading(false)
                changeActive(!isActive)
            }
        })
        .catch(errore => {
            setRegisterErrorMessage(`${errore.message}`)
        })
}


export const checkPassword = (loginAndPassword,setRegisterErrorMessage,createAcaunte,setLoading,changeActive,isActive) => {
    if (loginAndPassword.password !== '') {
        if (loginAndPassword.password === loginAndPassword.conPassword) {
            setRegisterErrorMessage('')
            createAcaunte(loginAndPassword,setLoading,changeActive,setRegisterErrorMessage,isActive)
        } else {
            setLoading(false)
            setRegisterErrorMessage('passwords did not match')
        }
    }else{
        setLoading(false)
        setRegisterErrorMessage('Password is none')
    }
}

export const chackUser = (loginAndPassword,setLoading,setLoginErrorMessage, history) => {
    const { email, password } = loginAndPassword;

    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(resp => {
                let isSineIn = resp.operationType
                if (isSineIn === 'signIn') {
                    history.push('/')
                }
            })
            .catch(error => {
                setLoading(false)
                setLoginErrorMessage(`${error.message}`)
            })
    } else {
        setLoading(false)
        setLoginErrorMessage('Email or password is none')
    }
}

export const getData = (setData,isLoading,loading,questionType) => {
    firebase.database().ref(`${questionType}`).on("value", question => {
        let questionlist = [];
        question.forEach(item => {
            questionlist.push(item.val());
        });
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

export const nextQuestion = (data,setRadioValue,radioValue,answers,setAnswers,trueAnswers,setTrueAnswers,questionNum,setQuestionNum,result,setResult,getViewResult) => {
    answers.push(radioValue);
    trueAnswers.push(data[0].questions[questionNum].trueAnsver)
    setAnswers(answers)
    setTrueAnswers(trueAnswers)
    setRadioValue('')
    if (data[0].questions[questionNum].next) {
        setQuestionNum((questionNum + 1))
    } else {
         setResult(!result);
         getResult(trueAnswers,answers,getViewResult)
    }
}

