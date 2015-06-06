
var Speech = (function () {

    var replacements = [
        [/,/g, ' comma'],
        [/\./g, ' fullstop'],
        [/;/g, ' semicolon'],
        [/\-/g, ' dash'],
        [/\?/g, ' question mark'],
        [/[<>\]\[\}\{\)\(]/g, ' bracket'],
        [/\|/g, ' pipe'],
        [new RegExp(':', 'g'), ' colon'],
        [new RegExp("(\\w)'(\\s)", 'g'), '$1 single quote$2'],
        [new RegExp("(\\s)'(\\w)", 'g'), '$1single quote $2'],
        [new RegExp("^'", 'g'), 'single quote '],
        [new RegExp("'$", 'g'), ' single quote'],
        [new RegExp('(\\w)"(\\s)', 'g'), '$1 double quote$2'],
        [new RegExp('(\\s)"(\\w)', 'g'), '$1double quote $2'],
        [new RegExp('^"', 'g'), 'double quote '],
        [new RegExp('"$', 'g'), ' double quote'],
        [new RegExp('/\\\\', 'g'), ' slash'],
        [new RegExp('!', 'g'), ' exclamation'],
        [/(([A-Z])[a-z]+)/g, 'capital $2 $1'],
    ];

    var voice = null;
    var loadingCallbacks = [];

    window.speechSynthesis.onvoiceschanged = function () {

        // Load a default voice if there isn't already one
        if (voice === null && window.speechSynthesis.getVoices().length > 0) {
            voice = window.speechSynthesis.getVoices()[0];
        }

        // Invoke callbacks
        loadingCallbacks.forEach(function (cb) {
            cb(window.speechSynthesis.getVoices());
        });
    };

    function setVoice(v) {
        voice = v;
    }

    function whenVoicesLoad(callback) {
        loadingCallbacks.push(callback);

        // Trigger the event for the first time if the voices have already loaded
        if (voice !== null) {
            callback(window.speechSynthesis.getVoices());
        }
    }

    function spell(word) {
        var str = [];
        for (var i=0; i<word.length; i++) {
            str.push(word[i]);
        }
        return str.join(' ');
    }

    function literally(text) {
        replacements.forEach(function (replacement) {
            text = text.replace(replacement[0], replacement[1]);
        });
        return text;
    }

    function cancel() {
        if (voice === null) {
            return;
        }

        window.speechSynthesis.cancel();
    }

    function speakExactly(text) {
        if (voice === null) {
            return;
        }

        cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
    }

    function speak(text) {
        speakExactly(literally(text));
    }

    return {
        // Config
        setVoice: setVoice,
        whenVoicesLoad: whenVoicesLoad,

        // API
        speakExactly: speakExactly,
        speak: speak,
        cancel: cancel,
        literally: literally,
        spell: spell,
    };
})();