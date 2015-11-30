import React from 'react';

class Overlay extends React.Component {
    render() {
        let styles = this.props.zindex ? {'z-index': this.props.zindex } : null;
        let className = this.props.type === 'non-absolute' ? 'o-overlay--non-absolute' : 'o-overlay';
        return(
            <div className={className} style={styles}>
                {this.props.children}
            </div>
        );
    }
}
export default Overlay; 