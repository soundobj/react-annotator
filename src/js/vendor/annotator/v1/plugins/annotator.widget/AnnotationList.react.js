import React from 'react';
import AnnotationItem from './AnnotationItem.react.js!jsx';
import Actions from './AnnotationActions';
import Store from './AnnotationsStore';

var AnnotationList = React.createClass({

    getInitialState: function() {
        return Store.getState();
    },

    onChange(state) {
        console.log('annoationList onChange',state);
        this.setState(state);
    },

    componentWillMount: function() {
        Store.listen(this.onChange);
        Actions.loadAnnotations(this.props.annotations);
    },

    componentWillUnmount: function() {
        Store.unlisten(this.onChange);
    },

    render: function() {
        console.log('this state',this.state.annotations);
        var annotations = this.state.annotations.map(function (annotation) {
            console.log('annoationList render',annotation);
            return (
                <AnnotationItem data={annotation} key={annotation.id} />
            );
        });

        return (

            <div className="annotations">
                {annotations}
            </div>
        );
    }
});

export default AnnotationList;