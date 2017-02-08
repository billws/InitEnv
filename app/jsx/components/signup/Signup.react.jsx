var NetwTools = require('../../utilities/NetwTools');
var SignupAction = require('../../actions/signup/SignupAction');
var SignupStore = require('../../stores/signup/SignupStore');

var INPUTDOMNAME = {
    email: "email",
    password: "password",
    passwordAgain: "passwordAgain",
    phonenumber: "phonenumber",
    lastName: "lastName",
    firstName: "firstName",
    txtDate: "txtDate",
    gender: "gender"
};

var SignupContent = React.createClass({

    checkEmail: function(email) {
        var errorObject = this.state.errorMessage;
        var isCorrect = false;
        if (!NetwTools.matchEmail(email)) {
            errorObject[INPUTDOMNAME.email] = "";
        } else {
            delete errorObject[INPUTDOMNAME.email];
            isCorrect = true;
        }
        this.setState({signupEmail: email, errorMessage: errorObject});
        return isCorrect;
    },

    checkPassword: function(password) {
        var errorObject = this.state.errorMessage;
        var isCorrect = false;
        if (!password) {
            errorObject[INPUTDOMNAME.password] = "";
        } else {
            delete errorObject[INPUTDOMNAME.password];
            isCorrect = true;
        }
        this.setState({signupPassword: password, errorMessage: errorObject});
        return isCorrect;
    },

    checkPasswordAgain: function(passwordAgain) {
        var errorObject = this.state.errorMessage;
        var isCorrect = false;
        if (passwordAgain != this.state.signupPassword) {
            errorObject[INPUTDOMNAME.passwordAgain] = "";
        } else {
            delete errorObject[INPUTDOMNAME.passwordAgain];
            isCorrect = true;
        }
        this.setState({signupPasswordAgain: passwordAgain, errorMessage: errorObject});
        return isCorrect;
    },

    handleSignupInput: function(e) {
        var names = e.target.name,
            targetValue = e.target.value;

        switch (names) {
            case INPUTDOMNAME.email:
                var setObject = this.checkEmail(targetValue);
                //this.setState(setObject);
                break;
            case INPUTDOMNAME.password:
                var setObject = this.checkPassword(targetValue);
                //this.setState({signupPassword: targetValue});
                break;
            case INPUTDOMNAME.passwordAgain:
                var setObject = this.checkPasswordAgain(targetValue);
                //this.setState({signupPasswordAgain: targetValue});
                break;
            default:
        }
    },

    checkAndSubmit: function(event) {
        event.preventDefault();
        //console.log(this.state);
        var email = this.checkEmail(this.state.signupEmail);
        var password = this.checkPassword(this.state.signupPassword);
        var passwordAgain = this.checkPasswordAgain(this.state.signupPasswordAgain);
        var reCaptcha = ((this.state.googleReCaptcha)
            ? true
            : false);
        // console.log(email);
        // console.log(password);
        // console.log(passwordAgain);
        // console.log(reCaptcha);
        if (email && password && passwordAgain && reCaptcha) {
            this.signupNow();
        }
        return;
    },

    signupNow: function() {
        var actName = "";
        var signupModel = {
            "Email": this.state.signupEmail,
            "PWD": this.state.signupPassword,
            "confirmPWD": this.state.signupPasswordAgain,
            "ACTName": actName,
            "AgreePaper": 1,
            "MessagePaper": 1
        };
        var postData = JSON.stringify({"SaveAccountVM": signupModel, "activity": actName});
        SignupAction.signup(postData);
    },

    showError: function(inputName) {
        var errClass = "";
        var allError = Object.keys(this.state.errorMessage);
        for (var i = 0; i < allError.length; i++) {
            if (inputName == allError[i]) {
                errClass = "errMsg";
            }
        }
        return errClass;
    },

    initGreCaptcha: function(idName, verifyCallback, theme, type) {
        grecaptcha.render(idName, {
            'sitekey': '6LdBUgATAAAAAMLJw020y8KArh95QbmWer4P_q7k',
            'callback': verifyCallback,
            'theme': theme,
            'type': type
        });
    },

    verifyCallback: function(reponse) {
        this.setState({googleReCaptcha: reponse});
        //$("#gcap").val(reponse);
    },

    isPassword: function() {
        var inputType = "password";
        if (this.state.showPassword) {
            inputType = "text";
        }
        return inputType;
    },

    showPassword: function(event) {
        this.setState({
            showPassword: !this.state.showPassword
        });
    },

    getInitialState: function() {
        return {
            signupEmail: "",
            signupPassword: "",
            showPassword: false,
            signupPasswordAgain: "",
            googleReCaptcha: "",
            errorMessage: {}
        };
    },

    componentWillMount: function() {
        SignupStore.addChangeListener(this._onChange);
    },

    componentDidMount: function() {
        var verifyCallback = this.verifyCallback;
        var enableReCaptcha = this.initGreCaptcha;
        $(window).load(function() {
            enableReCaptcha('googlecaptcha', verifyCallback, 'light', 'image');
        });
    },

    componentWillUnmount: function(){
        SignupStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className="signup">
                <div className="title">
                    <h3>歡迎加入會員</h3>
                </div>
                <div className="signupPage">
                    <ul className="signupContent">
                        <li>
                            <p className={"signupInfo " + this.showError(INPUTDOMNAME.email)}>
                                <input type="email" name={INPUTDOMNAME.email} placeholder="請輸入e-mail(帳號)" defaultValue={this.state.signupEmail} onChange={this.handleSignupInput}/>
                            </p>
                            <p className={"signupInfo " + this.showError(INPUTDOMNAME.password)}>
                                <input type={this.isPassword()} name={INPUTDOMNAME.password} placeholder="請輸入密碼" defaultValue={this.state.signupPassword} onChange={this.handleSignupInput}/>
                                <input type="button" value="顯示密碼" className="showPassword" onClick={this.showPassword}/>
                            </p>
                            <p className={"signupInfo " + this.showError(INPUTDOMNAME.passwordAgain)}>
                                <input type="password" name={INPUTDOMNAME.passwordAgain} placeholder="再次輸入密碼" defaultValue={this.state.signupPasswordAgain} onChange={this.handleSignupInput}/>
                            </p>
                            <div className="signupInfo googlecaptcha">
                                <div className="captchaContent" id="googlecaptcha"></div>
                            </div>
                            <a className="signupBtn" href="" onClick={this.checkAndSubmit}>加入會員</a>
                            <p className="provision">我同意接受
                                <a href="#" target="_blank">服務條款</a>和
                                <a href="#" target="_blank">隱私權政策</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    },

    _onChange: function() {
        var errorObject = this.state.errorMessage;
        var response = SignupStore.getResponse();
        switch (response) {
            case "0":
                alert("您已正式成為會員，誠摯歡迎您的加入");
                ga('send', 'pageview', '/myaccount/signupcomplete');
                location.href = "/";
                break;
            case "1":
                alert("系統錯誤，請洽服務人員");
                break;
            case "Email已存在\n":
                alert("Email已存在");
                errorObject[INPUTDOMNAME.email] = "";
                break;
            case "帳號格式錯誤\n":
                alert("帳號格式錯誤");
                errorObject[INPUTDOMNAME.password] = "";
                break;
            case "確認密碼與密碼不符\n":
                alert("確認密碼與密碼不符");
                errorObject[INPUTDOMNAME.password] = "";
                errorObject[INPUTDOMNAME.passwordAgain] = "";
                break;
            case "密碼有誤\n":
                alert("密碼有誤");
                errorObject[INPUTDOMNAME.password] = "";
                break;
            case "資料錯誤\n":
                alert("資料錯誤，請檢查後再送出");
                break;
            default:
                location.href = "/";
                break;
        }
        this.setState({signupPassword: "", signupPasswordAgain: "", errorMessage: errorObject});
    }
});

module.exports = SignupContent;
