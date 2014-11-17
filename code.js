

// var $ = document.querySelectorAll.bind(document);

var pTag = $("#text");

pTag.html(pTag.html().split(/\s+/g).map(function (t) {
    return '<span>' + t + '</span>';
}).join(' '));

var slice = [].slice;

// console.log(pTag.children());

var nodes = pTag.children().filter(function (element) {
    return element.data !== " ";
});

// console.log(nodes);

var index = 0;

function highlight(index) {
    nodes.css("color", "#000000");
    // nodes.forEach(function (node) {
    // });
    $(nodes[index]).css("color", "#ff0000");
}

function getText(index) {
    return $(nodes[index]).text();
}

highlight(0);
// console.log(getText(0));

// setTimeout(function () {
//     highlight(1);
// }, 1000);

function startsWith(aa, a) {
    return aa.substr(0, a.length) === a;
}

$('#field').on('input', function (e) {
    // e.which == charcode of the pressed key, keyCode might be clearer
    // console.log(e);
    // console.log($('#field').val());

    var current = $('#field').val();

    // console.log(current, getText(index), startsWith(getText(index), current));

    // if current is not a prefix of the next word, signal error
    if (!startsWith(getText(index), current)) {
        $('#field').css('background-color', '#ff0000');
    } else {
        $('#field').css('background-color', '#ffffff');
    }
});

var SPACE = 32;

$('#field').on('keydown', function (e) {
    var current = $('#field').val().trim();

    if (e.keyCode === SPACE) {
        if (current === getText(index)) {
            ++index;
            e.preventDefault();
            $('#field').val("");

            if (index === nodes.length) {
                end();
            }
        }
        highlight(index);
    }
});

function end() {
    $('#field').off('input').off('keydown');
    $('#text').html("Done!");
}