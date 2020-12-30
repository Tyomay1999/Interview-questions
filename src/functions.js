import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
export const firebaseAuth = firebase.auth;
export const firebaseDatabase = firebase.database;
export const Reg = {
    emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordReg: /^[a-z0-9_$-]{7,30}$/i
}
export const createAcaunte = ({
    totalUsers,
    firstName,
    lastName,
    email,
    password,
    setLoading,
    changeActive,
    isActive,
    setRegisterErrorMessage
}) => {
    if (totalUsers) {
        firebaseDatabase().ref(`Users/${totalUsers + 1}`).update({
            isAdmin: false,
            id: (totalUsers + 1),
            firstName,
            lastName,
            email,
            password
        })
        firebaseDatabase().ref(`Users/0`).update({
            totalUsers: totalUsers + 1
        })
    }
    firebaseAuth().createUserWithEmailAndPassword(email, password)
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
const checkAdmin = (email) => {
    let isadmin = false;
    firebaseDatabase().ref('Users').on("value", admin => {
        const admins = [];
        admin.forEach(elem => {
            admins.push(elem.val())
        })
        admins.forEach(elem => {
            if (elem.email === email) {
                isadmin = elem.isAdmin;
            }
        })
    })
    return isadmin
}
// ----------------------------------------------------
export const chackUser = ({
    email,
    password,
    setLoading,
    setLoginErrorMessage,
    history
}) => {
    if (email && password) {
        firebaseDatabase().ref('Admin').on("value", admin => {
            const admins = [];
            admin.forEach(item => {
                admins.push(item.val())
            })
            admins.forEach(elem => {
                if ((elem.login === email) && (elem.password === password)) {
                    history.push('/Admin')
                }
            })
        })
        firebaseAuth().signInWithEmailAndPassword(email, password)
            .then(resp => {
                let isSineIn = resp.operationType
                if (isSineIn === 'signIn') {
                    if (checkAdmin(email)) {
                        history.push('/Admin')
                    } else {
                        history.push('/questions')
                    }
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
export const getData = (setData, isLoading, loading, questionType) => {
    firebaseDatabase().ref(`QuestionType/${questionType.toUpperCase()}/${questionType}`).on("value", question => {
        const questionlist = [];
        const falseArray = [];
        question.forEach(item => {
            questionlist.push(item.val());
        });
        questionlist.forEach((item, index) => {
            item.id = index
        })
        for (let i = questionlist.length; i > 0; i--) {
            falseArray.push(questionlist[Math.floor(Math.random() * i)])
        }
        falseArray[falseArray.length] = { totalQuestion: questionlist.length }
        setData(falseArray)
        isLoading(!loading)
    })
}

const getResult = (trueAnswers, answers, getViewResult) => {
    let trueAnswersOnQuestions = 0;
    trueAnswers.forEach((item, index) => {
        if (item === answers[index]) {
            trueAnswersOnQuestions += 1
        }
    });
    getViewResult(trueAnswersOnQuestions)
}

export const nextQuestion = ({
    data,
    setRadioValue,
    radioValue,
    answers,
    setAnswers,
    trueAnswers,
    setTrueAnswers,
    questionNum,
    setQuestionNum,
    result,
    setResult,
    getViewResult,
    totalQuestion,
    question,
    setQuestion
}) => {
    answers.push(radioValue);
    trueAnswers.push(data[questionNum].trueAnswer)
    question.push(data[questionNum].question)
    setAnswers(answers)
    setTrueAnswers(trueAnswers)
    setQuestion(question)
    setRadioValue('')
    if (questionNum + 1 < totalQuestion) {
        setQuestionNum((questionNum + 1))
    } else {
        setResult(!result);
        getResult(trueAnswers, answers, getViewResult)
    }
}

export const CompleteAndExit = ({
    setResult,
    result,
    trueAnswers,
    answers,
    getViewResult
}) => {
    setResult(!result);
    getResult(trueAnswers, answers, getViewResult)
}

export const checker = ({
    answer1,
    answer2,
    answer3,
    answer4,
    trueAnswer
}) => {
    let coincidedAnswers = 0;
    let coincidedTrueAnswer = 0;
    const falseArray = [answer1, answer2, answer3, answer4]
    falseArray.forEach((item, index) => {
        for (let i = (index + 1); i < falseArray.length; i++) {
            if (item === falseArray[i]) {

                coincidedAnswers += 1
            }
        }
    })
    falseArray.forEach(answer => {
        if (trueAnswer === answer) {
            coincidedTrueAnswer += 1
        }
    })

    if (!coincidedAnswers && coincidedTrueAnswer) {
        return true
    } else {
        return false
    }
}

export const UserCreate = ({
    email,
    password,
    lastName,
    firstName,
    totalUsers,
    isAdmin,
    setLastName,
    setFirstName,
    setEmail,
    setPassword,
    setErrore,
    setLoading,
    loading,
    setUsers,
    setNewUsers
}) => {
    if (email && password && lastName && firstName) {
        firebaseAuth().createUserWithEmailAndPassword(email, password)
        firebaseDatabase().ref(`Users/${totalUsers + 1}`).update({
            isAdmin,
            id: (totalUsers + 1),
            firstName,
            lastName,
            email,
            password
        })
        firebaseDatabase().ref(`Users/0`).update({
            totalUsers: totalUsers + 1
        })
        setLastName('');
        setFirstName('');
        setEmail('');
        setPassword('');
        setErrore('');
        setLoading(!loading);
        setUsers(true);
        setNewUsers(false);
    } else {
        setErrore('Please write all lines')
    }
}

export const editeUser = ({
    users,
    isAdmin,
    firstName,
    lastName,
    email,
    setLastName,
    setFirstName,
    setEmail,
    setPassword,
    setIsAdmin,
    setLoading,
    loading,
    setUsers,
    setNewUsers
}) => {
    firebaseDatabase().ref(`Users/${users.user.id}`).update({
        isAdmin,
        id: users.user.id,
        firstName,
        lastName,
        email
    })
    setLastName('');
    setFirstName('');
    setEmail('');
    setPassword('');
    setIsAdmin(false)
    setLoading(!loading);
    setUsers(true)
    setNewUsers(false)
}

export const deleteUser = ({
    userDeleter,
    setErrore,
    setLastName,
    setFirstName,
    setEmail,
    setPassword,
    setLoading,
    loading,
    setUsers,
    setNewUsers,
    email
}) => {
    userDeleter[0].totalUsers -= 1;
    const falseArray = [];
    userDeleter.forEach((item, index) => {
        if (item.email === email) {
            falseArray.push(userDeleter[0])
            for (let i = 1; i < index; i++) {
                userDeleter[i].id = i;
                falseArray.push(userDeleter[i])
            }
            for (let i = index; i < userDeleter.length; i++) {
                if (userDeleter[i + 1]) {
                    userDeleter[i + 1].id = i;
                    userDeleter[i] = userDeleter[i + 1];
                    falseArray.push(userDeleter[i]);
                }
            }
        } else {
            setErrore('dont have a this user')
        }
    })
    firebaseDatabase().ref(`Users/${(userDeleter[0].totalUsers + 1)}`).remove();
    firebaseDatabase().ref('Users').update(falseArray);
    setLastName('');
    setFirstName('');
    setEmail('');
    setPassword('');
    setErrore('');
    setLoading(!loading);
    setUsers(true);
    setNewUsers(false);
}

export const creater = ({
    questionType,
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    trueAnswer,
    setQuestionType,
    setQuestion,
    setAnswer1,
    setAnswer2,
    setAnswer3,
    setAnswer4,
    setTrueAnswer,
    setErrore,
    newData,
    setNewData,
    setQuestions,
    setNewQuestion
}) => {
    if (questionType) {
        if (question && answer1 && answer2 && answer3 && trueAnswer) {
            if (checker({answer1, answer2, answer3, answer4, trueAnswer})) {
                firebaseDatabase().ref(`QuestionType/${questionType.toUpperCase()}/${questionType}`).on('value', questions => {
                    questions.forEach(item => {
                        newData.push(item.val())
                    })
                    setNewData(newData)
                })
                newData.push({
                    answers: [answer1, answer2, answer3, answer4],
                    question: question,
                    questionCode: false,
                    questionType: false,
                    trueAnswer: trueAnswer
                })
                setNewData(newData)
                firebaseDatabase().ref(`QuestionType/${questionType.toUpperCase()}/${questionType}`).update(newData)
                setQuestionType('');
                setQuestion('')
                setAnswer1('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setTrueAnswer('');
                setErrore('');
                setNewData([]);
                setQuestions(true)
                setNewQuestion(false)
            } else {
                setErrore('No correct answer was found in the answers')
            }
        } else {
            setErrore('Please write all line')
        }
    } else {
        setErrore('Please click to Question Type')
    }
}

export const editQuestion = ({
    questionType,
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    trueAnswer,
    setQuestionType,
    setQuestion,
    setAnswer1,
    setAnswer2,
    setAnswer3,
    setAnswer4,
    setTrueAnswer,
    setErrore,
    id,
    setQuestions,
    setNewQuestion

}) => {
    if (questionType) {
        if (question && answer1 && answer2 && answer3 && trueAnswer) {
            if (checker({answer1, answer2, answer3, answer4, trueAnswer})) {
                firebaseDatabase().ref(`QuestionType/${questionType.toUpperCase()}/${questionType}/${id}`).update({
                    question,
                    answers: [answer1, answer2, answer3, answer4],
                    trueAnswer,
                    questionCode: false,
                    questionTyupe: false
                })
                setErrore('');
                setQuestionType('');
                setQuestion('');
                setTrueAnswer('');
                setAnswer1('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setQuestions(true);
                setNewQuestion(false);
            } else {
                setErrore('No correct answer was found in the answers')
            }
        } else {
            setErrore('Please write all line')
        }
    } else {
        setErrore('Please click to Question Type')
    }

}
export const deleteQuestion = ({
    questionType,
    setQuestions,
    setNewQuestion,
    id
}) => {
    firebaseDatabase().ref(`QuestionType/${questionType.toUpperCase()}/${questionType}/${id}`).remove()
    setQuestions(true)
    setNewQuestion(false)
}

export const addQuestionType = ({
    addedQuestionType,
    setAddedQuestionType,
    setShowInput
}) => {
    firebaseDatabase().ref(`QuestionType/${addedQuestionType.toUpperCase()}`).update({ name: addedQuestionType });
    setShowInput(false);
    setAddedQuestionType('');
}

export const deleteQuestionType = ({
    questionType,
    setQuestions,
    setNewQuestion
}) => {
    firebaseDatabase().ref(`QuestionType/${questionType.toUpperCase()}`).remove()
    setQuestions(true)
    setNewQuestion(false)
}
