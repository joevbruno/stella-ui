function isDefined(val) { return val != null; }

var ToggleDisplay = React.createClass({

    propTypes: {
        hide: React.PropTypes.bool,
        show: React.PropTypes.bool
    },

    shouldHide: function() {
        var shouldHide;
        if(isDefined(this.props.show)) {
            shouldHide = !this.props.show;
        }
        else if(isDefined(this.props.hide)) {
            shouldHide = this.props.hide;
        }
        else {
            shouldHide = false;
        }

        return shouldHide;
    },

    render: function() {
        var style = {};

        if(this.shouldHide()) {
            style.display = 'none';
        }

        return (
            <span style={style} {...this.props} />
        );
    }

});

var App = React.createClass({

    getInitialState: function() {
        return {
            show: true
        };
    },

    handleClick: function() {
        this.setState({ show: !this.state.show });
    },

    render: function() {
        return (
            <div>
                <ToggleDisplay show={this.state.show}>
                    <p>Hello</p>
                </ToggleDisplay>
                <ToggleDisplay hide={this.state.show}>
                    <p>Is it me you're looking for?</p>
                </ToggleDisplay>
                <button onClick={ this.handleClick }>Toggle</button>
            </div>

        );
    }
});

React.render(<App />, document.getElementById('container'));

