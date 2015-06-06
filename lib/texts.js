
var Texts = (function () {

    var texts = [
        'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.',
        '"Space," it says, "is big. Really big. You just won\'t believe how vastly, hugely, mindbogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist\'s, but that\'s just peanuts to space."',
        'Curiously enough, the only thing that went through the mind of the bowl of petunias as it fell was Oh no, not again. Many people have speculated that if we knew exactly why the bowl of petunias had thought that we would know a lot more about the nature of the Universe than we do now.',
        'The last ever dolphin message was misinterpreted as a surprisingly sophisticated attempt to do a double-backwards-somersault through a hoop whilst whistling the \'Star Spangled Banner\', but in fact the message was this: So long and thanks for all the fish.',
        'It is known that there are an infinite number of worlds, simply because there is an infinite amount of space for them to be in. However, not every one of them is inhabited. Therefore, there must be a finite number of inhabited worlds. Any finite number divided by infinity is as near to nothing as makes no odds, so the average population of all the planets in the Universe can be said to be zero. From this it follows that the population of the whole Universe is also zero, and that any people you may meet from time to time are merely the products of a deranged imagination.',
        'The disadvantages involved in pulling lots of black sticky slime from out of the ground where it had been safely hidden out of harm\'s way, turning it into tar to cover the land with, smoke to fill the air with and pouring the rest into the sea, all seemed to outweigh the advantages of being able to get more quickly from one place to another.',
        'Make it totally clear that this gun has a right end and a wrong end. Make it totally clear to anyone standing at the wrong end that things are going badly for them. If that means sticking all sort of spikes and prongs and blackened bits all over it then so be it. This is not a gun for hanging over the fireplace or sticking in the umbrella stand, it is a gun for going out and making people miserable with.',
        'Since we decided a few weeks ago to adopt the leaf as legal tender, we have, of course, all become immensely rich.',
        'He gazed keenly into the distance and looked as if he would quite like the wind to blow his hair back dramatically at that point, but the wind was busy fooling around with some leaves a little way off.',
    ];

    var greetings = [
        'Hello!',
        'How\'s it going?',
        'Nice to meet you!',
        'What\'s up?',
        'How\'s everything?',
        'How\'s life?',
        'How\'s your day?',
        'Good to see you!',
        'Long time no see!'
    ];

    var endings = [
        'You are done! A small feat.',
        'This is the end of the time you will spend here.',
        'Your task is completed. Good robot.',
        'You are finished. What will you do now?',
        'That is all. Now what will you do with the rest of your life?',
        'Nice effort. Unfortunately nothing will come of it.',
        'Take a moment to ask yourself what you have accomplished.',
    ];

    function randomFrom(collection) {
        return function () {
            var r = ~~(Math.random() * texts.length);
            return collection[r];
        };
    }

    return {
        random: randomFrom(texts),
        randomGreeting: randomFrom(greetings),
        randomEnding: randomFrom(endings),
    };

})();

