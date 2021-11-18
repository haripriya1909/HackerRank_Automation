const puppeteer=require("puppeteer");
const loginLink='https://www.hackerrank.com/auth/login';
const codeObj= require('./code')
let email = "xoyidip373@incoware.com";
let pass = "pepcoding"
let browserOpen= puppeteer.launch(
    {
    headless:false,
    args :['start-maximized'],
    defaultViewport:null
   }
);
let page;
browserOpen.then(function (browserobj)
{
    let browserOpenpromise= browserobj.newPage();
    return browserOpenpromise;
}).then(function(newTab)
{
    page=newTab
    let hackerrankOpenPromise=newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function ()
{
    let emailIsEntered= page.type("input[type='text']" , email , {dealy : 50});
    return emailIsEntered;
}).then(function ()
{
    let passIsEntered= page.type("input[type='password']" , pass , {dealy : 50});
    return passIsEntered;
}).then(function ()
{
    let loginbuttonClicked= page.click("button[data-analytics='LoginPassword']" , {dealy : 50});
    return loginbuttonClicked;
}).then(function ()
{

    let clickOnAlgoPromise= waitandclick("a[data-attr1='algorithms']" , page);
    return clickOnAlgoPromise;
}).then(function ()
{

    let letgetToWarmup= waitandclick("input[value='warmup']",page);
    return letgetToWarmup;
}).then(function ()
{

    let waitfor3seconds=page.waitFor(3000);
    return waitfor3seconds;
}).then(function ()
{
    let allChallengesPromise=page.$$("div.challenge-submit-btn",{delay:50});
    return allChallengesPromise;
}).then(function (quesArr)
{
    console.log("number of question" , quesArr.length);
    let questionwillbesolvedPromise= questionSolver(page,quesArr[0],codeObj.answers[0]);
    return questionwillbesolvedPromise;
})


function waitandclick(selector , Cpage)
{
    return new Promise(function (resolve , reject)
    {
        let waitforModelPromise =Cpage.waitForSelector(selector)
        waitforModelPromise.then(function ()
        {
            let clickModel = Cpage.click(selector);
            return clickModel;
        }).then(function ()
        {
            resolve();
        }).catch(function (err)
        {
            reject();
        })
    });
}


function questionSolver(page,question,answer)
{
    return new Promise(function (resolve , reject)
    {
        let questionwillBeClicked = question.click();
        questionwillBeClicked.then(function ()
        {
            let EditorInFocusPromise=waitandclick(".monaco-editor.no-user-select.vs" , page);
            return EditorInFocusPromise;
        }).then(function ()
        {
            return waitandclick("input[type='checkbox']",page)
        }).then(function ()
        {
            return page.waitForSelector("textarea[id='input-1']",page)
        }).then(function ()
        {
            return page.type("textarea[id='input-1']" , answer , {delay:10});
        }).then(function ()
        {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function ()
        {
            let AIsPressed = page.keyboard.press('A',{delay:100});
            return AIsPressed;
        }).then(function ()
        {
            let XIsPressed = page.keyboard.press('X',{delay:100});
            return XIsPressed;
        }).then(function ()
        {
            let CtrlIsUnPressed = page.keyboard.up('Control');
            return CtrlIsUnPressed;
        }).then(function ()
        {
            let mainEditorInFocus = waitandclick(".monaco-editor.no-user-select.vs",page)
            return mainEditorInFocus;
        }).then(function ()
        {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function ()
        {
            let AIsPressed = page.keyboard.press('A',{delay:100});
            return AIsPressed;
        }).then(function ()
        {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function ()
        {
            let VIsPressed = page.keyboard.press('V',{delay:100});
            return VIsPressed;
        }).then(function ()
        {
            let CtrlIsUnPressed = page.keyboard.up('Control');
            return CtrlIsUnPressed;
        }).then(function ()
        {
            return page.click("hr-monaco__run-code" , {delay:10})
        }).then(function ()
        {
            resolve();
        }).catch(function (err)
        {
            reject();
        })
        

        
    })
}
