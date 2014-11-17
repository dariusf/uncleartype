
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

$('#field').focus();

var texts = [
    'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.',
    '"Space," it says, "is big. Really big. You just won\'t believe how vastly, hugely, mindbogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist\'s, but that\'s just peanuts to space."',
    'Curiously enough, the only thing that went through the mind of the bowl of petunias as it fell was Oh no, not again. Many people have speculated that if we knew exactly why the bowl of petunias had thought that we would know a lot more about the nature of the Universe than we do now.',
    'The last ever dolphin message was misinterpreted as a surprisingly sophisticated attempt to do a double-backwards-somersault through a hoop whilst whistling the \'Star Spangled Banner\', but in fact the message was this: So long and thanks for all the fish.',
];

var pTag = $("#text");

var selected = texts[~~(Math.random() * texts.length)];
pTag.html(selected);

pTag.html(pTag.html().split(/\s+/g).map(function (t) {
    return '<span>' + t + '</span>';
}).join(' '));

var slice = [].slice;

var nodes = pTag.children().filter(function (element) {
    return element.data !== " ";
});

var index = 0;

function highlight(index) {
    nodes.css("color", "#000000");
    $(nodes[index]).css("color", "#ff0000");
}

function getText(index) {
    return $(nodes[index]).text() || "";
}

highlight(0);

function startsWith(aa, a) {
    return aa.substr(0, a.length) === a;
}

say();

$('#field').on('input', function (e) {
    var current = $('#field').val();

    // if current is not a prefix of the next word, signal error
    if (!startsWith(getText(index), current)) {
        speakLiterally("Typo! You typed " + literally(spell(current)) + " instead of " + literally(getText(index)));
        $('#field').css('background-color', '#ff0000');
    } else {
        $('#field').css('background-color', '#ffffff');
    }
});

var SPACE = 32;

function say() {
    speak(getText(index) + " " + getText(index+1) + " " + getText(index+2));
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
    // console.log(text);
    return text;
}

console.log(literally(selected));

function speakLiterally(text) {
    cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function speak(text) {
    text = literally(text);
    speakLiterally(text);
}

function cancel() {
    window.speechSynthesis.cancel();
}

$('#field').on('keypress', function (e) {
    var current = $('#field').val().trim();

    if (index === nodes.length-1) {
        if (current + String.fromCharCode(e.keyCode) === getText(index)) {
            e.preventDefault();
            end();
        }
    } else if (e.keyCode === SPACE) {
        if (current === getText(index)) {
            ++index;
            say();
            e.preventDefault();
            $('#field').val("");
        }
        highlight(index);
    }
});

function end() {
    $('#field').off('input').off('keydown').val("").prop('disabled', true);
    $('#text').html("Done!");
    speakLiterally("You are done! Congratulations!");
}
