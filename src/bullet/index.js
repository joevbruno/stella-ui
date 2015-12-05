'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import FlexWrapper from '../../Patterns/layouts/FlexWrapper';

class BulletGraph extends React.Component {
    displayName: 'BulletGraph'
    render() {
        return (
            <FlexWrapper className='o-bullet-graph'>
                <div className='o-bullet-graph__outer-base'></div>
                <div className='o-bullet-graph__outer-top'></div>
                <div className='o-bullet-graph__inner-base'>GOAL: $3000/m</div>
                <div className='o-bullet-graph__inner-top'></div>
                <div className='o-bullet-graph__marker'></div>
            </FlexWrapper>
        );
    }
}

export default BulletGraph;

