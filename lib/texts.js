
var Texts = (function () {

    var hitch = 'Douglas Adams, The Hitchhiker\'s Guide to the Galaxy';
    var alice = 'Lewis Carroll, Alice in Wonderland';
    var glass = 'Lewis Carroll, Through the Looking-Glass';

    var texts = [
        [hitch, 'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.'],
        [hitch, '"Space," it says, "is big. Really big. You just won\'t believe how vastly, hugely, mindbogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist\'s, but that\'s just peanuts to space."'],
        [hitch, 'Curiously enough, the only thing that went through the mind of the bowl of petunias as it fell was Oh no, not again. Many people have speculated that if we knew exactly why the bowl of petunias had thought that we would know a lot more about the nature of the Universe than we do now.'],
        [hitch, 'The last ever dolphin message was misinterpreted as a surprisingly sophisticated attempt to do a double-backwards-somersault through a hoop whilst whistling the \'Star Spangled Banner\', but in fact the message was this: So long and thanks for all the fish.'],
        [hitch, 'It is known that there are an infinite number of worlds, simply because there is an infinite amount of space for them to be in. However, not every one of them is inhabited. Therefore, there must be a finite number of inhabited worlds. Any finite number divided by infinity is as near to nothing as makes no odds, so the average population of all the planets in the Universe can be said to be zero. From this it follows that the population of the whole Universe is also zero, and that any people you may meet from time to time are merely the products of a deranged imagination.'],
        [hitch, 'The disadvantages involved in pulling lots of black sticky slime from out of the ground where it had been safely hidden out of harm\'s way, turning it into tar to cover the land with, smoke to fill the air with and pouring the rest into the sea, all seemed to outweigh the advantages of being able to get more quickly from one place to another.'],
        [hitch, 'Make it totally clear that this gun has a right end and a wrong end. Make it totally clear to anyone standing at the wrong end that things are going badly for them. If that means sticking all sort of spikes and prongs and blackened bits all over it then so be it. This is not a gun for hanging over the fireplace or sticking in the umbrella stand, it is a gun for going out and making people miserable with.'],
        [hitch, 'Since we decided a few weeks ago to adopt the leaf as legal tender, we have, of course, all become immensely rich.'],
        [hitch, 'He gazed keenly into the distance and looked as if he would quite like the wind to blow his hair back dramatically at that point, but the wind was busy fooling around with some leaves a little way off.'],
        [hitch, 'For instance, on the planet Earth, man had always assumed that he was more intelligent than dolphins because he had achieved so much: the wheel, New York, wars and so on, whilst all the dolphins had ever done was muck about in the water having a good time. But conversely, the dolphins had always believed that they were far more intelligent than man for precisely the same reasons.'],

        [alice, '"Yes," said Deep Thought. "Life, the Universe, and Everything. There is an answer. But, I\'ll have to think about it." Fook glanced impatiently at his watch. "How long?" he said. "Seven and a half million years," said Deep Thought.'],
        [alice, '"Begin at the beginning," the King said, very gravely, "and go on till you come to the end, then stop."'],
        [alice, '"Why is a raven like a writing-desk?" "I give it up," Alice replied. "What\'s the answer?" "I haven\'t the slightest idea," said the Hatter.'],
        [alice, '"Would you tell me, please, which way I ought to go from here?" "That depends a good deal on where you want to get to," said the Cat. "I don\'t much care where," said Alice. "Then it doesn\'t matter which way you go," said the Cat. "So long as I get somewhere,\' Alice added as an explanation. "Oh, you\'re sure to do that," said the Cat, "if you only walk long enough."'],
        [alice, '"Take some more tea," the March Hare said to Alice, very earnestly. "I\'ve had nothing yet," Alice replied in an offended tone, "so I can\'t take more." "You mean you can\'t take less," said the Hatter: "it\'s very easy to take more than nothing." "Nobody asked your opinion," said Alice."'],
        [alice, '"But I don\'t want to go among mad people," Alice remarked. "Oh, you can\'t help that," said the Cat: "we\'re all mad here. I\'m mad. You\'re mad." "How do you know I\'m mad?" said Alice. "You must be," said the Cat, "or you wouldn\'t have come here."'],

        [glass, '"I wonder if I\'ve been changed in the night. Let me think. Was I the same when I got up this morning? I almost think I can remember feeling a little different. But if I\'m not the same, the next question is \'Who in the world am I?\' Ah, that\'s the great puzzle!"'],
        [glass, '"Do you know, I always thought unicorns were fabulous monsters, too? I never saw one alive before!" "Well, now that we have seen each other," said the unicorn, "if you\'ll believe in me, I\'ll believe in you."'],
        [glass, '"The time has come," the walrus said, "to talk of many things: Of shoes and ships, and sealing wax, of cabbages and kings"'],
        [glass, '"And how do you know that you\'re mad? "To begin with," said the Cat, "a dog\'s not mad. You grant that?" I suppose so, said Alice. "Well then," the Cat went on, "you see a dog growls when it\'s angry, and wags it\'s tail when it\'s pleased. Now I growl when I\'m pleased, and wag my tail when I\'m angry. Therefore I\'m mad."'],
        [glass, '"Where should I go?", Alice. "That depends on where you want to end up.", The Cheshire Cat."'],
        [glass, '"It\'s a poor sort of memory that only works backwards," said the White Queen to Alice.'],
        [glass, '"And how many hours a day did you do lessons?\' said Alice, in a hurry to change the subject. "Ten hours the first day," said the Mock Turtle: "nine the next, and so on." "What a curious plan!" exclaimed Alice. "That\'s the reason they\'re called lessons," the Gryphon remarked, "because they lessen from day to day."'],
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
            var r = ~~(Math.random() * collection.length);
            return collection[r];
        };
    }

    return {
        random: randomFrom(texts),
        randomGreeting: randomFrom(greetings),
        randomEnding: randomFrom(endings),
    };

})();

