
var pTag = $("#text");

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
    return $(nodes[index]).text();
}

highlight(0);

function startsWith(aa, a) {
    return aa.substr(0, a.length) === a;
}

$('#field').on('input', function (e) {
    var current = $('#field').val();

    // if current is not a prefix of the next word, signal error
    if (!startsWith(getText(index), current)) {
        $('#field').css('background-color', '#ff0000');
    } else {
        $('#field').css('background-color', '#ffffff');
    }
});

var SPACE = 32;

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
            e.preventDefault();
            $('#field').val("");
        }
        highlight(index);
    }
});

function end() {
    $('#field').off('input').off('keydown').val("").prop('disabled', true);
    $('#text').html("Done!");
}
