
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

function startsWith(aa, a) {
    return aa.substr(0, a.length) === a;
}

var VoicePicker = React.createClass({
    getInitialState: function () {
        return {
            options: []
        };
    },
    componentDidMount: function () {
        var that = this;
        Speech.whenVoicesLoad(function (voices) {
            that.setState({options: voices});
        });
    },
    onChoiceMade: function (e) {
        var index = e.target.value;
        var voice = this.state.options[index];
        Speech.setVoice(voice);
        Speech.speakExactly(Texts.randomGreeting());
    },
    render: function () {
        var options = this.state.options.map(function (op, i) {
            return <option key={'option'+i} value={i}>{op.name}</option>;
        });
        return <select onChange={this.onChoiceMade}>{options}</select>
    },
});

var PrefsModal = React.createClass({
    done: function () {
        this.props.onRequestHide();
        this.props.onPrefsChanged();
    },
    render: function () {
        return <Modal {...this.props} title='Options' animation={false}>
            <div className='modal-body'>
                <h4>Voice</h4>
                <VoicePicker {...this.props} />
            </div>
            <div className='modal-footer'>
                <Button onClick={this.done}>Done</Button>
            </div>
        </Modal>;
    }
});

var TypingDisplay = React.createClass({
    render: function () {
        var that = this;
        var elements = this.props.words.map(function (word, i) {
            var className = that.props.pos !== i ? '': 'text-primary';
            return <span key={'word'+i} className={className}>{word} </span>;
        });
        return <div style={{padding: '2%'}}>{elements}</div>;
    }
});

var TypingProgressBar = React.createClass({
    render: function () {
        var value = Math.max(1, ~~(this.props.progress * 100)) + '%';
        return <div className='progress-bar' style={{width: value, height: '1%'}}></div>;
    }
});

var TypingField = React.createClass({
    getInitialState: function () {
        return {
            text: ''
        };
    },
    onChange: function (e) {
        this.setState({text: e.target.value});
    },
    componentDidMount: function () {
        var that = this;
        setTimeout(function () {
            that.refs.field.getDOMNode().focus();
        }, 0);
    },
    onKeyPress: function (e) {
        var existing = this.refs.field.getDOMNode().value.trim();
        var current = String.fromCharCode(e.charCode);

        var wentToNextWord = this.props.onKeyTyped(existing, current);

        if (wentToNextWord) {
            // Cancel the last keypress that triggered this
            e.preventDefault();

            this.setState({text: ''});
        }
    },
    onKeyUp: function (e) {
        var existing = this.refs.field.getDOMNode().value.trim();

        // Backspace and delete
        if (e.keyCode === 8 || e.keyCode === 46) {
            this.props.backspace(existing);
        }
    },
    render: function () {
        return <input type='text' ref='field'
            style={{
                marginBottom: '5px',
                backgroundColor: this.props.error ? '#eb6864' : '#ffffff'
            }}
            className='form-control input-lg'
            disabled={this.props.disabled}
            value={this.state.text}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            onKeyPress={this.onKeyPress} />
    }
});

var TypingApp = React.createClass({
    getInitialState: function() {
        return {
            words: Texts.random().split(/\s+/g),
            pos: 0,
            ended: false,
            error: false,
        };
    },
    componentDidMount: function () {
        var that = this;
        Speech.whenVoicesLoad(function (voices) {
            that.talk(0);
        });
    },
    end: function () {
        this.setState({ended: true});
        Speech.cancel();
        setTimeout(function () {
            Speech.speakExactly(Texts.randomEnding());
        }, 300);
    },
    isAtLastWord: function () {
        return this.state.pos === this.state.words.length-1;
    },
    getWord: function (index) {
        return this.state.words[index] || '';
    },
    getCurrentWord: function () {
        return this.getWord(this.state.pos);
    },
    talk: function (currentPos) {
        var current = this.getWord(currentPos);
        var next = this.getWord(currentPos+1);
        Speech.speak(current + ' ' + next);
    },
    onKeyTyped: function (existing, current) {
        // Returns true if this event led to us going to the next word; false otherwise
        if (this.isAtLastWord() && (existing + current) === this.getCurrentWord()) {
            this.end();
            return true;
        } else if (current === ' ' && existing === this.getCurrentWord()) {
            var currentPos = this.state.pos + 1;
            this.setState({pos: currentPos});
            // We need to pass currentPos as there's no guarantee that setState is synchronous
            this.talk(currentPos);
            return true;
        } else {
            // We know that a complete word hasn't been formed
            this.checkInput(existing+current);
            return false;
        }
    },
    checkInput: function (existing) {
        // Check if the current input is a prefix of the target word, and signal error if not
        var isPrefix = startsWith(this.getCurrentWord(), existing);
        if (!isPrefix) {
            Speech.speakExactly('Typo! You typed ' + Speech.literally(Speech.spell(existing)) + ' instead of ' + Speech.literally(this.getCurrentWord()));
        }
        this.setState({error: !isPrefix});
    },
    onPrefsChanged: function () {
        this.talk(this.state.pos);
    },
    render: function () {
        return <div>
            <TypingDisplay
                pos={this.state.pos}
                words={this.state.words} />
            <TypingProgressBar
                progress={this.state.ended ? 1 : this.state.pos / this.state.words.length} />
            <TypingField
                error={this.state.error}
                backspace={this.checkInput}
                onKeyTyped={this.onKeyTyped}
                disabled={this.state.ended} />

            <ModalTrigger modal={<PrefsModal
                onPrefsChanged={this.onPrefsChanged} />}>

                <i style={{float: 'right'}} className='btn btn-primary glyphicon glyphicon-cog'></i>
            </ModalTrigger>

            <div style={{clear: 'both'}}></div>
        </div>;
    }
});

React.render(<TypingApp />, document.querySelector('#app'));
