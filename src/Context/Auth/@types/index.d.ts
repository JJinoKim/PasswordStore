interface IPinumber {
    pinNumber : string|null;
    loginState : boolean;
    loginStateSetting : () => void;
    getPinNumber : () => void;
    delPinNumber : () => void;
    savePinNumber : (pinNumber : string) => void;
}

