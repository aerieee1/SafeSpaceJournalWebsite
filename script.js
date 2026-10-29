document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // SAFE SPACE WEBSITE
    // =====================================================

    const API_BASE =
        "https://safespaceapi-e1ku.onrender.com/";


    // =====================================================
    // HELPER
    // =====================================================

    const $ = id =>
        document.getElementById(id);

    const loginScreen = $("loginScreen");
    const otpScreen = $("otpScreen");
    const verifyPasscodeScreen = $("verifyPasscodeScreen");
    const passcodeScreen = $("passcodeScreen");
    const clueScreen = $("clueScreen");
    const nicknameScreen = $("nicknameScreen");
    const appScreen = $("appScreen");

    const emailInput = $("email");
    const passwordInput = $("password");
    const togglePassword = $("togglePassword");
    const loginBtn = $("loginBtn");
    const createAccountBtn = $("createAccountBtn");
    const forgotPasswordBtn = $("forgotPasswordBtn");

    const otpEmail = $("otpEmail");
    const otpInputs =
        document.querySelectorAll(".otp-input");
    const verifyOtpBtn = $("verifyOtpBtn");
    const resendOtpBtn = $("resendOtpBtn");
    const backFromOtpBtn = $("backFromOtpBtn");
    const otpTimer = $("otpTimer");

const verifyPasscodeInputs = document.querySelectorAll(
    ".verify-passcode-input"
);

const verifyPasscodeBtn = $("verifyPasscodeBtn");
const verificationClue = $("verificationClue");
const forgotPasscodeBtn = $("forgotPasscodeBtn");
const useAnotherAccountBtn = $("useAnotherAccountBtn");

const passcodeInputs = document.querySelectorAll(
    ".passcode-input"
);

const savePasscodeBtn = $("savePasscodeBtn");
const backFromPasscodeBtn = $("backFromPasscodeBtn");
const passcodeClueInput = $("passcodeClue");
const saveClueBtn = $("saveClueBtn");
const backFromClueBtn = $("backFromClueBtn");

const nicknameInput = $("nickname");
const finishRegistrationBtn = $("finishRegistrationBtn");
const backFromNicknameBtn = $("backFromNicknameBtn");

// =====================================================
// APP PAGES / NAVIGATION
// =====================================================

const homePage =
    $("homePage");

const journalPage =
    $("journalPage");

const writeJournalPage =
    $("writeJournalPage");

const profilePage =
    $("profilePage");


const homeGreeting =
    $("homeGreeting");


const homeNavBtn =
    $("homeNavBtn");

const journalNavBtn =
    $("journalNavBtn");

const profileNavBtn =
    $("profileNavBtn");


const writeThoughtBtn =
    $("writeThoughtBtn");

const viewEntriesBtn =
    $("viewEntriesBtn");


// =====================================================
// SIDEBAR
// =====================================================

const sidebar =
    $("sidebar");

const hamburgerBtn =
    $("hamburgerBtn");

const sidebarCloseBtn =
    $("sidebarCloseBtn");

const sidebarOverlay =
    $("sidebarOverlay");

    // =====================================================
    // JOURNAL LIST
    // =====================================================

    const addEntryBtn =
        $("addEntryBtn");

    const journalSearchInput =
        $("journalSearchInput");

    const allEntriesBtn =
        $("allEntriesBtn");

    const journalStatus =
        $("journalStatus");

    const journalEntryList =
        $("journalEntryList");


// =====================================================
// WRITE JOURNAL
// =====================================================

const backFromWriteBtn =
    $("backFromWriteBtn");

const cancelEntryBtn =
    $("cancelEntryBtn");

const saveEntryBtn =
    $("saveEntryBtn");

const writeJournalHeading =
    $("writeJournalHeading");

const journalTitleInput =
    $("journalTitleInput");

const journalContentEditor =
    $("journalContentEditor");

const editorToolbar =
    $("editorToolbar");

const fontSizeBtn =
    $("fontSizeBtn");

const textColorPicker =
    $("textColorPicker");

const highlightColorPicker =
    $("highlightColorPicker");

const quoteBtn =
    $("quoteBtn");

const paragraphBtn =
    $("paragraphBtn");

const moreFormatBtn =
    $("moreFormatBtn");

const moreFormatMenu =
    $("moreFormatMenu");


// =====================================================
// PROFILE
// =====================================================

const profileNickname =
    $("profileNickname");

const profileEmail =
    $("profileEmail");

const profileCluePreview =
    $("profileCluePreview");

const changePasscodeProfileBtn =
    $("changePasscodeProfileBtn");

const changePasswordProfileBtn =
    $("changePasswordProfileBtn");

const passcodeClueProfileBtn =
    $("passcodeClueProfileBtn");

const logoutProfileBtn =
    $("logoutProfileBtn");


const changePasscodePanel =
    $("changePasscodePanel");

const changePasswordPanel =
    $("changePasswordPanel");

const passcodeCluePanel =
    $("passcodeCluePanel");


const oldPasscodeProfile =
    $("oldPasscodeProfile");

const newPasscodeProfile =
    $("newPasscodeProfile");

const confirmPasscodeProfile =
    $("confirmPasscodeProfile");

const saveProfilePasscodeBtn =
    $("saveProfilePasscodeBtn");

const forgotPasscodeProfileBtn =
    $("forgotPasscodeProfileBtn");

const oldPasswordProfile =
    $("oldPasswordProfile");

const newPasswordProfile =
    $("newPasswordProfile");

const confirmPasswordProfile =
    $("confirmPasswordProfile");

const saveProfilePasswordBtn =
    $("saveProfilePasswordBtn");

    const forgotPasswordProfileBtn =
    $("forgotPasswordProfileBtn");


const profileClueInput =
    $("profileClueInput");

const saveProfileClueBtn =
    $("saveProfileClueBtn");


    // =====================================================
    // STATE
    // =====================================================

    let currentPurpose = "";

    let timerInterval = null;

    let otpExpired = false;

    let isSendingOtp = false;

    let isVerifyingOtp = false;

    let isVerifyingPasscode = false;

    let isRegistering = false;

    let isSavingEntry = false;

    let journalEntries = [];

    let editingEntryId = null;

    let currentFontIndex = 0;

    const fontFamilies = [
        "Arial",
        "Verdana",
        "Georgia",
        "Courier New"
    ];


    // =====================================================
    // API HELPERS
    // =====================================================

    async function postForm(
        endpoint,
        data = {}
    ) {

        const body =
            new URLSearchParams();

        Object.entries(data).forEach(
            ([key, value]) => {

                body.append(
                    key,
                    value == null
                        ? ""
                        : String(value)
                );
            }
        );

        const response =
            await fetch(
                API_BASE + endpoint,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded; charset=UTF-8",

                        "Accept":
                            "application/json"
                    },

                    body:
                        body.toString()
                }
            );

        const text =
            await response.text();

        if (!text.trim()) {

            throw new Error(
                "The server returned an empty response."
            );
        }

        let json;

        try {

            json = JSON.parse(text);

        } catch (error) {

            console.error(
                "Invalid server response:",
                text
            );

            throw new Error(
                "The server returned an invalid response."
            );
        }

        return {
            ok: response.ok,
            status: response.status,
            json
        };
    }


    async function postAuthenticatedForm(
        endpoint,
        data = {}
    ) {

        const token =
            localStorage.getItem(
                "safeSpaceApiToken"
            ) || "";

        if (!token) {

            throw new Error(
                "Your session is missing. Please log in again."
            );
        }

        return await postForm(
            endpoint,
            {
                api_token: token,
                ...data
            }
        );
    }


// =====================================================
// SHOW SCREEN
// =====================================================


function showScreen(screen) {

    [
        loginScreen,
        otpScreen,
        verifyPasscodeScreen,
        passcodeScreen,
        clueScreen,
        nicknameScreen,
        appScreen
    ].forEach(item => {

        if (item) {
            item.classList.add("hidden");
        }

    });

    // Itago ang passcode clue kapag binubuksan
    // ang verification screen.
    if (screen === verifyPasscodeScreen) {
        hideVerificationClue();
    }

    // Ipakita ang screen na pinili.
    if (screen) {
        screen.classList.remove("hidden");
    }

    // Isara ang sidebar kapag umaalis sa app.
    if (screen !== appScreen) {
        closeSidebar();
    }
}


function hideAllAppPages() {

    [
        homePage,
        journalPage,
        writeJournalPage,
        profilePage,
        changePasscodePanel,
        changePasswordPanel,
        passcodeCluePanel
    ].forEach(page => {

        if (page) {
            page.classList.add("hidden");
        }
    });
}


    function clearActiveNavigation() {

        [
            homeNavBtn,
            journalNavBtn,
            profileNavBtn
        ].forEach(button => {

            if (button) {
                button.classList.remove("active");
            }
        });
    }


    function updateHomeGreeting() {

        const nickname =
            localStorage.getItem(
                "safeSpaceNickname"
            ) || "Friend";

        if (homeGreeting) {

            homeGreeting.textContent =
                "How are you, " +
                nickname +
                "?";
        }
    }


    function openApp() {

        showScreen(appScreen);

        openAppPage("home");

        updateHomeGreeting();
    }


    function openAppPage(pageName) {

        hideAllAppPages();

        clearActiveNavigation();

        if (pageName === "home") {

            homePage?.classList.remove(
                "hidden"
            );

            homeNavBtn?.classList.add(
                "active"
            );

            updateHomeGreeting();
        }

        if (pageName === "journal") {

            journalPage?.classList.remove(
                "hidden"
            );

            journalNavBtn?.classList.add(
                "active"
            );

            loadJournalEntries();
        }

        if (pageName === "write") {

            writeJournalPage?.classList.remove(
                "hidden"
            );

            journalNavBtn?.classList.add(
                "active"
            );
        }

        if (pageName === "profile") {

            profilePage?.classList.remove(
                "hidden"
            );

            profileNavBtn?.classList.add(
                "active"
            );

            updateProfileView();

            closeProfilePanels();
        }

        closeSidebar();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // =====================================================
    // SIDEBAR
    // =====================================================

    function openSidebar() {

        sidebar?.classList.add("open");

        sidebarOverlay?.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeSidebar() {

        sidebar?.classList.remove("open");

        sidebarOverlay?.classList.remove(
            "show"
        );

        document.body.style.overflow =
            "";
    }


    hamburgerBtn?.addEventListener(
        "click",
        openSidebar
    );

    sidebarCloseBtn?.addEventListener(
        "click",
        closeSidebar
    );

    sidebarOverlay?.addEventListener(
        "click",
        closeSidebar
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSidebar();

                moreFormatMenu?.classList.add(
                    "hidden"
                );
            }
        }
    );


    // =====================================================
    // APP NAVIGATION BUTTONS
    // =====================================================

    homeNavBtn?.addEventListener(
        "click",
        () => openAppPage("home")
    );

    journalNavBtn?.addEventListener(
        "click",
        () => openAppPage("journal")
    );

    profileNavBtn?.addEventListener(
        "click",
        () => openAppPage("profile")
    );

    writeThoughtBtn?.addEventListener(
        "click",
        openNewJournalEntry
    );

    viewEntriesBtn?.addEventListener(
        "click",
        () => openAppPage("journal")
    );


    // =====================================================
    // PASSWORD SHOW / HIDE
    // =====================================================

    togglePassword?.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

            } else {

                passwordInput.type =
                    "password";
            }
        }
    );


    // =====================================================
    // LOGIN VALIDATION
    // =====================================================

    function validateCredentials() {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        if (!email) {

            alert(
                "Please enter your email."
            );

            emailInput.focus();

            return false;
        }

        if (!password) {

            alert(
                "Please enter your password."
            );

            passwordInput.focus();

            return false;
        }

        return true;
    }


    // =====================================================
    // LOGIN
    // =====================================================

    loginBtn?.addEventListener(
        "click",
        async () => {

            if (!validateCredentials()) {
                return;
            }

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            loginBtn.disabled = true;

            loginBtn.textContent =
                "Logging in...";

            try {

                const result =
                    await postForm(
                        "login.php",
                        {
                            email,
                            password
                        }
                    );

                const data =
                    result.json;

                if (
                    !result.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        "Invalid email or password."
                    );

                    return;
                }

                const token =
                    data.api_token ||
                    data.token ||
                    "";

                if (!token) {

                    alert(
                        "Login succeeded but no API token was returned."
                    );

                    return;
                }

                localStorage.setItem(
                    "safeSpaceApiToken",
                    token
                );

                if (
                    data.user_id !==
                    undefined
                ) {

                    localStorage.setItem(
                        "safeSpaceUserId",
                        String(data.user_id)
                    );
                }

                localStorage.setItem(
                    "safeSpaceEmail",
                    data.email || email
                );

const returnedNickname =
    data.nickname ||
    (data.user && data.user.nickname) ||
    (data.user && data.user.name) ||
    "";

if (
    typeof returnedNickname === "string" &&
    returnedNickname.trim() !== ""
) {
    localStorage.setItem(
        "safeSpaceNickname",
        returnedNickname.trim()
    );
}

                if (
                    data.passcode_clue !==
                    undefined
                ) {

                    localStorage.setItem(
                        "safeSpacePasscodeClue",
                        data.passcode_clue || ""
                    );
                }

                sessionStorage.setItem(
                    "safeSpaceEmail",
                    email
                );

                sessionStorage.setItem(
                    "safeSpacePurpose",
                    "login"
                );

                currentPurpose =
                    "login";

                await sendOtp(
                    email,
                    "login"
                );

            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to log in."
                );

            } finally {

                loginBtn.disabled =
                    false;

                loginBtn.textContent =
                    "Log In";
            }
        }
    );


    // =====================================================
    // CREATE ACCOUNT
    // =====================================================

    createAccountBtn?.addEventListener(
        "click",
        async () => {

            if (!validateCredentials()) {
                return;
            }

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            createAccountBtn.disabled =
                true;

            createAccountBtn.textContent =
                "Checking...";

            try {

                const result =
                    await postForm(
                        "check_email.php",
                        { email }
                    );

                const data =
                    result.json;

                if (!result.ok) {

                    alert(
                        data.message ||
                        "Unable to check email."
                    );

                    return;
                }

                if (
                    data.exists === true ||
                    data.email_exists === true
                ) {

                    alert(
                        data.message ||
                        "This email is already registered."
                    );

                    return;
                }

                sessionStorage.setItem(
                    "safeSpaceEmail",
                    email
                );

                sessionStorage.setItem(
                    "safeSpacePassword",
                    password
                );

                sessionStorage.setItem(
                    "safeSpacePurpose",
                    "register"
                );

                currentPurpose =
                    "register";

                await sendOtp(
                    email,
                    "register"
                );

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    "Unable to create account."
                );

            } finally {

                createAccountBtn.disabled =
                    false;

                createAccountBtn.textContent =
                    "Create Account";
            }
        }
    );


    // =====================================================
    // FORGOT PASSWORD
    // =====================================================

    forgotPasswordBtn?.addEventListener(
        "click",
        async () => {

            const email =
                emailInput.value.trim();

            if (!email) {

                alert(
                    "Please enter your email first."
                );

                emailInput.focus();

                return;
            }

            sessionStorage.setItem(
                "safeSpaceEmail",
                email
            );

            sessionStorage.setItem(
                "safeSpacePurpose",
                "forgot_password"
            );

            currentPurpose =
                "forgot_password";

            await sendOtp(
                email,
                "forgot_password"
            );
        }
    );


    // =====================================================
    // FORGOT PASSCODE FROM PASSCODE VERIFICATION
    // =====================================================

    forgotPasscodeBtn?.addEventListener(
        "click",
        async () => {
            const email =
                localStorage.getItem("safeSpaceEmail") || "";

            if (!email) {
                alert("Please log in again to recover your passcode.");
                showScreen(loginScreen);
                return;
            }

            sessionStorage.setItem("safeSpaceEmail", email);
            sessionStorage.setItem("safeSpacePurpose", "forgot_passcode");

            currentPurpose = "forgot_passcode";

            await sendOtp(email, "forgot_passcode");
        }
    );


    // =====================================================
    // USE ANOTHER ACCOUNT FROM PASSCODE VERIFICATION
    // =====================================================

    useAnotherAccountBtn?.addEventListener(
        "click",
        () => {
            logoutFromWebsite(false);
        }
    );

    // =====================================================
    // OTP
    // =====================================================

    async function sendOtp(
        email,
        purpose
    ) {

        if (isSendingOtp) {
            return false;
        }

        isSendingOtp = true;

        try {

            const result =
                await postForm(
                    "send_otp.php",
                    {
                        email,
                        purpose
                    }
                );

            const data =
                result.json;

            if (
                !result.ok ||
                !data.success
            ) {

                alert(
                    data.message ||
                    "Unable to send verification code."
                );

                return false;
            }

            currentPurpose =
                purpose;

            sessionStorage.setItem(
                "safeSpacePurpose",
                purpose
            );

            if (otpEmail) {

                otpEmail.textContent =
                    email;
            }

            clearOtpInputs();

            showScreen(otpScreen);

            startOtpTimer();

            otpInputs[0]?.focus();

            return true;

        } catch (error) {

            console.error(
                "OTP error:",
                error
            );

            alert(
                error.message ||
                "Unable to send verification code."
            );

            return false;

        } finally {

            isSendingOtp = false;
        }
    }


    function clearOtpInputs() {

        otpInputs.forEach(input => {
            input.value = "";
        });
    }


    function getOtpValue() {

        return Array.from(
            otpInputs
        )
        .map(input => input.value)
        .join("");
    }


    function setupDigitInputs(inputs) {

        inputs.forEach(
            (input, index) => {

                input.addEventListener(
                    "input",
                    () => {

                        input.value =
                            input.value.replace(
                                /\D/g,
                                ""
                            );

                        if (
                            input.value &&
                            index <
                            inputs.length - 1
                        ) {

                            inputs[
                                index + 1
                            ].focus();
                        }
                    }
                );

                input.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key ===
                            "Backspace" &&
                            !input.value &&
                            index > 0
                        ) {

                            inputs[
                                index - 1
                            ].focus();
                        }
                    }
                );

                input.addEventListener(
                    "paste",
                    event => {

                        event.preventDefault();

                        const text =
                            event.clipboardData
                                .getData("text")
                                .replace(/\D/g, "")
                                .slice(
                                    0,
                                    inputs.length
                                );

                        text
                            .split("")
                            .forEach(
                                (digit, i) => {

                                    if (inputs[i]) {
                                        inputs[i].value =
                                            digit;
                                    }
                                }
                            );
                    }
                );
            }
        );
    }


    setupDigitInputs(otpInputs);
    setupDigitInputs(passcodeInputs);
    setupDigitInputs(
        verifyPasscodeInputs
    );


    function startOtpTimer() {

        clearInterval(timerInterval);

        otpExpired = false;

        let seconds = 300;

        updateOtpTimer(seconds);

        timerInterval =
            setInterval(
                () => {

                    seconds--;

                    updateOtpTimer(
                        seconds
                    );

                    if (seconds <= 0) {

                        clearInterval(
                            timerInterval
                        );

                        otpExpired =
                            true;

                        if (otpTimer) {

                            otpTimer.textContent =
                                "OTP expired. Please resend a new code.";
                        }
                    }
                },
                1000
            );
    }


    function updateOtpTimer(seconds) {

        if (!otpTimer) {
            return;
        }

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remaining =
            seconds % 60;

        otpTimer.textContent =
            "OTP expires in " +
            String(minutes)
                .padStart(2, "0") +
            ":" +
            String(remaining)
                .padStart(2, "0");
    }


    verifyOtpBtn?.addEventListener(
        "click",
        async () => {

            if (isVerifyingOtp) {
                return;
            }

            const otp =
                getOtpValue();

            const email =
                sessionStorage.getItem(
                    "safeSpaceEmail"
                ) || "";

            const purpose =
                sessionStorage.getItem(
                    "safeSpacePurpose"
                ) ||
                currentPurpose;

            if (otp.length !== 6) {

                alert(
                    "Please enter the complete 6-digit verification code."
                );

                return;
            }

            if (otpExpired) {

                alert(
                    "Your OTP has expired. Please resend a new code."
                );

                return;
            }

            isVerifyingOtp = true;

            verifyOtpBtn.disabled =
                true;

            verifyOtpBtn.textContent =
                "Verifying...";

            try {

                const result =
                    await postForm(
                        "verify_otp.php",
                        {
                            email,
                            otp,
                            purpose
                        }
                    );

                const data =
                    result.json;

                if (
                    !result.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        "Invalid verification code."
                    );

                    return;
                }

                clearInterval(
                    timerInterval
                );

                if (
                    data.reset_token
                ) {

                    sessionStorage.setItem(
                        "safeSpaceResetToken",
                        data.reset_token
                    );
                }

                if (
                    purpose ===
                    "register"
                ) {

                    clearPasscodeInputs();

                    showScreen(
                        passcodeScreen
                    );

                    passcodeInputs[0]?.focus();

                    return;
                }

                if (
                    purpose ===
                    "login"
                ) {

localStorage.setItem(
    "safeSpaceOtpVerified",
    "true"
);

clearVerifyPasscodeInputs();

if (verificationClue) {
    verificationClue.textContent = "";
    verificationClue.classList.add(
        "hidden"
    );
}

showScreen(
    verifyPasscodeScreen
);

                    verifyPasscodeInputs[
                        0
                    ]?.focus();

                    return;
                }

// =====================================================
// RECOVERY AFTER SUCCESSFUL OTP
// =====================================================

if (
    purpose ===
    "forgot_password"
) {

    alert(
        "Email verified successfully. You can now create a new password."
    );

    showScreen(
        appScreen
    );

    openProfilePanel(
        changePasswordPanel
    );

    if (oldPasswordProfile) {
        oldPasswordProfile.value = "";
        oldPasswordProfile.disabled = true;
        oldPasswordProfile.placeholder =
            "Verified through email OTP";
    }

    if (newPasswordProfile) {
        newPasswordProfile.value = "";
        newPasswordProfile.focus();
    }

    if (confirmPasswordProfile) {
        confirmPasswordProfile.value = "";
    }

    sessionStorage.setItem(
        "safeSpaceProfileRecoveryMode",
        "forgot_password"
    );

    return;
}


if (
    purpose ===
    "forgot_passcode"
) {

    alert(
        "Email verified successfully. You can now create a new passcode."
    );

    showScreen(
        appScreen
    );

    openProfilePanel(
        changePasscodePanel
    );

    if (oldPasscodeProfile) {
        oldPasscodeProfile.value = "";
        oldPasscodeProfile.disabled = true;
        oldPasscodeProfile.placeholder =
            "Verified through email OTP";
    }

    if (newPasscodeProfile) {
        newPasscodeProfile.value = "";
        newPasscodeProfile.focus();
    }

    if (confirmPasscodeProfile) {
        confirmPasscodeProfile.value = "";
    }

    sessionStorage.setItem(
        "safeSpaceProfileRecoveryMode",
        "forgot_passcode"
    );

    return;
}

            } catch (error) {

                console.error(
                    "Verify OTP error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to verify OTP."
                );

            } finally {

                isVerifyingOtp = false;

                verifyOtpBtn.disabled =
                    false;

                verifyOtpBtn.textContent =
                    "Verify";
            }
        }
    );

    // =====================================================
    // CREATE PASSCODE
    // =====================================================

    function getPasscodeValue(inputs) {

        return Array.from(inputs)
            .map(input => input.value)
            .join("");
    }


    function clearPasscodeInputs() {

        passcodeInputs.forEach(
            input => {
                input.value = "";
            }
        );
    }


    function clearVerifyPasscodeInputs() {

        verifyPasscodeInputs.forEach(
            input => {
                input.value = "";
            }
        );
    }


    savePasscodeBtn?.addEventListener(
        "click",
        () => {

            const passcode =
                getPasscodeValue(
                    passcodeInputs
                );

            if (
                !/^\d{4}$/.test(
                    passcode
                )
            ) {

                alert(
                    "Please create a 4-digit passcode."
                );

                return;
            }

            sessionStorage.setItem(
                "safeSpacePasscode",
                passcode
            );

            if (passcodeClueInput) {
                passcodeClueInput.value =
                    "";
            }

            showScreen(
                clueScreen
            );

            passcodeClueInput?.focus();
        }
    );


    backFromPasscodeBtn?.addEventListener(
        "click",
        () => {

            clearPasscodeInputs();

            showScreen(
                loginScreen
            );
        }
    );


    // =====================================================
    // PASSCODE CLUE REGISTRATION
    // =====================================================

    saveClueBtn?.addEventListener(
        "click",
        () => {

            const clue =
                passcodeClueInput.value.trim();

            if (!clue) {

                alert(
                    "Please enter a passcode clue."
                );

                return;
            }

            sessionStorage.setItem(
                "safeSpacePasscodeClue",
                clue
            );

            showScreen(
                nicknameScreen
            );

            nicknameInput?.focus();
        }
    );


    backFromClueBtn?.addEventListener(
        "click",
        () => {

            showScreen(
                passcodeScreen
            );
        }
    );


    // =====================================================
    // REGISTRATION
    // =====================================================

    finishRegistrationBtn?.addEventListener(
        "click",
        async () => {

            if (isRegistering) {
                return;
            }

            const email =
                sessionStorage.getItem(
                    "safeSpaceEmail"
                ) || "";

            const password =
                sessionStorage.getItem(
                    "safeSpacePassword"
                ) || "";

            const passcode =
                sessionStorage.getItem(
                    "safeSpacePasscode"
                ) || "";

            const clue =
                sessionStorage.getItem(
                    "safeSpacePasscodeClue"
                ) || "";

            const nickname =
                nicknameInput.value.trim();

            if (!nickname) {

                alert(
                    "Please enter your nickname."
                );

                return;
            }

            isRegistering = true;

            finishRegistrationBtn.disabled =
                true;

            finishRegistrationBtn.textContent =
                "Creating Account...";

            try {

                const result =
                    await postForm(
                        "register.php",
                        {
                            email,
                            password,
                            nickname,
                            passcode,
                            passcode_clue:
                                clue
                        }
                    );

                const data =
                    result.json;

                if (
                    !result.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        "Unable to create account."
                    );

                    return;
                }

                let token =
                    data.api_token ||
                    data.token ||
                    "";

                /*
                 * Some versions of register.php
                 * do not return an API token.
                 * Login automatically if needed.
                 */

                if (!token) {

                    const loginResult =
                        await postForm(
                            "login.php",
                            {
                                email,
                                password
                            }
                        );

                    if (
                        loginResult.ok &&
                        loginResult.json.success
                    ) {

                        token =
                            loginResult.json.api_token ||
                            loginResult.json.token ||
                            "";
                    }
                }

                if (token) {

                    localStorage.setItem(
                        "safeSpaceApiToken",
                        token
                    );
                }

                if (
                    data.user_id !==
                    undefined
                ) {

                    localStorage.setItem(
                        "safeSpaceUserId",
                        String(data.user_id)
                    );
                }

                localStorage.setItem(
                    "safeSpaceEmail",
                    email
                );

                localStorage.setItem(
                    "safeSpaceNickname",
                    nickname
                );

                // OTP was already verified before registration continued.
                // Remember that fact so refresh returns to passcode verification.
                localStorage.setItem(
                    "safeSpaceOtpVerified",
                    "true"
                );

                localStorage.setItem(
                    "safeSpacePasscodeClue",
                    clue
                );

                sessionStorage.removeItem(
                    "safeSpacePassword"
                );

                sessionStorage.removeItem(
                    "safeSpacePasscode"
                );

                sessionStorage.removeItem(
                    "safeSpacePasscodeClue"
                );

                sessionStorage.removeItem(
                    "safeSpacePurpose"
                );

                alert(
                    data.message ||
                    "Account created successfully!"
                );

                openApp();

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    "Unable to create account."
                );

            } finally {

                isRegistering = false;

                finishRegistrationBtn.disabled =
                    false;

                finishRegistrationBtn.textContent =
                    "Create Account";
            }
        }
    );


    backFromNicknameBtn?.addEventListener(
        "click",
        () => {

            showScreen(
                clueScreen
            );
        }
    );


// =====================================================
// LOGIN PASSCODE
// =====================================================

function updateVerificationClue(clueFromServer = "") {

    const clue =
        clueFromServer ||
        localStorage.getItem(
            "safeSpacePasscodeClue"
        ) ||
        "";

    if (!verificationClue) {
        return;
    }

    if (clue) {

        verificationClue.textContent =
            "Clue: " + clue;

        verificationClue.classList.remove(
            "hidden"
        );

    } else {

        verificationClue.textContent =
            "No passcode clue available.";

        verificationClue.classList.remove(
            "hidden"
        );
    }
}


function hideVerificationClue() {

    if (!verificationClue) {
        return;
    }

    verificationClue.textContent = "";

    verificationClue.classList.add(
        "hidden"
    );
}


verifyPasscodeBtn?.addEventListener(
    "click",
    async () => {

        if (isVerifyingPasscode) {
            return;
        }

        const passcode =
            getPasscodeValue(
                verifyPasscodeInputs
            );

        if (
            !/^\d{4}$/.test(
                passcode
            )
        ) {

            alert(
                "Please enter your complete 4-digit passcode."
            );

            return;
        }

        isVerifyingPasscode = true;

        verifyPasscodeBtn.disabled =
            true;

        verifyPasscodeBtn.textContent =
            "Checking...";

        try {

            const result =
                await postAuthenticatedForm(
                    "verify_passcode.php",
                    {
                        passcode
                    }
                );

            const data =
                result.json;

            // =========================================
            // INCORRECT PASSCODE
            // =========================================

            if (
                !result.ok ||
                !data.success
            ) {

                alert(
                    data.message ||
                    "Incorrect passcode."
                );

                /*
                 * verify_passcode.php returns:
                 *
                 * {
                 *     success: false,
                 *     message: "Incorrect passcode.",
                 *     clue: "..."
                 * }
                 *
                 * Use the server clue first.
                 */

                if (data.clue) {

                    localStorage.setItem(
                        "safeSpacePasscodeClue",
                        data.clue
                    );

                    updateVerificationClue(
                        data.clue
                    );

                } else {

                    updateVerificationClue();
                }

                clearVerifyPasscodeInputs();
                
                verifyPasscodeInputs[
                    0
                ]?.focus();

                return;
            }

            // =========================================
            // CORRECT PASSCODE
            // =========================================

            hideVerificationClue();

            clearVerifyPasscodeInputs();

            openApp();

        } catch (error) {

            console.error(
                "Verify passcode error:",
                error
            );

            alert(
                error.message ||
                "Unable to verify passcode."
            );

        } finally {

            isVerifyingPasscode =
                false;

            verifyPasscodeBtn.disabled =
                false;

            verifyPasscodeBtn.textContent =
                "Next";
        }
    }
);

    // =====================================================
    // JOURNAL EDITOR
    // =====================================================

    function openNewJournalEntry() {

        editingEntryId = null;

        if (writeJournalHeading) {

            writeJournalHeading.textContent =
                "Write your thoughts";
        }

        journalTitleInput.value =
            "";

        journalContentEditor.innerHTML =
            "";

        moreFormatMenu?.classList.add(
            "hidden"
        );

        openAppPage("write");

        setTimeout(
            () => {
                journalTitleInput.focus();
            },
            100
        );
    }


    addEntryBtn?.addEventListener(
        "click",
        openNewJournalEntry
    );


    function leaveJournalEditor() {

        editingEntryId = null;

        journalTitleInput.value =
            "";

        journalContentEditor.innerHTML =
            "";

        moreFormatMenu?.classList.add(
            "hidden"
        );

        openAppPage(
            "journal"
        );
    }


    backFromWriteBtn?.addEventListener(
        "click",
        leaveJournalEditor
    );

    cancelEntryBtn?.addEventListener(
        "click",
        leaveJournalEditor
    );



    // =====================================================
    // RICH TEXT TOOLBAR
    // =====================================================

    let savedEditorRange = null;
    let currentEditorFontSize = 3;

    function saveEditorSelection() {
        const selection = window.getSelection();

        if (
            !selection ||
            selection.rangeCount === 0 ||
            !journalContentEditor
        ) {
            return;
        }

        const range = selection.getRangeAt(0);

        if (
            journalContentEditor.contains(range.startContainer) &&
            journalContentEditor.contains(range.endContainer)
        ) {
            savedEditorRange = range.cloneRange();
        }
    }

    function focusEditor() {
        if (!journalContentEditor) return;

        journalContentEditor.focus();

        if (!savedEditorRange) return;

        const selection = window.getSelection();

        if (!selection) return;

        try {
            selection.removeAllRanges();
            selection.addRange(savedEditorRange);
        } catch (error) {
            savedEditorRange = null;
        }
    }

    document.addEventListener("selectionchange", () => {
        saveEditorSelection();
    });

    journalContentEditor?.addEventListener("keyup", saveEditorSelection);
    journalContentEditor?.addEventListener("mouseup", saveEditorSelection);
    journalContentEditor?.addEventListener("input", saveEditorSelection);

    editorToolbar?.addEventListener("mousedown", event => {
        // Remember the selected text before a toolbar control takes focus.
        saveEditorSelection();

        // Keep the selection in place for ordinary toolbar buttons.
        if (event.target.closest("button")) {
            event.preventDefault();
        }
    });

    editorToolbar?.addEventListener("click", event => {
        const button = event.target.closest("[data-command]");

        if (!button) return;

        const command = button.dataset.command;
        const value = button.dataset.value || null;

        focusEditor();

        document.execCommand(command, false, value);

        saveEditorSelection();
    });

    fontSizeBtn?.addEventListener("click", () => {
        focusEditor();

        // Cycle through several font sizes.
        currentEditorFontSize =
            currentEditorFontSize >= 6
                ? 2
                : currentEditorFontSize + 1;

        document.execCommand(
            "fontSize",
            false,
            String(currentEditorFontSize)
        );

        fontSizeBtn.title =
            "Font size " + currentEditorFontSize;

        saveEditorSelection();
    });

    textColorPicker?.addEventListener("input", event => {
        focusEditor();

        document.execCommand(
            "foreColor",
            false,
            event.target.value
        );

        saveEditorSelection();
    });

    highlightColorPicker?.addEventListener("input", event => {
        focusEditor();

        // Try the standard highlight command first.
        let applied = document.execCommand(
            "hiliteColor",
            false,
            event.target.value
        );

        // Fallback for browsers that support backColor instead.
        if (!applied) {
            document.execCommand(
                "backColor",
                false,
                event.target.value
            );
        }

        saveEditorSelection();
    });

    paragraphBtn?.addEventListener("click", () => {
        focusEditor();

        document.execCommand(
            "formatBlock",
            false,
            "p"
        );

        saveEditorSelection();
    });

    quoteBtn?.addEventListener("click", () => {
        focusEditor();

        document.execCommand(
            "formatBlock",
            false,
            "blockquote"
        );

        saveEditorSelection();
    });


    // =====================================================
    // SAVE JOURNAL ENTRY
    // =====================================================

    saveEntryBtn?.addEventListener(
        "click",
        async () => {

            if (isSavingEntry) {
                return;
            }

            const title =
                journalTitleInput.value.trim();

            const content =
                journalContentEditor.innerHTML.trim();

            const plainText =
                journalContentEditor
                    .innerText
                    .trim();

            if (!plainText) {

                alert(
                    "Please write something in your journal."
                );

                journalContentEditor.focus();

                return;
            }

            isSavingEntry = true;

            saveEntryBtn.disabled =
                true;

            saveEntryBtn.textContent =
                "Saving...";

            try {

                const requestData = {
                    title,
                    content
                };

                /*
                 * If editing an existing entry,
                 * send its ID too.
                 */

                if (editingEntryId) {

                    requestData.entry_id =
                        editingEntryId;

                    requestData.id =
                        editingEntryId;
                }

                const result =
                    await postAuthenticatedForm(
                        "save_journal_entry.php",
                        requestData
                    );

                const data =
                    result.json;

                if (
                    !result.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        "Unable to save journal entry."
                    );

                    return;
                }

                alert(
                    data.message ||
                    (
                        editingEntryId
                            ? "Journal entry updated!"
                            : "Journal entry saved!"
                    )
                );

                editingEntryId = null;

                journalTitleInput.value =
                    "";

                journalContentEditor.innerHTML =
                    "";

                openAppPage(
                    "journal"
                );

            } catch (error) {

                console.error(
                    "Save journal error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to save journal entry."
                );

            } finally {

                isSavingEntry = false;

                saveEntryBtn.disabled =
                    false;

                saveEntryBtn.textContent =
                    "Save";
            }
        }
    );


    // =====================================================
    // LOAD JOURNAL ENTRIES
    // =====================================================

    async function loadJournalEntries() {

        if (!journalEntryList) {
            return;
        }

        if (journalStatus) {

            journalStatus.textContent =
                "Loading your journal...";
        }

        journalEntryList.innerHTML =
            "";

        try {

            const result =
                await postAuthenticatedForm(
                    "get_journal_entries.php"
                );

            const data =
                result.json;

            if (
                !result.ok ||
                !data.success
            ) {

                if (journalStatus) {

                    journalStatus.textContent =
                        data.message ||
                        "Unable to load journal entries.";
                }

                return;
            }

            journalEntries =
                Array.isArray(
                    data.entries
                )
                    ? data.entries
                    : Array.isArray(
                        data.journal_entries
                    )
                        ? data.journal_entries
                        : [];

            renderJournalEntries(
                journalEntries
            );

        } catch (error) {

            console.error(
                "Load journal error:",
                error
            );

            if (journalStatus) {

                journalStatus.textContent =
                    error.message ||
                    "Unable to load journal entries.";
            }
        }
    }


    // =====================================================
    // JOURNAL RENDERING
    // =====================================================

    function renderJournalEntries(entries) {

        journalEntryList.innerHTML =
            "";

        if (!entries.length) {

            if (journalStatus) {

                journalStatus.textContent =
                    journalSearchInput?.value.trim()
                        ? "No matching entries found."
                        : "No journal entries yet.";
            }

            return;
        }

        if (journalStatus) {
            journalStatus.textContent = "";
        }

        entries.forEach(entry => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "journal-entry-card";

            const date =
                entry.created_at ||
                entry.updated_at ||
                entry.date ||
                "";

            const title =
                entry.title?.trim() ||
                "Untitled";

            const content =
                entry.content ||
                "";

            card.innerHTML = `
                <div class="journal-entry-date">
                    ${escapeHtml(formatJournalDate(date))}
                </div>

                <h3 class="journal-entry-title">
                    ${escapeHtml(title)}
                </h3>

                <div class="journal-entry-content"></div>

                <div class="journal-entry-actions">
                    <button
                        type="button"
                        class="journal-edit-button"
                    >
                        EDIT
                    </button>

                    <button
                        type="button"
                        class="journal-delete-button"
                    >
                        DELETE
                    </button>
                </div>
            `;

            const contentBox =
                card.querySelector(
                    ".journal-entry-content"
                );

            /*
             * Journal content is intentionally
             * rendered as HTML because Android
             * and website both store formatted
             * journal HTML.
             */

            contentBox.innerHTML =
                content;

            card
                .querySelector(
                    ".journal-edit-button"
                )
                .addEventListener(
                    "click",
                    () => {
                        openEditJournalEntry(
                            entry
                        );
                    }
                );

            card
                .querySelector(
                    ".journal-delete-button"
                )
                .addEventListener(
                    "click",
                    () => {
                        deleteJournalEntry(
                            entry
                        );
                    }
                );

            journalEntryList.appendChild(
                card
            );
        });
    }


    function escapeHtml(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


function formatJournalDate(value) {
    if (!value) {
        return "";
    }

    const parsed = new Date(
        String(value).replace(" ", "T")
    );

    if (Number.isNaN(parsed.getTime())) {
        return escapeHtml(value);
    }

    const date = parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const time = parsed.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    return `${date} · ${time}`;
}
    
    // =====================================================
    // EDIT JOURNAL
    // =====================================================

    function openEditJournalEntry(entry) {

        editingEntryId =
            entry.id ||
            entry.entry_id;

        if (!editingEntryId) {

            alert(
                "Unable to edit this journal entry."
            );

            return;
        }

        if (writeJournalHeading) {

            writeJournalHeading.textContent =
                "Edit your thoughts";
        }

        journalTitleInput.value =
            entry.title || "";

        journalContentEditor.innerHTML =
            entry.content || "";

        openAppPage(
            "write"
        );

        setTimeout(
            () => {
                journalContentEditor.focus();
            },
            100
        );
    }


    // =====================================================
    // DELETE JOURNAL
    // =====================================================

    async function deleteJournalEntry(
        entry
    ) {

        const id =
            entry.id ||
            entry.entry_id;

        if (!id) {

            alert(
                "Unable to delete this journal entry."
            );

            return;
        }

        if (
            !confirm(
                "Delete this journal entry?"
            )
        ) {

            return;
        }

        try {

            const result =
                await postAuthenticatedForm(
                    "delete_journal_entry.php",
                    {
                        entry_id: id,
                        id
                    }
                );

            const data =
                result.json;

            if (
                !result.ok ||
                !data.success
            ) {

                alert(
                    data.message ||
                    "Unable to delete journal entry."
                );

                return;
            }

            await loadJournalEntries();

        } catch (error) {

            console.error(
                "Delete journal error:",
                error
            );

            alert(
                error.message ||
                "Unable to delete journal entry."
            );
        }
    }


    // =====================================================
    // JOURNAL SEARCH
    // =====================================================

    journalSearchInput?.addEventListener(
        "input",
        () => {

            const query =
                journalSearchInput
                    .value
                    .trim()
                    .toLowerCase();

            if (!query) {

                renderJournalEntries(
                    journalEntries
                );

                return;
            }

            const filtered =
                journalEntries.filter(
                    entry => {

                        const title =
                            String(
                                entry.title ||
                                ""
                            )
                            .toLowerCase();

                        const temp =
                            document.createElement(
                                "div"
                            );

                        temp.innerHTML =
                            entry.content ||
                            "";

                        const content =
                            temp.textContent
                                .toLowerCase();

                        return (
                            title.includes(
                                query
                            ) ||
                            content.includes(
                                query
                            )
                        );
                    }
                );

            renderJournalEntries(
                filtered
            );
        }
    );


    allEntriesBtn?.addEventListener(
        "click",
        () => {

            if (journalSearchInput) {

                journalSearchInput.value =
                    "";
            }

            renderJournalEntries(
                journalEntries
            );
        }
    );


     // =====================================================
    // PROFILE VIEW
    // =====================================================

    function updateProfileView() {

        const nickname =
            localStorage.getItem(
                "safeSpaceNickname"
            ) || "Friend";

        const email =
            localStorage.getItem(
                "safeSpaceEmail"
            ) || "—";

        const clue =
            localStorage.getItem(
                "safeSpacePasscodeClue"
            ) || "";

        if (profileNickname) {

            profileNickname.textContent =
                nickname;
        }

        if (profileEmail) {

            profileEmail.textContent =
                email;
        }

        if (profileCluePreview) {

            profileCluePreview.textContent =
                clue ||
                "Create or edit your passcode clue";
        }

        if (profileClueInput) {

            profileClueInput.value =
                clue;
        }
    }


    // =====================================================
    // PROFILE SETTINGS PAGE NAVIGATION
    // =====================================================

    function closeProfilePanels() {

        [
            changePasscodePanel,
            changePasswordPanel,
            passcodeCluePanel
        ].forEach(panel => {

            panel?.classList.add(
                "hidden"
            );
        });
    }


function openProfilePanel(panel) {

    if (!panel) {
        return;
    }

    // Hide Home, Journal, Write, Profile
    // and all other settings pages
    hideAllAppPages();

    // Show only the selected settings page
    panel.classList.remove("hidden");

    // Keep Profile highlighted in sidebar
    clearActiveNavigation();

    profileNavBtn?.classList.add(
        "active"
    );

    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function backToProfile() {

    // Hide every app page/settings page
    hideAllAppPages();

    // Show Profile only
    profilePage?.classList.remove(
        "hidden"
    );

    updateProfileView();

    clearActiveNavigation();

    profileNavBtn?.classList.add(
        "active"
    );

    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// =====================================================
// PROFILE FORGOT PASSCODE -> OTP
// =====================================================

forgotPasscodeProfileBtn
    ?.addEventListener(
        "click",
        async () => {

            const email =
                localStorage.getItem(
                    "safeSpaceEmail"
                ) || "";

            if (!email) {
                alert(
                    "Email information is missing. Please log in again."
                );
                return;
            }

            sessionStorage.setItem(
                "safeSpaceEmail",
                email
            );

            sessionStorage.setItem(
                "safeSpacePurpose",
                "forgot_passcode"
            );

            sessionStorage.setItem(
                "safeSpaceRecoverySource",
                "profile"
            );

            currentPurpose =
                "forgot_passcode";

            await sendOtp(
                email,
                "forgot_passcode"
            );
        }
    );

    // =====================================================
    // OPEN CHANGE PASSCODE PAGE
    // =====================================================

    changePasscodeProfileBtn
        ?.addEventListener(
            "click",
            () => {

                openProfilePanel(
                    changePasscodePanel
                );
            }
        );


    // =====================================================
    // OPEN CHANGE PASSWORD PAGE
    // =====================================================

    changePasswordProfileBtn
        ?.addEventListener(
            "click",
            () => {

                openProfilePanel(
                    changePasswordPanel
                );
            }
        );

// =====================================================
// PROFILE FORGOT PASSWORD -> OTP
// =====================================================

forgotPasswordProfileBtn
    ?.addEventListener(
        "click",
        async () => {

            const email =
                localStorage.getItem(
                    "safeSpaceEmail"
                ) || "";

            if (!email) {
                alert(
                    "Email information is missing. Please log in again."
                );
                return;
            }

            sessionStorage.setItem(
                "safeSpaceEmail",
                email
            );

            sessionStorage.setItem(
                "safeSpacePurpose",
                "forgot_password"
            );

            sessionStorage.setItem(
                "safeSpaceRecoverySource",
                "profile"
            );

            currentPurpose =
                "forgot_password";

            await sendOtp(
                email,
                "forgot_password"
            );
        }
    );
    
    // =====================================================
    // OPEN PASSCODE CLUE PAGE
    // =====================================================

    passcodeClueProfileBtn
        ?.addEventListener(
            "click",
            () => {

                if (profileClueInput) {

                    profileClueInput.value =
                        localStorage.getItem(
                            "safeSpacePasscodeClue"
                        ) || "";
                }

                openProfilePanel(
                    passcodeCluePanel
                );
            }
        );


    // =====================================================
    // BACK TO PROFILE BUTTONS
    // =====================================================

    document
        .querySelectorAll(
            "[data-close-profile-panel]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                backToProfile
            );
        });


    // =====================================================
    // PROFILE PASSCODE INPUT
    // =====================================================

    [
        oldPasscodeProfile,
        newPasscodeProfile,
        confirmPasscodeProfile
    ].forEach(input => {

        input?.addEventListener(
            "input",
            () => {

                input.value =
                    input.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            4
                        );
            }
        );
    });


// =====================================================
// CHANGE PASSCODE
// =====================================================

saveProfilePasscodeBtn
    ?.addEventListener(
        "click",
        async () => {

            const recoveryMode =
                sessionStorage.getItem(
                    "safeSpaceProfileRecoveryMode"
                );

            const isRecovery =
                recoveryMode ===
                "forgot_passcode";

            const oldCode =
                oldPasscodeProfile
                    .value
                    .trim();

            const newCode =
                newPasscodeProfile
                    .value
                    .trim();

            const confirmCode =
                confirmPasscodeProfile
                    .value
                    .trim();


            // Normal change only:
            // old passcode is required.
            if (
                !isRecovery &&
                !/^\d{4}$/.test(oldCode)
            ) {

                alert(
                    "Please enter your 4-digit old passcode."
                );

                oldPasscodeProfile.focus();

                return;
            }


            if (
                !/^\d{4}$/.test(newCode)
            ) {

                alert(
                    "Please enter a 4-digit new passcode."
                );

                newPasscodeProfile.focus();

                return;
            }


            if (
                newCode !==
                confirmCode
            ) {

                alert(
                    "New passcodes do not match."
                );

                confirmPasscodeProfile.focus();

                return;
            }


            saveProfilePasscodeBtn.disabled =
                true;

            saveProfilePasscodeBtn.textContent =
                "Saving...";


            try {

                let result;


                // =====================================
                // FORGOT PASSCODE / OTP RECOVERY
                // =====================================

                if (isRecovery) {

                    const email =
                        sessionStorage.getItem(
                            "safeSpaceEmail"
                        ) ||
                        localStorage.getItem(
                            "safeSpaceEmail"
                        ) ||
                        "";

                    const resetToken =
                        sessionStorage.getItem(
                            "safeSpaceResetToken"
                        ) || "";

                    if (
                        !email ||
                        !resetToken
                    ) {

                        alert(
                            "Your recovery session is missing or expired. Please request another OTP."
                        );

                        return;
                    }


const currentClue =
    localStorage.getItem(
        "safeSpacePasscodeClue"
    ) || "";

if (!currentClue) {

    alert(
        "Your passcode clue is missing. Please update your clue first."
    );

    return;
}

result =
    await postForm(
        "reset_passcode.php",
        {
            email,
            reset_token:
                resetToken,
            passcode:
                newCode,
            passcode_clue:
                currentClue
        }
    );
                } else {

                    // =================================
                    // NORMAL CHANGE PASSCODE
                    // =================================

                    result =
                        await postAuthenticatedForm(
                            "change_passcode.php",
                            {
                                old_passcode:
                                    oldCode,

                                new_passcode:
                                    newCode
                            }
                        );
                }


                const data =
                    result.json;


                if (
                    !result.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        (
                            isRecovery
                                ? "Unable to reset passcode."
                                : "Unable to update passcode."
                        )
                    );

                    return;
                }


                oldPasscodeProfile.value =
                    "";

                newPasscodeProfile.value =
                    "";

                confirmPasscodeProfile.value =
                    "";


                // =====================================
                // AFTER FORGOT PASSCODE
                // Go to Passcode Clue
                // =====================================

                if (isRecovery) {

                    sessionStorage.removeItem(
                        "safeSpaceResetToken"
                    );

                    sessionStorage.removeItem(
                        "safeSpaceProfileRecoveryMode"
                    );

                    oldPasscodeProfile.disabled =
                        false;

                    oldPasscodeProfile.placeholder =
                        "Enter old 4-digit passcode";


                    const currentClue =
                        localStorage.getItem(
                            "safeSpacePasscodeClue"
                        ) || "";

                    if (profileClueInput) {
                        profileClueInput.value =
                            currentClue;
                    }


                    alert(
                        data.message ||
                        "Passcode reset successfully!"
                    );


                    openProfilePanel(
                        passcodeCluePanel
                    );

                    return;
                }


                // =====================================
                // NORMAL CHANGE SUCCESS
                // =====================================

                alert(
                    data.message ||
                    "Passcode changed successfully!"
                );

                backToProfile();


            } catch (error) {

                console.error(
                    isRecovery
                        ? "Reset passcode error:"
                        : "Change passcode error:",
                    error
                );

                alert(
                    error.message ||
                    (
                        isRecovery
                            ? "Unable to reset passcode."
                            : "Unable to update passcode."
                    )
                );

            } finally {

                saveProfilePasscodeBtn.disabled =
                    false;

                saveProfilePasscodeBtn.textContent =
                    "Save Passcode";
            }
        }
    );

// =====================================================
// CHANGE PASSWORD
// =====================================================

saveProfilePasswordBtn
    ?.addEventListener(
        "click",
        async () => {

            const recoveryMode =
                sessionStorage.getItem(
                    "safeSpaceProfileRecoveryMode"
                );

            const isRecovery =
                recoveryMode ===
                "forgot_password";

            const oldPassword =
                oldPasswordProfile.value;

            const newPassword =
                newPasswordProfile.value;

            const confirmPassword =
                confirmPasswordProfile.value;


            // =========================================
            // OLD PASSWORD
            // Required only for normal change
            // =========================================

            if (
                !isRecovery &&
                !oldPassword
            ) {

                alert(
                    "Please enter your old password."
                );

                oldPasswordProfile.focus();

                return;
            }


            // =========================================
            // NEW PASSWORD
            // =========================================

            if (!newPassword) {

                alert(
                    "Please enter your new password."
                );

                newPasswordProfile.focus();

                return;
            }


            // =========================================
            // CONFIRM PASSWORD
            // =========================================

            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "New passwords do not match."
                );

                confirmPasswordProfile.focus();

                return;
            }


            saveProfilePasswordBtn.disabled =
                true;

            saveProfilePasswordBtn.textContent =
                "Saving...";


            try {

                let result;


                // =====================================
                // FORGOT PASSWORD / OTP RECOVERY
                // =====================================

                if (isRecovery) {

                    const email =
                        sessionStorage.getItem(
                            "safeSpaceEmail"
                        ) ||
                        localStorage.getItem(
                            "safeSpaceEmail"
                        ) ||
                        "";

                    const resetToken =
                        sessionStorage.getItem(
                            "safeSpaceResetToken"
                        ) || "";


                    if (
                        !email ||
                        !resetToken
                    ) {

                        alert(
                            "Your recovery session is missing or expired. Please request another OTP."
                        );

                        return;
                    }


result =
    await postForm(
        "reset_password.php",
        {
            email,
            reset_token:
                resetToken,
            new_password:
                newPassword
        }
    );

} else {

                    // =================================
                    // NORMAL CHANGE PASSWORD
                    // =================================

                    result =
                        await postAuthenticatedForm(
                            "change_password.php",
                            {
                                old_password:
                                    oldPassword,

                                new_password:
                                    newPassword
                            }
                        );
                }


                const data =
                    result.json;


                if (
                    !result.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        (
                            isRecovery
                                ? "Unable to reset password."
                                : "Unable to update password."
                        )
                    );

                    return;
                }


                oldPasswordProfile.value =
                    "";

                newPasswordProfile.value =
                    "";

                confirmPasswordProfile.value =
                    "";


                // =====================================
                // CLEAN RECOVERY DATA
                // =====================================

                if (isRecovery) {

                    sessionStorage.removeItem(
                        "safeSpaceResetToken"
                    );

                    sessionStorage.removeItem(
                        "safeSpaceProfileRecoveryMode"
                    );

                    sessionStorage.removeItem(
                        "safeSpaceRecoverySource"
                    );

                    oldPasswordProfile.disabled =
                        false;

                    oldPasswordProfile.placeholder =
                        "Enter old password";
                }


                // =====================================
                // PASSWORD SUCCESS
                // Login again for security
                // =====================================

                alert(
                    data.message ||
                    (
                        isRecovery
                            ? "Password reset successfully. Please log in again."
                            : "Password changed successfully. Please log in again."
                    )
                );


                logoutFromWebsite(
                    false
                );


            } catch (error) {

                console.error(
                    isRecovery
                        ? "Reset password error:"
                        : "Change password error:",
                    error
                );

                alert(
                    error.message ||
                    (
                        isRecovery
                            ? "Unable to reset password."
                            : "Unable to update password."
                    )
                );

            } finally {

                saveProfilePasswordBtn.disabled =
                    false;

                saveProfilePasswordBtn.textContent =
                    "Save Password";
            }
        }
    );

    // =====================================================
    // UPDATE PASSCODE CLUE
    // =====================================================

    saveProfileClueBtn
        ?.addEventListener(
            "click",
            async () => {

                const clue =
                    profileClueInput
                        .value
                        .trim();

                if (!clue) {

                    alert(
                        "Please enter a clue."
                    );

                    profileClueInput.focus();

                    return;
                }

                if (
                    clue.length > 255
                ) {

                    alert(
                        "Clue must not exceed 255 characters."
                    );

                    return;
                }

                saveProfileClueBtn.disabled =
                    true;

                saveProfileClueBtn.textContent =
                    "Saving...";

                try {

                    const result =
                        await postAuthenticatedForm(
                            "update_passcode_clue.php",
                            {
                                passcode_clue:
                                    clue
                            }
                        );

                    const data =
                        result.json;

                    if (
                        !result.ok ||
                        !data.success
                    ) {

                        alert(
                            data.message ||
                            "Unable to update passcode clue."
                        );

                        return;
                    }

                    localStorage.setItem(
                        "safeSpacePasscodeClue",
                        clue
                    );

                    updateProfileView();

                    // Return to Profile after successful save
                    backToProfile();

                    alert(
                        data.message ||
                        "Passcode clue updated successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Update clue error:",
                        error
                    );

                    alert(
                        error.message ||
                        "Unable to update passcode clue."
                    );

                } finally {

                    saveProfileClueBtn.disabled =
                        false;

                    saveProfileClueBtn.textContent =
                        "Save Clue";
                }
            }
        );


    // =====================================================
    // LOGOUT
    // =====================================================

    function clearAuthentication() {

        localStorage.removeItem(
            "safeSpaceApiToken"
        );

        localStorage.removeItem(
            "safeSpaceUserId"
        );

        localStorage.removeItem(
            "safeSpaceNickname"
        );

        localStorage.removeItem(
            "safeSpaceEmail"
        );

        localStorage.removeItem(
            "safeSpacePasscodeClue"
        );

        localStorage.removeItem(
            "safeSpaceOtpVerified"
        );

        sessionStorage.removeItem(
            "safeSpaceEmail"
        );

        sessionStorage.removeItem(
            "safeSpacePassword"
        );

        sessionStorage.removeItem(
            "safeSpacePurpose"
        );

        sessionStorage.removeItem(
            "safeSpacePasscode"
        );

        sessionStorage.removeItem(
            "safeSpacePasscodeClue"
        );

        sessionStorage.removeItem(
            "safeSpaceNicknameTemp"
        );

        sessionStorage.removeItem(
            "safeSpaceResetToken"
        );
    }


    function logoutFromWebsite(
        confirmFirst = true
    ) {

        if (
            confirmFirst &&
            !confirm(
                "Log out of Safe Space?"
            )
        ) {

            return;
        }

        clearAuthentication();

        closeProfilePanels();

        closeSidebar();

        editingEntryId = null;

        journalEntries = [];

        if (emailInput) {
            emailInput.value = "";
        }

        if (passwordInput) {
            passwordInput.value = "";
        }

        showScreen(
            loginScreen
        );
    }


    logoutProfileBtn
        ?.addEventListener(
            "click",
            () => {

                logoutFromWebsite(
                    true
                );
            }
        );


    // =====================================================
    // INITIAL PAGE / RESTORE SAVED ACCOUNT
    // =====================================================

    /*
     * Keep a remembered account across reloads, but require
     * passcode verification before showing private pages.
     * The API must still validate the token and protect every
     * private endpoint server-side.
     */

    const savedApiToken =
        localStorage.getItem("safeSpaceApiToken");

    const savedEmail =
        localStorage.getItem("safeSpaceEmail");

    const savedOtpVerified =
        localStorage.getItem("safeSpaceOtpVerified") === "true";

    if (savedApiToken && savedEmail && savedOtpVerified) {
        updateVerificationClue();
        clearVerifyPasscodeInputs();
        showScreen(verifyPasscodeScreen);
        verifyPasscodeInputs[0]?.focus();
    } else {

        // Do not keep a token from a login flow that never completed OTP.
if (savedApiToken && savedEmail && savedOtpVerified) {
    hideVerificationClue();
    clearVerifyPasscodeInputs();
    showScreen(verifyPasscodeScreen);
    verifyPasscodeInputs[0]?.focus();
}
        showScreen(loginScreen);
    }

});
