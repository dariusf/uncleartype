
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
    'It is known that there are an infinite number of worlds, simply because there is an infinite amount of space for them to be in. However, not every one of them is inhabited. Therefore, there must be a finite number of inhabited worlds. Any finite number divided by infinity is as near to nothing as makes no odds, so the average population of all the planets in the Universe can be said to be zero. From this it follows that the population of the whole Universe is also zero, and that any people you may meet from time to time are merely the products of a deranged imagination.',
    'The disadvantages involved in pulling lots of black sticky slime from out of the ground where it had been safely hidden out of harm’s way, turning it into tar to cover the land with, smoke to fill the air with and pouring the rest into the sea, all seemed to outweigh the advantages of being able to get more quickly from one place to another.',
    'Make it totally clear that this gun has a right end and a wrong end. Make it totally clear to anyone standing at the wrong end that things are going badly for them. If that means sticking all sort of spikes and prongs and blackened bits all over it then so be it. This is not a gun for hanging over the fireplace or sticking in the umbrella stand, it is a gun for going out and making people miserable with.',
    'Since we decided a few weeks ago to adopt the leaf as legal tender, we have, of course, all become immensely rich.',
    'He gazed keenly into the distance and looked as if he would quite like the wind to blow his hair back dramatically at that point, but the wind was busy fooling around with some leaves a little way off.',
];

var pTag = $("#text");
window.speechSynthesis.onvoiceschanged = function () {
    $("#voice").empty();
    window.speechSynthesis.getVoices().map(function (voice, i) {
        return $("<option value=" + i + ">" + voice.name + "</option>");
    }).forEach(function (voice) {
        $("#voice").append(voice);
    });
};

var currentVoice = 0;

$("#voice").change(function (e) {
    currentVoice = $(this).val();
});

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

talk();

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

function talk() {
    speak(getText(index) + " " + getText(index+1));// + " " + getText(index+2));
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
    utterance.voice = window.speechSynthesis.getVoices()[currentVoice];
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
            e.preventDefault();
            ++index;
            talk();
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
