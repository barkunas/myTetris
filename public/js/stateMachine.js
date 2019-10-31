class blockAnimStates {
    constructor() {
        this.state = "hide";
        this.transitions = {}
    }
    toState(newState) {
        this.state = newState;
    }
    dispatch(actionName, ...payload) {
        const action = this.transitions[this.state][actionName];
        if (action) {
            action.apply(machine, payload);
        }
    }
}
const result = document.querySelector('#result');
const render = line => result.innerHTML = `${result.innerHTML}<br />${line}`
const service = {
    getData() {
        return Promise.resolve('{"answer":42}');
    }
}

const machine = {
    dispatch(actionName, ...payload) {
        const actions = this.transitions[this.state];
        const action = this.transitions[this.state][actionName];

        if (action) {
            render(`action dispatched: ${actionName}`);
            action.apply(machine, payload);
        }
    },
    changeStateTo(newState) {
        render(`state changed: ${newState}`);
        this.state = newState;
    },
    state: 'idle',
    transitions: {
        'idle': {
            click: function () {
                this.changeStateTo('fetching');
                service.getData().then(
                    data => {
                        try {
                            this.dispatch('success', JSON.parse(data));
                        } catch (error) {
                            this.dispatch('failure', error)
                        }
                    },
                    error => this.dispatch('failure', error)
                );
            }
        },
        'fetching': {
            success: function (data) {
                render(`<strong>And the answer is ${data.answer}</strong>`);
                this.changeStateTo('idle');
            },
            failure: function (error) {
                this.changeStateTo('error');
            }
        },
        'error': {
            retry: function () {
                this.changeStateTo('idle');
                this.dispatch('click');
            }
        }
    }
}

console.clear();
render(`initial state: ${machine.state}`);
machine.dispatch('click');